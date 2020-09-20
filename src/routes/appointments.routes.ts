import { Router, request, response } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentRepository = new AppointmentsRepository();
const appointmentRouter = Router();

appointmentRouter.get('/', (request, response) => {
    const appointments = appointmentRepository.all();
    return response.json(appointments);
});

appointmentRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);
    const appointmentDate = startOfHour(parsedDate);
    const findAppointmentInSameDate = appointmentRepository.findByDate(
        appointmentDate,
    );

    if (findAppointmentInSameDate) {
        return response
            .status(400)
            .json({ message: 'This appointment is already booked' });
    }

    const appointment = appointmentRepository.create({
        provider,
        date: appointmentDate,
    });

    return response.json(appointment);
});

export default appointmentRouter;

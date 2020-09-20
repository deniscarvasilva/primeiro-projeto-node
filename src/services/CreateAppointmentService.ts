import Appointment from '../models/Appointment';

interface Request {
    provider: string;
    date: Date;
}
class CreateAppointmentService {
    constructor() {}

    public execute({ date, provider }: Request): Appointment {
        const appointmentDate = startOfHour(parsedDate);
        const findAppointmentInSameDate = appointmentRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        }

        const appointment = appointmentRepository.create({
            provider,
            date: appointmentDate,
        });
        return appointment;
    }
}

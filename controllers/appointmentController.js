const Appointment = require('../models/Appointment');

// Obtener todas las citas
exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// Crear una nueva cita
exports.addAppointment = async (req, res) => {
    const { date, time, patient, reason } = req.body;
    const appointment = new Appointment({ date, time, patient, reason });

    try {
        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

// Actualizar una cita
exports.updateAppointment = async (req, res) => {
    const { id } = req.params;
    const datos = req.body;

    try {
        const appointment = await Appointment.findByIdAndUpdate(id, datos, { new: true });
        if (!appointment) {
            return res.status(404).json({ mensaje: 'Cita no encontrada' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

// Eliminar una cita
exports.deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        await Appointment.findByIdAndDelete(id);
        res.status(200).json({ mensaje: 'Cita eliminada' });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

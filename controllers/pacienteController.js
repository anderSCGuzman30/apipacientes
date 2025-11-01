//importando el modelo del paciente
const Paciente = require('../models/Paciente');

//Funcion para traer todos los pacientes
exports.getPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        res.json(pacientes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: error.message});
    }
}

//Funcion para crear un paciente
exports.addPaciente = async (req, res) => {
    const { nombre, apellido, edad, genero, direccion, telefono } = req.body;

    const paciente = new Paciente({
        nombre,
        apellido,
        edad,
        genero,
        direccion,
        telefono
    });

    try {
        await paciente.save();
        res.status(201).json(paciente);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: error.message });
    }
};

//Funcion para actualizar un paciente
exports.updatePaciente = async (req, res) => {
    const { id } = req.params;
    const datosActualizados = req.body;

    try {
        const paciente = await Paciente.findByIdAndUpdate(id, datosActualizados, { new: true });
        if (!paciente) {
            return res.status(404).json({ mensaje: 'Paciente no encontrado' });
        }
        res.status(200).json(paciente);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

//Funcion para eliminar un paciente
exports.deletePaciente = async (req, res) => {
    const { id } = req.params;
    try {
        await Paciente.findByIdAndDelete(id);
        res.status(200).json({ mensaje: 'Paciente eliminado'});
    } catch (error) {
        res.status(400).json({ mensaje: error.message});
    }
};
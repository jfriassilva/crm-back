import Paciente from "./Pacientes.js";


const obtenerPacientes = async (req, res) => {
    const pacientes = await Paciente.find().where('medico').equals(req.usuario);

    res.json(pacientes);
};
const nuevoPaciente = async (req, res) => {
    const paciente = new Paciente(req.body)
    paciente.medico = req.usuario._id

    try {
        const pacienteAlmacenado = await paciente.save()
        res.json(pacienteAlmacenado);
    } catch (error) {
        console.log(error);
    }
};

const obtenerPaciente = async (req, res) => {
    const { id } = req.params;

    const paciente = await Paciente.findById(id);

    if (!paciente) {
        const error = new Error("Paciente no encontrado");
        return res.status(404).json({msg: error.message});
    }

    if (paciente.medico.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion no valida");
        return res.status(401).json({msg: error.message});
    }

    res.json(paciente);
};
const editarPaciente = async (req, res) => {
    const { id } = req.params;

    const paciente = await Paciente.findById(id);

    if (!paciente) {
        const error = new Error("Paciente no encontrado");
        return res.status(404).json({msg: error.message});
    }

    if (paciente.medico.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion no valida");
        return res.status(401).json({msg: error.message});
    }

    paciente.nombre = req.body.nombre || paciente.nombre; 
    paciente.email = req.body.email || paciente.email; 
    paciente.telefono = req.body.telefono || paciente.telefono; 
    paciente.edad = req.body.edad || paciente.edad;
    paciente.peso = req.body.peso || paciente.peso;
    paciente.notas = req.body.notas || paciente.notas; 

    try {
        const pacienteAlmacenado = await paciente.save();
        res.json(pacienteAlmacenado);
    } catch (error) {
        console.log(error)
    }
};
const eliminarPaciente = async (req, res) => {
    const { id } = req.params;

    const paciente = await Paciente.findById(id);

    if (!paciente) {
        const error = new Error("Paciente no encontrado");
        return res.status(404).json({msg: error.message});
    }

    if (paciente.medico.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion no valida");
        return res.status(401).json({msg: error.message});
    }

    try {
        await paciente.deleteOne();
        res.json({msg: "Eliminando paciente" });
    } catch (error) {
        console.log(error)
    }
};

export {obtenerPacientes, nuevoPaciente, obtenerPaciente, editarPaciente, eliminarPaciente};
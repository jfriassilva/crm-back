import mongoose from "mongoose";

const PacienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    telefono:{
        type:Number,
        trim: true,
        unique: true,
    },
    edad:{
        type:Number,
        trim: true,
    },
    peso:{
        type:Number,
        trim: true,
    },
    notas: {
        type: String,
        trim: true,
        required: true
    },
    medico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
    }
},{
    timesstamps: true,
});

const paciente = mongoose.model("Paciente", PacienteSchema);

export default paciente;
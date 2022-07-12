import express from "express";
import {obtenerPacientes, nuevoPaciente, obtenerPaciente, editarPaciente, eliminarPaciente} from "./pacientesControllers.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/")
.get(checkAuth, obtenerPacientes)
.post(checkAuth, nuevoPaciente);

router.route("/:id")
.get(checkAuth, obtenerPaciente)
.put(checkAuth, editarPaciente)
.delete(checkAuth, eliminarPaciente);

export default router;
import {Router} from 'express'
import { getAlumnos, createAlumnos, updateAlumnos, deleteAlumnos, getUnAlumno, getAlumnosPorGrupo } from '../controllers/alumnos.controller.js';

const router = Router()

router.get('/alumnos',getAlumnos)

router.get('/alumnos/:matricula_Alumnos', getUnAlumno)

router.get('/alumnos/grupos/:id_grupoA', getAlumnosPorGrupo)

router.post('/alumnos',createAlumnos )

router.patch('/alumnos/:matricula_Alumnos',updateAlumnos)

router.delete('/alumnos/:matricula_Alumnos',deleteAlumnos )

export default router;
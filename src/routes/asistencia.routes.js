import { Router } from 'express';
import{ createAsistencia, updateAsistencia, deleteAsistencia, getTodasAsistenciasPorAlumno, getAsistenciasPorGrupoYFecha, exportarAsistenciaExcel } from '../controllers/asistencia.controller.js';

const router = Router()



router.get('/asistencias/grupo/:id_grupoAsis/fecha/:fecha', getAsistenciasPorGrupoYFecha);

router.post('/asistencia', createAsistencia);

router.patch('/asistencia/:matricula_AlumnosAsis/:id_grupoAsis/:fecha', updateAsistencia);
 
router.delete('/asistencia/:matricula_AlumnosAsis/:id_grupoAsis/:fecha',deleteAsistencia);

router.get('/asistencias/alumno/:matricula_AlumnosAsis', getTodasAsistenciasPorAlumno);

router.get('/asistencia/excel/:id_grupoAsis', exportarAsistenciaExcel);


export default router ;
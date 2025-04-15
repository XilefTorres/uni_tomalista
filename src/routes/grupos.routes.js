import { Router } from "express";
import { createGrupo, deleteGrupo, getGrupo,getUnGrupo, updateGrupo } from '../controllers/grupos.controller.js';


const router = Router();

router.get('/grupos',getGrupo )

router.get('/grupos/:id_grupo',getUnGrupo )

router.post('/grupos',createGrupo)

router.patch('/grupos/:id_grupo',updateGrupo)

router.delete('/grupos/:id_grupo',deleteGrupo )

export default router;
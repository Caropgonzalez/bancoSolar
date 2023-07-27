import express from 'express';
import {
    getUsuarios,
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario,
} from '../controller/usuarios.js';

const router = express.Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/', postUsuario);
router.put('/:id', putUsuario);
router.delete('/:id', deleteUsuario);

export default router;
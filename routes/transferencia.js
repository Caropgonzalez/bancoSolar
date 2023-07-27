import express from 'express';
import{
    getTransferencias,
    getTransferencia,
    postTransferencia,
    putTransferencia,
    deleteTransferencia
} from '../controller/transferencias.js';

const router = express.Router();

router.get('/', getTransferencias),
router.get('/:id', getTransferencia),
router.post('/', postTransferencia),
router.put('/:id', putTransferencia),
router.delete('/:id', deleteTransferencia);

export default router;
import { Router } from 'express';
import { listarComidas, criarComida } from '../controllers/foodController.js';

const router = Router();

router.get('/comidas', listarComidas);
router.post('/comidas', criarComida);

export default router;

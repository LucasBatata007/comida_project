import { Router } from 'express';
import { registrar, login } from '../controllers/authController.js';

const router = Router();
router.post('/cadastro', registrar);
router.post('/login', login);
export default router;

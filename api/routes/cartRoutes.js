import { Router } from 'express';
import { addAoCarrinho, verCarrinho } from '../controllers/cartController.js';

const router = Router();
router.post('/carrinho', addAoCarrinho);
router.get('/carrinho/:userId', verCarrinho);
export default router;
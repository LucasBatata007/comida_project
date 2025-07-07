import { Router } from 'express';
import { fecharPedido } from '../controllers/orderController.js';

const router = Router();
router.post('/pedido', fecharPedido);
export default router;

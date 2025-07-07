import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

// rotas
import authRoutes from './routes/authRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.send('API rodando suavee 🚀'));

app.use(authRoutes);
app.use(foodRoutes);
app.use(cartRoutes);
app.use(orderRoutes);

connectDB().then(() => {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Servidor ⚡ em http://localhost:${PORT}`));
});
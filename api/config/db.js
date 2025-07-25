import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'appComida' });
    console.log('MongoDB conectado ✔');
  } catch (err) {
    console.error('Erro ao conectar com MongoDB ❌', err);
    process.exit(1);
  }
};

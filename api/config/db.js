import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://lucas:Batata007@comida.xhqw8jf.mongodb.net/?retryWrites=true&w=majority&appName=comida", { dbName: 'appComida' });
    console.log('MongoDB conectado ✔');
  } catch (err) {
    console.error('Erro ao conectar com MongoDB ❌', err);
    process.exit(1);
  }
};

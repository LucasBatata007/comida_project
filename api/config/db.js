

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://lucas:Batata007@comida.xhqw8jf.mongodb.net/?retryWrites=true&w=majority&appName=comida", {
      dbName: 'appComida',
      family: 4        // ← força IPv4
    });
    console.log('MongoDB conectado ✔');
  } catch (err) {
    console.error('Erro ao conectar MongoDB ❌', err);
    process.exit(1);
  }
}


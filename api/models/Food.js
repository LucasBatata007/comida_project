import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  nome:  { type: String, required: true },
  preco: { type: Number, required: true },
});

export default mongoose.model('Food', foodSchema);
import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  food:       { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
  quantidade: { type: Number, default: 1 },
});

export default mongoose.model('CartItem', cartItemSchema);
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itens: [{
    food:       { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
    quantidade: Number,
    subtotal:   Number,
  }],
  total:    { type: Number, required: true },
  criadoEm: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);
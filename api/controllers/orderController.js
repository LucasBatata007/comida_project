    import Order from '../models/Order.js';
import CartItem from '../models/CartItem.js';

export const fecharPedido = async (req, res) => {
  const { userId } = req.body;
  try {
    const itensCarrinho = await CartItem.find({ user: userId }).populate('food');
    if (!itensCarrinho.length) return res.status(400).json({ erro: 'Carrinho vazio' });

    const itens = itensCarrinho.map(i => ({
      food:       i.food._id,
      quantidade: i.quantidade,
      subtotal:   i.food.preco * i.quantidade,
    }));
    const total = itens.reduce((s, i) => s + i.subtotal, 0);

    const pedido = await Order.create({ user: userId, itens, total });
    await CartItem.deleteMany({ user: userId });

    res.status(201).json({ mensagem: 'Pedido concluído', pedido });
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno' });
  }
};

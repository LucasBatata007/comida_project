import CartItem from '../models/CartItem.js';
import Food from '../models/Food.js';

export const addAoCarrinho = async (req, res) => {
  const { userId, foodId, quantidade } = req.body;
  try {
    // garante que a comida existe
    const comida = await Food.findById(foodId);
    if (!comida) return res.status(404).json({ erro: 'Comida não encontrada' });

    const item = await CartItem.findOneAndUpdate(
      { user: userId, food: foodId },
      { $inc: { quantidade } },
      { new: true, upsert: true }
    );

    res.status(201).json({ mensagem: 'Adicionado ao carrinho', item });
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno' });
  }
};

export const verCarrinho = async (req, res) => {
  const { userId } = req.params;
  try {
    const itens = await CartItem.find({ user: userId }).populate('food');
    const carrinho = itens.map(i => ({
      id:         i._id,
      nome:       i.food.nome,
      preco:      i.food.preco,
      quantidade: i.quantidade,
      subtotal:   i.food.preco * i.quantidade,
    }));
    const total = carrinho.reduce((s, i) => s + i.subtotal, 0);
    res.json({ carrinho, total });
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno' });
  }
};

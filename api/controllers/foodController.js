import Food from '../models/Food.js';

export const listarComidas = async (_req, res) => {
  try {
    const comidas = await Food.find();
    res.json(comidas);
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno' });
  }
};


export const criarComida = async (req, res) => {
  const { nome, preco } = req.body;
  if (!nome || preco == null) {
    return res.status(400).json({ erro: 'Nome e preço são obrigatórios' });
  }
  try {
    const comida = await Food.create({ nome, preco });
    res.status(201).json({ mensagem: 'Comida criada', comida });
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno' });
  }
};

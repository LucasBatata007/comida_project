import User from '../models/User.js';

export const registrar = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const jaExiste = await User.findOne({ email });
    if (jaExiste) return res.status(400).json({ erro: 'Email já cadastrado' });

    const novoUser = await User.create({ nome, email, senha });
    res.status(201).json({ mensagem: 'Usuário criado!', userId: novoUser._id });
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno' });
  }
};

export const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.senha !== senha) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }
    res.json({ mensagem: 'Login ok', userId: user._id });
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno' });
  }
};
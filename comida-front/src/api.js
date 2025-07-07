import axios from 'axios';

/**
 * Altere a baseURL conforme o dispositivo:
 * - Emulador Android:      http://10.0.2.2:4000
 * - Emulador iOS:          http://localhost:4000
 * - Celular físico:        http://SEU_IP_LOCAL:4000
 */
export const api = axios.create({
  baseURL: 'http://127.0.0.1:4000',
});

// Funções helper
export const signup    = (data)            => api.post('/cadastro', data);
export const login     = (data)            => api.post('/login',    data);
export const getFoods  = ()                => api.get('/comidas');
export const addToCart = (payload)         => api.post('/carrinho', payload);
export const getCart   = (userId)          => api.get(`/carrinho/${userId}`);
export const checkout  = (userId)          => api.post('/pedido',   { userId });

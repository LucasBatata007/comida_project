// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({
  userId: null,
  setUserId: () => {},
  loading: true,
});

export const AuthProvider = ({ children }) => {
  const [userId, setUserIdState] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carregar userId do AsyncStorage quando o app inicia
  useEffect(() => {
    const loadUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) setUserIdState(storedUserId);
      } catch (e) {
        console.error('Falha ao carregar userId');
      } finally {
        setLoading(false);
      }
    };
    loadUserId();
  }, []);

  // Função para atualizar userId e salvar no AsyncStorage
  const setUserId = async (id) => {
    try {
      if (id) {
        await AsyncStorage.setItem('userId', id);
      } else {
        await AsyncStorage.removeItem('userId');
      }
      setUserIdState(id);
    } catch (e) {
      console.error('Falha ao salvar userId');
    }
  };

  return (
    <AuthContext.Provider value={{ userId, setUserId, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

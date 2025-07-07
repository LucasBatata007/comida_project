import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { login } from '../api';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { setUserId } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);

  const onSubmit = async () => {
    try {
      const res = await login({ email, senha });
      // Salva o userId no contexto e AsyncStorage
      await setUserId(res.data.userId);
      router.replace('(tabs)');
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro de login');
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Comida App 🍔</Text>
      {erro && <Text style={styles.error}>{erro}</Text>}
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />
      <Button
        mode="contained"
        buttonColor="#D32F2F"
        onPress={onSubmit}
        style={{ marginTop: 10 }}
      >
        Entrar
      </Button>
      <Button
        onPress={() => router.push('/signup')}
        textColor="#D32F2F"
        style={{ marginTop: 8 }}
      >
        Criar conta
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { color: '#D32F2F', marginBottom: 24, fontWeight: 'bold' },
  error: { color: '#D32F2F', marginBottom: 8 },
  input: { width: '80%', maxWidth: 300, marginBottom: 12, backgroundColor: '#fff' },
});

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { signup } from '../api';

export default function SignupScreen() {
  const router = useRouter();
  const [nome,setNome] = useState('');
  const [email,setEmail] = useState('');
  const [senha,setSenha] = useState('');
  const [erro,setErro] = useState(null);

  const onSubmit = async () => {
    try {
      await signup({ nome,email,senha });
      router.replace('/login');
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao cadastrar');
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Criar Conta</Text>
      {erro && <Text style={styles.error}>{erro}</Text>}
      <TextInput label="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={styles.input} />
      <TextInput label="Senha" value={senha} onChangeText={setSenha} secureTextEntry style={styles.input} />
      <Button mode="contained" buttonColor="#D32F2F" onPress={onSubmit} style={{ marginTop: 10 }}>Cadastrar</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',padding:16},
  title:{color:'#D32F2F',marginBottom:24,fontWeight:'bold'},
  error:{color:'#D32F2F',marginBottom:8},
  input:{width:'80%',maxWidth:300,marginBottom:12,backgroundColor:'#fff'},
});

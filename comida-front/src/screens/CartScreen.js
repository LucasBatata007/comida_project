import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../src/context/AuthContext';
import { getCart, checkout } from '../../src/api';

export default function CartScreen() {
  const { userId } = useAuth();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(false);

  /** carrega carrinho sempre que a tela ganhar foco */
  const fetchCart = useCallback(() => {
    if (!userId) return;
    getCart(userId)
      .then(r => {
        setItems(r.data.carrinho);
        setTotal(r.data.total);
      })
      .catch(() => setErro('Erro ao carregar carrinho'));
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      fetchCart();      // roda ao entrar
      return () => {};  // opcional: cleanup
    }, [fetchCart])
  );

  const finalizar = async () => {
    setLoading(true);
    try {
      await checkout(userId);
      Alert.alert('Sucesso', 'Pedido finalizado!');
      fetchCart();      // recarrega (vai voltar vazio)
    } catch {
      Alert.alert('Erro', 'Falha ao finalizar.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {erro && <Text style={styles.error}>{erro}</Text>}

      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">{item.nome}</Text>
              <Text>Qtd: {item.quantidade}</Text>
              <Text>Subtotal: R$ {item.subtotal.toFixed(2)}</Text>
            </Card.Content>
          </Card>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />

      <View style={styles.total}>
        <Text variant="headlineSmall">Total: R$ {total.toFixed(2)}</Text>
      </View>

      <Button
        mode="contained"
        buttonColor="#D32F2F"
        onPress={finalizar}
        disabled={!items.length || loading}
        loading={loading}
        style={{ marginTop: 20 }}
      >
        Finalizar Compra
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#fff', padding:16 },
  card:      { marginBottom:10 },
  total:     { borderTopWidth:1, borderTopColor:'#ccc', paddingTop:12, alignItems:'flex-end' },
  error:     { color:'#D32F2F', textAlign:'center', marginBottom:8 },
});

// @ts-nocheck  // remove esta linha se não estiver usando TS no projeto
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { useAuth } from '../../src/context/AuthContext';
import { getFoods, addToCart } from '../../src/api';

export default function Menu() {
  const { userId } = useAuth();
  const [foods, setFoods] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    getFoods()
      .then(res => setFoods(res.data))
      .catch(() => setErro('Erro ao carregar cardápio'));
  }, []);

  const handleAdd = (food) => {
    addToCart({ userId, foodId: food._id, quantidade: 1 })
      .catch(() => setErro('Erro ao adicionar item ao carrinho'));
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium">{item.nome}</Text>
        <Text>R$ {Number(item.preco).toFixed(2)}</Text>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          buttonColor="#D32F2F"
          onPress={() => handleAdd(item)}
        >
          Adicionar
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      {erro && <Text style={styles.error}>{erro}</Text>}
      <FlatList
        data={foods}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  card: { marginBottom: 10 },
  error: { color: '#D32F2F', textAlign: 'center', marginBottom: 8 },
});

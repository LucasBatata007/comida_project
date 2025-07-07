import React from 'react';
import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#D32F2F' }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Menu', 
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>🍔</Text>, 
        }} 
      />
      <Tabs.Screen 
        name="cart" 
        options={{ 
          title: 'Carrinho', 
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>🛒</Text>, 
        }} 
      />
    
    </Tabs>
  );
}

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import OrderItem from '../components/OrderItem';

const ordersData = [
  { id: '1', name: 'Deluxe Thali - Veg', price: 22.00, quantity: 2, image: 'https://example.com/food.jpg' },
  { id: '2', name: 'South Indian Thali - Veg', price: 32.00, quantity: 1, image: 'https://example.com/food.jpg' },
];

const OrderInvoiceScreen = () => {
  const total = ordersData.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Invoice</Text>
      <Text style={styles.orderNumber}>Order No - 110040717</Text>
      <FlatList
        data={ordersData}
        renderItem={({ item }) => <OrderItem {...item} />}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginVertical: 10, textAlign: 'center' },
  orderNumber: { fontSize: 16, fontWeight: 'bold' },
  total: { fontSize: 20, fontWeight: 'bold', textAlign: 'right', marginVertical: 10 },
});

export default OrderInvoiceScreen;
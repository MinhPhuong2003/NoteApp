import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import OrderItem from '../components/OrderItem';
import Button from '../components/Button';

const ordersData = [
  { id: '1', name: 'Deluxe Thali - Veg', price: 22.00, quantity: 2, image: 'https://example.com/food.jpg', orderNumber: '110040717', total: 84.00 },
  { id: '2', name: 'South Indian Thali - Veg', price: 32.00, quantity: 1, image: 'https://example.com/food.jpg', orderNumber: '110040712', total: 100.00 },
];

const MyOrdersScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Orders</Text>
      <FlatList
        data={ordersData}
        renderItem={({ item }) => (
          <View style={styles.order}>
            <Text style={styles.orderNumber}>Order No - {item.orderNumber}</Text>
            <OrderItem {...item} />
            <Text style={styles.total}>${item.total.toFixed(2)}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={() => {}} style={styles.cancelButton} />
              <Button title="Track" onPress={() => navigation.navigate('TrackOrder')} />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginVertical: 10, textAlign: 'center' },
  order: { backgroundColor: '#fff', padding: 10, marginVertical: 5, borderRadius: 5 },
  orderNumber: { fontSize: 16, fontWeight: 'bold' },
  total: { fontSize: 16, fontWeight: 'bold', textAlign: 'right' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelButton: { backgroundColor: '#ccc' },
});

export default MyOrdersScreen;
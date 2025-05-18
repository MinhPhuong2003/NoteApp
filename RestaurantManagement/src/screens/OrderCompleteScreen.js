import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';

const OrderCompleteScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Completed</Text>
      <Text style={styles.message}>Details of your order can track on your app!</Text>
      <Text style={styles.orderNumber}>Your Order Number: 114040717</Text>
      <Button title="Go to My Orders" onPress={() => navigation.navigate('MyOrders')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  message: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  orderNumber: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
});

export default OrderCompleteScreen;
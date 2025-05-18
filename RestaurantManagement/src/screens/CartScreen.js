import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import OrderItem from '../components/OrderItem';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';

const cartData = [
  { id: '1', name: 'Deluxe Thali - Veg', price: 22.0, quantity: 2, image: 'https://example.com/food.jpg' },
  { id: '2', name: 'South Indian Thali - Veg', price: 32.0, quantity: 1, image: 'https://example.com/food.jpg' },
];

const CartScreen = ({ navigation }) => {
  const total = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>YOUR CART</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MenuList')}>
          <Icon name="home" size={25} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Content with paddingHorizontal */}
      <View style={styles.content}>
        <FlatList
          data={cartData}
          renderItem={({ item }) => <OrderItem {...item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 160 }}
        />
      </View>

      {/* Fixed Bottom Summary */}
      <View style={[styles.footer, styles.content]}>
        <View style={styles.summaryContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('MenuList')}>
            <Text style={styles.addMore}>+ Add More Items</Text>
          </TouchableOpacity>
          <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
        </View>
        <Button title="Continue" onPress={() => navigation.navigate('OrderDetails')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ff6200',
    padding: 15,
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  content: {
    paddingHorizontal: 15,
    flex: 1,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f5f5f5',
    paddingTop: 10,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  addMore: {
    color: '#ff6200',
    fontWeight: 'bold',
    fontSize: 16,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CartScreen;

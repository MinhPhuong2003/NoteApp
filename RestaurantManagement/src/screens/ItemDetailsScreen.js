import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../components/Button';

const ItemDetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://example.com/food.jpg' }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.description}>
          Gobi, Corn, Paneer, Dal Makhani, 3 Roti, Rice, Gurd, Salad, Papad & Dessert
        </Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
        <Button title="Add to Cart" onPress={() => navigation.navigate('Cart')} />
        <Button title="Close" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  image: { width: '100%', height: 200, borderRadius: 10 },
  details: { flex: 1, marginTop: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 16, color: '#ff6200' },
  description: { fontSize: 14, color: '#666', marginVertical: 10 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  quantityButton: { fontSize: 20, paddingHorizontal: 10 },
  quantity: { fontSize: 16, marginHorizontal: 10 },
});

export default ItemDetailsScreen;
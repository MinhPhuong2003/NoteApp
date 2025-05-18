import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const OrderItem = ({ name, price, quantity, image }) => {
  return (
    <View style={styles.item}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        {quantity && <Text style={styles.quantity}>Qty: {quantity}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: { flexDirection: 'row', padding: 10, backgroundColor: '#fff', marginVertical: 5, borderRadius: 5 },
  image: { width: 50, height: 50, borderRadius: 5 },
  details: { flex: 1, marginLeft: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 16, color: '#ff6200' },
  quantity: { fontSize: 14, color: '#666' },
});

export default OrderItem;
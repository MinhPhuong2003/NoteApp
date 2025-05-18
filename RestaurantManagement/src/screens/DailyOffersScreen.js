import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import Button from '../components/Button';

const offersData = [
  { id: '1', name: 'Honey Chili Potato', price: 10.00 },
  { id: '2', name: 'South Indian Thali - Veg', price: 32.00 },
  { id: '3', name: 'Cheese Naan with Gravy', price: 15.00 },
  { id: '4', name: 'Deluxe Thali - Non Veg', price: 44.00 },
  { id: '5', name: 'Butterscotch Ice Cream Shake', price: 8.00 },
];

const DailyOffersScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Offers</Text>
      <FlatList
        data={offersData}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: 'https://example.com/food.jpg' }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              <Button
                title="Add"
                onPress={() => navigation.navigate('ItemDetails', { item })}
                style={styles.addButton}
              />
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
  item: { flexDirection: 'row', padding: 10, backgroundColor: '#fff', marginVertical: 5, borderRadius: 5 },
  image: { width: 80, height: 80, borderRadius: 10 },
  details: { flex: 1, marginLeft: 10, justifyContent: 'center' },
  name: { fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 16, color: '#ff6200' },
  addButton: { width: 80, padding: 5 },
});

export default DailyOffersScreen;
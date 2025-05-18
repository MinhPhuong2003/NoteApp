import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../components/Button';

const itemsData = [
  { id: '1', name: 'Special Thali - Veg', description: 'Vegetable Masala, 3 Puri, Curry, Salad & Papad', price: 18.00, image: 'https://example.com/special-thali-veg.jpg' },
  { id: '2', name: 'Deluxe Thali - Veg', description: 'Shahi Paneer, Dal Makhani, 3 Puri, Rice, Curry, Salad, Papad & Dessert', price: 26.00, image: 'https://example.com/deluxe-thali-veg.jpg' },
  { id: '3', name: 'Special Thali - Non Veg', description: 'Butter Chicken, Dal Makhani, 3 Puri, Curry, Salad & Papad', price: 38.00, image: 'https://example.com/special-thali-nonveg.jpg' },
  { id: '4', name: 'Deluxe Thali - Non Veg', description: 'Butter Chicken, Dal Makhani, 2 Puri, Rice, Curry, Salad, Papad & Dessert', price: 48.00, image: 'https://example.com/deluxe-thali-nonveg.jpg' },
  { id: '5', name: 'South Indian Thali - Veg', description: '2 Vegetables, Rasam, Sambar, 4 Pooris, Rice, Aplam, Curd & Dessert', price: 32.00, image: 'https://example.com/south-indian-thali-veg.jpg' },
];

const ItemsListScreen = ({ navigation, route }) => {
  const { category } = route.params;
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAdd = (item) => {
    setQuantity(1);
    setSelectedItem(item);
  };

  useEffect(() => {
    if (selectedItem) setModalVisible(true);
  }, [selectedItem]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping-cart" size={25} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Content with paddingHorizontal */}
      <View style={styles.content}>
        <FlatList
          data={itemsData}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.priceButtonContainer}>
                  <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                  <Button title="Add" onPress={() => handleAdd(item)} style={styles.addButton} />
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* Modal */}
      <Modal transparent={true} visible={modalVisible} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          {selectedItem && (
            <View style={styles.modalContent}>
              <Image source={{ uri: selectedItem.image }} style={styles.modalImage} />
              <View style={styles.modalDetails}>
                <Text style={styles.modalName}>{selectedItem.name}</Text>
                <Text style={styles.modalPrice}>${selectedItem.price.toFixed(2)}</Text>
                <Text style={styles.modalDescription}>{selectedItem.description}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{quantity}</Text>
                  <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
                <Button title="Add to Cart" onPress={() => setModalVisible(false)} />
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          )}
        </View>
      </Modal>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },

  content: {
    paddingHorizontal: 15,
    flex: 1,
  },

  item: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 5,
  },
  image: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  details: { flex: 1, justifyContent: 'center' },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  description: { fontSize: 14, color: '#666', marginBottom: 5 },
  priceButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: { fontSize: 16, color: '#ff6200', fontWeight: 'bold' },
  addButton: {
    width: 80,
    padding: 8,
    backgroundColor: '#ff6200',
    borderRadius: 5,
    alignItems: 'center',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: { backgroundColor: '#fff', borderRadius: 10, padding: 10, width: '80%' },
  modalImage: { width: '100%', height: 200, borderRadius: 10 },
  modalDetails: { marginTop: 10 },
  modalName: { fontSize: 18, fontWeight: 'bold' },
  modalPrice: { fontSize: 16, color: '#ff6200' },
  modalDescription: { fontSize: 14, color: '#666', marginVertical: 10 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  quantityButton: { fontSize: 20, paddingHorizontal: 10 },
  quantity: { fontSize: 16, marginHorizontal: 10 },
});

export default ItemsListScreen;

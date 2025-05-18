import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // FontAwesome for icons
import Button from '../components/Button';

const OrderDetailsScreen = ({ navigation }) => {
  const [deliveryType, setDeliveryType] = useState('Delivery');
  const addresses = [
    {
      id: '1',
      name: 'Angel James',
      address:
        'E-215, App Innovation, Sector 74, Industrial Area Phase 8b, Mohali, Punjab, India, 160062',
    },
    {
      id: '2',
      name: 'John Doe',
      address:
        'E-215, App Innovation, Sector 74, Industrial Area Phase 8b, Mohali, Punjab, India, 160062',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ORDER DETAILS</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MenuList')}>
          <Icon name="home" size={25} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Content with horizontal padding */}
      <View style={styles.content}>
        <Text style={styles.subHeader}>Order Type</Text>
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={[styles.option, deliveryType === 'Delivery' && styles.selectedOption]}
            onPress={() => setDeliveryType('Delivery')}
          >
            <Text>Delivery (30 minutes)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, deliveryType === 'Pick up' && styles.selectedOption]}
            onPress={() => setDeliveryType('Pick up')}
          >
            <Text>Pick up (15 minutes)</Text>
          </TouchableOpacity>
        </View>

        {deliveryType === 'Delivery' && (
          <>
            <Text style={styles.subHeader}>Select Address</Text>
            {addresses.map((addr) => (
              <View key={addr.id} style={styles.address}>
                <Text>{addr.name}</Text>
                <Text>{addr.address}</Text>
              </View>
            ))}
            <Button title="Add New Address" onPress={() => navigation.navigate('AddAddress')} />
          </>
        )}

        <Button title="Continue" onPress={() => navigation.navigate('CardDetails')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ff6200',
    padding: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedOption: {
    borderColor: '#ff6200',
    backgroundColor: '#ffe6cc',
  },
  address: {
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default OrderDetailsScreen;

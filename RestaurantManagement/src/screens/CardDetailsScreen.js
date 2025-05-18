import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../components/Button';

const CardDetailsScreen = ({ navigation }) => {
  const [paymentMethod, setPaymentMethod] = useState('Pay Via Wallet');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Method</Text>

      <TouchableOpacity
        style={[styles.option, paymentMethod === 'Pay Via Wallet' && styles.selectedOption]}
        onPress={() => setPaymentMethod('Pay Via Wallet')}
      >
        <Icon name="money" size={20} color="#333" style={styles.icon} />
        <Text style={styles.optionText}>Pay Via Wallet</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, paymentMethod === 'Pay Via PayPal' && styles.selectedOption]}
        onPress={() => setPaymentMethod('Pay Via PayPal')}
      >
        <Icon name="paypal" size={20} color="#333" style={styles.icon} />
        <Text style={styles.optionText}>Pay Via PayPal</Text>
      </TouchableOpacity>

      {paymentMethod === 'Pay Via PayPal' && (
        <TextInput style={styles.input} placeholder="john.doe@gmail.com" />
      )}

      <TouchableOpacity
        style={[styles.option, paymentMethod === 'Visa Debit Card' && styles.selectedOption]}
        onPress={() => setPaymentMethod('Visa Debit Card')}
      >
        <Icon name="credit-card" size={20} color="#333" style={styles.icon} />
        <Text style={styles.optionText}>Visa Debit Card</Text>
      </TouchableOpacity>

      {paymentMethod === 'Visa Debit Card' && (
        <TextInput style={styles.input} placeholder="Card Number" />
      )}

      <TouchableOpacity
        style={[styles.option, paymentMethod === 'Cash on Delivery' && styles.selectedOption]}
        onPress={() => setPaymentMethod('Cash on Delivery')}
      >
        <Icon name="truck" size={20} color="#333" style={styles.icon} />
        <Text style={styles.optionText}>Cash on Delivery</Text>
      </TouchableOpacity>

      <Text style={styles.total}>Total: $84.00</Text>
      <Button title="Continue" onPress={() => navigation.navigate('OrderComplete')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginVertical: 10, textAlign: 'center' },
  option: { 
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 10, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 5, 
    marginVertical: 5 
  },
  selectedOption: { borderColor: '#ff6200', backgroundColor: '#ffe6cc' },
  icon: { marginRight: 10 },
  optionText: { fontSize: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5, borderRadius: 5 },
  total: { fontSize: 20, fontWeight: 'bold', textAlign: 'right', marginVertical: 10 },
});

export default CardDetailsScreen;

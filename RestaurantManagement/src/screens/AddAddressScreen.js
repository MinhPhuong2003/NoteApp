import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from '../components/Button';

const AddAddressScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="House/Flat No"
        value={houseNo}
        onChangeText={setHouseNo}
      />
      <TextInput
        style={styles.input}
        placeholder="Locality/Area"
        value={locality}
        onChangeText={setLocality}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={country}
        onChangeText={setCountry}
      />
      <Button title="Save Address" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginVertical: 10, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5, borderRadius: 5 },
});

export default AddAddressScreen;
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import Button from '../components/Button';

const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('Angel James');
  const [phone, setPhone] = useState('+1234 567 890');
  const [email, setEmail] = useState('john.doe@gmail.com');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>
      <Image source={{ uri: 'https://example.com/profile.jpg' }} style={styles.avatar} />
      <Text style={styles.uploadText}>Upload a Photo (Optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Email ID"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Save Details" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', alignItems: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  uploadText: { fontSize: 16, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5, borderRadius: 5, width: '80%' },
});

export default EditProfileScreen;
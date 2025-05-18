import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../components/Button';

const MyProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://example.com/profile.jpg' }} style={styles.avatar} />
      <Text style={styles.name}>Angel James</Text>
      <Text style={styles.info}>E-215, App Innovation, Sector 74, Industrial Area Phase 8b, Mohali, Punjab, India, 160062</Text>
      <Text style={styles.info}>+1234 567 890</Text>
      <Text style={styles.info}>john.doe@gmail.com</Text>
      <Button title="Change Password" onPress={() => navigation.navigate('ChangePassword')} />
      <Button title="Add New Address" onPress={() => navigation.navigate('AddAddress')} />
      <Button title="Logout" onPress={() => navigation.navigate('Landing')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', alignItems: 'center' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  info: { fontSize: 16, marginBottom: 10, textAlign: 'center' },
});

export default MyProfileScreen;
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({ route }) => {
  const { userEmail } = route.params || {};
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const snapshot = await firestore()
          .collection('USERS')
          .where('email', '==', userEmail)
          .get();

        if (!snapshot.empty) {
          setUser(snapshot.docs[0].data());
        } else {
          Alert.alert('Error', 'User not found');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        Alert.alert('Error', 'Failed to load user data');
      }
    };

    if (userEmail) {
      fetchUser();
    }
  }, [userEmail]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {user?.fullName || 'Guest'}!</Text>
      <Text>Email: {user?.email}</Text>
      <Text>Phone: {user?.phone}</Text>
      <Text>Address: {user?.address}</Text>
      <Text>Role: {user?.role}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', },
  text: { fontSize: 22, marginBottom: 10 },
});

export default HomeScreen;

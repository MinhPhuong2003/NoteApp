import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth().currentUser;

        if (!currentUser) {
          Alert.alert('Error', 'User not logged in');
          setLoading(false);
          return;
        }

        const userDoc = await firestore().collection('USERS').doc(currentUser.uid).get();

        if (userDoc.exists) {
          setUserData(userDoc.data());
        } else {
          Alert.alert('Error', 'User data not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>No user data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {userData.fullName || 'User'}!</Text>
      <Text style={styles.label}>Email: <Text style={styles.value}>{userData.email}</Text></Text>
      <Text style={styles.label}>Phone: <Text style={styles.value}>{userData.phone}</Text></Text>
      <Text style={styles.label}>Address: <Text style={styles.value}>{userData.address}</Text></Text>
      <Text style={styles.label}>Role: <Text style={styles.value}>{userData.role}</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10,
  },
  value: {
    fontWeight: '400',
    color: '#555',
  },
});

export default ProfileScreen;

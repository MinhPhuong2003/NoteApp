import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSelectAvatar = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });

    if (!result.didCancel && !result.errorCode && result.assets?.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      const currentUser = auth().currentUser;

      await firestore()
        .collection('USERS')
        .doc(currentUser.uid)
        .update({ photoURL: selectedImageUri });

      setUserData({ ...userData, photoURL: selectedImageUri });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6700" />
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
      <TouchableOpacity style={styles.avatarContainer} onPress={handleSelectAvatar}>
        <Image
          source={{ uri: userData.photoURL || 'https://via.placeholder.com/100' }}
          style={styles.avatar}
        />
        <Text style={styles.changePhotoText}>Tap to change photo</Text>
      </TouchableOpacity>

      {/* Name */}
      <View style={styles.infoRow}>
        <Icon name="person-outline" size={24} color="#FF6700" />
        <Text style={styles.infoText}>{userData.fullName || 'User'}</Text>
      </View>
      <View style={styles.separator} />

      {/* Address */}
      <View style={styles.infoRow}>
        <Icon name="location-outline" size={24} color="#FF6700" />
        <Text style={styles.infoText}>{userData.address || 'No address'}</Text>
      </View>
      <View style={styles.separator} />

      {/* Phone */}
      <View style={styles.infoRow}>
        <Icon name="call-outline" size={24} color="#FF6700" />
        <Text style={styles.infoText}>{userData.phone || 'No phone'}</Text>
      </View>
      <View style={styles.separator} />

      {/* Email */}
      <View style={styles.infoRow}>
        <Icon name="mail-outline" size={24} color="#FF6700" />
        <Text style={styles.infoText}>{userData.email}</Text>
      </View>
      <View style={styles.separator} />

      
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changePhotoText: {
    marginTop: 8,
    fontSize: 14,
    color: '#888',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    marginLeft: 15,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    width: '80%',
    marginBottom: 15,
  },
});

export default ProfileScreen;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const MenuScreen = ({ closeMenu }) => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        setUserData(null);
        return;
      }

      const snapshot = await firestore()
        .collection('USERS')
        .doc(currentUser.uid)
        .get();

      if (snapshot.exists) {
        setUserData(snapshot.data());
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          await auth().signOut();
          closeMenu();
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6700" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          source={{ uri: userData?.photoURL || 'https://via.placeholder.com/90' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{userData?.fullName || 'User'}</Text>
      </View>

      <TouchableOpacity
        style={styles.menuRow}
        onPress={() => {
          navigation.navigate('TodoList', { screen: 'TodoList' });
          closeMenu();
        }}
      >
        <Icon name="document-text-outline" size={22} color="#FF6700" />
        <Text style={styles.menuItem}>Notes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuRow}
        onPress={() => {
          navigation.navigate('TodoList', { screen: 'Profile' });
          closeMenu();
        }}
      >
        <Icon name="person-outline" size={22} color="#FF6700" />
        <Text style={styles.menuItem}>My Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuRow} onPress={handleLogout}>
        <Icon name="log-out-outline" size={22} color="#FF6700" />
        <Text style={styles.menuItem}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profile: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItem: {
    fontSize: 18,
    marginLeft: 15,
    color: '#333',
  },
});

import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../context/ThemeContext';

const FavoriteListScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  
  useEffect(() => {
    const currentUser = auth().currentUser;
    if (!currentUser) return;

    const unsubscribe = firestore()
      .collection('todos')
      .where('userId', '==', currentUser.uid)
      .where('isFavorite', '==', true)
      .onSnapshot(
        (querySnapshot) => {
          const favs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFavorites(favs);
          setLoading(false);
        },
        (error) => {
          console.error('Error fetching favorites:', error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.mode === 'dark' ? '#FFA07A' : '#FF4500'} />
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.emptyText, { color: theme.text }]}>Không có ghi chú yêu thích nào.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const handleRemoveFavorite = async () => {
      try {
        await firestore().collection('todos').doc(item.id).update({
          isFavorite: false,
        });
      } catch (error) {
        console.error('Lỗi khi gỡ yêu thích:', error);
        alert('Lỗi khi gỡ yêu thích, thử lại!');
      }
    };

    return (
      <View style={[styles.card, { backgroundColor: theme.mode === 'dark' ? '#222' : '#FFF', shadowColor: theme.mode === 'dark' ? '#FFA07A' : '#FF4500' }]}>
        <TouchableOpacity onPress={handleRemoveFavorite}>
          <Icon
            name="heart"
            size={28}
            color={theme.mode === 'dark' ? '#FFA07A' : '#FF4500'}
            style={styles.icon}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
          {item.description ? (
            <Text style={[styles.description, { color: theme.mode === 'dark' ? '#CCC' : '#666' }]} numberOfLines={2} ellipsizeMode="tail">{item.description}</Text>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Text style={{
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.mode === 'dark' ? '#FFA07A' : '#FF4500',
        paddingHorizontal: 16,
        paddingVertical: 12,
        textAlign: 'center',
      }}>
        DANH MỤC YÊU THÍCH
      </Text>
      <FlatList
        contentContainerStyle={[styles.listContainer, { backgroundColor: theme.background }]}
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, fontStyle: 'italic' },
  listContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default FavoriteListScreen;

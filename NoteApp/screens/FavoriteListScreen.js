import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';

const FavoriteListScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (!currentUser) return;

    const unsubscribe = firestore()
      .collection('todos')
      .where('userId', '==', currentUser.uid)
      .where('isFavorite', '==', true)
      .onSnapshot(
        (querySnapshot) => {
          console.log('Snapshot docs:', querySnapshot.docs.length);
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF4500" />
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Không có ghi chú yêu thích nào.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const handleRemoveFavorite = async () => {
      try {
        console.log('Đang gỡ yêu thích:', item.id);
        await firestore().collection('todos').doc(item.id).update({
          isFavorite: false,
        });
        console.log('Đã gỡ yêu thích thành công');
      } catch (error) {
        console.error('Lỗi khi gỡ yêu thích:', error);
        alert('Lỗi khi gỡ yêu thích, thử lại!');
      }
    };

    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={handleRemoveFavorite}>
          <Icon
            name="heart"
            size={28}
            color="#FF4500"
            style={styles.icon}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
          {item.description ? (
            <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">{item.description}</Text>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF8F0' }}>
      <Text style={{
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FF4500',
        paddingHorizontal: 16,
        paddingVertical: 12,
        textAlign: 'center',
      }}>
        DANH MỤC YÊU THÍCH
      </Text>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF8F0' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF8F0' },
  emptyText: { fontSize: 18, color: '#999', fontStyle: 'italic' },
  listContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFF8F0',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#FF4500',
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
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default FavoriteListScreen;

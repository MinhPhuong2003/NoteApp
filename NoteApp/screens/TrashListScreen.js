import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from '../context/ThemeContext';

const TrashListScreen = () => {
  const [trashTodos, setTrashTodos] = useState([]);
  const user = auth().currentUser;
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = firestore()
      .collection('todos')
      .where('userId', '==', user.uid)
      .where('isDeleted', '==', true)
      .onSnapshot(
        (querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
          });
          setTrashTodos(data);
        },
        (error) => {
          console.error('❌ Lỗi khi lấy danh sách Trash:', error.message);
          Alert.alert('Lỗi', 'Không thể tải thùng rác.');
        }
      );

    return () => unsubscribe();
  }, [user?.uid]);

  const restoreTodo = async (id) => {
    try {
      await firestore().collection('todos').doc(id).update({
        isDeleted: false,
      });
    } catch (error) {
      console.error('❌ Lỗi khi khôi phục ghi chú:', error);
      Alert.alert('Lỗi', 'Không thể khôi phục ghi chú.');
    }
  };

  const permanentlyDeleteTodo = async (id) => {
    try {
      await firestore().collection('todos').doc(id).delete();
    } catch (error) {
      console.error('❌ Lỗi khi xóa vĩnh viễn:', error);
      Alert.alert('Lỗi', 'Không thể xóa ghi chú vĩnh viễn.');
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.itemContainer,
        { borderColor: theme.mode === 'dark' ? '#fff' : '#000' },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
        <Text style={[styles.description, { color: theme.text }]}>
          {item.description || 'Không có mô tả'}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => restoreTodo(item.id)} style={styles.iconButton}>
          <Icon name="undo" size={20} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Xác nhận', 'Xóa vĩnh viễn ghi chú này?', [
              { text: 'Hủy', style: 'cancel' },
              {
                text: 'Xóa',
                style: 'destructive',
                onPress: () => permanentlyDeleteTodo(item.id),
              },
            ])
          }
          style={styles.iconButton}
        >
          <Icon name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>🗑️ Ghi chú đã xóa</Text>
      <Text style={[styles.countText, { color: theme.text }]}>
        ({trashTodos.length} ghi chú)
      </Text>
      <View style={styles.listWrapper}>
        <FlatList
          data={trashTodos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: theme.text }]}>
              Không có ghi chú nào trong thùng rác.
            </Text>
          }
        />
      </View>
    </View>
  );
};

export default TrashListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 6,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  iconButton: {
    marginHorizontal: 8,
  },
  countText: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
  },
  listWrapper: {
    flex: 1,
  },
});

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

const TodoListScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const user = auth().currentUser;

  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = firestore()
      .collection('todos')
      .where('userId', '==', user.uid)
      .onSnapshot(
        (querySnapshot) => {
          const data = [];
          querySnapshot?.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
          });
          setTodos(data);
        },
        (error) => {
          console.error("❌ Lỗi Firestore khi lấy danh sách todo:", error.message);
          Alert.alert("Lỗi", "Không thể tải danh sách todo.");
          setTodos([]);
        }
      );

    return () => unsubscribe();
  }, [user?.uid]);

  const viewTodoDetail = (todo) => {
    if (!user) {
      Alert.alert("Lỗi", "Vui lòng đăng nhập để xem chi tiết.");
      return;
    }
    navigation.navigate('TodoDetail', { todo });
  };

  const deleteTodo = async (id) => {
    if (!user) {
      Alert.alert("Lỗi", "Vui lòng đăng nhập để xóa todo.");
      return;
    }

    try {
      await firestore().collection('todos').doc(id).delete();
    } catch (error) {
      console.error("Lỗi khi xóa todo: ", error);
      Alert.alert("Lỗi", "Không thể xóa todo. Vui lòng thử lại.");
    }
  };

  const editTodo = (todo) => {
    if (!user) {
      Alert.alert("Lỗi", "Vui lòng đăng nhập để chỉnh sửa todo.");
      return;
    }
    navigation.navigate('EditTodo', { todo });
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        padding: 10,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}
    >
      <TouchableOpacity onPress={() => viewTodoDetail(item)} style={{ flex: 1 }}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
          <Text style={{ color: '#666' }}>{item.description || 'Không có mô tả'}</Text>
        </View>
      </TouchableOpacity>

      <View style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity onPress={() => editTodo(item)} style={{ marginBottom: 5 }}>
          <Icon name="edit" size={20} color="orange" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              'Xác nhận xoá',
              `Bạn có chắc muốn xoá "${item.title}"?`,
              [
                { text: 'Huỷ', style: 'cancel' },
                {
                  text: 'Xoá',
                  onPress: () => deleteTodo(item.id),
                  style: 'destructive',
                },
              ]
            )
          }
        >
          <Icon name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
  <View style={{ flex: 1, padding: 16 }}>
    <View>
      {/* <Text style={{ fontSize: 20, marginBottom: 5, textAlign: 'center' }}>
      Xin chào, {user?.displayName || user?.email || 'Khách'} 👋
    </Text> */}

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 5, textAlign: 'center' }}>
        DANH SÁCH GHI CHÚ
      </Text>
    </View>

    <FlatList
      data={todos}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListEmptyComponent={<Text style={{ textAlign: 'center' }}>Không có todo nào</Text>}
    />

    <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#007AFF',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
      }}
      onPress={() => navigation.navigate('AddTodoScreen')}
    >
      <Icon name="file-text" size={30} color="#fff" />
    </TouchableOpacity>
  </View>
);

};

export default TodoListScreen;

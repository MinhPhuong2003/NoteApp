import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const date = timestamp.toDate();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

const TodoListScreen = ({ navigation }) => {
  const [todos, setTodos] = React.useState([]);
  const user = auth().currentUser;

  React.useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = firestore()
      .collection('todos')
      .where('userId', '==', user.uid)
      .where('isDeleted', '==', false)
      .onSnapshot(
        (querySnapshot) => {
          const data = [];
          querySnapshot?.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
          });
          setTodos(data);
        },
        (error) => {
          console.error("❌ Lỗi Firestore khi lấy danh sách ghi chu:", error.message);
          Alert.alert("Lỗi", "Không thể tải danh sách ghi chu.");
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

  const editTodo = (todo) => {
    if (!user) {
      Alert.alert("Lỗi", "Vui lòng đăng nhập để chỉnh sửa ghi chu.");
      return;
    }
    navigation.navigate('EditTodo', { todo });
  };

  const deleteTodo = async (id) => {
    if (!user) {
      Alert.alert("Lỗi", "Vui lòng đăng nhập để xóa ghi chu.");
      return;
    }

    try {
      await firestore().collection('todos').doc(id).update({
        isDeleted: true,
      });
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật isDeleted:", error);
      Alert.alert("Lỗi", "Không thể chuyển ghi chú vào thùng rác.");
    }
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
          <Text style={{ color: '#999', fontSize: 12, marginTop: 4 }}>
            Đã thêm lúc: {formatDate(item.createdAt)}
          </Text>
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
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 5, textAlign: 'center' }}>
          DANH SÁCH GHI CHÚ
        </Text>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center' }}>Không có ghi chú nào</Text>}
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

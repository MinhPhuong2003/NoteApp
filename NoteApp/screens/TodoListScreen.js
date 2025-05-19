import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
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
  const [searchText, setSearchText] = React.useState('');
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

          data.sort((a, b) => {
            if (a.isFavorite === b.isFavorite) return 0;
            return a.isFavorite ? -1 : 1;
          });

          setTodos(data);
        },
        (error) => {
          console.error("❌ Lỗi Firestore:", error.message);
          Alert.alert("Lỗi", "Không thể tải danh sách ghi chú.");
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
      Alert.alert("Lỗi", "Vui lòng đăng nhập để chỉnh sửa ghi chú.");
      return;
    }
    navigation.navigate('EditTodo', { todo });
  };

  const deleteTodo = async (id) => {
    if (!user) {
      Alert.alert("Lỗi", "Vui lòng đăng nhập để xoá ghi chú.");
      return;
    }

    try {
      await firestore().collection('todos').doc(id).update({
        isDeleted: true,
      });
    } catch (error) {
      console.error("❌ Lỗi xoá:", error);
      Alert.alert("Lỗi", "Không thể xoá ghi chú.");
    }
  };

  const toggleFavorite = async (item) => {
    if (!user) {
      Alert.alert("Lỗi", "Vui lòng đăng nhập để thao tác.");
      return;
    }
    try {
      await firestore().collection('todos').doc(item.id).update({
        isFavorite: !item.isFavorite,
      });
    } catch (error) {
      console.error("❌ Lỗi cập nhật yêu thích:", error);
      Alert.alert("Lỗi", "Không thể cập nhật trạng thái yêu thích.");
    }
  };

  const filteredTodos = todos.filter(todo =>
    todo.title?.toLowerCase().includes(searchText.toLowerCase()) ||
    todo.description?.toLowerCase().includes(searchText.toLowerCase())
  );

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
          style={{ marginBottom: 5 }}
        >
          <Icon name="trash" size={20} color="red" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          <Icon
            name={item.isFavorite ? 'heart' : 'heart-o'}
            size={20}
            color={item.isFavorite ? 'red' : '#888'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ marginBottom: 10 }}>
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'left',
          marginBottom: 4
        }}>
          Xin chào, {user?.displayName || 'Người dùng'}!
        </Text>

        <Text style={{
          fontSize: 30,
          color: '#555',
          textAlign: 'left',
          marginBottom: 8,
        }}>
          Bạn có ghi chú gì để ghi không?📝 
        </Text>

        <View style={{
          backgroundColor: '#fff',
          borderRadius: 24,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 8,
          marginBottom: 12,
          elevation: 3,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}>
          <Icon name="search" size={18} color="#999" style={{ marginRight: 10 }} />
          <TextInput
            placeholder="Tìm kiếm ghi chú..."
            value={searchText}
            onChangeText={setSearchText}
            style={{ flex: 1, fontSize: 14 }}
            placeholderTextColor="#aaa"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Icon name="times-circle" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
          TẤT CẢ GHI CHÚ
        </Text>
        <Text style={{ fontSize: 14, color: '#666', textAlign: 'center', marginTop: 4 }}>
          ({filteredTodos.length} ghi chú)
        </Text>
      </View>

      <FlatList
        data={filteredTodos}
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

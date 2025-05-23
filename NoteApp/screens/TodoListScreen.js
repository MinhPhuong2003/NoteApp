import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from '../context/ThemeContext';

const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const date = timestamp.toDate();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
};

const TodoListScreen = ({ navigation}) => {
  const [todos, setTodos] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('all');
  const [userData, setUserData] = React.useState(null);
  const [allTodos, setAllTodos] = React.useState([]);
  const favoriteTodos = allTodos.filter(todo => todo.isFavorite);
  const filteredAllTodos = allTodos.filter(todo => todo.title.includes(searchText));
  const filteredFavoriteTodos = favoriteTodos.filter(todo => todo.title.includes(searchText));
  const user = auth().currentUser;

  const { theme } = useContext(ThemeContext);

  React.useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = firestore()
      .collection('USERS')
      .doc(user.uid)
      .onSnapshot(doc => {
        if (doc.exists) {
          setUserData(doc.data());
        }
      }, error => {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      });

    return () => unsubscribe();
  }, [user?.uid]);

  React.useEffect(() => {
    if (!user?.uid) return;
    let query = firestore()
      .collection('todos')
      .where('userId', '==', user.uid)
      .where('isDeleted', '==', false);
    const unsubscribe = query.onSnapshot(
      (querySnapshot) => {
        const data = [];
        querySnapshot?.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        let filteredData = data;
        if (activeTab === 'favorites') {
          filteredData = data.filter((todo) => todo.isFavorite);
        }
        filteredData.sort((a, b) => {
          if (a.isFavorite === b.isFavorite) return 0;
          return a.isFavorite ? -1 : 1;
        });
        setAllTodos(data);
        setTodos(filteredData);
      },
      (error) => {
        console.error("❌ Lỗi Firestore:", error.message);
        Alert.alert("Lỗi", "Không thể tải danh sách ghi chú.");
        setTodos([]);
      }
    );

    return () => unsubscribe();
  }, [user?.uid, activeTab]);

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

  const filteredTodos = todos.filter(
    (todo) =>
      todo.title?.toLowerCase().includes(searchText.toLowerCase()) ||
      todo.description?.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => viewTodoDetail(item)}
      style={[styles.noteCard, { backgroundColor: theme.background, borderWidth: 1, borderColor: theme.text}]}
    >
      <View style={styles.noteHeader}>
        <Text style={[styles.noteTitle, { color: theme.text }]}>{item.title}</Text>
        <Text style={[styles.noteTimestamp, { color: theme.text }]}>{formatDate(item.createdAt)}</Text>
      </View>
      <Text style={[styles.noteDescription, { color: theme.text }]} numberOfLines={2}>
        {item.description || 'Không có mô tả'}
      </Text>
      <View style={styles.noteFooter}>
        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          <Icon
            name={item.isFavorite ? 'heart' : 'heart-o'}
            size={20}
            color={item.isFavorite ? '#FF4500' : theme.text}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => editTodo(item)}>
          <Icon name="edit" size={20} color="#FF6700" />
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
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.headerContainer, { backgroundColor: theme.background, borderWidth: 1, borderColor: theme.text}]}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            {userData?.photoURL ? (
              <Image
                source={{ uri: userData.photoURL }}
                style={[styles.avatar]}
              />
            ) : (
              <Icon
                name="user-circle"
                size={40}
                color={theme.text}
                style={{ marginRight: 10 }}
              />
            )}
            <View style={{ flexShrink: 1 }}>
              <Text style={[styles.greeting, { color: theme.text }]}>Xin chào,</Text>
              <Text style={[styles.userName, { color: theme.text }]}>
                {user?.displayName || 'Laura'}!
              </Text>
            </View>
          </View>
        </View>
        
        <Text style={[styles.notePrompt, { color: theme.text }]}>
          Hôm nay, bạn có chủ đề gì để ghi chú không?
        </Text>

        <View style={[styles.searchContainer, { backgroundColor: theme.background, borderWidth: 1, borderColor: theme.text }]}>
          <Icon name="search" size={18} color={theme.text} style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Tìm kiếm ghi chú..."
            value={searchText}
            onChangeText={setSearchText}
            style={[styles.searchInput, { color: theme.text }]}
            placeholderTextColor={theme.text}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Icon name="times-circle" size={18} color={theme.text} />
            </TouchableOpacity>
          )}
        </View>
      </View>
            
      <View style={[styles.tabsWrapper, { backgroundColor: theme.background, borderWidth: 1, borderColor: theme.text }]}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText, { color: theme.text }]}>
            TẤT CẢ{' '}
            <Text style={[styles.countText, { color: theme.text + '80' }]}>
              ({filteredAllTodos.length})
            </Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'favorites' && styles.activeTab]}
          onPress={() => setActiveTab('favorites')}
        >
          <Text style={[styles.tabText, activeTab === 'favorites' && styles.activeTabText, { color: theme.text }]}>
            YÊU THÍCH{' '}
            <Text style={[styles.countText, { color: theme.text + '80' }]}>
              ({filteredFavoriteTodos.length})
            </Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'Categories' && styles.activeTab]}
          onPress={() => setActiveTab('Categories')}
        >
          <Text style={[styles.tabText, activeTab === 'Categories' && styles.activeTabText, { color: theme.text }]}>
            DANH MỤC{' '}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center', color: theme.text }}>Không có ghi chú nào</Text>}
        contentContainerStyle={{ padding: 16 }}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTodoScreen')}
      >
        <Icon name="file-text" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 24,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  greeting: {
    fontSize: 16,
  },
  userName: {
    fontSize: 20,
  },
  searchContainer: {
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#A3DFFA',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#000',
  },
  noteCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  noteTimestamp: {
    fontSize: 12,
  },
  noteDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 16,
  },
  addButton: {
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
  },
  tabsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 24,
    paddingVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  notePrompt: {
    fontSize: 20,
    marginVertical: 6,
    textAlign: 'left',
    fontWeight: '500',
  },
  countText: {
    fontSize: 14,
  },
});

export default TodoListScreen;
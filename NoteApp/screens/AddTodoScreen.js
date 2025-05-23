import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { ThemeContext } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

const AddTodoScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const user = auth().currentUser;
  const { theme } = useContext(ThemeContext);

  const addTodo = async () => {
    if (!title.trim()) {
      Alert.alert('⚠️ Lỗi', 'Vui lòng nhập tiêu đề');
      return;
    }

    try {
      await firestore().collection('todos').add({
        title,
        description,
        userId: user.uid,
        isDeleted: false,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('✅ Thành công', 'Đã thêm mới ghi chú thành công!');
      navigation.goBack();
    } catch (error) {
      console.error('Lỗi:', error);
      Alert.alert('❌ Lỗi', 'Không thể thêm ghi chú');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: theme.background }}>
      <View style={styles.headerContainer}>
        <Icon name="create-outline" size={22} color={theme.text} style={{ marginRight: 8 }} />
        <Text style={[styles.headerText, { color: theme.text }]}>THÊM MỚI GHI CHÚ</Text>
      </View>
      <View style={{ marginBottom: 16 }}>
        <View style={styles.labelContainer}>
          <Icon name="pencil-outline" size={18} color={theme.text} style={{ marginRight: 6 }} />
          <Text style={[styles.labelText, { color: theme.text }]}>Tiêu đề:</Text>
        </View>
        <TextInput
          placeholder="Nhập tiêu đề ghi chú..."
          placeholderTextColor={theme.text}
          value={title}
          onChangeText={setTitle}
          style={{
            borderWidth: 1,
            borderColor: theme.text,
            borderRadius: 6,
            padding: 10,
            color: theme.text,
            backgroundColor: theme.inputBackground,
          }}
        />
      </View>
      <View style={{ marginBottom: 16 }}>
        <View style={styles.labelContainer}>
          <Icon name="information-circle-outline" size={18} color={theme.text} style={{ marginRight: 6 }} />
          <Text style={[styles.labelText, { color: theme.text }]}>Mô tả:</Text>
        </View>
        <TextInput
          placeholder="Nhập mô tả..."
          placeholderTextColor={theme.text}
          value={description}
          onChangeText={setDescription}
          multiline
          style={{
            borderWidth: 1,
            borderColor: theme.text,
            borderRadius: 6,
            padding: 10,
            minHeight: 60,
            textAlignVertical: 'top',
            color: theme.text,
            backgroundColor: theme.inputBackground,
          }}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={addTodo}
          style={[
            styles.addButton,
            {
              backgroundColor: '#007BFF',
              shadowColor: theme.text,
            },
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="add-circle-outline" size={20} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.addButtonText}>THÊM MỚI</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    flex: 1,
    marginHorizontal: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default AddTodoScreen;

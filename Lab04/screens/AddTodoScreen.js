import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const AddTodoScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const user = auth().currentUser;

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
      });
      Alert.alert('✅ Thành công', 'Đã thêm mới todo thành công!');
      navigation.goBack();
    } catch (error) {
      console.error('Lỗi:', error);
      Alert.alert('❌ Lỗi', 'Không thể thêm todo');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10, textAlign: 'center' }}>
        📝 THÊM MỚI TODO
      </Text>

      {/* Nhóm nhập tiêu đề */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 6 }}>🖊️ Tiêu đề:</Text>
        <TextInput
          placeholder="Nhập tiêu đề Todo..."
          value={title}
          onChangeText={setTitle}
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 6,
            padding: 10,
          }}
        />
      </View>

      {/* Nhóm nhập mô tả */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 6 }}>📌 Mô tả:</Text>
        <TextInput
          placeholder="Nhập mô tả..."
          value={description}
          onChangeText={setDescription}
          multiline
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 6,
            padding: 10,
            minHeight: 60,
            textAlignVertical: 'top',
          }}
        />
      </View>

      {/* Nút THÊM MỚI và QUAY LẠI cùng 1 dòng */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={addTodo}
          style={{
            backgroundColor: 'blue',
            padding: 12,
            borderRadius: 6,
            flex: 1,
            alignItems: 'center',
            marginRight: 10,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>➕ THÊM MỚI</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: 'gray',
            padding: 12,
            borderRadius: 6,
            flex: 1,
            alignItems: 'center',
            marginLeft: 10,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>↩️ QUAY LẠI</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTodoScreen;

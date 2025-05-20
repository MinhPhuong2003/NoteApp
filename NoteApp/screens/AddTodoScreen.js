import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { ThemeContext } from '../context/ThemeContext';
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
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginVertical: 10,
          textAlign: 'center',
          color: theme.text,
        }}
      >
        📝 THÊM MỚI GHI CHÚ
      </Text>

      <View style={{ marginBottom: 16 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 6,
            color: theme.text,
          }}
        >
          🖊️ Tiêu đề:
        </Text>
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
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 6,
            color: theme.text,
          }}
        >
          📌 Mô tả:
        </Text>
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
          style={{
            backgroundColor: theme.buttonBackground,
            padding: 12,
            borderRadius: 6,
            flex: 1,
            alignItems: 'center',
            marginRight: 10,
          }}
        >
          <Text style={{ color: theme.text, fontSize: 16 }}>➕ THÊM MỚI</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: theme.buttonSecondaryBackground,
            padding: 12,
            borderRadius: 6,
            flex: 1,
            alignItems: 'center',
            marginLeft: 10,
          }}
        >
          <Text style={{ color: theme.text, fontSize: 16 }}>↩️ QUAY LẠI</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTodoScreen;

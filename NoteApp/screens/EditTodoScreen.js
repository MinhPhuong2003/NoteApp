import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';

const EditTodoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { todo } = route.params;

  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');

  const { theme } = useContext(ThemeContext);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('⚠️ Lỗi', 'Vui lòng nhập tiêu đề ghi chú.');
      return;
    }

    try {
      await firestore().collection('todos').doc(todo.id).update({
        title,
        description,
      });
      Alert.alert('✅ Thành công', 'Ghi chú đã được cập nhật.');
      navigation.goBack();
    } catch (error) {
      console.error('Lỗi khi cập nhật ghi chú:', error);
      Alert.alert('❌ Lỗi', 'Không thể cập nhật ghi chú. Vui lòng thử lại.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: theme.background }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          marginBottom: 20,
          textAlign: 'center',
          color: theme.text,
        }}
      >
        ✏️ CHỈNH SỬA TODO
      </Text>

      <View style={{ marginBottom: 16 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
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
            borderRadius: 8,
            padding: 10,
            fontSize: 16,
            color: theme.text,
            backgroundColor: theme.inputBackground,
          }}
        />
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
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
          onPress={handleSave}
          style={{
            backgroundColor: theme.buttonBackground,
            padding: 12,
            borderRadius: 8,
            flex: 1,
            alignItems: 'center',
            marginRight: 10,
          }}
        >
          <Text style={{ color: theme.text, fontSize: 16, fontWeight: '600' }}>💾 Lưu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: theme.buttonSecondaryBackground,
            padding: 12,
            borderRadius: 8,
            flex: 1,
            alignItems: 'center',
            marginLeft: 10,
          }}
        >
          <Text style={{ color: theme.text, fontSize: 16, fontWeight: '600' }}>↩️ Quay lại</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditTodoScreen;

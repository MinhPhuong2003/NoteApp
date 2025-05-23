import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

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
      {/* Tiêu đề màn hình */}
      <View style={styles.headerContainer}>
        <Icon name="create-outline" size={22} color={theme.text} style={{ marginRight: 8 }} />
        <Text style={[styles.headerText, { color: theme.text }]}>SỬA GHI CHÚ</Text>
      </View>

      {/* Tiêu đề ghi chú */}
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
            borderRadius: 8,
            padding: 10,
            fontSize: 16,
            color: theme.text,
            backgroundColor: theme.inputBackground,
          }}
        />
      </View>

      {/* Mô tả ghi chú */}
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

      {/* Nút lưu */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={handleSave}
          style={[
            styles.saveButtonSmall,
            { backgroundColor: theme.buttonBackground || '#FF6700', shadowColor: theme.text },
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="save-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.saveButtonTextSmall}>Lưu</Text>
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonSmall: {
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
  saveButtonTextSmall: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default EditTodoScreen;

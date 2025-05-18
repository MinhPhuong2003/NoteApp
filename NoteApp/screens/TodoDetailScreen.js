// TodoDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TodoDetailScreen = ({ route }) => {
  const { todo } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 THÔNG TIN CHI TIẾT</Text>

      <Text style={styles.label}>🖊️ Tiêu đề:</Text>
      <Text style={styles.content}>{todo.title}</Text>

      <Text style={styles.label}>📌 Mô tả:</Text>
      <Text style={styles.content}>{todo.description || 'Không có mô tả'}</Text>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>↩️ Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  content: {
    fontSize: 16,
    marginTop: 5,
    color: '#666',
  },
  backButton: {
    marginTop: 30,
    backgroundColor: '#888',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TodoDetailScreen;

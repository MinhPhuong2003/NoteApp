import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';

const TodoDetailScreen = ({ route }) => {
  const { todo } = route.params;
  const navigation = useNavigation();

  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>📝 THÔNG TIN CHI TIẾT</Text>

      <Text style={[styles.label, { color: theme.text }]}>🖊️ Tiêu đề:</Text>
      <Text style={[styles.content, { color: theme.text }]}>{todo.title}</Text>

      <Text style={[styles.label, { color: theme.text }]}>📌 Mô tả:</Text>
      <Text style={[styles.content, { color: theme.text }]}>
        {todo.description || 'Không có mô tả'}
      </Text>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.backButton, { backgroundColor: theme.buttonBackground }]}
      >
        <Text style={[styles.backText, { color: theme.text }]}>↩️ Quay lại</Text>
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
  },
  backButton: {
    marginTop: 30,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TodoDetailScreen;

import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

const TodoDetailScreen = ({ route }) => {
  const { todo } = route.params;
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.titleRow}>
        <Icon name="document-text-outline" size={22} color={theme.text} style={{ marginRight: 8 }} />
        <Text style={[styles.title, { color: theme.text }]}>THÔNG TIN CHI TIẾT</Text>
      </View>
      <View style={styles.row}>
        <Icon name="create-outline" size={20} color="#FF6700" />
        <Text style={[styles.label, { color: theme.text }]}>Tiêu đề:</Text>
      </View>
      <Text style={[styles.content, { color: theme.text }]}>{todo.title}</Text>

      <View style={styles.row}>
        <Icon name="information-circle-outline" size={20} color="#FF6700" />
        <Text style={[styles.label, { color: theme.text }]}>Mô tả:</Text>
      </View>
      <Text style={[styles.content, { color: theme.text }]}>
        {todo.description || 'Không có mô tả'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
  fontSize: 22,
  fontWeight: 'bold',
},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  content: {
    fontSize: 16,
    marginTop: 5,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});

export default TodoDetailScreen;

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { backgroundColor: '#ff6200', padding: 10, borderRadius: 5, margin: 5 },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
});

export default Button;
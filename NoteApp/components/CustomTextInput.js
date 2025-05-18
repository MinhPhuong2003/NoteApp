import React from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomTextInput = ({ value, onChangeText, placeholder, secureTextEntry, togglePassword, showPassword }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
      {togglePassword && (
        <TouchableOpacity onPress={togglePassword} style={styles.icon}>
          <Icon name={showPassword ? 'visibility' : 'visibility-off'} size={24} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  icon: {
    padding: 10,
  },
});

export default CustomTextInput;
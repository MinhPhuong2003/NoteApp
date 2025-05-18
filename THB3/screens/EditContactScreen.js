import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Alert } from 'react-native';

const EditContact = ({ navigation, route }) => {
  const { contact, onEditContact } = route.params;

  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);

  const handleSave = () => {
    const updatedContact = { ...contact, name, phone };
    onEditContact(updatedContact);
  
    Alert.alert(
      "Cập nhật thành công",
      "Thông tin liên hệ đã được cập nhật.",
      [
        { text: "OK", onPress: () => navigation.goBack() }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Tên liên hệ"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Số điện thoại"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <Button title="Cập nhật" onPress={handleSave} />
    </View>
  );
};

export default EditContact;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
});

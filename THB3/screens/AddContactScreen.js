import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const AddContact = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSave = () => {
    const newContact = {
      id: Date.now().toString(),
      name,
      phone,
    };

    if (route.params?.onAddContact) {
      route.params.onAddContact(newContact);
    }

    // Hiển thị thông báo thành công
    Alert.alert("Thêm liên hệ thành công!", "Liên hệ mới đã được thêm vào danh bạ.", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
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
      <Button title="Lưu" onPress={handleSave} />
    </View>
  );
};

export default AddContact;

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

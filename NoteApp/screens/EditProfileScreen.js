import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../context/ThemeContext';

const EditProfileScreen = ({ route, navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { userData } = route.params;
  const [fullName, setFullName] = useState(userData.fullName || '');
  const [address, setAddress] = useState(userData.address || '');
  const [phone, setPhone] = useState(userData.phone || '');
  const [photoURL, setPhotoURL] = useState(userData.photoURL || '');
  const handleSelectImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (!result.didCancel && !result.errorCode && result.assets?.length > 0) {
      setPhotoURL(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    try {
      const uid = auth().currentUser.uid;
      await firestore().collection('USERS').doc(uid).update({
        fullName,
        address,
        phone,
        photoURL,
      });
      Alert.alert('✅ Thành công', 'Đã cập nhật thông tin người dùng!');
      navigation.goBack();
    } catch (error) {
      console.error('Update failed:', error);
      Alert.alert('❌ Lỗi', 'Không thể cập nhật thông tin');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity onPress={handleSelectImage} style={styles.avatarContainer}>
        <Image
          source={{ uri: photoURL || 'https://via.placeholder.com/100' }}
          style={styles.avatar}
        />
        <Text style={{ color: theme.text }}>📷 Nhấn để chọn ảnh</Text>
      </TouchableOpacity>

      <View style={styles.inputGroup}>
        <View style={styles.labelRow}>
          <Icon name="person-outline" size={18} color={theme.text} />
          <Text style={[styles.label, { color: theme.text }]}> Tên</Text>
        </View>
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          style={[styles.input, {
            color: theme.text,
            borderColor: theme.text,
            backgroundColor: theme.inputBackground,
          }]}
        />
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.labelRow}>
          <Icon name="location-outline" size={18} color={theme.text} />
          <Text style={[styles.label, { color: theme.text }]}> Địa chỉ</Text>
        </View>
        <TextInput
          value={address}
          onChangeText={setAddress}
          style={[styles.input, {
            color: theme.text,
            borderColor: theme.text,
            backgroundColor: theme.inputBackground,
          }]}
        />
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.labelRow}>
          <Icon name="call-outline" size={18} color={theme.text} />
          <Text style={[styles.label, { color: theme.text }]}> Số điện thoại</Text>
        </View>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={[styles.input, {
            color: theme.text,
            borderColor: theme.text,
            backgroundColor: theme.inputBackground,
          }]}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.saveButton,
          {
            backgroundColor: theme.buttonBackground || '#FF6700',
            shadowColor: theme.text,
          },
        ]}
        onPress={handleSave}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="save-outline" size={20} color="white" style={{ marginRight: 8 }} />
          <Text style={styles.saveButtonText}>Lưu Thông Tin</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  inputGroup: {
    marginBottom: 18,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  saveButton: {
    marginTop: 30,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditProfileScreen;

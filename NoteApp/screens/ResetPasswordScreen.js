import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../components/CustomTextInput';
import { ThemeContext } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Vui lòng nhập mật khẩu hiện tại'),
  newPassword: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu mới'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu xác nhận không khớp')
    .required('Vui lòng xác nhận mật khẩu mới'),
});

const ResetPasswordScreen = ({ navigation }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { theme } = useContext(ThemeContext);

  const toggleCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
  const toggleNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const reauthenticate = async (currentPassword) => {
    const user = auth().currentUser;
    const cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  };

  const handleChangePassword = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      await reauthenticate(values.currentPassword);
      await auth().currentUser.updatePassword(values.newPassword);
      Alert.alert('Thành công ✅', 'Mật khẩu đã được cập nhật!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error('Lỗi cập nhật mật khẩu:', error);
      Alert.alert('Lỗi ❌', error.message);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[styles.title, { color: theme.text }]}>Đổi Mật Khẩu 🔐</Text>

      <Formik
        initialValues={{ currentPassword: '', newPassword: '', confirmNewPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleChangePassword}
      >
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isSubmitting }) => (
          <>
            <Text style={[styles.label, { color: theme.text }]}>Mật khẩu hiện tại:</Text>
            <CustomTextInput
              value={values.currentPassword}
              onChangeText={handleChange('currentPassword')}
              onBlur={handleBlur('currentPassword')}
              placeholder="Nhập mật khẩu hiện tại"
              secureTextEntry={!showCurrentPassword}
              togglePassword={toggleCurrentPassword}
              showPassword={showCurrentPassword}
            />
            {touched.currentPassword && errors.currentPassword && (
              <Text style={styles.errorText}>{errors.currentPassword}</Text>
            )}

            <Text style={[styles.label, { color: theme.text }]}>Mật khẩu mới:</Text>
            <CustomTextInput
              value={values.newPassword}
              onChangeText={handleChange('newPassword')}
              onBlur={handleBlur('newPassword')}
              placeholder="Nhập mật khẩu mới"
              secureTextEntry={!showNewPassword}
              togglePassword={toggleNewPassword}
              showPassword={showNewPassword}
            />
            {touched.newPassword && errors.newPassword && (
              <Text style={styles.errorText}>{errors.newPassword}</Text>
            )}

            <Text style={[styles.label, { color: theme.text }]}>Xác nhận mật khẩu mới:</Text>
            <CustomTextInput
              value={values.confirmNewPassword}
              onChangeText={handleChange('confirmNewPassword')}
              onBlur={handleBlur('confirmNewPassword')}
              placeholder="Xác nhận mật khẩu mới"
              secureTextEntry={!showConfirmPassword}
              togglePassword={toggleConfirmPassword}
              showPassword={showConfirmPassword}
            />
            {touched.confirmNewPassword && errors.confirmNewPassword && (
              <Text style={styles.errorText}>{errors.confirmNewPassword}</Text>
            )}

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#FF6700' }]}
              onPress={handleSubmit}
              disabled={isSubmitting || loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Icon name="save-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
                  <Text style={styles.buttonText}>Lưu Thay Đổi</Text>
                </View>
              )}
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 6,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  link: {
    marginTop: 20,
    alignSelf: 'center',
  },
  linkText: {
    fontSize: 14,
  },
});

export default ResetPasswordScreen;

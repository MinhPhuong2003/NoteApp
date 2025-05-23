import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Validation schema với Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
});

const ForgotPasswordScreen = ({ navigation }) => {

  const handleResetPassword = async (email, { setSubmitting }) => {
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert(
        'Thành công ✔️',
        'Đường dẫn đặt lại mật khẩu đã được gửi đến email của bạn.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (error) {
      console.error('Chi tiết lỗi:', error);
      Alert.alert('Lỗi ❌', `Gửi link đặt lại mật khẩu thất bại: ${error.code} - ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <MaterialIcons name="vpn-key" size={28} color="#333" />
        <Text style={styles.title}>QUÊN MẬT KHẨU</Text>
      </View>

      <View style={styles.subHeader}>
        <Text style={styles.subtitle}>
          Nhập email để nhận đường dẫn đặt lại mật khẩu.
        </Text>
      </View>

      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => handleResetPassword(values.email, { setSubmitting })}
      >
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isSubmitting }) => (
          <View>
            <CustomTextInput
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TouchableOpacity
              style={[styles.button, isSubmitting && { backgroundColor: '#7aaefc' }]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <MaterialIcons name="send" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.buttonText}>Gửi đường dẫn</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f9fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#333',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginLeft: 6,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'left',
  },
});

export default ForgotPasswordScreen;

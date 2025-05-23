import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CustomTextInput from '../components/CustomTextInput';
import useTogglePassword from '../hooks/useTogglePassword';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RegisterScreen = ({ navigation }) => {
  const { showPassword, togglePassword } = useTogglePassword();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    const { email, password, fullName, phone, address } = values;
    setLoading(true);

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      await user.updateProfile({
        displayName: fullName,
      });

      await firestore().collection('USERS').doc(user.uid).set({
        email,
        fullName,
        phone,
        address,
        role: 'customer',
      });

      setLoading(false);
      Alert.alert(
        'Thành công',
        'Đăng ký thành công. Vui lòng đăng nhập.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (error) {
      setLoading(false);
      console.error('Lỗi đăng ký:', error);
      Alert.alert('Lỗi', error.message);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>ĐĂNG KÝ</Text>

      <Formik
        initialValues={{ email: '', password: '', fullName: '', phone: '', address: '' }}
        validationSchema={Yup.object({
          fullName: Yup.string().required('Họ tên không được bỏ trống'),
          email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
          phone: Yup.string().required('Vui lòng nhập số điện thoại'),
          address: Yup.string().required('Vui lòng nhập địa chỉ'),
          password: Yup.string().min(6, 'Mật khẩu ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
        })}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <>
            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <Icon name="account" size={16} color="#333" />
                <Text style={styles.label}>Họ tên</Text>
              </View>
              <CustomTextInput
                value={values.fullName}
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                placeholder="Nhập họ tên"
                icon={<Icon name="account" size={20} color="#666" />}
                error={touched.fullName && errors.fullName}
              />
              {touched.fullName && errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <Icon name="email" size={16} color="#333" />
                <Text style={styles.label}>Email</Text>
              </View>
              <CustomTextInput
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="Nhập email"
                keyboardType="email-address"
                icon={<Icon name="email" size={20} color="#666" />}
                error={touched.email && errors.email}
              />
              {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <Icon name="phone" size={16} color="#333" />
                <Text style={styles.label}>Số điện thoại</Text>
              </View>
              <CustomTextInput
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                placeholder="Nhập số điện thoại"
                keyboardType="phone-pad"
                icon={<Icon name="phone" size={20} color="#666" />}
                error={touched.phone && errors.phone}
              />
              {touched.phone && errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <Icon name="home" size={16} color="#333" />
                <Text style={styles.label}>Địa chỉ</Text>
              </View>
              <CustomTextInput
                value={values.address}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                placeholder="Nhập địa chỉ"
                icon={<Icon name="home" size={20} color="#666" />}
                error={touched.address && errors.address}
              />
              {touched.address && errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <Icon name="lock" size={16} color="#333" />
                <Text style={styles.label}>Mật khẩu</Text>
              </View>
              <CustomTextInput
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                placeholder="Nhập mật khẩu"
                secureTextEntry={!showPassword}
                togglePassword={togglePassword}
                showPassword={showPassword}
                icon={<Icon name="lock" size={20} color="#666" />}
                error={touched.password && errors.password}
              />
              {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <View style={styles.buttonContent}>
                  <Icon name="account-check" size={20} color="#fff" style={{ marginRight: 8 }} />
                  <Text style={styles.buttonText}>Đăng ký</Text>
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
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f9fafd',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'center',
    marginBottom: 30,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  label: {
    marginLeft: 6,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#4e9bde',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterScreen;

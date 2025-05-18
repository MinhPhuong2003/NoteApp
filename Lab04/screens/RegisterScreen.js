import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CustomTextInput from '../components/CustomTextInput';
import useTogglePassword from '../hooks/useTogglePassword';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const RegisterScreen = ({ navigation }) => {
  const { showPassword, togglePassword } = useTogglePassword();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
  const { email, password, fullName, phone, address } = values;
  
  setLoading(true);

  try {
    // Tạo tài khoản trên Firebase Auth
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    // Cập nhật displayName trong Firebase Auth
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
      'Success 🎉',
      'Registration successful. Please log in.',
      [
        {
          text: 'OK 👍',
          onPress: () => {
            navigation.navigate('Login');
          },
        },
      ]
    );
  } catch (error) {
    setLoading(false);
    console.error('Registration Error:', error);
    Alert.alert('Error ❌', error.message);
  }
};

  return (
  <KeyboardAwareScrollView
    contentContainerStyle={styles.container}
    keyboardShouldPersistTaps="handled"
  >
    <Text style={styles.title}>Create Account ✍️</Text>

    <Formik
      initialValues={{ email: '', password: '', fullName: '', phone: '', address: '' }}
      validationSchema={Yup.object({
        fullName: Yup.string().required('Full name is required 💼'),
        email: Yup.string().email('Invalid email 📧').required('Email is required 📝'),
        phone: Yup.string().required('Phone number is required 📱'),
        address: Yup.string().required('Address is required 🏠'),
        password: Yup.string().min(6, 'Password must be at least 6 characters 🔑').required('Password is required 🔒'),
      })}
      onSubmit={handleRegister}
    >
      {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
        <>
          <CustomTextInput
            value={values.fullName}
            onChangeText={handleChange('fullName')}
            onBlur={handleBlur('fullName')}
            placeholder="Full Name 👤"
            error={touched.fullName && errors.fullName}
          />
          {touched.fullName && errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

          <CustomTextInput
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            placeholder="Email 📧"
            keyboardType="email-address"
            error={touched.email && errors.email}
          />
          {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <CustomTextInput
            value={values.phone}
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
            placeholder="Phone Number 📱"
            keyboardType="phone-pad"
            error={touched.phone && errors.phone}
          />
          {touched.phone && errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

          <CustomTextInput
            value={values.address}
            onChangeText={handleChange('address')}
            onBlur={handleBlur('address')}
            placeholder="Address 🏠"
            error={touched.address && errors.address}
          />
          {touched.address && errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

          <CustomTextInput
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            placeholder="Password 🔒"
            secureTextEntry={!showPassword}
            togglePassword={togglePassword}
            showPassword={showPassword}
            error={touched.password && errors.password}
          />
          {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Register ✨</Text>
            )}
          </TouchableOpacity>
        </>
      )}
    </Formik>

    <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login')}>
      <Text style={styles.linkText}>Back to Login 🔙</Text>
    </TouchableOpacity>
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
  button: {
    backgroundColor: '#4e9bde',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    marginTop: 10,
    alignSelf: 'center',
  },
  linkText: {
    color: '#4e9bde',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default RegisterScreen;

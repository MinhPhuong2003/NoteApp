import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firestore from '@react-native-firebase/firestore';
import CustomTextInput from '../components/CustomTextInput';
import useTogglePassword from '../hooks/useTogglePassword';
import auth from '@react-native-firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'At least 6 characters').required('Password is required'),
});

const LoginScreen = ({ navigation }) => {
  const { showPassword, togglePassword } = useTogglePassword();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(values.email, values.password);
      const user = userCredential.user;
      console.log('User logged in:', user.email);
      const userDoc = await firestore().collection('USERS').doc(values.email).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        navigation.navigate('TodoList', { userEmail: user.email });
      } else {
        Alert.alert('Error', 'No additional user data found.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Error', error.message);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
  <KeyboardAwareScrollView
    style={{ flex: 1 }}
    contentContainerStyle={styles.container}
    keyboardShouldPersistTaps="handled"
  >
    <Text style={styles.title}>Welcome Back 👋</Text>

    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
        <View>
          {/* Username label */}
          <Text style={styles.label}>🖊️ Email:</Text>
          <CustomTextInput
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            placeholder="Email"
            keyboardType="email-address"
          />
          {touched.email && errors.email && (
            <Text style={styles.error}>⚠️ {errors.email}</Text>
          )}

          {/* Password label */}
          <Text style={styles.label}>🔑 Password:</Text>
          <CustomTextInput
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            placeholder="Password"
            secureTextEntry={!showPassword}
            togglePassword={togglePassword}
            showPassword={showPassword}
          />
          {touched.password && errors.password && (
            <Text style={styles.error}>⚠️ {errors.password}</Text>
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgotPassword}
          >
            <Text style={styles.forgotPasswordText}>🔑 Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={isSubmitting || loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login 🚀</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.linkText}>❓ Don't have an account? Register</Text>
          </TouchableOpacity>
        </View>
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginBottom: 10,
    marginTop: -5,
    marginLeft: 5,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    color: '#4e9bde',
    fontSize: 14,
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
});

export default LoginScreen;

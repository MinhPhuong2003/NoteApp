import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Validation schema with Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const ForgotPasswordScreen = ({ navigation }) => {

  const handleResetPassword = async (email, { setSubmitting }) => {
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert(
        'Success ✔️', 
        'A password reset link has been sent to your email. 📧',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (error) {
      console.error('Error details:', error);
      Alert.alert('Error ❌', `Failed to send reset link: ${error.code} - ${error.message}`);
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
      <Text style={styles.title}>Forgot Password 🔑</Text>
      <Text style={styles.subtitle}>
        Enter your email to receive a password reset link. 📨
      </Text>

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
              placeholder="Email 📧"
              style={styles.input}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>Send Reset Link 🔄</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backText}>Back to Login 🔙</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  input: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
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
  backText: {
    textAlign: 'center',
    color: '#007bff',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'left',
  },
});

export default ForgotPasswordScreen;

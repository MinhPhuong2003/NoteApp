import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground } from 'react-native';
import Button from '../components/Button';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ImageBackground
      source={{ uri: 'https://example.com/food-bg.jpg' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email ID"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button
            title="Login"
            onPress={() => navigation.navigate('Navigation')}
          />
          <Button
            title="Back to Landing Page"
            onPress={() => navigation.navigate('Landing')}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  form: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
});

export default LoginScreen;
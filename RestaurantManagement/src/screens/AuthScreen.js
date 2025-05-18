import React, { useState, useEffect } from 'react'; // Thêm useEffect vào import
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Image } from 'react-native';
import Button from '../components/Button';
import { useRoute } from '@react-navigation/native'; // Import useRoute

const AuthScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true); // State để chuyển đổi giữa Login và Register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const route = useRoute(); // Get route object

  useEffect(() => {
    // Kiểm tra mode từ route params
    if (route.params?.mode === 'register') {
      setIsLogin(false); // Nếu mode là 'register', chuyển sang đăng ký
    } else {
      setIsLogin(true); // Mặc định là đăng nhập
    }
  }, [route.params?.mode]);

  return (
    <ImageBackground source={require('../assets/food.jpg')} style={styles.background}>
      <View style={styles.overlay}>
        <Image source={require('../assets/food-icon.jpg')} style={styles.icon} />

        {/* Form chứa nút chuyển đổi và form nhập liệu */}
        <View style={styles.form}>
          {/* Nút chuyển đổi Login/Register */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, isLogin && styles.activeToggle]}
              onPress={() => setIsLogin(true)}
            >
              <Text style={styles.toggleText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, !isLogin && styles.activeToggle]}
              onPress={() => setIsLogin(false)}
            >
              <Text style={styles.toggleText}>Register</Text>
            </TouchableOpacity>
          </View>

          {/* Form Login hoặc Register */}
          {isLogin ? (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email ID"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <Button title="Login" onPress={() => navigation.navigate('MenuList')} style={styles.submitButton} />
            </View>
          ) : (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="User Name"
                placeholderTextColor="#aaa"
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#aaa"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              <TextInput
                style={styles.input}
                placeholder="Email ID"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <Button title="Register" onPress={() => navigation.navigate('Navigation')} style={styles.submitButton} />
            </View>
          )}
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Landing')}>
          <Text style={styles.backText}>Back to landing page</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 30,
  },
  form: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'space-around',
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  activeToggle: {
    backgroundColor: '#ff6200', // Màu cam khi active
  },
  toggleText: {
    color: '#000',
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    fontSize: 14,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#ff6200',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  backText: {
    color: '#fff',
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default AuthScreen;

import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import Button from '../components/Button';

const LandingScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/food.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Image
          source={require('../assets/food-icon.jpg')}
          style={styles.icon}
        />

        <Text style={styles.title}>Welcome to Food App</Text>

        <Button
          title="Login via Facebook"
          onPress={() => navigation.navigate('Auth', { mode: 'login' })}
          style={[styles.socialButton, { backgroundColor: '#3b5998' }]}
        />

        <Button
          title="Login via Google"
          onPress={() => navigation.navigate('Auth', { mode: 'login' })}
          style={[styles.socialButton, { backgroundColor: '#d93025' }]}
        />

        <Button
          title="Login via Email ID"
          onPress={() => navigation.navigate('Auth', { mode: 'login' })}
          style={[styles.socialButton, { backgroundColor: '#f57c00' }]}
        />

        <Text
          style={styles.registerText}
          onPress={() => navigation.navigate('Auth', { mode: 'register' })}
        >
          Don't have an account? <Text style={styles.registerLink}>Register!</Text>
        </Text>
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
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 30,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  socialButton: {
    width: '80%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  registerText: {
    color: '#fff',
    marginTop: 10,
  },
  registerLink: {
    textDecorationLine: 'underline',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LandingScreen;
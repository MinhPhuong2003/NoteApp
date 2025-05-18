import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
        <Text style={styles.menuItem}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.menuItem}>Receive Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.menuItem}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.menuItem}>Terms of Use</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.menuItem}>Check App Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  menuItem: { fontSize: 18, padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});

export default SettingsScreen;
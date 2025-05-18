import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SupportScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Support</Text>
      <Text style={styles.message}>
        We care because you matter! Save time by posting the request online and we'll connect you to our support team at 1800-100-8844.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginVertical: 10, textAlign: 'center' },
  message: { fontSize: 16, textAlign: 'center' },
});

export default SupportScreen;
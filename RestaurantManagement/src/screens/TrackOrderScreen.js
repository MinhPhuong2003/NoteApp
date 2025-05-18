import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';

const TrackOrderScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tracking Details</Text>
      <View style={styles.mapPlaceholder}>
        <Text>Map Placeholder (Use react-native-maps here)</Text>
      </View>
      <Button title="Call Delivery Boy" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginVertical: 10, textAlign: 'center' },
  mapPlaceholder: { flex: 1, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' },
});

export default TrackOrderScreen;
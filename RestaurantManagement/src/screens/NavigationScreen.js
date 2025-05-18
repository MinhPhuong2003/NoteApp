import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // thêm dòng này

const NavigationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image source={{ uri: 'https://example.com/profile.jpg' }} style={styles.avatar} />
        <Text style={styles.name}>Angel James</Text>
      </View>

      <TouchableOpacity style={styles.menuRow} onPress={() => navigation.navigate('MenuList')}>
        <Icon name="cutlery" size={20} style={styles.icon} />
        <Text style={styles.menuItem}>Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuRow} onPress={() => navigation.navigate('MyOrders')}>
        <Icon name="shopping-cart" size={20} style={styles.icon} />
        <Text style={styles.menuItem}>My Orders</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuRow} onPress={() => navigation.navigate('DailyOffers')}>
        <Icon name="gift" size={20} style={styles.icon} />
        <Text style={styles.menuItem}>Offers</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuRow} onPress={() => navigation.navigate('Support')}>
        <Icon name="support" size={20} style={styles.icon} />
        <Text style={styles.menuItem}>Support</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuRow} onPress={() => navigation.navigate('Settings')}>
        <Icon name="cog" size={20} style={styles.icon} />
        <Text style={styles.menuItem}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  profile: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: 'bold' },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: { width: 30 },
  menuItem: { fontSize: 18 },
});

export default NavigationScreen;

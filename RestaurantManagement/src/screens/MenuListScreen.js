import React, { useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuItem from '../components/MenuItem';
import NavigationScreen from './NavigationScreen';

const { width } = Dimensions.get('window');

const menuData = [
  { id: '1', title: 'Snacks', image: require('../assets/menu/snack.jpg') },
  { id: '2', title: 'Chinese', image: require('../assets/menu/pasta-sauce.jpg') },
  { id: '3', title: 'South Indian', image: require('../assets/menu/india-food.jpg') },
];

const MenuListScreen = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width * 0.75)).current;

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -width * 0.75,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setMenuVisible(false));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openMenu}>
          <Icon name="bars" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MENU</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping-cart" size={25} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* FlatList */}
      <FlatList
        data={menuData}
        renderItem={({ item }) => (
          <MenuItem
            title={item.title}
            image={item.image}
            onPress={() => navigation.navigate('ItemsList', { category: item.title })}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContent, { paddingHorizontal: 10 }]}
      />

      {/* Overlay + Slide-in Menu */}
      {menuVisible && (
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.overlay}>
            <Animated.View style={[styles.drawer, { left: slideAnim }]}>
              <NavigationScreen navigation={navigation} />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ff6200',
    padding: 15,
    marginBottom: 10,
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  listContent: { paddingBottom: 20 },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    flexDirection: 'row',
  },
  drawer: {
    width: width * 0.75,
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
  },
});

export default MenuListScreen;

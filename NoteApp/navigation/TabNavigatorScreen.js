import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Animated, Dimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../screens/ProfileScreen';
import TodoListScreen from '../screens/TodoListScreen';
import MenuScreen from '../screens/MenuScreen';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');
const MENU_WIDTH = width * 0.75;

const MenuButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ marginLeft: 15 }}>
    <Ionicons name="menu-outline" size={25} color="#007aff" />
  </TouchableOpacity>
);

const TabNavigatorScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;

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
      toValue: -MENU_WIDTH,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setMenuVisible(false));
  };

  const handleMenuPress = () => {
    if (menuVisible) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="TodoList"
        screenOptions={({ route }) => ({
          tabBarStyle: { paddingBottom: 5, height: 60 },
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'TodoList') iconName = 'document-text-outline';
            else if (route.name === 'Profile') iconName = 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007aff',
          tabBarInactiveTintColor: 'gray',
          headerTitleAlign: 'center',
        })}
      >
        <Tab.Screen
          name="TodoList"
          component={TodoListScreen}
          options={{
            title: 'Notes',
            headerLeft: () => <MenuButton onPress={handleMenuPress} />,
            headerRight: () => (
              <TouchableOpacity onPress={() => alert('Search pressed!')} style={{ marginRight: 15 }}>
                <Ionicons name="search-outline" size={25} color="#007aff" />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profile',
            headerLeft: () => <MenuButton onPress={handleMenuPress} />,
          }}
        />
      </Tab.Navigator>

      {menuVisible && (
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.overlay}>
            <Animated.View style={[styles.menuContainer, { left: slideAnim }]}>
              <MenuScreen closeMenu={closeMenu} />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    flexDirection: 'row',
  },
  menuContainer: {
    width: MENU_WIDTH,
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
  },
});

export default TabNavigatorScreen;

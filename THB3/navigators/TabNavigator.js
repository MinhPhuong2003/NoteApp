import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContactStackNavigator from './ContactStackNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import FavoritesScreen from '../screens/FavoritesScreen'; 
import FavoritesStackNavigator from './FavoritesStackNavigator'; // ✅ đã có stack riêng

import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Tab.Screen 
        name="Contacts" 
        component={ContactStackNavigator} 
        options={{
          headerShown: false, // Ẩn tiêu đề "Contacts" của tab
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesStackNavigator} // Dùng Stack Navigator thay vì FavoritesScreen trực tiếp
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" size={size} color={color} />
          ),
          headerShown: false // Ẩn header của tab (Stack sẽ lo)
        }}
      />
      <Tab.Screen 
        name="My Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-circle" size={size} color={color} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}
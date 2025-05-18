// FavoritesStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavoritesScreen from '../screens/FavoritesScreen';
import ContactDetailScreen from '../screens/ContactDetailScreen';

const Stack = createStackNavigator();

export default function FavoritesStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen 
        name="ContactDetail" 
        component={ContactDetailScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

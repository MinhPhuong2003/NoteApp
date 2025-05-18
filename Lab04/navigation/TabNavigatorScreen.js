import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../screens/ProfileScreen';
import TodoListScreen from '../screens/TodoListScreen';

const Tab = createBottomTabNavigator();

const TabNavigatorScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="TodoList"
      screenOptions={({ route }) => ({
        tabBarStyle: { paddingBottom: 5, height: 60 },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'TodoList') {
            iconName = 'document-text-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007aff',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="TodoList"
        component={TodoListScreen}
        options={{
          title: 'Notes',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigatorScreen;

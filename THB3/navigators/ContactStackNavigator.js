import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ContactListScreen from '../screens/ContactListScreen';
import ContactDetailScreen from '../screens/ContactDetailScreen';
import EditContactScreen from '../screens/EditContactScreen';
import AddContactScreen from '../screens/AddContactScreen';
import { DrawerActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

export default function ContactStackNavigator({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen 
  name="Contacts" 
  component={ContactListScreen} 
  options={({ navigation }) => ({
    headerTitleAlign: 'center',
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        style={{ marginLeft: 15 }}
      >
        <Icon name="menu" size={24} color="black" />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Settings')}
        style={{ marginRight: 15 }}
      >
        <Icon name="settings" size={24} color="black" />
      </TouchableOpacity>
    ),
  })}
/>
      <Stack.Screen 
        name="ContactDetail" 
        component={ContactDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="EditContact" 
        component={EditContactScreen}
        options={{ headerTitle: 'Edit Contact', headerTitleAlign: 'center' }}
      />
      <Stack.Screen 
        name="AddContact" 
        component={AddContactScreen}
        options={{ headerTitle: 'Add Contact', headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  );
}
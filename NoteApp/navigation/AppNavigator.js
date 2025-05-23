import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import EditTodoScreen from '../screens/EditTodoScreen';
import TodoDetailScreen from '../screens/TodoDetailScreen';
import AddTodoScreen from '../screens/AddTodoScreen';
import TabNavigatorScreen from '../navigation/TabNavigatorScreen';
import MenuScreen from '../screens/MenuScreen';
import TrashListScreen from '../screens/TrashListScreen';
import FavoriteListScreen from '../screens/FavoriteListScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user, loading } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  if (loading) return null;

  return (
    <Stack.Navigator
      initialRouteName={user ? 'TodoList' : 'Login'}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerTitle: 'REGISTER' }} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerTitle: 'RESET PASSWORD' }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerTitle: 'FORGOT PASSWORD' }} />
      <Stack.Screen name="TodoList" component={TabNavigatorScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="MenuList"
        component={MenuScreen}
        options={{ headerShown: false, presentation: 'transparentModal' }}
      />
      <Stack.Screen name="EditTodo" component={EditTodoScreen} options={{ headerTitle: 'EDIT NOTE' }} />
      <Stack.Screen name="TodoDetail" component={TodoDetailScreen} options={{ headerTitle: 'NOTE DETAIL' }} />
      <Stack.Screen name="AddTodoScreen" component={AddTodoScreen} options={{ headerTitle: 'ADD NOTE' }} />
      <Stack.Screen name="Trash" component={TrashListScreen} options={{ headerTitle: 'TRASH' }} />
      <Stack.Screen name="Favorites" component={FavoriteListScreen} options={{ headerTitle: 'FAVORITES' }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerTitle: 'EDIT PROFILE' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

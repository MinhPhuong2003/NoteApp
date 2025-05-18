import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import EditTodoScreen from '../screens/EditTodoScreen';
import TodoDetailScreen from '../screens/TodoDetailScreen';
import AddTodoScreen from '../screens/AddTodoScreen';
import TabNavigatorScreen from '../screens/TabNavigatorScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName={user ? 'TodoList' : 'Login'}>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerTitle: 'Register' }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerTitle: 'Forgot Password' }} />
      <Stack.Screen name="TodoList" component={TabNavigatorScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditTodo" component={EditTodoScreen} options={{ headerTitle: 'EditTodo' }}/>
      <Stack.Screen name="TodoDetail" component={TodoDetailScreen} options={{ headerTitle: 'TodoDetail' }}/>
      <Stack.Screen name="AddTodoScreen" component={AddTodoScreen} options={{ headerTitle: 'AddTodo' }}/>
    </Stack.Navigator>
  );
};

export default AppNavigator;

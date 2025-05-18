import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from '../screens/LandingScreen';
import AuthScreen from '../screens/AuthScreen';
import NavigationScreen from '../screens/NavigationScreen';
import MenuListScreen from '../screens/MenuListScreen';
import ItemsListScreen from '../screens/ItemsListScreen';
import ItemDetailsScreen from '../screens/ItemDetailsScreen';
import CartScreen from '../screens/CartScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import CardDetailsScreen from '../screens/CardDetailsScreen';
import OrderCompleteScreen from '../screens/OrderCompleteScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import TrackOrderScreen from '../screens/TrackOrderScreen';
import OrderInvoiceScreen from '../screens/OrderInvoiceScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DailyOffersScreen from '../screens/DailyOffersScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import SupportScreen from '../screens/SupportScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Navigation" component={NavigationScreen} />
      <Stack.Screen name="MenuList" component={MenuListScreen} />
      <Stack.Screen name="ItemsList" component={ItemsListScreen} />
      <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
      <Stack.Screen name="CardDetails" component={CardDetailsScreen} />
      <Stack.Screen name="OrderComplete" component={OrderCompleteScreen} />
      <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
      <Stack.Screen name="TrackOrder" component={TrackOrderScreen} />
      <Stack.Screen name="OrderInvoice" component={OrderInvoiceScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="DailyOffers" component={DailyOffersScreen} />
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="AddAddress" component={AddAddressScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
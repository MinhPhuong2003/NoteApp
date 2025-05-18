import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Login/LoginScreen";
import HomeScreen from "./Login/HomeScreen";
// import AppNavigator from './RestaurantManagement/src/navigation/AppNavigator';
import AppNavigator from './Lab04/navigation/AppNavigator';
import { AuthProvider } from './Lab04/context/AuthContext';
import TabNavigator from './THB3/navigators/TabNavigator';
import firebase from '@react-native-firebase/app';

// Định nghĩa các màn hình trong stack
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

const App = () => {
  return (
    // THB1
    //<NavigationContainer>
      //<Stack.Navigator initialRouteName="Login">
        //<Stack.Screen name="Login" component={LoginScreen} />
        //<Stack.Screen name="Home" component={HomeScreen} />
      //</Stack.Navigator>
    //</NavigationContainer>
    // THB3
    // <NavigationContainer>
    //    <TabNavigator />
    // </NavigationContainer>
    // THB4,5
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
    /*<NavigationContainer>
      <AppNavigator />
    </NavigationContainer>*/
  );
};

export default App;
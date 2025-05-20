import React, { useState, useRef, useContext  } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  Text,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ProfileScreen from '../screens/ProfileScreen';
import TodoListScreen from '../screens/TodoListScreen';
import MenuScreen from '../screens/MenuScreen';
import { Switch } from 'react-native';
import { ThemeContext } from '../context/ThemeContext'; // đường dẫn đúng tới file bạn tạo

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');
const MENU_WIDTH = width * 0.75;

const SettingsButton = ({ onPress }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <TouchableOpacity onPress={onPress} style={{ marginRight: 15 }}>
      <Ionicons name="settings-outline" size={25} color={theme.text} />
    </TouchableOpacity>
  );
};

const MenuButton = ({ onPress }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <TouchableOpacity onPress={onPress} style={{ marginLeft: 15 }}>
      <Ionicons name="menu-outline" size={25} color={theme.text} />
    </TouchableOpacity>
  );
};


const TabNavigatorScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const navigation = useNavigation();

  // Lấy theme và hàm đổi theme
  const { theme, toggleTheme } = useContext(ThemeContext);

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

  const openSettings = () => setSettingsVisible(true);
  const closeSettings = () => setSettingsVisible(false);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Tab.Navigator
        initialRouteName="TodoList"
        screenOptions={({ route }) => ({
          tabBarStyle: { paddingBottom: 5, height: 60, backgroundColor: theme.background },
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'TodoList') iconName = 'document-text-outline';
            else if (route.name === 'Profile') iconName = 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007aff',
          tabBarInactiveTintColor: 'gray',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: theme.background },
          headerTitleStyle: { color: theme.text },
          headerLeft: () => <MenuButton onPress={handleMenuPress} />,
          headerRight: () => <SettingsButton onPress={openSettings} />,
        })}
      >
        <Tab.Screen name="TodoList" component={TodoListScreen} options={{ title: 'Notes' }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      </Tab.Navigator>

      {menuVisible && (
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
            <Animated.View style={[styles.menuContainer, { left: slideAnim, backgroundColor: theme.background }]}>
              <MenuScreen closeMenu={closeMenu} />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      )}

      <Modal
        visible={settingsVisible}
        transparent
        animationType="fade"
        onRequestClose={closeSettings}
      >
        <TouchableWithoutFeedback onPress={closeSettings}>
          <View style={[styles.settingsOverlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
            <View style={[styles.popupMenu, { backgroundColor: theme.background }]}>
              
              {/* Change Password */}
              <TouchableOpacity
                style={styles.menuItemContainer}
                onPress={() => {
                  closeSettings();
                  navigation.navigate('ResetPassword');
                }}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={theme.text}
                  style={{ marginRight: 10 }}
                />
                <Text style={[styles.menuItem, { color: theme.text }]}>Change Password</Text>
              </TouchableOpacity>

              {/* Toggle Dark Mode */}
              <View style={[styles.menuItemContainer, { justifyContent: 'space-between', paddingRight: 10 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons
                    name="moon-outline"
                    size={20}
                    color={theme.text}
                    style={{ marginRight: 10 }}
                  />
                  <Text style={[styles.menuItem, { color: theme.text }]}>Dark Mode</Text>
                </View>
                <Switch
                  value={theme.mode === 'dark'}
                  onValueChange={toggleTheme}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={theme.mode === 'dark' ? '#f5dd4b' : '#f4f3f4'}
                />
              </View>
              
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  settingsOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 20,
  },
  popupMenu: {
    minWidth: 160,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  menuItem: {
    fontSize: 14,
    color: '#333',
  },
});

export default TabNavigatorScreen;

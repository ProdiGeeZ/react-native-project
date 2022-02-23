import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NativeBaseProvider } from 'native-base';

import { UserProvider } from './src/context/UserContext';

import DrawerContent from './src/components/DrawerContent';
import TabRoutes from './src/components/TabContent';

import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import FriendRequestScreen from './src/screens/FriendRequest';
import FriendsScreen from './src/screens/FriendsScreen';
import UserDetailsScreen from './src/screens/UserDetailsScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerRoutes = () => {
  return (
    <Drawer.Navigator screenOptions={{
      drawerType: 'push-screen'
    }}
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Space Book" component={TabRoutes} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Friend Requests" component={FriendRequestScreen} />
      <Drawer.Screen name="Friends" component={FriendsScreen} />
      <Drawer.Screen name="User" component={UserDetailsScreen} />
    </Drawer.Navigator>
  )
}


export default function App() {
  return (
    <UserProvider>
      <NativeBaseProvider style={styles.root}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Home" component={DrawerRoutes} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    // flex: 1,
    backgroundColor: '#ff8f73'
  }
});

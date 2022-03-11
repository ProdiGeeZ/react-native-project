import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NativeBaseProvider } from 'native-base';

import { UserProvider } from './src/context/UserContext';

import DrawerContent from './src/components/DrawerContent';

import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SearchScreen from './src/screens/SearchScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import FriendRequestScreen from './src/screens/FriendRequest';
import FriendsScreen from './src/screens/FriendsScreen';
import UserDetailsScreen from './src/screens/UserDetailsScreen';
import FloatingButton from './src/components/FloatingButton';
import Home from './src/screens/Home';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerRoutes = () => {
  return (
    <>
      <Drawer.Navigator screenOptions={{
        drawerType: 'push-screen'
      }}
        drawerContent={props => <DrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={Home}/>
        <Drawer.Screen name="User" component={UserDetailsScreen}/>
        <Drawer.Screen name="Search" component={SearchScreen}/>
        <Drawer.Screen name="Friend Requests" component={FriendRequestScreen} />
        <Drawer.Screen name="Friends" component={FriendsScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
      <FloatingButton style={{ bottom: 100, right: 50, alignSelf: 'center', position: 'absolute' }} />
    </>
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
            <Stack.Group>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </Stack.Group>
            <Stack.Screen name="Welcome" component={DrawerRoutes} />
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

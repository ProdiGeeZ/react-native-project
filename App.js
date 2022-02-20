import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NativeBaseProvider } from 'native-base';


import Home from './src/screens/Home';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import DrawerContent from './src/components/DrawerContent';


import { UserProvider } from './src/context/UserContext';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Feed" component={Home} />
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
    backgroundColor: '#F9FbFc'
  }
});

import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeBaseProvider } from 'native-base';


import Home from './src/screens/Home';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import DrawerContent from './src/components/DrawerContent';


import { UserContext, UserProvider } from './src/context/UserContext';
import SettingsScreen from './src/screens/SettingsScreen';
import FriendRequestScreen from './src/screens/FriendRequest';
import FriendsScreen from './src/screens/FriendsScreen';
import UserDetailsScreen from './src/screens/UserDetailsScreen';
import SearchScreen from './src/screens/SearchScreen';
import PostScreen from './src/screens/PostScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const DrawerRoutes = () => {
  return (
    <Drawer.Navigator screenOptions={{
      drawerType: 'push-screen'
    }}
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Feed" component={TabRoutes} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Friend Requests" component={FriendRequestScreen} />
      <Drawer.Screen name="Friends" component={FriendsScreen} />
      <Drawer.Screen name="User" component={UserDetailsScreen} />
    </Drawer.Navigator>
  )
}

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      top: -35,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow
    }}
  >
    <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#e32f45' }}>
      {children}
    </View>
  </TouchableOpacity>
)

const TabRoutes = () => {
  const user = useContext(UserContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#d3d3d3',
          borderRadius: 25,
          bottom: 25,
          elevation: 0,
          height: 70,
          left: 20,
          position: 'absolute',
          right: 20,
          ...styles.shadow
        }
      }}
      tabBarOptions={{
        showLabel: false
      }}
    >
      {/* <Tab.Screen name="Home" component={DrawerRoutes}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 2.5 }}>
              <Image source={require('./assets/icons/home.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#F3ABB4'
                }} />
              <Text style={{ color: focused ? '#e32f45' : '#000000', fontSize: 12 }}>
                HOME
              </Text>
            </View>
          )
        }} /> */}
      <Tab.Screen name="Search" component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 2.5 }}>
              <Image source={require('./assets/icons/account-search.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#F3ABB4'
                }} />
              <Text style={{ color: focused ? '#e32f45' : '#000000', fontSize: 12 }}>
                FIND
              </Text>
            </View>
          )
        }} />

      <Tab.Screen name="POSTS" component={PostScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image source={require('./assets/icons/plus-circle.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: '#fff'
                }} />
            </View>
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} />
          )
        }} />
      <Tab.Screen name="Friends" component={FriendsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 2.5 }}>
              <Image source={require('./assets/icons/account-box-multiple.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#F3ABB4'
                }} />
              <Text style={{ color: focused ? '#e32f45' : '#000000', fontSize: 12 }}>
                FRIENDS
              </Text>
            </View>
          )
        }} />

      <Tab.Screen name="Profile" component={UserDetailsScreen} initialParams={{ id: user.id }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 2.5 }}>
              <Image source={require('./assets/icons/account-circle-outline.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#F3ABB4'
                }} />
              <Text style={{ color: focused ? '#e32f45' : '#000000', fontSize: 12 }}>
                PROFILE
              </Text>
            </View>
          )
        }} />
    </Tab.Navigator>
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
  },
  shadow: {
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 5
  }
});

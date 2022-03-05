import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { UserContext } from '../context/UserContext';

import Home from '../screens/Home';
import SearchScreen from '../screens/SearchScreen';
import PostScreen from '../screens/PostScreen';
import FriendRequestScreen from '../screens/FriendRequest';
import UserDetailsScreen from '../screens/UserDetailsScreen';


const Tab = createBottomTabNavigator();

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
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 2.5 }}>
              <Image source={require('../../assets/icons/home.png')}
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
        }} />
      <Tab.Screen name="Search" component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 2.5 }}>
              <Image source={require('../../assets/icons/account-search.png')}
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
              <Image source={require('../../assets/icons/plus-circle.png')}
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
      <Tab.Screen name="Friend Requests" component={FriendRequestScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 2.5 }}>
              <Image source={require('../../assets/icons/account-box-multiple.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#F3ABB4'
                }} />
              <Text style={{ color: focused ? '#e32f45' : '#000000', fontSize: 12 }}>
                FRIEND REQUESTS
              </Text>
            </View>
          )
        }} />

      <Tab.Screen name="Profile" component={UserDetailsScreen} initialParams={{ id: user.id }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 2.5 }}>
              <Image source={require('../../assets/icons/account-circle-outline.png')}
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

const styles = StyleSheet.create({
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

export default TabRoutes; 
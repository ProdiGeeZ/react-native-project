import React, { useContext, useRef, useState } from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
const FloatingButton = (props) => {

  const [isOpen, setIsOpen] = useState(true);
  const toggleAnimation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const { id } = useContext(UserContext);

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.spring(toggleAnimation, {
      toValue,
      friction: 10,
      useNativeDriver: false
    }).start();

    setIsOpen(!isOpen);
  }

  const opacity = toggleAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1]
  })

  const postsStyle = {
    transform: [
      { scale: toggleAnimation },
      {
        translateY: toggleAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -240]
        })
      }
    ]
  }

  const friendsStyle = {
    transform: [
      { scale: toggleAnimation },
      {
        translateY: toggleAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -180]
        })
      }
    ]
  }

  const searchStyle = {
    transform: [
      { scale: toggleAnimation },
      {
        translateY: toggleAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -120]
        })
      }
    ]
  }

  const profileStyle = {
    transform: [
      { scale: toggleAnimation },
      {
        translateY: toggleAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -60]
        })
      }
    ]
  }

  const rotation = {
    transform: [
      {
        rotate: toggleAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "45deg"]
        })
      }
    ]
  }

  const navigateTo = (location) => {
    toggleMenu();
    navigation.navigate(location);
  }

  return (
    <View style={[styles.container, props.style]}>

      <TouchableWithoutFeedback onPress={() => navigateTo('Home')}>
        <Animated.View style={[styles.button, styles.secondary, postsStyle, opacity]}>
          <AntDesign name="addfile" size={20} color="#FA2A4B" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => navigateTo('Friend Requests')}>
        <Animated.View style={[styles.button, styles.secondary, friendsStyle, opacity]}>
          <AntDesign name="addusergroup" size={20} color="#FA2A4B" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => navigateTo('Search')}>
        <Animated.View style={[styles.button, styles.secondary, searchStyle, opacity]}>
          <AntDesign name="search1" size={20} color="#FA2A4B" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => {
        toggleMenu();
        navigation.reset({
          index: 0,
          routes: [{
            name: 'User',
            params:
              { id }
          }]
        })
      }}>
        <Animated.View style={[styles.button, styles.secondary, profileStyle, opacity]}>
          <AntDesign name="user" size={20} color="#FA2A4B" />
        </Animated.View>
      </TouchableWithoutFeedback>


      <TouchableWithoutFeedback onPress={() => toggleMenu()}>
        <Animated.View style={[styles.button, styles.menu, rotation]}>
          <AntDesign name="plus" size={24} color="#FFF" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View >
  )
};
const styles = StyleSheet.create({
  button: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: '#F02A4B',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 5
  },
  container: {
    alignItems: "center",
    position: "absolute"
  },
  menu: {
    backgroundColor: '#F02A4B'
  },
  secondary: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    backgroundColor: "#fff"
  }
})
export default FloatingButton;

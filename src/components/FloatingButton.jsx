import React, { useRef, useState } from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FAB } from 'react-native-paper';
const FloatingButton = (props) => {

  const [open, setOpen] = useState(true);

  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    console.log('hellllooo');
    const toValue = open ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true
    }).start();

    setOpen(!open);
  }

  const opacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1]
  })

  const postStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80]
        })
      }
    ]
  }

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "45deg"]
        })
      }
    ]
  }

  return (
    <View style={[styles.container, props.style]}>

      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.secondary, opacity]}>
          <AntDesign name="addfile" size={20} color="#FA2A4B" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.secondary, opacity]}>
          <AntDesign name="addusergroup" size={20} color="#FA2A4B" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.secondary, opacity]}>
          <AntDesign name="search1" size={20} color="#FA2A4B" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.secondary, postStyle, opacity]}>
          <AntDesign name="user" size={20} color="#FA2A4B" />
        </Animated.View>
      </TouchableWithoutFeedback>


      <TouchableWithoutFeedback onPress={() => toggleMenu()}>
        <Animated.View style={[styles.button, styles.menu, rotation]}>
          <AntDesign name="plus" size={24} color="#FFF" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <FAB
        visible={!open}
        onPress={() => setOpen(!open)}
        placement="left"
        title="Show"
        icon={{ name: 'edit', color: 'red' }}
        color="green"
      />
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

import React, { useContext } from 'react';
import axios from 'axios';
import { View, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  Icon
} from 'react-native-paper';
import { API_URL } from '../../consts.json';
import { UserContext } from '../context/UserContext';

const DrawerContent = (props) => {
  const user = useContext(UserContext);

  const logOut = () => {
    axios.post(`${API_URL}/logout`, {}, {
      headers: {
        'X-Authorization': user.token,
        'Content-Type': 'application/json'
      },
    })
      .then(async (data) => {
        if (data.data === 'OK') {
          props.navigation.navigate('Login', { screen: 'LoginScreen' });
        }
      }).catch(async (err) => {
        await alert('Sorry - Something went wrong')
      });
  }
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>John Doe</Title>
                <Caption style={styles.caption}>Joe@gmail.com</Caption>
              </View>
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
      <Drawer.Item
        style={styles.bottomDrawerSection}
        label="Log out"
        icon='logout'
        onPress={() => { logOut() }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  drawerContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  userInfoSection: {
    paddingLeft: 20,
  },
});

export default DrawerContent;

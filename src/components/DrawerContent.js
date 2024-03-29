import React, { useContext, useEffect, useState } from 'react';
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
} from 'react-native-paper';
import { API_URL } from '../../consts.json';
import { UserContext } from '../context/UserContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DrawerContent = (props) => {

  const user = useContext(UserContext);
  const { id, token, details, setDetails, rerender, profilePic, setProfilePic } = user;

  useEffect(() => {
    const fetchData = async () => {
      const userProfileGlobal = await axios.get(`${API_URL}/user/${id}`, {
        headers: {
          'X-Authorization': token,
          'Content-Type': 'application/json'
        }
      });

      await fetch(`${API_URL}/user/${id}/photo`, {
        method: 'GET',
        headers: {
          'X-Authorization': token,
        }
      }).then(res => res.blob())
        .then(resBlob => {
          let blob = new Blob([resBlob], { type: 'image/png' })
          let reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = function () {
            reader.result;
            setProfilePic(reader.result)
          }
        })
      setDetails({ profile: userProfileGlobal.data});
    };
    fetchData();
  }, [id, token, rerender]);

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
                  uri: profilePic
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>{details.profile.first_name} {details.profile.last_name}</Title>
                <Caption style={styles.caption}>{details.profile.email}</Caption>
              </View>
            </View>
            <View style={{ marginLeft: 15 }, [styles.row]}>
              <View style={styles.section}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Friends', {id})}>
                  <Paragraph style={[styles.paragraph, styles.caption]}>{details.profile.friend_count} {' '}
                    <Caption style={styles.caption}>Friends</Caption>
                  </Paragraph>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
          <Drawer.Item
              icon="account"
              label="Profile"
              onPress={() => { props.navigation.navigate('User', { id } ) }}
            />  
            <Drawer.Item
              label="Settings"
              icon='cog'
              onPress={() => { props.navigation.navigate('Settings', { screen: 'SettingsScreen' }); }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView >
      <Drawer.Item
        style={styles.bottomDrawerSection}
        label="Log out"
        icon='logout'
        onPress={() => { logOut() }}
      />
    </View >
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
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    marginRight: 15,
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

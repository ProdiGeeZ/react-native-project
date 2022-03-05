import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { API_URL } from '../../consts.json'
import { UserContext } from '../context/UserContext';

import { Avatar, List, Text } from 'react-native-paper';

const FriendsScreen = ({ navigation }) => {

  const user = useContext(UserContext);

  const getProfilePhoto = (id) => {
    const resp = axios.get(`${API_URL}/user/${id}/photo`, {
      headers: {
        'X-Authorization': user.token,
        'Content-Type': 'application/json'
      }
    });
    console.log(resp.data)
    return resp.data;
  }

  return (
    <View style={styles.root}>
      <View>

        <Text style={{ textAlign: 'center' }}>Your Friends:</Text>

        {user.friends.length > 0 ? user.friends.map((friend) => (
          <TouchableOpacity
            key={friend.user_id}
            onPress={() => navigation.navigate('User', { id: friend.user_id })}>
            <List.Item
              title={`${friend.user_givenname} ${friend.user_familyname}`}
              description={friend.user_email}
              left={props =>
                <Avatar.Image
                  size={60}
                  source={{
                    uri: getProfilePhoto(friend.user_id) ? '' :
                      'https://www.kindpng.com/picc/m/353-3534825_cool-profile-avatar-picture-cool-profile-hd-png.png'
                  }}
                />}
            />
          </TouchableOpacity>
        )) : <Text>No friends to show :( </Text>}
      </View>

    </View >
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 50,
  }
})
export default FriendsScreen; 
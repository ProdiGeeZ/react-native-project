import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { API_URL } from '../../consts.json'
import { UserContext } from '../context/UserContext';

import { Avatar, List } from 'react-native-paper';

const FriendsScreen = ({ navigation }) => {

  const user = useContext(UserContext);
  const [friends, setFriends] = useState([]);

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

  useEffect(() => {
    axios.get(`${API_URL}/user/${user.id}/friends`, {
      headers: {
        'X-Authorization': user.token,
        'Content-Type': 'application/json'
      }
    }).then(data => setFriends(data.data))
      .catch(err => console.log(err))
  }, [user.rerender]);
  console.log({ friends });

  return (
    <View style={styles.root}>
      <View>
        {friends.map((friend) => (
          <TouchableOpacity onPress={() => navigation.navigate('User', { id: friend.user_id })}>
            <List.Item
              title={`${friend.user_givenname} ${friend.user_familyname}`}
              description={friend.user_email}
              left={props =>
                <Avatar.Image
                  size={60}
                  source={getProfilePhoto(friend.user_id) ? '' : '../../assets/image/profile.png'}
                />}
            />
          </TouchableOpacity>
        ))}
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
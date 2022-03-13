import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../consts.json'
import { UserContext } from '../context/UserContext';

import { Avatar, List, Text } from 'react-native-paper';

const FriendsScreen = ({navigation, route}) => {
  
  const user = useContext(UserContext);
  const [friends, setFriends] = useState(user.friends);
  const [same, setSame] = useState(true); 

  let id; 
  const routeID = route.params.id; 
  useEffect(() => {
    if(routeID && (routeID === user.id)){
      id = user.id;
      setSame(true);
    }else if(user.friends.some(({user_id}) => user_id === routeID)){
      id = routeID; 
      axios.get(`${API_URL}/user/${routeID}/friends`, {
        headers: {
          'X-Authorization': user.token,
          'Content-Type': 'application/json'
        }
      }).then(data => setFriends(data.data))
      .catch(err => console.log(err))
      setSame(true)
      }else{
        setSame(false);
    }
  },[routeID])

  const getProfilePhoto = (id) => {
    const resp = axios.get(`${API_URL}/user/${id}/photo`, {
      headers: {
        'X-Authorization': user.token,
        'Content-Type': 'application/json'
      }
    });
    return resp.data;
  }

  return (
    <View style={styles.root}>
      <View>

        <Text style={{ textAlign: 'center' }}>Friends:</Text>
        {!same ? (<Text style={{textAlign: 'center', color: 'red'}}> You can only view your friends, or friends of your friend. </Text>) :
        friends.length > 0 ? friends.map((friend) => (
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
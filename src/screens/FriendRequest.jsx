import axios from 'axios';
import { View, Text } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { useCallback } from 'react';
import { List, Badge, TouchableRipple } from 'react-native-paper';

import { API_URL } from '../../consts.json';
import { UserContext } from '../context/UserContext';

const FriendRequestScreen = () => {
  const [friends, setFriends] = useState([]);
  const user = useContext(UserContext);
  const { rerender, setRerender, token } = user;

  useEffect(() => {
    axios.get(`${API_URL}/friendrequests`, {
      headers: {
        'X-Authorization': token,
        'Content-Type': 'application/json'
      }
    }).then(data => setFriends(data.data))
      .catch(err => console.log(err))
  }, [rerender]);

  const acceptFriendRequest = (id) => {
    axios.post(`${API_URL}/friendrequests/${id}`, {}, {
      headers: {
        'X-Authorization': token,
        'Content-Type': 'application/json'
      }
    }).then(data => {
      setRerender(!rerender);
      console.log('added friend');
    }).catch(err => console.log(err));
  };

  const declineFriendRequest = (id) => {
    axios.delete(`${API_URL}/friendrequests/${id}`, {
      headers: {
        'X-Authorization': token,
        'Content-Type': 'application/json'
      }
    }).then(data => {
      setRerender(!rerender);
      console.log('removed friend');
    }).catch(err => console.log(err));
  };

  return (
    <View style={{ flex: 1 }}>
      <List.Section>
        <List.Subheader>Friend Requests</List.Subheader>
        {
          friends.length > 0 ? friends.map((friend) => (
            <List.Item
              key={friend.user_id}
              title={`${friend.first_name} ${friend.last_name}`}
              left={() => <List.Icon icon="account-circle-outline" />}
              right={() => (
                <>
                  <TouchableRipple onPress={() => declineFriendRequest(friend.user_id)}>
                    <List.Icon icon="account-remove-outline" color="#df4759" />
                  </TouchableRipple>
                  <TouchableRipple onPress={() => acceptFriendRequest(friend.user_id)}>
                    <List.Icon icon="account-plus-outline" color="#42ba96" />
                  </TouchableRipple>
                </>
              )}
            />
          )) : <Text style={{ textAlign: 'center', justifyContent: 'center' }}> You have no new friend requests</Text>

        }

      </List.Section>

    </View >
  )

}
export default FriendRequestScreen; 
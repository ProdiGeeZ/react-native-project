import React, { useState, useEffect, useContext } from 'react';
import { Searchbar, DataTable, Text } from 'react-native-paper';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { API_URL } from '../../consts.json';
import { ScrollView,  TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'

const SearchScreen = () => {
  const [friendData, setFriendData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const { token, friends, id } = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get(`${API_URL}/search`, {
      params: {
        q: searchQuery
      },
      headers: {
        'X-Authorization': token,
        'Content-Type': 'application/json'
      }
    }).then(data => setFriendData(data.data))
      .catch(err => console.error(err))
  }, [searchQuery]);

  const addFriend = (id) => {
    axios.post(`${API_URL}/user/${id}/friends`, {}, {
      headers: {
        'X-Authorization': token,
        'Content-Type': 'application/json'
      }
    }).then(data => console.log(data.data))
      .catch(err => console.error(err))
  }

  const isFriend = (id) => {
    const exists = friends.some(({ user_id }) => user_id === id);
    if (exists) {
      return <Text>You're friends already</Text>
    } else {
      return <MaterialIcons name="add-task" size={24} color="green" />
    }
  }

  return (
    <ScrollView>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>First Name</DataTable.Title>
          <DataTable.Title>Last Name</DataTable.Title>
          <DataTable.Title>Add Friend</DataTable.Title>
        </DataTable.Header>

        {friendData
          .filter((data) => data.user_id !== id)
          .map((user) => (
            <TouchableOpacity key={user.user_id} onPress={() => navigation.navigate('User', {id: user.user_id})}>
            <DataTable.Row  >
              <DataTable.Cell>{user.user_givenname}</DataTable.Cell>
              <DataTable.Cell>{user.user_familyname}</DataTable.Cell>
              <DataTable.Cell>
                <TouchableOpacity onPress={() => addFriend(user.user_id)}>
                  {isFriend(user.user_id)}
                </TouchableOpacity>
              </DataTable.Cell>
            </DataTable.Row>
            </TouchableOpacity>
          ))}

      </DataTable>
    </ScrollView>
  );


}
export default SearchScreen; 
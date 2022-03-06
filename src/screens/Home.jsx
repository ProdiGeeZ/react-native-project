import axios from "axios";
import { Button, ScrollView, Text, View } from "native-base";
import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, TextInput } from "react-native";
import { API_URL } from '../../consts.json';
import { UserContext } from "../context/UserContext";


const Home = () => {
  const user = useContext(UserContext);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/user/${user.id}/friends`, {
      headers: {
        'X-Authorization': user.token,
        'Content-Type': 'application/json'
      }
    }).then(data => user.setFriends(data.data))
      .catch(err => console.log(err))
  }, [user.rerender]);

  const post = () => {
    axios.post(`${API_URL}/user/${user.id}/post`, {
      text
    }, {
      headers: {
        'X-Authorization': user.token,
        'Content-Type': 'application/json'
      }
    }).then(() => setText(''))
      .catch((err) => console.log(err))
    user.setRerender(!user.rerender);
  }

  return (
    <ScrollView style={styles.root}>
      <View >
        <TextInput
          style={{ backgroundColor: '#d3d3d3' }}
          label='Add a new post'
          mode="outline"
          numberOfLines={5}
          value={text}
          onChangeText={text => setText(text)}
          placeholder="Type Something..."
        />
        <Button onPress={() => post()}> Post</Button>
      </View>



    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 25,
  }
})
export default Home; 
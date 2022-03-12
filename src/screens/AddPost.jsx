import axios from "axios";
import { Button, ScrollView, View } from "native-base";
import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, TextInput } from "react-native";
import { API_URL } from '../../consts.json';
import { UserContext } from "../context/UserContext";


const AddPost = (props) => {
  const {id, token, rerender, setFriends, setRerender} = useContext(UserContext);
  const [text, setText] = useState('');

  let idToUse; 
  const routeID = props.id; 
  if(routeID){
    idToUse = routeID;
  }else{
    idToUse = id; 
  }

  useEffect(() => {
    axios.get(`${API_URL}/user/${id}/friends`, {
      headers: {
        'X-Authorization': token,
        'Content-Type': 'application/json'
      }
    }).then(data => setFriends(data.data))
      .catch(err => console.log(err))
  }, [rerender]);

  const post = () => {
    axios.post(`${API_URL}/user/${idToUse}/post`, {
      text
    }, {
      headers: {
        'X-Authorization': token,
        'Content-Type': 'application/json'
      }
    }).then(() => setText(''))
      .catch((err) => console.log(err))
    setRerender(!rerender);
  }

  return (
    <ScrollView style={styles.root}>
      <View>
        <TextInput
          style={{ 
            backgroundColor: '#ececec',
            borderRadius: 23,
            padding: 10,
            marginBottom: 5
          }}
          label='Add a new post'
          mode="outline"
          numberOfLines={5}
          value={text}
          onChangeText={text => setText(text)}
          placeholder="What's on your mind?"
        />
        <Button style={{
          width: 150,
          alignItems: 'flex-end',
          alignSelf: 'flex-end',
          backgroundColor: '#F02A4B'
        }} onPress={() => post()}> Post</Button>
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
export default AddPost; 
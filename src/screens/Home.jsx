import axios from "axios";
import { Text } from "native-base";
import React, { useEffect } from "react";
import { useContext } from "react";
import { API_URL } from '../../consts.json';
import { UserContext } from "../context/UserContext";


const Home = () => {
  const user = useContext(UserContext);
  useEffect(() => {
    axios.get(`${API_URL}/user/${user.id}/friends`, {
      headers: {
        'X-Authorization': user.token,
        'Content-Type': 'application/json'
      }
    }).then(data => user.setFriends(data.data))
      .catch(err => console.log(err))
  }, [user.rerender]);

  return (
    <Text>
      Hello
    </Text>
  )
}

export default Home; 
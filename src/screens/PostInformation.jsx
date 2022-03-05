import React, { useContext } from 'react';
import { Button, Card, Paragraph, Title, Dialog, Portal } from 'react-native-paper';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'native-base'
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from '../../consts.json'
import { UserContext } from '../context/UserContext';

const PostInformation = ({ route, posts, date, visible, setVisible }) => {

  const user = useContext(UserContext);

  const likePost = async (id) => {
    console.log(route)
    await axios.post(`${API_URL}/user/${route.params.id}/post/${id}/like`, {}, {
      headers: {
        'X-Authorization': user.token,
        'Content-Type': 'application/json'
      }
    });
    user.setRerender(!user.rerender);
  };

  const removeLike = (id) => {
    axios.delete(`${API_URL}/user/${route.params.id}/post/${id}/like`, {
      headers: {
        'X-Authorization': user.token,
        'Content-Type': 'application/json'
      }
    });
    user.setRerender(!user.rerender);
  }

  const isOwnPost = (id) => {
    if (id === user.id) {
      return true;
    }
    return false;
  }

  const deletePost = (post_id) => {
    axios.delete(`${API_URL}/user/${route.params.id}/post/${post_id}`, {
      headers: {
        'X-Authorization': user.token,
        'Content-Type': 'application/json'
      }
    })
    setVisible(!visible);
    user.setRerender(!user.rerender);
  }

  return (
    <View style={styles.recentItem}>
      <View style={{ width: 350 }}>
        <Card key={posts.post_}>
          <Card.Content>
            {isOwnPost(posts.author.user_id) ? (
              <>
                <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => setVisible(true)}>
                  <AntDesign name="ellipsis1" size={24} color="black" />
                </TouchableOpacity>
                <Portal>
                  <Dialog visible={visible} onDismiss={() => setVisible(!visible)}>
                    <Dialog.Title>Post Settings</Dialog.Title>
                    <Dialog.Content>
                      <Paragraph>{ }</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                      <Button color='red' onPress={() => deletePost(posts.post_id)}>Delete Post</Button>
                      <Button onPress={() => setVisible(!visible)}>Cancel</Button>
                    </Dialog.Actions>
                  </Dialog>
                </Portal>
              </>
            ) : null}
            <Title>{!isOwnPost(posts.author.user_id) ? posts.author.first_name : 'You'} wrote: </Title>
            <Paragraph style={[styles.text, styles.activityText]}>
              {posts.text}
            </Paragraph>
            <Text>{' '}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <View style={{
                  backgroundColor: '#1878f3',
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 6,
                }}>
                  <AntDesign name='like2' size={12} color='white' />
                </View>
                <Text>  {posts.numLikes} Likes </Text>
              </View>
              <Text style={{ alignItems: 'flex-end' }}>
                {`${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()} @ ${date.getHours()}:${date.getMinutes()}`}
              </Text>
            </View>

            {!isOwnPost(posts.author.user_id) ? (
              <Card.Actions>
                <TouchableOpacity onPress={() => likePost(posts.post_id)}>
                  <Button color='#ff8f73'><AntDesign name='like2' size={24} color='#ff8f73' /> Like</Button>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeLike(posts.post_id)}>
                  <Button color='#ff8f73'><AntDesign name='dislike2' size={24} color='#ff8f73' /> Dislike</Button>
                </TouchableOpacity>
              </Card.Actions>
            ) : null}
          </Card.Content>
        </Card>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  activityText: {
    color: "#41444B",
    fontWeight: "300"
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16
  },
  text: {
    fontFamily: "monospace",
    color: "#52575D"
  }
});
export default PostInformation
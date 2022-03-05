import React from 'react';
import { View, Text, ScrollView, Image } from 'native-base'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../consts.json'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useState } from 'react';
import { Badge, Button, Caption, Card, List, Paragraph, Title } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';

const UserDetailsScreen = ({ route, navigation }) => {

  const user = useContext(UserContext);
  const [profileData, setProfileData] = useState('');
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${API_URL}/user/${route.params.id}`, {
        headers: {
          'X-Authorization': user.token,
          'Content-Type': 'application/json'
        }
      }).then(data => setProfileData(data.data)).catch(err => console.log(err))

      await axios.get(`${API_URL}/user/${route.params.id}/post`, {
        headers: {
          'X-Authorization': user.token,
          'Content-Type': 'application/json'
        }
      }).then(data => setPostData(data.data)).catch(err => console.log(err))
    }
    fetchData();

    // return () => {
    //   setProfileData('');
    //   setPostData('');
    // }
  }, [setProfileData, setPostData, user.rerender]);

  const likePost = (id) => {
    axios.post(`${API_URL}/user/${route.params.id}/post/${id}/like`, {}, {
      headers: {
        'X-Authorization': user.token,
        'Content-Type': 'application/json'
      }
    })
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              alt='profile image'
              source={{ uri: 'https://www.kindpng.com/picc/m/353-3534825_cool-profile-avatar-picture-cool-profile-hd-png.png' }}
              style={styles.image}
              resizeMode="center" />
          </View>
          <View style={styles.active}></View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "100", fontSize: 22 }]}>{profileData.first_name} {profileData.last_name}</Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{profileData.email}</Text>
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.profileInfo}>
            <Text style={[styles.text, { fontSize: 22 }]}>{postData.length}</Text>
            <Text style={[styles.text, styles.subTitle]}>Posts</Text>
          </View>
          <View style={[styles.profileInfo, { borderColor: "#ff8f73", borderLeftWidth: 1, borderRightWidth: 1 }]} >
            <TouchableOpacity
              onPress={() => navigation.navigate('Friends')}
              style={[styles.profileInfo]}
            >
              <Text style={[styles.text, { fontSize: 22 }]}>{profileData.friend_count}</Text>
              <Text style={[styles.text, styles.subTitle]}>Friends</Text>
            </TouchableOpacity>
          </View>
        </View>


        <Text style={[styles.subTitle, styles.recent]}>Recent Activity</Text>
        <View style={{ alignItems: "center" }}>
          {postData.map((posts) => {
            const date = new Date(posts.timestamp);
            return (
              <View style={styles.recentItem}>
                <View style={{ width: 350 }}>
                  <Card key={posts.post_}>
                    <Card.Title />
                    <Card.Content>
                      <Title>{posts.author.first_name} wrote: </Title>
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

                      <Card.Actions>
                        <TouchableOpacity onPress={() => likePost(posts.post_id)}>
                          <Button color='#ff8f73'><AntDesign name='like2' size={24} color='#ff8f73' /> Like</Button>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => removeLike(posts.post_id)}>
                          <Button color='#ff8f73'><AntDesign name='dislike2' size={24} color='#ff8f73' /> Dislike</Button>
                        </TouchableOpacity>
                      </Card.Actions>
                    </Card.Content>
                  </Card>
                </View>
              </View>
            )
          }
          )}
        </View>


      </ScrollView>
    </SafeAreaView >
  )

}

const styles = StyleSheet.create({
  active: {
    backgroundColor: "#49E20E",
    position: "absolute",
    bottom: 28,
    right: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10
  },
  activityIndicator: {
    backgroundColor: "#ff8f73",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20
  },
  activityText: {
    color: "#41444B",
    fontWeight: "300"
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  profileContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32
  },
  profileInfo: {
    alignItems: "center",
    flex: 1
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden"
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16
  },
  subTitle: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500"
  },
  text: {
    fontFamily: "monospace",
    color: "#52575D"
  }
});
export default UserDetailsScreen; 
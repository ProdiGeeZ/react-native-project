import React, { useState, useContext, useEffect } from 'react';
import { Provider } from 'react-native-paper';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, ScrollView, Image } from 'native-base'
import axios from 'axios';
import { API_URL } from '../../consts.json'
import { UserContext } from '../context/UserContext';
import PostInformation from './PostInformation';

const UserDetailsScreen = ({ route, navigation }) => {

  const user = useContext(UserContext);
  const [profileData, setProfileData] = useState('');
  const [postData, setPostData] = useState([]);
  const [profilePic, setProfilePic] = useState(null)

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

      await fetch(`${API_URL}/user/${route.params.id}/photo`, {
        method: 'GET',
        headers: {
          'X-Authorization': user.token,
        }
      }).then(res => res.blob())
        .then(resBlob => {
          let blob = new Blob([resBlob], { type: 'image/png' })
          let reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = function () {
            setProfilePic(reader.result);
          }
        })
    }
    fetchData();
  }, [setProfileData, setPostData, user.rerender, setProfilePic]);

  return (
    <SafeAreaView style={styles.container}>
      <Provider>
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={{ alignSelf: "center" }} key={user.id}>
            <View style={styles.profileImage}>
              <Image
                alt='profile image'
                source={{ uri: profilePic ? profilePic : 'https://www.kindpng.com/picc/m/353-3534825_cool-profile-avatar-picture-cool-profile-hd-png.png' }}
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
                <PostInformation
                  route={route}
                  key={posts.id}
                  posts={posts}
                  date={date}
                />
              )
            }
            )}
          </View>

        </ScrollView>
      </Provider>
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
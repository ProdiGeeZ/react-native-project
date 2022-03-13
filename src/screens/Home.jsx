import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { API_URL } from '../../consts.json'
import AddPost from './AddPost';
import PostInformation from './PostInformation';
import { Provider } from 'react-native-paper';
import { ScrollView, Text, View } from 'native-base';

const Home = () => {

    const { friends, token, rerender } = useContext(UserContext);
    const [postsData, setPostsData] = useState([]);

    
    useEffect(() => {
        const friendIDs = friends.map((friend) => friend.user_id);
        friendIDs.forEach(async (id) => {
            await axios.get(`${API_URL}/user/${id}/post`, {
                headers: {
                    'X-Authorization': token,
                    'Content-Type': 'application/json'
                }
            })
                .then(({data}) => {
                    data.map((post) => Object.assign(post, {humanID: id}));
                    setPostsData(prev => prev.concat(data))
                })
                .catch(err => console.log(err))
        });
        return () => {
            setPostsData([]);
        }
    },[friends, setPostsData]);

    return (
        <ScrollView>
            <AddPost />
            <Provider>
                <View style={{ alignItems: "center" }}>
                    {postsData.length > 0 ? postsData.map((posts) => {
                        const date = new Date(posts.timestamp);
                        return (
                            <PostInformation
                                key={posts.timestamp}
                                route={{
                                        params:{
                                            id: posts.humanID
                                        }
                                }}
                                posts={posts}
                                date={date}
                            />
                        )
                    }
                    ): <Text> Sorry there's no posts to show </Text>}
                </View>
            </Provider>
        </ScrollView>
    )
}

export default Home;
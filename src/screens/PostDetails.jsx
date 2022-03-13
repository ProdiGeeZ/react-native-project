import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Paragraph, Dialog, TextInput, Portal, Provider } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { LogBox} from 'react-native';
import {API_URL} from '../../consts.json'

const PostDetails = ({ route }) => {
    const { id, token, posts, visible, date, text, isOwnPost, likePost, removeLike, setVisible } = route.params;
    const [source, setSource] = useState('');
    useEffect( () => {
        fetch(`${API_URL}/user/${id}/photo`, {
            method: 'GET',
            headers: {
              'X-Authorization': token,
            }
          }).then(res => res.blob())
            .then(resBlob => {
              let blob = new Blob([resBlob], { type: 'image/png' })
              let reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = function () {
                reader.result;
                setSource(reader.result)
              }
            })
    },[])
    LogBox.ignoreAllLogs();
    return (
        <Provider>
            <Card>
                <Card.Title title={`   ${posts.author.first_name} ${posts.author.last_name}`} left={() => <Avatar.Image size={55} source={{uri:source}}/>} />
                <Card.Content>
                    {isOwnPost(posts.author.user_id) ? (
                        <>
                            <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => setVisible(true)}>
                                <AntDesign name="ellipsis1" size={24} color="black" />
                            </TouchableOpacity>
                            <Portal>
                                <Dialog visible={visible} onDismiss={() => setVisible(!visible)}>
                                    <Dialog.Title>Edit Post</Dialog.Title>
                                    <Dialog.Content>
                                        <TextInput
                                            mode='outline'
                                            value={text}
                                            onChangeText={text => setText(text)}
                                        />
                                    </Dialog.Content>
                                    <Dialog.Actions >
                                        <View style={{ flexDirection: 'row' }}>
                                            <Button style={{ alignItems: 'flex-start' }} color='red' onPress={() => deletePost(posts.post_id)}>Delete Post</Button>
                                            <Button color='green' onPress={() => updatePost(posts.post_id)}>Update Post</Button>
                                            <Button onPress={() => setVisible(!visible)}>Cancel</Button>
                                        </View>
                                    </Dialog.Actions>
                                </Dialog>
                            </Portal>
                        </>
                    ) : null}
                    <Paragraph>{posts.text}</Paragraph>
                    <Text>{'\n'}</Text>

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
                            <Text>{'\n'}</Text>

                        </View>
                        <Text style={{ alignItems: 'flex-end' }}>
                            {`${JSON.stringify(date.getFullYear())}-${JSON.stringify((date.getMonth() + 1))}-${JSON.stringify(date.getDate())} @ ${JSON.stringify(date.getHours())}:${JSON.stringify(date.getMinutes())}`}
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
        </Provider>
    )
}
export default PostDetails;
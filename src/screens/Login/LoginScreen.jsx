import axios from 'axios';
import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import {API_URL} from '../../../consts.json'
import Logo from '../../../assets/images/rocket.png'
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';

const LoginScreen = ({setToken, setId}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { height } = useWindowDimensions();

    const onLoginPressed = () => {
        console.log('login pressed!');
       axios.post(`${API_URL}/login`, {email,password})
       .then((res) => {
           console.log(res);
            // setToken(res.token);
            // setId(res.id)
       }).catch((err) => {
           console.warn(err);
       })
    }
    return (
        <View style={styles.root}>
            <Image
                source={Logo}
                style={[styles.logo, { height: height * 0.2 }]}
                resizeMode="contain" />
            <Text style={styles.text}>
                Spacebook
            </Text>
            <CustomInput
                placeholder='Email'
                value={email}
                setValue={setEmail}
            />
            <CustomInput
                placeholder='Password'
                value={password}
                setValue={setPassword}
                secure 
            />
           <CustomButton
            text='Login'
            onPress={onLoginPressed}/>
        </View>

    )
};


const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        paddingTop: 50,
    },
    logo: {
        width: '70%',
        maxWidth: 200,
        maxHeight: 200,
    },
    text: {
        paddingBottom: 50,
        fontSize: 28,
    }
});

export default LoginScreen;

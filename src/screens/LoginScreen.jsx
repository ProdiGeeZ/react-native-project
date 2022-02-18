import axios from 'axios';
import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import { API_URL } from '../../consts.json'
import Logo from '../../assets/images/rocket.png'
import CustomButton from '../components/CustomButton/CustomButton';
import CustomInput from '../components/CustomInput/CustomInput';

const LoginScreen = ({ screenProps, navigation }) => {
	const { setId, setToken, token } = screenProps;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { height } = useWindowDimensions();

	const onLoginPressed = () => {
		axios.post(`${API_URL}/login`, { email, password })
			.then(({ data }) => {
				setToken(data.token);
				setId(data.id);
				console.log(`done - heres the token ${token}`);
				// TODO: Navigate to next screen
			}).catch((err) => {
				//TODO: Validation
				console.warn(err);
			})
	}

	const redirectToSignUp = () => {
		navigation.navigate('SignUp');
	}

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
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
					onPress={onLoginPressed}
					type='PRIMARY' />
				<Text style={{ width: 50, textAlign: 'center' }}>OR</Text>
				<CustomButton
					text="Don't have an account? Register"
					onPress={redirectToSignUp}
					type='SECONDARY' />
			</View>
		</ScrollView>
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

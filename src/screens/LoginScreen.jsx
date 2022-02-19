import axios from 'axios';
import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { Icon, Input, FormControl, WarningOutlineIcon, Button } from 'native-base';
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { API_URL } from '../../consts.json';
import Logo from '../../assets/images/rocket.png'

const LoginScreen = ({ screenProps, navigation }) => {
	const { setId, setToken, token } = screenProps;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);

	const onLoginPressed = () => {
		axios.post(`${API_URL}/login`, { email, password })
			.then(({ data }) => {
				setToken(data.token);
				setId(data.id);
				console.log(`done - heres the token ${token}`);
				// TODO: Navigate to next screen
			}).catch((err) => {
				setError(!error);
				console.warn(err);
			})
	}

	const redirectToSignUp = () => {
		navigation.navigate('SignUp');
	}

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
			<ImageBackground
				source={Logo}
				style={styles.logo}
			/>
			<View>
				<Text style={styles.brandViewText}>Spacebook</Text>
			</View>

			<View style={styles.bottomView}>
				<View style={{ padding: 30 }}>
					<Text style={styles.heading}>Welcome</Text>
					<Text>Don't have an account?
						<Text style={styles.registerTxt}>{' '} Register now</Text>
					</Text>

					{/* Form inputs */}
					<View>
						<FormControl isInvalid={error} style={styles.formControl}>
							<Input
								variant='underlined'
								keyboardType='email-address'
								InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />}
								placeholder="Enter Email"
								onChangeText={text => setEmail(text)}
							/>
							<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
								Email/Password is incorrect
							</FormControl.ErrorMessage>
						</FormControl>
						<FormControl isInvalid={error} style={styles.formControl}>
							<Input
								variant='underlined'
								InputLeftElement={<Icon as={<AntDesign name="lock" />} size={5} ml="2" color="muted.400" />}
								placeholder="Enter password"
								onChangeText={text => setPassword(text)}
							/>
							<FormControl.HelperText>
								Must be atleast 6 characters.
							</FormControl.HelperText>
							<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
								Email/Password is incorrect
							</FormControl.ErrorMessage>
						</FormControl>

						<View style={styles.button}>
							<Button rounded style={styles.login}>
								<Text> Login </Text>
							</Button>
						</View>
					</View>
				</View>
			</View>
		</ScrollView >
	)
};


const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		backgroundColor: '#ff8f73',
		paddingTop: 25,
	},
	brandViewText: {
		textAlign: 'center',
		color: 'white',
		fontSize: 40,
		fontWeight: 'bold',
		textTransform: 'uppercase'
	},
	button: {
		height: 100,
		justifyContent: 'center',
		alignItems: 'center'
	},
	bottomView: {
		flex: 3,
		backgroundColor: 'white',
		borderTopStartRadius: 60,
		borderTopEndRadius: 60,
		height: '100%'
	},
	formControl: {
		padding: 10,
	},
	heading: {
		color: '#f27d0c',
		fontSize: 34,
	},
	logo: {
		height: Dimensions.get('window').height / 2,
	},
	login: {
		alignSelf: 'center',
		backgroundColor: '#ff8f73',
		width: Dimensions.get('window').width / 2,
		justifyContent: 'center'
	},
	registerTxt: {
		color: '#ff8f73',
		fontStyle: 'italic'
	}
});

export default LoginScreen;

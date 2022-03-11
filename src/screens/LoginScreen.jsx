import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Icon, Input, FormControl, WarningOutlineIcon, Button } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { API_URL } from '../../consts.json';
import Logo from '../../assets/images/rocket.png';
import { UserContext } from '../context/UserContext';

const LoginScreen = ({ navigation }) => {
	const user = useContext(UserContext);
	const { password, setPassword } = user;

	// local states
	const [email, setEmail] = useState('');
	const [error, setError] = useState(false);

	const onLoginPressed = async () => {
		await setError(false);
		axios.post(`${API_URL}/login`, { email, password })
			.then(async ({ data }) => {
				await user.setToken(data.token);
				await user.setId(data.id);
				console.log(`done - heres the token ${user.token} ${user.id}`);
				navigation.navigate('Welcome');
			}).catch(async (err) => {
				console.log(err);
				await setError(!error);
			})
	}

	const redirectToSignUp = () => {
		navigation.navigate('SignUp');
	}

	return (
		<KeyboardAwareScrollView style={styles.container} >
			<View style={{ flex: 2 }}>
				<Image
					source={Logo}
					style={styles.logo}
				/>
				<Text style={styles.brandViewText}>Spacebook</Text>
			</View>
			<View style={{ flex: 4 }, [styles.bottomView]}>
				{/* Form inputs */}
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
						secureTextEntry
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
					<Button
						size="lg"
						variant="outline"
						colorScheme={'rgb(255,143,115)'}
						color='white'
						onPress={() => onLoginPressed()}
						width='45%'
					>
						Login
					</Button>
				</View>
				<TouchableOpacity onPress={() => redirectToSignUp()}>
					<Text style={{ color: 'grey', textAlign: 'center' }}>Don't have an account?
						<Text style={styles.registerTxt}>{' '}Register now</Text>
					</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAwareScrollView >
	)
};


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ff8f73',
		paddingTop: 15
	},
	brandViewText: {
		textAlign: 'center',
		color: 'white',
		fontSize: 28,
		fontWeight: 'bold',
		textTransform: 'uppercase'
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 25,
		paddingTop: 5,
	},
	bottomView: {
		marginTop: 'auto',
		padding: 30,
		backgroundColor: 'white',
		borderTopStartRadius: 60,
		borderTopEndRadius: 60,
		height: Dimensions.get('window').height / 2.2
	},
	formControl: {
		padding: 20,
	},
	heading: {
		color: '#f27d0c',
		fontSize: 34,
	},
	logo: {
		height: Dimensions.get('window').height / 2,
		width: Dimensions.get('window').width
	},
	login: {
		alignSelf: 'center',
		backgroundColor: '#ff8f73',
		justifyContent: 'center'
	},
	registerTxt: {
		color: '#ff8f73',
		fontStyle: 'italic'
	}
});

export default LoginScreen;

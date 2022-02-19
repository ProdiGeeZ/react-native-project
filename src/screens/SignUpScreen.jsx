import React, { useState } from 'react';
import axios from 'axios';
import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { API_URL } from '../../consts.json'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Logo from '../../assets/images/rocket.png';
import { FormControl, Icon, Input, WarningOutlineIcon, Button, ScrollView } from 'native-base';
import { MaterialIcons, Entypo } from "@expo/vector-icons"

const SignUpScreen = ({
  screenProps,
  navigation,
}) => {
  const { setId } = screenProps;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const onRegisterPressed = async () => {
    await setError(false);
    axios.post(`${API_URL}/user`, { first_name: firstName, last_name: lastName, email, password })
      .then(async ({ data }) => {
        console.log(`hello - ${data.id}`);
        await setId(data.id);
        navigation.goBack();
      }).catch(async (err) => {
        await setError(!error)
      })
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Image
            source={Logo}
            style={styles.logo}
          />
          <Text style={styles.registerText}>Register</Text>
        </View>
        <View style={{ flex: 5 }, [styles.root]}>
          <FormControl isInvalid={error} style={styles.formControl}>
            <Input
              variant='underlined'
              InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />}
              placeholder="First Name"
              onChangeText={text => setFirstName(text)}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Invalid info
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={error} style={styles.formControl}>
            <Input
              variant='underlined'
              InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />}
              placeholder="Last Name"
              onChangeText={text => setLastName(text)}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Invalid info
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={error} style={styles.formControl}>
            <Input
              variant='underlined'
              keyboardType='email-address'
              InputLeftElement={<Icon as={<Entypo name="email" />} size={5} ml="2" color="muted.400" />}
              placeholder="Email"
              onChangeText={text => setEmail(text)}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Invalid info
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={error} style={styles.formControl}>
            <Input
              variant='underlined'
              secureTextEntry
              InputLeftElement={<Icon as={<Entypo name="lock" />} size={5} ml="2" color="muted.400" />}
              placeholder="Password"
              onChangeText={text => setPassword(text)}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Invalid info
            </FormControl.ErrorMessage>
          </FormControl>

          <View style={styles.button}>
            <Button
              size="lg"
              variant="outline"
              colorScheme={'rgb(255,143,115)'}
              color='white'
              onPress={() => onRegisterPressed()}
              width='45%'
            >
              Register
            </Button>
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: 'grey', textAlign: 'center' }}>Go back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>

  )
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 25,
    paddingTop: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#ff8f73'
  },
  formControl: {
    paddingBottom: 10,
  },
  logo: {
    height: Dimensions.get('window').height / 2,
    width: Dimensions.get('window').width
  },
  registerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  root: {
    marginTop: 'auto',
    padding: 30,
    backgroundColor: 'white',
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    height: Dimensions.get('window').height / 1.85
  }
});

export default SignUpScreen;

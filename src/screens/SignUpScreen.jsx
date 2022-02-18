import React, { useState } from 'react';
import axios from 'axios';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton/CustomButton';
import CustomInput from '../components/CustomInput/CustomInput';
import { API_URL } from '../../consts.json'

const SignUpScreen = ({
  screenProps,
  navigation,
}) => {
  const { setId } = screenProps;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegisterPressed = () => {
    console.log('signup clicked');
    axios.post(`${API_URL}/user`, { first_name: firstName, last_name: lastName, email, password })
      .then(({ data }) => {
        setId(data.id);
        navigation.goBack();
      }).catch((err) => {
        //TODO: Validation
        console.warn(err);
      })
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.text}>Just need a few details..</Text>
        <CustomInput
          placeholder='First Name'
          value={firstName}
          setValue={setFirstName}
        />
        <CustomInput
          placeholder='Last Name'
          value={lastName}
          setValue={setLastName}
        />
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
          text='Register'
          onPress={onRegisterPressed}
          type='PRIMARY'
        />
        <CustomButton
          text='Back to login'
          onPress={() => { navigation.goBack() }}
          type='SECONDARY'
        />
      </View>
    </ScrollView>

  )
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingTop: 50,
  },
  text: {
    paddingBottom: 50,
    fontSize: 28,
  }
});

export default SignUpScreen;

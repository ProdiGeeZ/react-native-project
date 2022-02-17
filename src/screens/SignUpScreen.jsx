import React from 'react';
import { Text, View } from 'react-native';
import CustomButton from '../components/CustomButton/CustomButton';

const SignUpScreen = ({
  navigation,
}) => (
  <View>
    <Text>SignUpScreen</Text>
    <CustomButton
      text='Back to login'
      onPress={() => { navigation.navigate('Login') }}
      type='SECONDARY' />
  </View>
);

export default SignUpScreen;

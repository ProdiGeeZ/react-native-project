import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {  StyleSheet, View } from 'react-native';
import LoginScreen from './src/screens/Login/LoginScreen';

export default function App() {
  const [toke,setToken] = useState('');
  const [id,setId] = useState('');
  return (
    <View style={styles.root}>
      <LoginScreen setToken={setToken} setId={setId}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  root:{
    flex: 1,
    backgroundColor: '#F9FbFc'
  }
});

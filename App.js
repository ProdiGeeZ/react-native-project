import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Navigator from './routes/stack'

export default function App() {
  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  return (
    <View style={styles.root}>
      <Navigator screenProps={{
        token,
        setToken,
        id,
        setId,
      }} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FbFc'
  }
});

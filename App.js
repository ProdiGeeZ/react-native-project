import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Navigator from './src/navigation';
import { NativeBaseProvider } from 'native-base';

export default function App() {
  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  return (
    <NativeBaseProvider style={styles.root}>
      <Navigator
        screenProps={{
          token,
          setToken,
          id,
          setId,
        }}
        headerMode={false} />
      <StatusBar style="auto" />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    // flex: 1,
    backgroundColor: '#F9FbFc'
  }
});

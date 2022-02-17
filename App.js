import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Navigator from './routes/stack'

export default function App() {
  const [toke, setToken] = useState('');
  const [id, setId] = useState('');
  return (
    <View style={styles.root}>
      {/* TODO: Figure out how to pass states to first component in Navigator */}
      <Navigator />
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

import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

const CustomButton = ({ onPress, text}) => (
    <Pressable onPress={onPress} style={styles.container}>
        <Text style={styles.text}>{text}</Text>
    </Pressable>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'orange',
        width: '50%',
        padding: 15,
        marginVertical: 15,
        alignItems: 'center',
        borderRadius: 20
    },
    text:{
        fontWeight: 'bold',
        color: 'white'
    },
})

export default CustomButton;

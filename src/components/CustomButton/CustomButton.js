import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

const CustomButton = ({ onPress, text, type }) => (
    <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
        <Text style={styles.text}>{text}</Text>
    </Pressable>
);

const styles = StyleSheet.create({
    container: {
        width: '50%',
        padding: 15,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 20
    },
    container_PRIMARY: {
        backgroundColor: '#f27d0c',
    },
    container_SECONDARY: {
        backgroundColor: '#757676'
    },
    text: {
        fontWeight: 'bold',
        color: 'white'
    },
})

export default CustomButton;

import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';

const CustomInput = ({value, placeholder, setValue, secure}) => (
    <View style={styles.container}>
        <TextInput 
         onChangeText={value => setValue(value)}
        placeholder={placeholder} 
        style={styles.input} 
        value={value}
        secureTextEntry={secure}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width:'80%',
        borderColor: '#e8e8e8',

        borderWidth:1,
        borderRadius: 5,

        paddingHorizontal:10,
        marginVertical: 10,
    },
    input: {}
});

export default CustomInput;

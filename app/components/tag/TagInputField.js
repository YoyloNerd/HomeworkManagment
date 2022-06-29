import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, TextInput, TouchableOpacity, Switch, } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../../config/colors';
import AppText from '../tools/AppText';

export default TagInputField = ({ addTag, pickColor, pickingColor, color }) => {

    //set default color if needed
    if (color == null) { color = '#fff' }

    //name variable
    const [name, setTagName] = useState(null);

    const handleAddTag = (value) => {
        //check if variable are set
        if (name == null) return;

        //add tag
        addTag(name, color);
        setTagName(null);
        pickColor(false);

        //reset color
        color = '#fff';
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <TextInput style={styles.inputField} value={name} onChangeText={text => setTagName(text)} placeholder={'Name'} placeholderTextColor={colors.black} />

            <AppText> || </AppText>

            <TouchableOpacity onPress={() => pickColor(!pickingColor)}>
                <View style={[styles.button, { backgroundColor: color }]}>
                    <AppText>Color</AppText>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleAddTag()}>
                <View style={styles.button}>
                    <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondary,
        marginHorizontal: 20,
        borderRadius: 12,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        width: '90%',
    },
    inputField: {
        color: colors.black,
        height: 50,
        flex: 3,
    },
    button: {
        height: 30,
        borderRadius: 5,
        paddingHorizontal: 5,
        marginLeft: 5,
        backgroundColor: colors.accent,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
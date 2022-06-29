import React from 'react';
import { StyleSheet, View, TouchableOpacity, } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import AppText from '../tools/AppText';
import colors from '../../config/colors';

export default Tag = ({ tag, deleteTask, handleShowInfo }) => {

    return (
        <TouchableOpacity onPress={() => handleShowInfo(tag)} style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={[styles.indexContainer, { backgroundColor: tag.color }]}>
                </View>
                <View style={styles.tagContainer}>
                    <AppText style={styles.tag}>{tag.label}</AppText>
                    <TouchableOpacity onPress={() => deleteTask()}>
                        <MaterialIcons style={styles.delete} name="delete" size={18} color='#000' />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    indexContainer: {
        borderRadius: 12,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: '100%',
    },
    index: {
        color: colors.black,
        fontSize: 20,
    },
    tagContainer: {
        backgroundColor: colors.secondary,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        minHeight: 50,
    },
    tag: {
        color: colors.black,
        fontSize: 16,
        flexGrow: 1,
        maxWidth: '80%',
    },
    delete: {
        paddingHorizontal: 5,
    },
    type: {
        borderRadius: 12,
        backgroundColor: colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
    }
});
import React, { useState } from 'react';
import { Keyboard, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from '../tools/AppText';
import ScreenView from '../tools/ScreenView';
import colors from '../../config/colors';

export default TagInfo = ({ item, setShowingInfo }) => {
    return (
        <ScreenView style={styles.container}>
            <TouchableOpacity onPress={() => setShowingInfo(false)} style={{ flex: 1 }}>
                <View style={styles.infoContainer}>
                    <View style={styles.row}>
                        <AppText style={styles.header}>Name: </AppText>
                        <AppText>{item.label}</AppText>
                    </View>
                    <View style={styles.row}>
                        <AppText style={styles.header}>Value: </AppText>
                        <AppText>{item.value}</AppText>
                    </View>
                    <View style={styles.row}>
                        <AppText style={styles.header}>Color: </AppText>
                        <AppText style={{backgroundColor:item.color}}>{item.color}</AppText>
                    </View>
                </View>
            </TouchableOpacity>
        </ScreenView>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        borderRadius: 12,
        bottom: 20,
        left: 20,
        width: '91%',
        height: '108%',
        backgroundColor: colors.secondary,
        padding: 20,
        zIndex: 1
    },
    infoContainer: {
        flex: 1,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
    }
})
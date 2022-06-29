import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from '../tools/AppText';
import ScreenView from '../tools/ScreenView';
import colors from '../../config/colors';

export default TaskInfo = ({ item, setShowingInfo }) => {
    let tag = item[1];
    item = item[0]
    const dateConverter = (date) => {
        const dateArr = new Date(date).toLocaleString().split(' ');
        if (!dateArr[2]) {
            return dateArr[1] + ' ' + dateArr[3]+ ' ' + dateArr[5] + ' at: ' + dateArr[4] ;
        } else {
            return dateArr[1] + ' ' + dateArr[2] + ' ' + dateArr[4] + ' at: ' + dateArr[3];
        }
    }
    let actualDeadline = dateConverter(item.actualDeadline)
    let personalDeadline = dateConverter(item.personalDeadline)
    return (
        <ScreenView style={styles.container}>
            <TouchableOpacity onPress={() => setShowingInfo(false)} style={{ flex: 1 }}>
                <View style={styles.infoContainer}>
                    <View style={styles.row}>
                        <AppText style={styles.header}>Title: </AppText>
                        <AppText>{item.title}</AppText>
                    </View>
                    <View style={styles.row}>
                        <AppText style={styles.header}>Description: </AppText>
                        <AppText>{item.description}</AppText>
                    </View>
                    <View style={styles.row}>
                        <AppText style={styles.header}>Tag: </AppText>
                        <AppText style={{backgroundColor: tag.color}}>{tag.label}</AppText>
                    </View>
                    <View style={styles.row}>
                        <AppText style={styles.header}>Actual deadline: </AppText>
                        <AppText>{actualDeadline}</AppText>
                    </View>
                    <View style={styles.row}>
                        <AppText style={styles.header}>Personal deadline: </AppText>
                        <AppText>{personalDeadline}</AppText>
                    </View>
                    <View style={styles.row}>
                        <AppText style={styles.header}>Estimated time: </AppText>
                        <AppText>{item.estimatedTime} min</AppText>
                    </View>
                    <View style={styles.row}>
                        <AppText style={styles.header}>Status: </AppText>
                        <AppText style={{ backgroundColor: item.status == '1' ? colors.red : colors.green }}>{item.status == '1' ? 'To do' : 'Completed'}</AppText>
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
        marginRight: 15,
    }
})
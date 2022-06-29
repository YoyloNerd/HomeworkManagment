import React, { useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import AppText from '../tools/AppText';
import colors from '../../config/colors';
import GestureRecognizer from 'react-native-swipe-gestures';

export default Task = ({ task, tagName, tagColor, deleteTask, handleShowInfo, handleChecked }) => {
    const animatedWidthVal = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

    const dateConverter = (date) => {
        const dateArr = new Date(date).toLocaleString().split(' ');
        if (!dateArr[2]) {
            return dateArr[1] + ' ' + dateArr[3] + ' ' + dateArr[5] + ' at: ' + dateArr[4];
        } else {
            return dateArr[1] + ' ' + dateArr[2] + ' ' + dateArr[4] + ' at: ' + dateArr[3];
        }
    }

    const isDue = (date) => {
        const curDate = new Date();
        const dueDate = new Date(date);
        return dueDate < curDate;
    }

    const config = {
        velocityThreshold: 0.333,
        directionalOffsetThreshold: 1000
    };
    const [swiped, setSwiped] = useState(0);
    const [curSwiped, setCurSwiped] = useState(0);

    //convert dates to local time
    const actualDeadline = dateConverter(task.actualDeadline)
    const personalDeadline = dateConverter(task.personalDeadline)


    const handleSwipe = (direction) => {
        //set swiped minus or plus 1 depending on direction
        //clamp swiped between -1 and 1
        let temp = Math.max(-1, Math.min(1, swiped + direction));
        setSwiped(temp);
        if (temp === 0) {
            Animated.timing(
                animatedWidthVal,
                {
                    toValue: 0,
                    duration: 125,
                    useNativeDriver: false, // <-- Add this
                }
            ).start(() => setCurSwiped(temp))
        } else {
            setCurSwiped(temp);
            Animated.timing(
                animatedWidthVal,
                {
                    toValue: 75,
                    duration: 125,
                    useNativeDriver: false, // <-- Add this
                }
            ).start()
        }
    }

    const handleDelete = () => {
        setSwiped(0);
        setCurSwiped(0);
        deleteTask();
    }
    const setChecked = () => {
        handleChecked(task);
        setSwiped(0);
        setCurSwiped(0);
    }

    return (
        <GestureRecognizer
            onSwipeLeft={() => { handleSwipe(1) }}
            onSwipeRight={() => { handleSwipe(-1) }}
            config={config}
            style={{
                flex: 1,
            }}>
            <View style={styles.container}>
                {curSwiped === -1 ?
                    <Animated.View                 // Special animatable View
                        style={[styles.checkContainer, {
                            width: animatedWidthVal,         // Bind opacity to animated value
                        }]}>
                        <TouchableOpacity style={styles.checkbox} onPress={() => setChecked()}>
                            {task.status == 1 ? <MaterialIcons name="check-box-outline-blank" size={24} color="black" />
                                : <MaterialIcons name="check-box" size={24} color="black" />}
                        </TouchableOpacity>
                    </Animated.View>
                    : <></>}

                <TouchableOpacity onPress={() => handleShowInfo(task)} style={{ flex: 1 }} >
                    <View style={[styles.taskContainer, { backgroundColor: task.status !== '1' ? colors.secondary : isDue(task.personalDeadline) ? isDue(task.actualDeadline) ? colors.red : colors.orange : colors.secondary }]}>
                        <View style={styles.taskRow}>
                            <AppText style={styles.statement}>{task.title}</AppText>
                            <View style={[styles.tag, { backgroundColor: tagColor }]}>
                                <AppText>{tagName}</AppText>
                            </View>
                        </View>
                        <AppText style={styles.statement}>Due: {actualDeadline}</AppText>
                        <AppText style={styles.statement}>Personal: {personalDeadline}</AppText>
                    </View>
                </TouchableOpacity>

                {curSwiped === 1 ?
                    <Animated.View                 // Special animatable View
                        style={[styles.deleteContainer, {
                            width: animatedWidthVal,         // Bind opacity to animated value
                        }]}>
                        <TouchableOpacity onPress={() => handleDelete()}>
                            <MaterialIcons style={styles.delete} name="delete" size={18} color='#000' />
                        </TouchableOpacity>
                    </Animated.View> : <></>}
            </View>
        </GestureRecognizer>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    checkContainer: {
        backgroundColor: colors.secondary,
        borderRadius: 12,
        marginRight: 10,
        width: 75,
    },
    checkbox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteContainer: {
        backgroundColor: colors.secondary,
        borderRadius: 12,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 75,
    },
    index: {
        color: colors.black,
        fontSize: 20,
    },
    taskContainer: {
        borderRadius: 12,
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        minHeight: 50,
    },
    taskRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    statement: {
        color: colors.black,
        fontSize: 16,
        flexGrow: 1,
        maxWidth: '60%',
    },
    delete: {
        paddingHorizontal: 5,
    },
    tag: {
        borderRadius: 12,
        fontSize: 16,
        width: '30%',
        minHeight: 30,
        maxHeight: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
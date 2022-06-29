import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import AppText from '../tools/AppText';
import ScreenView from '../tools/ScreenView';
import colors from '../../config/colors';
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import DatePicker from 'react-native-modern-datepicker';

export default TaskCreation = ({ tagData, addTask, taskVal, setShowing }) => {

    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);

    const [tag, setTag] = useState();
    const onChangeSS = (value) => {
        setTag(value);
    };

    const [showActualDatePicker, setShowActualDatePicker] = useState(false);
    const [showPersonalDatePicker, setShowPersonalDatePicker] = useState(false);
    const [showEstimatedPicker, setShowEstimatedPicker] = useState(false);

    const [actualDeadline, setActualDeadline] = useState('Select Date');
    const [personalDeadline, setPersonalDeadline] = useState('Select Date');
    const [estimatedTime, setEstimatedTime] = useState('00:00');

    const handleAddTask = () => {
        if (title == null ||
            description == null ||
            tag == null ||
            actualDeadline == 'Select Date' ||
            personalDeadline == 'Select Date') { return };
        let time = Number(estimatedTime.split(':')[0]) * 60 + Number(estimatedTime.split(':')[1]);

        addTask({ value: taskVal + 1, title, description, tag, actualDeadline: new Date(actualDeadline), personalDeadline: new Date(personalDeadline), estimatedTime: time, status: '1' });
        setTitle(null);
        setDescription(null);
        setTag(null);

        setActualDeadline('Select Date');
        setPersonalDeadline('Select Date');
        setEstimatedTime('00:00');
        setShowing(false);
    }


    return (
        <ScreenView style={styles.container}>
            <ScrollView onPress={() => { }} style={{ flex: 1 }}>
                <View style={styles.infoContainer}>
                    <View style={styles.row}>
                        <AppText style={styles.header}>Title: </AppText>
                        <TextInput
                            style={styles.inputField}
                            value={title}
                            onChangeText={text => setTitle(text)}
                            placeholder={'Title'}
                            placeholderTextColor={colors.black} />
                    </View>
                    <View style={styles.row}>
                        <AppText style={styles.header}>Description: </AppText>
                        <TextInput
                            style={styles.inputField}
                            value={description}
                            onChangeText={text => setDescription(text)}
                            placeholder={'Description'}
                            placeholderTextColor={colors.black} />
                    </View>
                    <View style={styles.row}>
                        <AppText style={styles.header}>Tag: </AppText>
                        <Dropdown
                            label="Tags"
                            data={tagData}
                            enableSearch
                            value={tag}
                            onChange={onChangeSS}
                        />
                    </View>
                    <View>
                        <View style={styles.row}>
                            <AppText style={styles.header}>Actual deadline: </AppText>
                            <TouchableOpacity style={styles.button} onPress={() => setShowActualDatePicker(!showActualDatePicker)}>
                                <AppText>{actualDeadline}</AppText>
                            </TouchableOpacity>
                        </View>
                        {showActualDatePicker ? <DatePicker
                            selectorStartingYear={2000}
                            onSelectedChange={selectedDate => setActualDeadline(selectedDate)}
                        /> : <></>}
                    </View>
                    <View>
                        <View style={styles.row}>
                            <AppText style={styles.header}>Personal deadline: </AppText>
                            <TouchableOpacity style={styles.button} onPress={() => setShowPersonalDatePicker(!showPersonalDatePicker)}>
                                <AppText>{personalDeadline}</AppText>
                            </TouchableOpacity>
                        </View>
                        {showPersonalDatePicker ? <DatePicker
                            selectorStartingYear={2000}
                            onSelectedChange={selectedDate => setPersonalDeadline(selectedDate)}
                        /> : <></>}
                    </View>
                    <View>
                        <View style={styles.row}>
                            <AppText style={styles.header}>Estimated time: </AppText>
                            <TouchableOpacity style={styles.button} onPress={() => setShowEstimatedPicker(!showEstimatedPicker)}>
                                <AppText>{estimatedTime}</AppText>
                            </TouchableOpacity>
                        </View>
                        {showEstimatedPicker ? <DatePicker
                            mode="time"
                            onTimeChange={selectedDate => setEstimatedTime(selectedDate)}
                        /> : <></>}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.row}>
                <TouchableOpacity style={[styles.addButton, { alignItems: 'center' }]} onPress={handleAddTask}>
                    <AppText>Add</AppText>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.addButton, { alignItems: 'center' }]} onPress={() => setShowing(false)}>
                    <AppText>cancel</AppText>
                </TouchableOpacity>
            </View>
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
        zIndex: 1,
    },
    button: {
        backgroundColor: colors.accent,
        borderRadius: 12,
        padding: 10,
    },
    addButton: {
        backgroundColor: colors.accent,
        borderRadius: 12,
        padding: 5,
        marginHorizontal: 5,
        width: '48%',
    },
    infoContainer: {
        flex: 1,
    },
    inputField: {
        flex: 1,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginRight: 15,
        marginVertical: 10,
    }
})
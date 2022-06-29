import React, { useState, } from 'react';
import { StyleSheet, View, TouchableOpacity, } from "react-native";
import colors from '../config/colors';
import { MaterialIcons } from '@expo/vector-icons';
import AppText from './tools/AppText';
import DatePicker from 'react-native-modern-datepicker';

export default DateSelect = ({ month, setMonth, year, setYear }) => {
    //all months
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    //date picker variable
    const [showDatePicker, setShowDatePicker] = useState(false);
    
    const handleMonthMin = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    }

    const handleMonthPlus = () => {
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    }

    const handleDatePicked = (selectedDate) => {
        //split date
        let splitDate = selectedDate.split(' ');

        //set variables using split date
        setMonth(Number(splitDate[1])-1);
        setYear(Number(splitDate[0]));
        setShowDatePicker(false);
    }


    return (
        <View style={[styles.container, { height: showDatePicker ? '50%' : '5%' }]}>
            <View style={styles.dateContainer}>
                <TouchableOpacity onPress={() => handleMonthMin()}>
                    <MaterialIcons name="chevron-left" size={40} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setShowDatePicker(!showDatePicker) }}>
                    <View><AppText>{`${months[month]}, ${year}`}</AppText></View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleMonthPlus()}>
                    <MaterialIcons name="chevron-right" size={40} color="black" />
                </TouchableOpacity>
            </View>
            {showDatePicker ? <DatePicker
                mode="monthYear"
                selectorStartingYear={2000}
                onMonthYearChange={selectedDate => handleDatePicked(selectedDate)}
            /> : <></>}

        </View>
    );
}

const styles = StyleSheet.create({
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor: colors.secondary,
        marginHorizontal: 20,
    },
});
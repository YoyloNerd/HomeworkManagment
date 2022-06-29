import React from 'react';
import { StyleSheet, View, TouchableOpacity, } from "react-native";
import AppText from './tools/AppText';
import colors from '../config/colors';
import GestureRecognizer from 'react-native-swipe-gestures';
const data = [
    {
        id: 1,
        name: 'Main',
        color: colors.accent
    },
    {
        id: 2,
        name: 'Add tags',
        color: colors.accent
    },
]
export default Tabs = ({ tabData, selected, setSelected, style }) => {

    //use default values if non provided
    if (tabData == null) tabData = data;
    if (selected == null) selected = 0;
    if (setSelected == null) setSelected = (selection) => { selected = selection };

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };
    const handleSwipe = (direction) => {
        //set swiped minus or plus 1 depending on direction
        //clamp swiped between -1 and 1
        setSelected(Math.max(0, Math.min(tabData.length-1, selected + direction)));

    }
    return (
        <GestureRecognizer
            onSwipeLeft={() => { handleSwipe(-1) }}
            onSwipeRight={() => { handleSwipe(1) }}
            config={config}
        >
            <View style={[styles.container, style]}>{
                tabData.map(item => {
                    return (
                        <TouchableOpacity
                            style={[styles.tab, { backgroundColor: item.id - 1 === selected ? item.color : colors.secondary }]}
                            onPress={() => setSelected(item.id - 1)}
                            key={item.id}>
                            <AppText>{item.name}</AppText>
                        </TouchableOpacity>
                    )
                })
            }
            </View>
        </GestureRecognizer>
    );
}


const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        backgroundColor: colors.secondary,
        marginHorizontal: 20,
        marginBottom: 10,
        padding: 5,
        flexDirection: 'row',
    },
    tab: {
        flex: 1,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
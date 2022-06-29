import React, { useState } from 'react';
import { Keyboard, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';

import AppText from '../components/tools/AppText';
import ScreenView from '../components/tools/ScreenView';

import colors from '../config/colors';
import { selectableColors } from '../config/selectableColors';
import ColorPalette from 'react-native-color-palette';

import Task from '../components/task/Task';
import TaskInfo from '../components/task/TaskInfo';

import Tag from '../components/tag/Tag';
import TagInfo from '../components/tag/TagInfo';
import TagInputField from '../components/tag/TagInputField';
import { tagData } from '../config/Tags';

import Tabs from '../components/Tabs';
import { MultiselectDropdown } from 'sharingan-rn-modal-dropdown';
import { taskData } from '../config/Tasks';
import { taskTabs } from '../config/taskTabs';
import TaskCreation from '../components/task/TaskCreation';

function MainScreen(props) {
    // //get current utc time
    // const [currentTime, setCurrentTime] = useState(new Date().toUTCString());
    // //get local time
    // const date = new Date('2022-06-01T00:00:00.000Z');
    // let newDate = new Date(date.toUTCString());
    // let dateArr = date.toLocaleString().split(' ');
    // const [actualDeadline, setActualDeadline] = useState([dateArr[1], dateArr[2], dateArr[3], dateArr[4]]);
    // console.log(currentTime,actualDeadline,date.toLocaleString())

    //test data
    const [tags, setTags] = useState(tagData);
    const [tasks, setTasks] = useState(taskData);

    //color picker variables
    const [pickingColor, setPickingColor] = useState(false);
    const [color, setColor] = useState('#fff');

    //filter dropdown variables
    const [selectedTags, setSelectedTags] = useState([]);
    const [curMainTab, setCurMainTab] = useState(0);
    const [curTaskTab, setCurTaskTab] = useState(0);
    const [exstend, setExstend] = useState(false);

    //info variables
    const [showingTagInfo, setShowingTagInfo] = useState(false);
    const [tagInfoItem, setTagInfoItem] = useState(null);
    const [showingTaskInfo, setShowingTaskInfo] = useState(false);
    const [taskInfoItem, setTaskInfoItem] = useState(null);
    const [showingTaskCreation, setShowingTaskCreation] = useState(false);
    const [onTagDelete, setOntagDelete] = useState(false);

    const sortArray = (arr) => {
        //sort array by actualDeadline then sort the array by personalDeadline
        let array = arr.sort((a, b) => {
            if (new Date(a.actualDeadline) > new Date(b.actualDeadline)) {
                return 1;
            } else if (new Date(a.actualDeadline) < new Date(b.actualDeadline)) {
                return -1;
            } else {
                return 0;
            }
        }
        );
        return array.sort((a, b) => {
            if (new Date(a.personalDeadline) > new Date(b.personalDeadline)) {
                return 1;
            } else if (new Date(a.personalDeadline) < new Date(b.personalDeadline)) {
                return -1;
            } else {
                return 0;
            }
        })
    }


    const onTagSelect = (value) => {
        setSelectedTags(value);

        if (value.length > 0) {
            setExstend(true);
        } else {
            setExstend(false);
        }
    };

    const addTask = (task) => {
        //add task
        setTasks(sortArray([...tasks, task]));
        Keyboard.dismiss();
    }

    const addTag = (name, color) => {
        setTags([...tags, { value: tags.length + 1, label: name, color }]);
        Keyboard.dismiss();
    }

    const handleShowTagInfo = (tag) => {
        //setup tag info
        setTagInfoItem(tag);
        setShowingTagInfo(true);
        setShowingTaskInfo(false);
        Keyboard.dismiss();
    }

    const handleShowTaskInfo = (task) => {
        //setup task info
        let tag = tags.find(tag => tag.value === task.tag);
        setTaskInfoItem([task, tag]);
        setShowingTaskInfo(true);
        setShowingTagInfo(false);
        Keyboard.dismiss();
    }

    const handleCheckTask = (task) => {
        task.status = task.status === '1' ? '2' : '1';
        //replace task
        setTasks(tasks.map(x => x == task ? task : x));
    }

    const deleteTag = (tag) => {
        //remove task with tag
        setTasks(tasks.filter(x => x.tag != tag.value));
        //clear selectedTags
        setSelectedTags([]);
        setExstend(false);
        //remove tag from tags
        setTags(tags.filter(x => x != tag));
    }

    const deleteTask = (item) => {
        //remove task
        setTasks(tasks.filter((value, index) => value != item));
    }

    return (

        <ScreenView style={styles.container}>
            <AppText style={styles.heading}>Homework</AppText>
            <Tabs selected={curMainTab} setSelected={setCurMainTab} />

            {curMainTab === 0 ?
                <View style={styles.tab} key={onTagDelete}>
                    <Tabs tabData={taskTabs} selected={curTaskTab} setSelected={setCurTaskTab} style={{
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        marginHorizontal: 20,
                        marginBottom: -1,
                        backgroundColor: colors.secondary,
                    }} />
                    <View style={[styles.dropdownContainer, { height: exstend ? 115 : 75 }]}>
                        <MultiselectDropdown
                            label="Sort by"
                            data={tags}
                            chipType="outlined"
                            value={selectedTags}
                            onChange={onTagSelect} />
                    </View>
                    <ScrollView style={styles.taskScrollView}>
                        {
                            //if a tag is only display selected tasks with selected tag else display all tasks
                            tasks.filter(x => x.status == curTaskTab + 1)
                                .filter(x => selectedTags.length == 0 || selectedTags.find(y => y == x.tag))
                                .map((value, index) => {
                                    //get tag using tag value
                                    const tag = tags.find(x => x.value == value.tag);
                                    return (
                                        <View key={index} style={{ paddingVertical: 5, minHeight: 75, }}>
                                            <Task task={value} tagName={tag.label} tagColor={tag.color} handleShowInfo={handleShowTaskInfo} handleChecked={handleCheckTask} deleteTask={() => deleteTask(value)} />
                                        </View>
                                    )
                                })
                        }
                    </ScrollView>
                    {showingTaskInfo ? <TaskInfo item={taskInfoItem} setShowingInfo={setShowingTaskInfo} /> : <></>}
                    {showingTaskCreation ? <TaskCreation addTask={addTask} setShowing={setShowingTaskCreation} tagData={tags} taskVal={tasks[tasks.length - 1].value} /> : <></>}
                    <View style={styles.taskContainer}>
                        <TouchableOpacity style={styles.taskButton} onPress={() => setShowingTaskCreation(true)}>
                            <AppText>Add Task</AppText>
                        </TouchableOpacity>
                    </View>
                </View>
                : <View style={styles.tab}>
                    {pickingColor ?
                        <View>
                            <ColorPalette
                                onChange={selectedColor => setColor(selectedColor)}
                                value={color}
                                colors={selectableColors}
                                title={''}
                            />

                            <TouchableOpacity onPress={() => setPickingColor(!pickingColor)}>
                                <View style={[styles.button, { borderColor: colors.white, borderWidth: 1, backgroundColor: color }]}>
                                    <AppText >Select</AppText>
                                </View>
                            </TouchableOpacity>
                        </View> :
                        <ScrollView style={styles.tagScrollView}>
                            {
                                tags.map((item, index) => {
                                    //check if value contains 'default:'
                                    return (
                                        <View key={index} style={{ paddingBottom: 10 }}>
                                            <Tag tag={item} handleShowInfo={handleShowTagInfo} deleteTask={() => deleteTag(item)} />
                                        </View>
                                    );
                                })
                            }
                            <AppText style={{ color: colors.white }}>Click on tag for more info</AppText>
                        </ScrollView>
                    }
                    {showingTagInfo ? <TagInfo item={tagInfoItem} setShowingInfo={setShowingTagInfo} /> : <></>}
                    <TagInputField addTag={addTag} color={color} pickingColor={pickingColor} pickColor={setPickingColor} />
                </View>}
        </ScreenView >

    );
}

export default MainScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    taskButton: {
        backgroundColor: colors.accent,
        alignItems: 'center',
        borderRadius: 25,
        marginHorizontal: 25,
        padding: 10,
    },
    taskContainer: {
        backgroundColor: colors.secondary,
        borderRadius: 12,
        paddingVertical: 10,
        color: colors.black,
        marginHorizontal: 20,
        marginBottom: 20
    },
    dropdownContainer: {
        backgroundColor: colors.secondary,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        color: colors.black,
        marginHorizontal: 20,
        marginBottom: 5
    },
    heading: {
        fontSize: 30,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        color: colors.white,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.secondary,
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
    taskScrollView: {
        marginBottom: 20,
        marginHorizontal: 20,
    },
    tagScrollView: {
        marginBottom: 90,
        marginHorizontal: 20,
    },
    tab: {
        flex: 1,
    },
})
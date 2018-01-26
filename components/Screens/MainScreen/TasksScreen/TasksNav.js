import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import {
    StackNavigator, TabNavigator
} from 'react-navigation';
import TasksScreen from './TasksScreen';

const mainNavigationOptions = {
    header: null,
}

export default class TasksNav extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Zadania',
    }

    render() {
        const TasksStackNavigator = StackNavigator({
            Tasks: {
                screen: TasksScreen,
                navigationOptions: mainNavigationOptions
            },
        });

        return (
            <TasksStackNavigator screenProps={this.props.screenProps} />
        );
    }
}
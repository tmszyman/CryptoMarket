import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, Button, DrawerLayoutAndroid } from 'react-native';
import {
    StackNavigator, TabNavigator
} from 'react-navigation';
import MainScreen from './components/Screens/MainScreen/MainScreen';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MainScreen />
        );
    }
}
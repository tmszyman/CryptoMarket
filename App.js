import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, Button, DrawerLayoutAndroid } from 'react-native';
import {
    StackNavigator, TabNavigator
} from 'react-navigation';
import MainScreen from './components/Screens/MainScreen/MainScreen';
import WelcomeScreen from './components/Screens/WelcomeScreen/WelcomeScreen';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isUserCreated: false
        };
    }

    launchApp = () => {
        this.setState({
            isUserCreated: true
        });
    }

    componentWillMount = () => {
        this.getData();
    }

    async getData() {
        const playerName = await AsyncStorage.getItem('PlayerName');

        if (playerName != '') {
            this.setState({
                isUserCreated: true
            });
        }
    }

    render() {
        if (this.state.isUserCreated) {
            return (
                <MainScreen />
            )
        }
        else {
            return (
                <WelcomeScreen launchApp={this.launchApp}  />
            );
        }
    }
}
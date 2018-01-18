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
            player: {},
            playerCreated: false
        };
    }

    launchApp = (player) => {
        this.setState({
            player: player,
            playerCreated: true
        });
    }

    render() {
        if (this.state.playerCreated) {
            return (
                <MainScreen player={this.state.player} />
            )
        }
        else {
            return (
                <WelcomeScreen launchApp={this.launchApp}  />
            );
        }
    }
}
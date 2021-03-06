import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import {
    StackNavigator, TabNavigator
} from 'react-navigation';
import WalletScreen from './WalletScreen';

const mainNavigationOptions = {
    header: null,
}

export default class WalletNav extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Portfel',
    }

    render() {
        const WalletStackNavigator = StackNavigator({
            Wallet: {
                screen: WalletScreen,
                navigationOptions: mainNavigationOptions
            },
        });

        return (
            <WalletStackNavigator screenProps={this.props.screenProps} />
        );
    }
}
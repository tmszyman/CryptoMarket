import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import {
    StackNavigator, TabNavigator
} from 'react-navigation';
import ExchangeScreen from './ExchangeScreen';
import BuyCurrencyScreen from './BuyCurrencyScreen/BuyCurrencyScreen';
import SellCurrencyScreen from './SellCurrencyScreen/SellCurrencyScreen';

const mainNavigationOptions = {
    header: null,
}

const additionalNavigationOptions = {
    headerBackTitleStyle: {
        color: '#fff'
    },
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: '#20232a',
        elevation: 0,
    }
}

export default class ExchangeNav extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Giełda',
    }

    render() {
        const ExchangeStackNavigator = StackNavigator({
            Exchange: {
                screen: ExchangeScreen,
                navigationOptions: mainNavigationOptions
            },
            BuyCurrency: {
                screen: BuyCurrencyScreen,
                navigationOptions: additionalNavigationOptions
            },
            SellCurrency: {
                screen: SellCurrencyScreen,
                navigationOptions: additionalNavigationOptions
            },
        });

        return (
            <ExchangeStackNavigator screenProps={this.props.screenProps} />
        );
    }
}
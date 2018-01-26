import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import {
    StackNavigator, TabNavigator
} from 'react-navigation';
import WalletNav from './WalletScreen/WalletNav';
import ExchangeNav from './ExchangeScreen/ExchangeNav';
import TasksNav from './TasksScreen/TasksNav';

export default class MainScreen extends React.Component {
    constructor(props) {
        super(props);

        const player = { ...this.props.player };

        this.state = {
            player: player,
            exchange: {
                cryptocurrencies: [
                    {
                        name: 'Bitcoin',
                        pricePln: 0,
                        updatedDate: new Date()
                    },
                    {
                        name: 'Ethereum',
                        pricePln: 0,
                        updatedDate: new Date()
                    },
                    {
                        name: 'Ripple',
                        pricePln: 0,
                        updatedDate: new Date()
                    },
                    {
                        name: 'Litecoin',
                        pricePln: 0,
                        updatedDate: new Date()
                    },
                    {
                        name: 'IOTA',
                        pricePln: 0,
                        updatedDate: new Date()
                    },
                    {
                        name: 'Lisk',
                        pricePln: 0,
                        updatedDate: new Date()
                    }
                ]
            },
        };
    }

    async componentWillMount() {
        const cryptocurrenciesApiResponse = await fetch(
            'https://api.coinmarketcap.com/v1/ticker/?convert=PLN'
        );

        const cryptocurrenciesApiData = await cryptocurrenciesApiResponse.json();

        const cryptocurrencies = [...this.state.exchange.cryptocurrencies];

        cryptocurrencies.map((cryptocurrency, key) => {
            cryptocurrenciesApiData.map((cryptocurrencyApiData, key) => {
                if (cryptocurrency.name == cryptocurrencyApiData.name) {

                    cryptocurrency.pricePln = cryptocurrencyApiData.price_pln;
                    cryptocurrency.updatedDate = new Date(cryptocurrencyApiData.last_updated * 1000);

                }
            });
        });

        this.setState({
            exchange: {
                cryptocurrencies: cryptocurrencies
            }
        });

    }

    render() {
        const MainTabNavigator = TabNavigator({
            Wallet: {
                screen: WalletNav,
            },
            Exchange: {
                screen: ExchangeNav,
            },
            Tasks: {
                screen: TasksNav,
            },
        }, {
                tabBarPosition: 'top',
                animationEnabled: true,
                tabBarOptions: {
                    upperCaseLabel: false,
                    labelStyle: {
                        fontSize: 16,
                    },
                    indicatorStyle: {
                        backgroundColor: '#fff'
                    },
                    style: {
                        backgroundColor: '#20232a',
                        elevation: 0,
                        borderTopWidth: 24,
                        borderTopColor: '#20232a'
                    },
                }
            });
        return (
            <MainTabNavigator screenProps={this.state} />
        );
    }
}
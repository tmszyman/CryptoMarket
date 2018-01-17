import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, Button, DrawerLayoutAndroid } from 'react-native';
import {
    StackNavigator, TabNavigator
} from 'react-navigation';
import WalletTab from './Tabs/WalletTab/WalletTab';
import ExchangeTab from './Tabs/ExchangeTab/ExchangeTab';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player: {
                name: 'Anon',
                wallet: {
                    updatedDate: new Date(),
                    currencies: [
                        {
                            name: 'PLN',
                            amount: 10000
                        }
                    ],
                    cryptocurrencies: [
                        {
                            name: 'Bitcoin',
                            amount: 0
                        },
                        {
                            name: 'Ethereum',
                            amount: 0,
                        },
                        {
                            name: 'Ripple',
                            amount: 0,
                        },
                        {
                            name: 'Litecoin',
                            amount: 0,
                        },
                        {
                            name: 'IOTA',
                            amount: 0,
                        },
                        {
                            name: 'Lisk',
                            amount: 0,
                        }
                    ]
                },
                transactions: [
                    {
                        id: 0,
                        date: new Date(),
                        entry: {
                            currency: {
                                name: 'PLN',
                                amount: 0
                            },
                            cryptocurrency: {
                                name: 'Bitcoin',
                                amount: 0
                            }
                        },
                        exit: {
                            currency: {
                                name: 'PLN',
                                amount: 0
                            },
                            cryptocurrency: {
                                name: 'Bitcoin',
                                amount: 0
                            }
                        }
                    }
                ]
            },
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

    static navigationOptions = {
        title: 'CryptoMarket',
    }

    componentWillMount() {
        this.getData();
    }

    render() {
        const TabNav = TabNavigator({
            Wallet: {
                screen: WalletTab,
            },
            Exchange: {
                screen: ExchangeTab
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
                        elevation: 0
                    },
                },
            });
        return (
            <TabNav
                screenProps={this.state} />
        );
    }

    async getData() {
        const playerName = await AsyncStorage.getItem('PlayerName');

        /*  this.setState({
             player: {
                 name: playerName
             }
         }); */

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
}
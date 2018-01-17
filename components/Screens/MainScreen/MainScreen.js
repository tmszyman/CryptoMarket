import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import {
    StackNavigator, TabNavigator
} from 'react-navigation';
import WalletNav from './WalletScreen/WalletNav';
import ExchangeNav from './ExchangeScreen/ExchangeNav';

export default class MainScreen extends React.Component {
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

    async getData() {
        const playerName = await AsyncStorage.getItem('PlayerName');
        // to do - set state z imieniem

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

    componentWillMount() {
        // to do - zaladowac obiekt player z prefsow JESLI ISTNIEJE do state tutaj
        // oczywiscie operujemy na kopiach

        this.getData();
    }

    render() {
        const MainTabNavigator = TabNavigator({
            Wallet: {
                screen: WalletNav,
            },
            Exchange: {
                screen: ExchangeNav,
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
                    },
                }
            });
        return (
            <MainTabNavigator screenProps={this.state} />
        );
    }
}
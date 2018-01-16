import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, Button, DrawerLayoutAndroid } from 'react-native';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player: {
                name: '',
            },
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
        };
    }

    static navigationOptions = {
        title: 'Home',
    }

    componentWillMount() {
        this.getData();
    }

    render() {
        const navigationView = (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Text style={{ margin: 10, fontSize: 15, textAlign: 'left' }}>I'm in the Drawer!</Text>
            </View>
        );
        const listCryptocurrencies = this.state.cryptocurrencies.map((cryptocurrency, key) => {
            return (
                <View key={key}>
                    <Text>{cryptocurrency.name}: {cryptocurrency.pricePln} PLN</Text>
                </View>
            );
        });
        return (
            <DrawerLayoutAndroid
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}>
                <View>
                    <Text>Imię: {this.state.player.name}</Text>
                    <Text>Saldo: 0 PLN</Text>
                </View>
                <View>
                    <View><Text>Aktualne ceny kryptowalut:</Text></View>
                    {listCryptocurrencies}
                </View>
            </DrawerLayoutAndroid>
        );
    }

    async getData() {
        const playerName = await AsyncStorage.getItem('PlayerName');

        this.setState({
            player: {
                name: playerName
            }
        });

        const cryptocurrenciesApiResponse = await fetch(
            'https://api.coinmarketcap.com/v1/ticker/?convert=PLN'
        );

        const cryptocurrenciesApiData = await cryptocurrenciesApiResponse.json();

        const cryptocurrencies = [...this.state.cryptocurrencies];

        cryptocurrencies.map((cryptocurrency, key) => {
            cryptocurrenciesApiData.map((cryptocurrencyApiData, key) => {
                if (cryptocurrency.name == cryptocurrencyApiData.name) {
                    
                    cryptocurrency.pricePln = cryptocurrencyApiData.price_pln;
                    cryptocurrency.updatedDate = new Date(cryptocurrencyApiData.last_updated * 1000);

                }
            });
        });

        this.setState({
            cryptocurrencies: cryptocurrencies
        });
    }
}
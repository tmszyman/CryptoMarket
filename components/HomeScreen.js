import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, Button, DrawerLayoutAndroid } from 'react-native';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            bitcoinPrice: 0
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
        return (
            <DrawerLayoutAndroid
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}>
                <View>
                    <Text>Imię: {this.state.text}</Text>
                    <Text>Bitcoin: {this.state.bitcoinPrice} PLN</Text>
                    <Text>Saldo: 0</Text>
                </View>
            </DrawerLayoutAndroid>
        );
    }

    async getData() {
        const value = await AsyncStorage.getItem('Name');

        this.setState({
            text: value
        });

        let response = await fetch(
            'https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=PLN'
        );

        let responseJson = await response.json();

        this.setState({
            bitcoinPrice: responseJson[0].price_pln
        });
    }
}
import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import {
    StackNavigator, TabNavigator
} from 'react-navigation';

export default class WalletScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Portfel',
    }

    render() {
        const listCryptocurrencies = this.props.screenProps.player.wallet.cryptocurrencies.map((cryptocurrency, key) => {
            return (
                <View key={key} style={{ borderBottomWidth: 1, borderBottomColor: '#ececec', paddingTop: 10, paddingBottom: 10 }}>
                    <Text style={{ flexDirection: 'row' }}>{cryptocurrency.name}: {cryptocurrency.amount}</Text>
                </View>
            );
        });

        return (
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={{ marginTop: 15 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ececec', paddingTop: 15, paddingBottom: 15, paddingLeft: 20, paddingRight: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Witaj, {this.props.screenProps.player.name}</Text>
                        <Text style={{ fontSize: 12 }}>Twoje saldo: {this.props.screenProps.player.wallet.currencies[0].amount} {this.props.screenProps.player.wallet.currencies[0].name}</Text>
                    </View>
                    <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                        {listCryptocurrencies}
                    </View>
                </View>
            </ScrollView>
        );
    }
}
import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import {
    StackNavigator, TabNavigator
} from 'react-navigation';
import moment from 'moment/src/moment';

export default class ExchangeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Giełda',
    }

    render() {
        const { navigate } = this.props.navigation;

        const listCryptocurrencies = this.props.screenProps.exchange.cryptocurrencies.map((cryptocurrency, key) => {
            return (
                <View key={key} style={{ borderColor: '#ececec', borderWidth: 1, marginVertical: 10, marginHorizontal: 5}}>
                    <Text style={{ flexDirection: 'row', paddingVertical: 10, textAlign: 'center', borderBottomWidth: 1, borderBottomColor: '#ececec', backgroundColor: 'lightgreen' }}> {cryptocurrency.name}: {cryptocurrency.pricePln} PLN </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: 10}}>
                        <Button style={{ paddingLeft: 5, paddingRight : 5, paddingVertical: 10}}
                        onPress={() => {
                            navigate('BuyCurrency', {
                                cryptocurrencyName: cryptocurrency.name,
                                cryptocurrencyPricePln: cryptocurrency.pricePln
                            })
                        }}
                        title="Kup"
                        />
                        <Button style={{ paddingLeft: 5, paddingRight: 5, paddingVertical: 10}}
                        onPress={() => {
                            navigate('SellCurrency', {
                                cryptocurrencyName: cryptocurrency.name,
                                cryptocurrencyPricePln: cryptocurrency.pricePln
                            })
                        }}
                        title="Sprzedaj"
                        />
                    </View>
                    <Text style={{ paddingTop: 5, paddingBottom: 5, textAlign: 'center', fontSize: 8}}>Last updated: {moment(cryptocurrency.updatedDate).format('dddd, H:mm:ss')}</Text>
                </View>
                

            );
        });

        return (
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={{ paddingTop: 15, paddingLeft: 15, paddingRight: 15 }}>
                    <View style={{ marginTop: 20 }}>
                        {listCryptocurrencies}
                    </View>
                </View>
            </ScrollView>
        );
    }
}
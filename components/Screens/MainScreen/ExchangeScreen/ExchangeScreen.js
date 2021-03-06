import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView, DeviceEventEmitter } from 'react-native';
import {
    StackNavigator, TabNavigator
} from 'react-navigation';
import moment from 'moment/src/moment';

export default class ExchangeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigate } = this.props.navigation;

        const listCryptocurrencies = this.props.screenProps.exchange.cryptocurrencies.map((cryptocurrency, key) => {
            const updatedDate = moment(cryptocurrency.updatedDate);
            return (
                <View key={key} style={{ height: 88, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 16, paddingRight: 16, borderBottomWidth: 1, borderBottomColor: '#ececec' }}>
                    <View>
                        <Text style={{ fontSize: 16 }}>{cryptocurrency.name}</Text>
                        <Text style={{ fontSize: 14 }}>{parseFloat(cryptocurrency.pricePln).toFixed(2)} PLN</Text>
                        <Text style={{ color: 'rgba(0, 0, 0, .54)', fontSize: 14 }}>{updatedDate.local('pl').format('dddd, H:mm:ss')}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Button
                                onPress={() => {
                                    navigate('BuyCurrency', {
                                        cryptocurrencyName: cryptocurrency.name,
                                        cryptocurrencyPricePln: cryptocurrency.pricePln
                                    });
                                }}
                                color='#D32F2F'
                                title="Kup"
                            />
                        </View>
                        <View style={{ marginLeft: 8 }}>
                            <Button
                                onPress={() => {
                                    navigate('SellCurrency', {
                                        cryptocurrencyName: cryptocurrency.name,
                                        cryptocurrencyPricePln: cryptocurrency.pricePln
                                    })
                                }}
                                color='#D32F2F'
                                title="Sprzedaj"
                            />
                        </View>
                    </View>
                </View>

            );
        });

        return (
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={{ paddingTop: 8 }}>
                    {listCryptocurrencies}
                </View>
            </ScrollView>
        );
    }
}
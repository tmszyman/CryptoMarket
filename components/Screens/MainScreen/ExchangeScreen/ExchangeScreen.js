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
                <View key={key} style={{ paddingTop: 5, paddingBottom: 5 }}>
                    <Text style={{ flexDirection: 'row' }}> {cryptocurrency.name}: {cryptocurrency.pricePln} PLN </Text>
                    <Button
                        onPress={() => {
                            navigate('BuyCurrency')
                        }}
                        title="Kup"
                    />
                    <Button
                        onPress={() => {
                            navigate('SellCurrency')
                        }}
                        title="Sprzedaj"
                    />
                    <Text>Updated: {moment(cryptocurrency.updatedDate).format('DD.MM.YYYY, H:mm:ss')}</Text>
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
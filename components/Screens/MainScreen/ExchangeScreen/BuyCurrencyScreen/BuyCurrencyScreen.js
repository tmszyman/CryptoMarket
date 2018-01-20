import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, Button, DeviceEventEmitter } from 'react-native';
import {
    StackNavigator, TabNavigator
} from 'react-navigation';

export default class BuyCurrencyScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            player: this.props.screenProps.player,
            amount: ''
        }
    }

    static navigationOptions = {
        title: 'Kup kryptowalutę',
    }

    render() {
        return (
            <View>
                <View
                    style={{ height: 24 }}>
                </View>
                <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                    <Text style={{
                        fontSize: 16,
                        textAlign: 'center',
                        marginTop: 10
                    }}>Wprowadź ilość</Text>
                    <TextInput
                        style={{ height: 40, marginTop: 15, padding: 10 }}
                        keyboardType='numeric'
                        onChangeText={(value) => this.setState({
                            amount: value
                        })}
                        value={this.state.amount}
                    />
                    <View style={{ marginTop: 15 }}>
                        <Button
                            onPress={this.handleBuyCurrencyButton}
                            title="Kup"
                        />
                    </View>
                </View>
            </View>
        );
    }

    handleBuyCurrencyButton = () => {
        const { goBack } = this.props.navigation;

        const player = { ...this.state.player };
        const cryptocurrencyName = this.props.navigation.state.params.cryptocurrencyName;
        const cryptocurrencyPricePln = this.props.navigation.state.params.cryptocurrencyPricePln;

        player.wallet.currencies[0].amount -= (parseInt(this.state.amount) * cryptocurrencyPricePln);

        player.wallet.cryptocurrencies.map((cryptocurrency, key) => {
            if (cryptocurrency.name == cryptocurrencyName) {
                cryptocurrency.amount += parseInt(this.state.amount);
            }
        });

        this.setState({
            player: player
        });

        AsyncStorage.setItem('Player', JSON.stringify(this.state.player));
        
        DeviceEventEmitter.emit('refreshWallet',  {});

        goBack();
    }
}
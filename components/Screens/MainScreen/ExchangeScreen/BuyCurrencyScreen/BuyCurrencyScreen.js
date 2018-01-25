import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, Modal, TextInput, Button, DeviceEventEmitter } from 'react-native';
import {
    StackNavigator, TabNavigator
} from 'react-navigation';

export default class BuyCurrencyScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            player: this.props.screenProps.player,
            amount: '',
            modalVisible: false,
            transactionValue: '' // TEST CZY DZIALA LICZENIE ASYNC KWOTY
        }
        this.cryptocurrencyName = this.props.navigation.state.params.cryptocurrencyName;
        this.cryptocurrencyPricePln = this.props.navigation.state.params.cryptocurrencyPricePln;
    }
    static navigationOptions = {
        title: 'Kup kryptowalutę',
    }
    openModal() {
        this.setState({ modalVisible: true });
    }

    closeModal() {
        this.setState({ modalVisible: false });
    }
    render() {
        return (
            <View>
                <Modal
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.closeModal()}
                    transparent={true}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
                        <View style={{
                            width: 200, height: 140, backgroundColor: 'white', alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{ textAlign: 'center', textAlignVertical: 'center', padding: 5, margin: 10, color: 'grey' }}>Nie masz wystarczającej ilości środków w portfelu!</Text>
                            <Button
                                color='#D32F2F'
                                onPress={() => this.closeModal()}
                                title="Zamknij"
                            >
                            </Button>
                        </View>
                    </View>
                </Modal>
                <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginTop: 6,
                        marginBottom: 6
                    }} >{this.cryptocurrencyName}:  {this.cryptocurrencyPricePln} PLN {this.transactionValue}</Text>
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
                            amount: value,
                            transactionValue: value * this.cryptocurrencyPricePln
                        })}
                    />
                    <View style={{ marginTop: 15 }}>
                        <Button
                            color='#D32F2F'
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
        if (player.wallet.currencies[0].amount - (parseInt(this.state.amount) * this.cryptocurrencyPricePln) >= 0) {

            player.wallet.currencies[0].amount -= (parseInt(this.state.amount) * this.cryptocurrencyPricePln);
            player.wallet.cryptocurrencies.map((cryptocurrency, key) => {
                if (cryptocurrency.name == this.cryptocurrencyName) {
                    cryptocurrency.amount += parseInt(this.state.amount);
                }
            });

            this.setState({
                player: player
            });

            AsyncStorage.setItem('Player', JSON.stringify(this.state.player));

            DeviceEventEmitter.emit('refreshWallet', {});

            goBack();
        }
        else {
            this.openModal();
        }

    }

}
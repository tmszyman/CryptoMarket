import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, Modal, TextInput, Button, DeviceEventEmitter } from 'react-native';
import {
    StackNavigator, TabNavigator
} from 'react-navigation';

export default class SellCurrencyScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            player: this.props.screenProps.player,
            amount: '',
            modalVisible: false
        }
        this.cryptocurrencyName = this.props.navigation.state.params.cryptocurrencyName;
        this.cryptocurrencyPricePln = this.props.navigation.state.params.cryptocurrencyPricePln;
    }

    static navigationOptions = {
        title: 'Sprzedaj kryptowalutę',
    }
    openModal() {
        this.setState({ modalVisible: true });
    }

    closeModal() {
        this.setState({ modalVisible: false });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Modal
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.closeModal()}
                    transparent={true}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, padding: 20 }}>
                        <View style={{
                            backgroundColor: '#D32F2F', alignItems: 'center', justifyContent: 'center', padding: 15
                        }}>
                            <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: '#fff', marginBottom: 20 }}>Nie masz wystarczającej ilości środków w portfelu!</Text>
                            <Button
                                color='#20232a'
                                onPress={() => this.closeModal()}
                                title="Zamknij"
                            >
                            </Button>
                        </View>
                    </View>
                </Modal>
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 30, paddingLeft: 16, paddingRight: 16 }}>
                <View>
                <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginTop: 6,
                        marginBottom: 6
                    }} >{this.cryptocurrencyName}:  {this.cryptocurrencyPricePln} PLN </Text>
                    <Text style={{
                        fontSize: 16,
                        textAlign: 'center',
                        marginTop: 10
                    }}>Wprowadź ilość</Text>
                    <TextInput
                        style={{ height: 40, color: '#000', marginTop: 15, padding: 10 }}
                        keyboardType='numeric'
                        underlineColorAndroid='rgba(0, 0, 0, 1)'
                        selectionColor='rgba(0, 0, 0, 0.2)'
                        autoCorrect={false}
                        onChangeText={(value) => this.setState({
                            amount: value
                        })}
                        value={this.state.amount}
                    />

<View style={{ paddingLeft: 100, paddingRight: 100, marginTop: 15 }}>
                        <Button
                            color='#D32F2F'
                            onPress={this.handleSellCurrencyButton}
                            title="Sprzedaj"
                        />
                    </View>
                </View>
                </View>
            </View>
        );
    }

    handleSellCurrencyButton = () => {
        const { goBack } = this.props.navigation;

        const player = { ...this.state.player };

        player.wallet.cryptocurrencies.map((cryptocurrency, key) => {
            if (cryptocurrency.name == this.cryptocurrencyName) {
                if (cryptocurrency.amount - parseInt(this.state.amount) >= 0) {
                    cryptocurrency.amount -= parseInt(this.state.amount);
                    player.wallet.currencies[0].amount += (parseInt(this.state.amount) * this.cryptocurrencyPricePln);
                    this.setState({
                        player: player
                    });
                    AsyncStorage.setItem('Player', JSON.stringify(this.state.player));

                    DeviceEventEmitter.emit('refreshWallet', {});
                    
                    DeviceEventEmitter.emit('checkTasks', {});

                    goBack();

                }
                else {
                    this.openModal();
                }

            }
        });
    }
}
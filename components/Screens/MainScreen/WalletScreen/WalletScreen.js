import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, Button, ScrollView, Image, DeviceEventEmitter } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

export default class WalletScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            player: { ...this.props.screenProps.player }
        }
    }

    componentWillMount() {
        this.refreshWallet = DeviceEventEmitter.addListener('refreshWallet', this.refresh);
    }

    componentWillUnmount() {
        this.refreshWallet.remove();
    }

    render() {
        const listCryptocurrencies = this.state.player.wallet.cryptocurrencies.map((cryptocurrency, key) => {
            let icon = 'https://files.coinmarketcap.com/static/img/coins/64x64/'+cryptocurrency.name.toLowerCase()+'.png';   
            return (
                
                <View key={key} style={{ height: 60, justifyContent: 'flex-start', flexDirection: 'row', padding: 5 , alignItems:'center'}}>
                    <Image source={{ uri: icon }} style={{ width: 40, height: 40, borderRadius: 50}} />
                    <Text style={{ fontSize: 18, textAlignVertical: 'center', marginLeft: 10, borderBottomWidth: 1, borderBottomColor: '#ececec'}}>{cryptocurrency.name}: {cryptocurrency.amount}</Text>
                </View>
            );
        });

        return (
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={{ paddingTop: 8 }}>
                    <View style={{ height: 88, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ececec', paddingLeft: 16, paddingRight: 16 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Witaj, {this.state.player.name}</Text>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12 }}>Twoje saldo:</Text>
                            <Text style={{ fontSize: 12 }}>{this.state.player.wallet.currencies[0].amount} {this.props.screenProps.player.wallet.currencies[0].name}</Text>
                        </View>
                    </View>
                    <View style={{ paddingTop: 8, paddingLeft: 16, paddingRight: 16, flexDirection: 'column' }}>
                        {listCryptocurrencies}
                    </View>
                </View>
            </ScrollView>
        );
    }

    refresh = () => {
        this.setState({
            player: { ...this.props.screenProps.player }
        });
    }
}
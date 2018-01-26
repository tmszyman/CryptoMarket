import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, Button, ScrollView, Image, DeviceEventEmitter } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

export default class WalletScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            player: { ...this.props.screenProps.player },
            doneTask: false
        }
    }

    componentWillMount() {
        this.check = DeviceEventEmitter.addListener('checkTasks', this.check);
    }

    componentWillUnmount() {
        this.check.remove();
    }

    render() {
        console.log();
        return (
            <ScrollView style={{ backgroundColor: '#fff', paddingTop: 16, paddingLeft: 16, paddingRight: 16 }}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text>Posiadaj 2 Ethereum</Text>
                    {this.state.doneTask ? 
                    <Text style={{color: '#76FF03'}}>Zrobione</Text>
                    : <Text style={{color: '#F44336'}}>Nie zrobione</Text>
                    }       
                </View>
            </ScrollView>
        );
    }

    check = () => {
        if (this.state.player.wallet.cryptocurrencies[1].amount >= 2) {
            this.setState({
                doneTask: true
            });
        }
    }
}
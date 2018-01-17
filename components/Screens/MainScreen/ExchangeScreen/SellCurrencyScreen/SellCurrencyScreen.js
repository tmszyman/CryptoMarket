import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, Button, DrawerLayoutAndroid } from 'react-native';
import {
    StackNavigator, TabNavigator
} from 'react-navigation';

export default class SellCurrencyScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: 0
        }
    }

    static navigationOptions = {
        title: 'Sprzedaj kryptowalutę',
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
                            onPress={this.handleSellCurrencyButton}
                            title="Sprzedaj"
                        />
                    </View>
                </View>
            </View>
        );
    }

    handleSellCurrencyButton = () => {
        // TO DO - BUY LOGIC
        const { navigate } = this.props.navigation;

        const amount = this.state.amount;


        navigate('Exchange');
    }
}
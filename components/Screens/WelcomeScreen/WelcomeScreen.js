import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player: {
                name: '',
                wallet: {
                    updatedDate: new Date(),
                    currencies: [
                        {
                            name: 'PLN',
                            amount: 0
                        }
                    ],
                    cryptocurrencies: [
                        {
                            name: 'Bitcoin',
                            amount: 0
                        },
                        {
                            name: 'Ethereum',
                            amount: 0,
                        },
                        {
                            name: 'Ripple',
                            amount: 0,
                        },
                        {
                            name: 'Litecoin',
                            amount: 0,
                        },
                        {
                            name: 'IOTA',
                            amount: 0,
                        },
                        {
                            name: 'Lisk',
                            amount: 0,
                        }
                    ]
                }
            }
        };
    }

    static navigationOptions = {
        title: 'Witaj',
    }

    render() {
        return (
            <View>
                <View
                    style={{ height: 24 }}>
                </View>
                <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                    <Text style={{
                        fontSize: 32,
                        textAlign: 'center',
                        marginTop: 20
                    }}>Witaj!</Text>
                    <Text style={{
                        fontSize: 14,
                        textAlign: 'center',
                        marginTop: 10
                    }}>Jako, że jesteś tu po raz pierwszy, musisz wybrać imię</Text>
                    <TextInput
                        style={{ height: 40, marginTop: 15, padding: 10 }}
                        onChangeText={this.handleSetNameTextInput}
                        value={this.state.name}
                    />
                    <View style={{ marginTop: 15 }}>
                        <Button
                            onPress={this.handleCreatePlayerButton}
                            title="Zapisz"
                        />
                    </View>
                </View>
            </View>
        );
    }

    handleSetNameTextInput = (value) => {
        const player = {...this.state.player};
        player.name = value;
        player.wallet.currencies[0].amount = 10000;

        this.setState({
            player: player
        });
    }

    handleCreatePlayerButton = () => {
        AsyncStorage.setItem('Player', JSON.stringify(this.state.player));
        this.props.launchApp(this.state.player);
    }
}
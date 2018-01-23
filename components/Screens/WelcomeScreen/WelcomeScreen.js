import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, Modal,TextInput, Button } from 'react-native';

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
                            amount: 10000
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
            },
            modalVisible: false
        };
    }

    static navigationOptions = {
        title: 'Witaj',
    }
    openModal() {
        this.setState({ modalVisible: true });
    }

    closeModal() {
        this.setState({ modalVisible: false });
    }
    render() {
        return (
            <View style={{backgroundColor: 'rgb(233, 233, 239)', flex: 1}}>
                <Modal
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.closeModal()}
                    transparent={true}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
                        <View style={{ width: 200, height: 140, backgroundColor: 'white', alignItems: 'center', 
                                        justifyContent: 'center'}}>
                            <Text style={{textAlign: 'center', textAlignVertical: 'center', padding:5, margin: 10, color: 'grey'}}>Podaj imię!</Text>
                            <Button
                                color='#D32F2F'
                                onPress={() => this.closeModal()}
                                title="Zamknij"
                            >
                            </Button>
                        </View>
                    </View>
                </Modal>
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
                    }}>Jako, że jesteś tu po raz pierwszy, musisz wybrać imię.</Text>
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
                    <Text style={{
                        fontSize: 10,
                        textAlign: 'center',
                        marginTop: 40
                    }}>Na start dostajesz 10 000 PLN.</Text>
                </View>
            </View>
        );
    }

    handleSetNameTextInput = (value) => {
        const player = {...this.state.player};
        player.name = value;

        this.setState({
            player: player
        });
    }

    handleCreatePlayerButton = () => {
        if(this.state.player.name != ''){
        AsyncStorage.setItem('Player', JSON.stringify(this.state.player));
        this.props.launchApp(this.state.player);
        }
        else{
            this.openModal();
        }
    }
}
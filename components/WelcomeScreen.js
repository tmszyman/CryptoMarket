import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    static navigationOptions = {
        title: 'Witaj',
    }

    render() {
        const navigationView = (
            <View style={{ backgroundColor: '#fff' }}>
                <Text style={{ margin: 10, fontSize: 15, textAlign: 'left' }}> who I'm in the Drawer!</Text>
            </View>
        );

        const { navigate } = this.props.navigation;

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
                        fontSize: 16,
                        textAlign: 'center',
                        marginTop: 10
                    }}>Jako, że jesteś tu po raz pierwszy, musisz wybrać imię</Text>
                    <TextInput
                        style={{ height: 40, marginTop: 15, padding: 10 }}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                    />
                    <View style={{ marginTop: 15 }}>
                        <Button
                            onPress={
                                () => {
                                    AsyncStorage.setItem('PlayerName', this.state.text);
                                    navigate('Home')
                                }
                            }
                            title="Zapisz"
                        />
                    </View>
                </View>
            </View>
        );
    }
}

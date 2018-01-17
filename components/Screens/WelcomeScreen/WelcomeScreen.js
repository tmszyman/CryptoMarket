import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
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
                        onChangeText={(value) => this.setState({
                            name: value
                        })}
                        value={this.state.name}
                    />
                    <View style={{ marginTop: 15 }}>
                        <Button
                            onPress={() => {
                                AsyncStorage.setItem('PlayerName', this.state.name);
                                this.props.launchApp();
                            }}
                            title="Zapisz"
                        />
                    </View>
                </View>
            </View>
        );
    }
}
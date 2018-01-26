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

    render() {
        return (
            <ScrollView style={{ backgroundColor: '#fff', paddingTop: 8, paddingLeft: 16, paddingRight: 16 }}>
                <View>
                    <Text>Zadania</Text>
                </View>
            </ScrollView>
        );
    }
}
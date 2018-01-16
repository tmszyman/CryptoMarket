import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class BuyCurrencyScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    static navigationOptions =
        {
            title: 'Zakup walutę',
        }

    render() {
        const navigationView =
            (
                <View style={{ backgroundColor: '#fff' }}>
                    <Text style={{ margin: 10, fontSize: 15, textAlign: 'left' }}> I'm in the Drawer!!</Text>
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
                        fontSize: 16,
                        textAlign: 'center',
                        marginTop: 10
                    }}>Wprowadź ilość</Text>
                    
                    <TextInput
                        style={{ height: 40, marginTop: 15, padding: 10 }}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                    />
                    
                    <View style={{ marginTop: 15 }}>
                        <Button
                            onPress={() => {
                                navigate('Home')
                            }
                            }
                            title="Kup"
                        />
                    </View>
                </View>
            </View>
        );
    }
}
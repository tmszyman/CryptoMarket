import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {
	StackNavigator,
} from 'react-navigation';
import WelcomeScreen from './components/WelcomeScreen';
import HomeScreen from './components/HomeScreen';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {

		const App = StackNavigator({
			Welcome: { screen: WelcomeScreen },
			Home: {
				screen: HomeScreen,	
				navigationOptions: {
					headerLeft: null
				}
			},
		});

		return (
			<App />
		);
	}

	handleButton() {
	}
}


const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
	h1: {
		fontSize: 60
	},
});

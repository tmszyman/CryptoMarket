import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {
	StackNavigator, TabNavigator
} from 'react-navigation';
import WelcomeScreen from './components/Screens/WelcomeScreen/WelcomeScreen';
import HomeScreen from './components/Screens/HomeScreen/HomeScreen';
import BuyCurrencyScreen from './components/Screens/HomeScreen/Tabs/ExchangeTab/Screens/BuyCurrencyScreen';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const App = StackNavigator(
			{
				Welcome: { screen: WelcomeScreen },
				Home: {
					screen: HomeScreen,
					navigationOptions: {
						headerLeft: null,
						headerTitleStyle: {
							color: '#fff',
						},
						headerStyle: {
							backgroundColor: '#20232a',
							elevation: 0,
							paddingTop: 24
						},
					}
				},
				BuyCurrency: { screen: BuyCurrencyScreen }
			});
		return (
			<App />
		);
	}

	handleButton() {
	}
}
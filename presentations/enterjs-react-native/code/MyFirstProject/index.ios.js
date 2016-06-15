/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image
} from 'react-native';


class MyFirstProject extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					Welcome to React Native!
				</Text>
				<Text style={styles.instructions}>
					To get started, edit index.ios.js
				</Text>
				<Text style={styles.instructions}>
					Press Cmd+R to reload,{'\n'}
					Cmd+D or shake for dev menu
				</Text>
			</View>
		);
	}
}









const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		padding: 200,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	infoContainer: {
		flex: 1,
		flexDirection: 'column'
	},
	imageContainer: {
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
	title: {
		fontSize: 20,
		textAlign: 'left',
		paddingLeft: 8
	},
	year: {
		textAlign: 'left',
		padding: 8
	},
	info: {
		textAlign: 'left',
		padding: 8
	},
	thumbnail: {
		width: 53,
		height: 81,
		borderRadius: 26,
	},
	actor: {
		textAlign: 'left',
		paddingLeft: 8,
		padding: 2,
	},
	poster: {
		width: 150,
		height: 243,
		borderRadius: 12,
	},
	listView: {
		paddingTop: 20,
		backgroundColor: '#F5FCFF',
	},
});

AppRegistry.registerComponent('MyFirstProject', () => MyFirstProject);

import NavigationBar from 'react-native-navbar'
/**
 * Sample React Native App for Demonstration
 */

import React, {
	AppRegistry,
	Component,
	StyleSheet,
	Text,
	View,
	Image,
	ListView,
	TouchableHighlight,
	Navigator,
	NavMenu,
} from 'react-native'

class AwesomeProject extends Component {

	render() {
		var navigator;
		React.BackAndroid.addEventListener('hardwareBackPress', () => {
			if (navigator && navigator.getCurrentRoutes().length > 1) {
				navigator.pop();
				return true;
			}
			return false;
		});

		return (
			<Navigator
				initialRoute={{}}
				renderScene={this.renderScene}
				ref={(nav) => { navigator = nav; }}
			/>
		);
	}

	renderScene(route, navigator) {
		switch (route.screen) {
			case 'MovieDetails':
			{
				var navbar;
				if (React.Platform.OS === 'ios') {
					navbar = <NavigationBar
						title={{ title: 'Detail', tintColor: 'black', }}
						leftButton={{ title: 'Back', handler: () => navigator.pop(),}}
						style={{ backgroundColor: "white", }}
						statusBar={{ tintColor: "white", }}
					/>
				}
				return (
					<View>
						{navbar}
						<Movie movie={route.movie}></Movie>
					</View>
				);
				break;
			}
			default:
				return (
					<MoviesList
						onForward={(movie) => {
                            var nextIndex = route.index + 1;
                            navigator.push({
                              screen: 'MovieDetails',
                              index: nextIndex,
                              movie: movie
				          });
				        }}
					/>
				);
				break;
		}
	}

	componentWillUnmount() {
		this._listeners && this._listeners.forEach(listener => listener.remove());
	}

	componentWillMount() {
		// React.Platform.OS
	}

};

var Movie = React.createClass({
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.rightContainer}>
					<Text style={styles.title}>{this.props.movie.title}</Text>
					<Text style={styles.info}>{this.props.movie.year}</Text>
					<Text style={styles.info}>Rating: {this.props.movie.mpaa_rating}</Text>
					<Image
						style={styles.poster}
						source={{uri: this.props.movie.posters.thumbnail}}
					/>
					<Text style={styles.year}>Actors:</Text>
					{this.props.movie.abridged_cast.map((actor) => {
						return (
							<Text key={actor.id} style={styles.actor}>{actor.name}</Text>
						)
					})}
				</View>
			</View>
		);
	}
});

var MoviesList = React.createClass({

	REQUEST_URL: 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json',

	getInitialState() {
		return ( {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
			loaded: false,
		});
	},

	componentDidMount(){
		this.fetchData();
	},

	fetchData() {
		fetch(this.REQUEST_URL)
			.then((response) =>
				response.json()
			)
			.then((responseData) => {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
					loaded: true,
				});
			})
			.done();
	},

	render() {
		if (!this.state.loaded) {
			return this.renderLoadingView();
		}
		return (
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this.renderMovie}
				style={styles.listView}
			/>
		);
	},

	selectMovie(movie) {
		this.props.onForward(movie);
	},


	renderMovie(movie) {
		const score = Math.floor(Math.random() * 100);
		const color = `rgb(
			255,
			${(score / 100) * 255},
			0
		)`;
		return (
			<TouchableHighlight onPress={() => this.selectMovie(movie)} underlayColor='blue'>
				<View style={styles.container}>
					<Image
						source={{uri: movie.posters.thumbnail}}
						style={styles.thumbnail}
					/>
					<View style={styles.rightContainer}>
						<Text style={styles.title}>{movie.title}</Text>
						<Text style={styles.year}>{movie.year}</Text>
						<Text style={[{color: color}, styles.year]}>{score} %</Text>
					</View>
				</View>
			</TouchableHighlight>
		);
	},

	renderLoadingView() {
		return (
			<View style={styles.container}>
				<Text>
					Loading Movies...
				</Text>
			</View>
		);
	}
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		padding: 8,
	},
	rightContainer: {
		flex: 1,
		flexDirection: 'column'
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
		borderRadius: 0,
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


AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);

module.exports = AwesomeProject;
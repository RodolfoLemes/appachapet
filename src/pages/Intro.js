import React, { useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, StatusBar } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Login from './Login'

const slides = [ // Para a intro
	{
		key: 'one',
	  image: require('../../assets/Tela1.png'),
	},
	{
		key: 'two',
	  image: require('../../assets/Tela2.png'),
	},
	{
		key: 'tree',
	  image: require('../../assets/Tela3.png'),
	}
];

StatusBar.setBackgroundColor('#f1f4fd')

export default function Intro() {
  
	const [showRealApp, setShowRealApp] = useState(false)

	const _renderItem = ({ item }) => {
		return (
			<ImageBackground style={styles.slide} source={item.image}/>
		);
	}
	
	const _onDone = () => {
		setShowRealApp(true)
	}
	
	const _renderNextButton = () => {
		return (
		  <View style={styles.buttonCircle}>
				<MaterialCommunityIcons name={'arrow-right-circle'} size={35} color={'#00418F'} />
		  </View>
		);
	};
	
	const _renderDoneButton = () => {
		return (
		  <View style={styles.buttonCircle}>
				<MaterialCommunityIcons name={'check-circle'} size={35} color={'#00418F'} />
		  </View>
		);
	};

	if (showRealApp) {
		return <Login />;
	} else {
		return(
			<AppIntroSlider 
				renderItem={_renderItem}
				data={slides}
				onDone={_onDone}
				renderDoneButton={_renderDoneButton}
				renderNextButton={_renderNextButton}
				activeDotStyle={{ backgroundColor: '#00418F' }}
			/>
		)
	}
}

const styles = StyleSheet.create({
	slide: {
		flex: 1,
		resizeMode: 'cover',
	},
	image: {
	  width: 320,
	  height: 320,
	  marginTop: 32,
	},
	title: {
	  fontSize: 22,
	  color: 'white',
	  textAlign: 'center',
	},
});

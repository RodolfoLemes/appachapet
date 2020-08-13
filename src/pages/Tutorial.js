import React, { useState } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Login from './Login'

const slides = [ // Para a intro
	{
	  image: require('../../assets/dog.jpg'),
	},
	{
	  image: require('../../assets/dog.jpg'),
	},
	{
	  image: require('../../assets/dog.jpg'),
	}
  ];

const slidesTutorial = [	// Para o tutorial
  {
    image: require('../../assets/dog.jpg'),
  },
  {
    image: require('../../assets/dog.jpg'),
  },
  {
    image: require('../../assets/dog.jpg'),
  }
];

export default function Tutorial() {
  
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
			<MaterialCommunityIcons name={'arrow-right-circle'} size={35} color={'white'} />
		  </View>
		);
	};
	
	const _renderDoneButton = () => {
		return (
		  <View style={styles.buttonCircle}>
			<MaterialCommunityIcons name={'check-circle'} size={35} color={'white'} />
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
		/>
	)}
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

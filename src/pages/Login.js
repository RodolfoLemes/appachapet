import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity, Image, Animated, StatusBar } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-navigation';
import * as Google from 'expo-google-app-auth';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import api from '../services/api'
import AuthContext from '../contexts/auth'
import loginStyles from '../styles/loginStyles'

async function signInWithGoogleAsync() {
	try {
	  const { type, accessToken, user } = await Google.logInAsync({
			androidClientId: '1030550440349-r3nctpkvrp0ajjjjoh4b2ll9pgvirptc.apps.googleusercontent.com',
			scopes: ['profile', 'email'],
	  });
	  if (type === 'success') {
			return { accessToken, user: user };
	  } else {
			return { cancelled: true };
	  }
	} catch (e) {
	  return { error: true };
	}
}

export default function Login() {
	const { forceLogin, signIn, user } = React.useContext(AuthContext)

	// VARIÁVEIS DE ANIMAÇÃO //

	// Componente de animação para TouchableOpacity, já que o animated não o suporta normalmente.
	const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity)
	// Variável para deslocar a view em Y
	const changeY = useRef(new Animated.Value(0)).current
	const imgChangeY = useRef(new Animated.Value(0)).current
	// Variável para alterar opacidade
	const opacity = useRef(new Animated.Value(1)).current


	// FIM DE VARIÁVEIS DE ANIMAÇÃO //

	async function sign() {
		changingY()
		try {
			const { accessToken, user } = await signInWithGoogleAsync()
			console.log(accessToken, user)
			signIn(user)
		} catch (err) {
			console.log("buguei, me ajuda" + err)
		}
	}

	async function login() {
		changingY()
		//changingOpacity()
		forceLogin()
	}

	function changingY() {
		Animated.parallel([
			Animated.timing(changeY, {
				toValue: responsiveHeight(50),
				duration: 500,
				useNativeDriver: true,
			}),
			Animated.timing(imgChangeY, {
				toValue: responsiveHeight(20),
				duration: 500,
				useNativeDriver: true
			})
		]).start()
	}

	/* function changingOpacity() {
		while(user == null) {
			Animated.timing(opacity, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true
			}).start()
			Animated.timing(opacity, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true
			}).start()
		}	
	} */

	StatusBar.setBarStyle("light-content")
	StatusBar.setBackgroundColor('#3f6de0')

	return (
		
		<SafeAreaView forceInset={{top: 'always'}} style={ loginStyles.container }>
			<TouchableOpacity style={ loginStyles.logoView } onPress={login}>
				<Animated.Image
					style={ [loginStyles.logoViewImg, {transform: [{translateY: imgChangeY}]}, {opacity: opacity}] }
					source={require('../../assets/logo.png')}
				/>
			</TouchableOpacity>
			<Animated.View style={ [loginStyles.bottomView, {transform: [{translateY: changeY}]}] }>
				<TouchableOpacity style={ loginStyles.googleBtn } onPress={sign}>
					<MaterialCommunityIcons name={'google-glass'} size={ 32 } color={ 'white' } />
					<Text style={ loginStyles.googleTxt }>Entrar com Google</Text>
				</TouchableOpacity>
				<View style={ loginStyles.socialMediaView }>
					<View>
						<Text>Siga-nos nas redes sociais!</Text>
					</View>
					<View style={ loginStyles.socialMediaBtns }>
						<TouchableOpacity style={ loginStyles.socialMediaBtn }>
							<MaterialCommunityIcons name={'facebook'} size={ 40 } color={ '#777' } />
						</TouchableOpacity>
						<TouchableOpacity style={ loginStyles.socialMediaBtn }>
							<Ionicons name={'logo-instagram'} size={ 40 } color={ '#777' } />
						</TouchableOpacity>
					</View>
				</View>
			</Animated.View>
		</SafeAreaView>
	);
}

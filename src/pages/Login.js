import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import * as Google from 'expo-google-app-auth';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import api from '../services/api'
import AuthContext from '../contexts/auth'
import loginStyles from '../styles/loginStyles'

async function signInWithGoogleAsync() {
	try {
	  const { type, accessToken, name, email } = await Google.logInAsync({
		androidClientId: '1030550440349-r3nctpkvrp0ajjjjoh4b2ll9pgvirptc.apps.googleusercontent.com',
		scopes: ['profile', 'email'],
	  });
	  if (type === 'success') {
		return { accessToken, user: { name, email } };
	  } else {
		return { cancelled: true };
	  }
	} catch (e) {
	  return { error: true };
	}
}

export default function Login() {
	const { forceLogin, signIn } = React.useContext(AuthContext)

	// VARIÁVEIS DE ANIMAÇÃO //

	// Componente de animação para TouchableOpacity, já que o animated não o suporta normalmente.
	const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity)
	// Variável para deslocar a view em Y
	const changeY = useRef(new Animated.Value(0)).current
	const imgChangeY = useRef(new Animated.Value(0)).current


	// FIM DE VARIÁVEIS DE ANIMAÇÃO //

	async function sign() {
		const { accessToken, user } = await signInWithGoogleAsync()
		console.log(accessToken, user)
	}

	async function login() {
		changingY()
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

	return (
		<SafeAreaView forceInset={{top: 'always'}} style={ loginStyles.container }>
			<TouchableOpacity style={ loginStyles.logoView } onPress={login}>
				<Animated.Image
					style={ [loginStyles.logoViewImg, {transform: [{translateY: imgChangeY}]}] }
					source={require('../../assets/logo.png')}
				/>
			</TouchableOpacity>
			<Animated.View style={ [loginStyles.bottomView, {transform: [{translateY: changeY}]}] }>
				<TouchableOpacity style={ loginStyles.googleBtn } onPress={sign}>
					<Text style={ loginStyles.googleTxt }>Entrar com Google</Text>
				</TouchableOpacity>
			</Animated.View>
		</SafeAreaView>
	);
}

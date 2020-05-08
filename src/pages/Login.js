import * as React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
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

	async function sign() {
		const { accessToken, user } = await signInWithGoogleAsync()
		console.log(accessToken, user)
	}

	async function login() {
		forceLogin()
	}

	return (
		<SafeAreaView forceInset={{top: 'always'}} style={ loginStyles.container }>
			<TouchableOpacity style={ loginStyles.logoView } onPress={login}>
				<Image
					style={ loginStyles.logoViewImg }
					source={require('../../assets/logo.png')}
				/>
			</TouchableOpacity>
			<View style={ loginStyles.bottomView }>
				<TouchableOpacity style={ loginStyles.googleBtn } onPress={sign}>
					<Text style={ loginStyles.googleTxt }>Entrar com Google</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

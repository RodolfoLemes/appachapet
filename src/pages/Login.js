import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import * as Google from 'expo-google-app-auth';

import AuthContext from '../contexts/auth'
import loginStyles from '../styles/loginStyles'

async function signInWithGoogleAsync() {
	try {
	  const result = await Google.logInAsync({
		androidClientId: '1030550440349-0qdrot381qird967r75m39628dhn5icm.apps.googleusercontent.com',
		scopes: ['profile', 'email'],
	  });
  
	  if (result.type === 'success') {
		return result.accessToken;
	  } else {
		return { cancelled: true };
	  }
	} catch (e) {
	  return { error: true };
	}
	//navigation.navigate('StackNavigation') // Isso esta errado, não pode estar aqui
}

export default function Login() {
	const { forceLogin, signed } = React.useContext(AuthContext)

	function login() {
		forceLogin()
	}

	return (
		<SafeAreaView forceInset={{top: 'always'}} style={ loginStyles.container }>
			<View style={ loginStyles.logoView }>

			</View>
			<View style={ loginStyles.bottomView }>
				<TouchableOpacity style={ loginStyles.googleBtn } onPress={() => signInWithGoogleAsync()}>
					<Text style={ loginStyles.googleTxt }>Entrar com Google</Text>
				</TouchableOpacity>
				<TouchableOpacity style={ loginStyles.googleBtn } onPress={login}>
					<Text style={ loginStyles.googleTxt }>Pular Login</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

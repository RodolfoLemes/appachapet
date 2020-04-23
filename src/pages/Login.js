import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import * as Google from 'expo-google-app-auth';

import loginStyles from '../styles/loginStyles'

async function logIn() {

	const { type, accessToken, user } = await Google.logInAsync({
		iosClientId: `<YOUR_IOS_CLIENT_ID_FOR_EXPO>`,
		androidClientId: `AIzaSyD_uuPh0IdO0MHLLHloIjcjkeqppBS9uE8`,
		iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
		androidStandaloneAppClientId: `<YOUR_ANDROID_CLIENT_ID>`,
	});

	if (type === 'success') {
		let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
			headers: { 
				Authorization: `Bearer ${accessToken}` 
			},
		});
		navigation.navigate('StackNavigation')
	}
}

export default function Login({ navigation, route }) {
	console.log(route.name)
	return (
		<SafeAreaView forceInset={{top: 'always'}} style={ loginStyles.container }>
			<View style={ loginStyles.logoView }>

			</View>
			<View style={ loginStyles.bottomView }>
				<TouchableOpacity style={ loginStyles.googleBtn } onPress={() => logIn()}>
					<Text style={ loginStyles.googleTxt }>Entrar com Google</Text>
				</TouchableOpacity>
				<TouchableOpacity style={ loginStyles.googleBtn } onPress={() => navigation.navigate('Device')}>
					<Text style={ loginStyles.googleTxt }>Pular Login</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

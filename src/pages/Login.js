import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import loginStyles from '../styles/loginStyles'

export default function Login({ navigation }) {
	return (
		<SafeAreaView forceInset={{top: 'always'}} style={ loginStyles.container }>
			<View style={ loginStyles.logoView }>

			</View>
			<View style={ loginStyles.bottomView }>
				<TouchableOpacity style={ loginStyles.googleBtn } onPress={() => navigation.navigate('StackNavigation')}>
					<Text style={ loginStyles.googleTxt }>Entrar com Google</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
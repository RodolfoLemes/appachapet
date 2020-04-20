import * as React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import dataStyles from '../styles/dataStyles';

export default function Data({ navigation }) {
	return (
		<SafeAreaView forceInset={{top: 'always'}} style={ dataStyles.container }>
			<View>
				<TouchableOpacity onPress={() => navigation.navigate('TabNavigation')}>
					<Text>Entrar para devices</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
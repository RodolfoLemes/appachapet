import * as React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import dataStyles from '../styles/dataStyles';

export default function Data() {
	return (
		<SafeAreaView forceInset={{top: 'always'}} style={ dataStyles.container }>
			<ScrollView>
				
			</ScrollView>
		</SafeAreaView>
	);
}
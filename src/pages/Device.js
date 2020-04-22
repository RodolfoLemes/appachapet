import * as React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import Login from './Login';
import deviceStyles from '../styles/deviceStyles';

export default function Data({ navigation }) {
	return (
		<SafeAreaView forceInset={{top: 'always'}} style={ deviceStyles.container }>
			<TouchableOpacity onPress={() => navigation.navigate('TabNavigation')} style={ deviceStyles.itemTcb }>
				<View style={ deviceStyles.itemImgView }>
				<Image
            		style={ deviceStyles.itemImg }
            		source={require('../../assets/dog.jpg')}
          			/>
				</View>
				<View style={ deviceStyles.itemInfoView }>
					<View style={ deviceStyles.itemInfoName }>
						<Text style={ deviceStyles.itemInfoNameTxt }>Adalberto, o cão</Text>
					</View>
					<View style={ deviceStyles.itemInfoIMEI }>
						<Text style={ deviceStyles.itemInfoIMEITxt }>IMEI: 1129731261</Text>
					</View>
				</View>
			</TouchableOpacity>
			<View>
				<TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
					<Text>Voltar para Login</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

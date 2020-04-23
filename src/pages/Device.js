import * as React from 'react';
import { Text, View, Image, TouchableOpacity, Button} from 'react-native';
import { SafeAreaView } from 'react-navigation';

import deviceStyles from '../styles/deviceStyles';

export default function Device({ navigation, route }) {

	// Esse hook é responsavel por criar o botão do Logout
	React.useLayoutEffect(() => {
		navigation.setOptions({
		  headerLeft: () => (
			<Button onPress={() => navigation.navigate('Login')} title="Logout" />
		  ),
		});
	}, [navigation]);
	
	return (
		<SafeAreaView forceInset={{top: 'always'}} style={ deviceStyles.container }>
			<View>
				<TouchableOpacity 
					onPress={() => navigation.navigate('TabNavigation', { screen: 'GPS', params: { device: '5e8ddf1d8a139f0021a44e0b' } })}>
					<Text>Entrar para devices</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity style={ deviceStyles.itemTcb }>
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
		</SafeAreaView>
	);
}
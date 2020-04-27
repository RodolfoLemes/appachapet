import * as React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView,  } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AuthContext from '../contexts/auth'
import deviceStyles from '../styles/deviceStyles';

export default function Device({ navigation, route }) {
	const { forceLogout } = React.useContext(AuthContext)

	function logout() {
		forceLogout()
	}

	// Esse hook é responsavel por criar o botão do Logout	
	return (
		<SafeAreaView forceInset={{top: 'always'}} style={ deviceStyles.container }>
			<View style={ deviceStyles.titleView }>
				<TouchableOpacity style={ deviceStyles.titleIconView }>
					<MaterialCommunityIcons name={'logout-variant'} size={32} color={'#2147D6'} />
				</TouchableOpacity>
				<View style={ deviceStyles.titleTextView }>
					<Text style={ deviceStyles.titleText }>Dispositivos</Text>
				</View>
				<View style={ deviceStyles.titleIconView }>

				</View>
			</View>
			<ScrollView style={{ height: '100%', width: '100%' }}>
				<View style={ deviceStyles.container }>
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
					<View>
						<TouchableOpacity onPress={logout}>
							<Text>Voltar para Login</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

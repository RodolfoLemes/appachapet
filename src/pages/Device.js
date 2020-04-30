import * as React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView,  } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AuthContext from '../contexts/auth'
import deviceStyles from '../styles/deviceStyles';

export default function Device({ navigation }) {
	const { forceLogout, user } = React.useContext(AuthContext)

	function logout() {
		forceLogout()
	}

	function goToGPS(device) {
		navigation.navigate('TabNavigation', { 
			screen: 'GPS', 
			params: { 
				device 
			} 
		})
	}

	// Esse hook é responsavel por criar o botão do Logout	
	return (
		<SafeAreaView forceInset={{ top: 'always' }} style={ deviceStyles.container }>
			<View style={ deviceStyles.titleView }>
				<TouchableOpacity 
					style={ deviceStyles.titleIconView }
					onPress={ logout }
					>
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
					{ user.devices.map(element => (
						<TouchableOpacity 
							key={element._id}
							style={ deviceStyles.itemTcb }
							onPress={() => goToGPS(element)}
							>
							<View style={ deviceStyles.itemImgView }>
								<Image
									style={ deviceStyles.itemImg }
									source={require('../../assets/dog.jpg')}
									/>
								</View>
								<View style={ deviceStyles.itemInfoView }>
									<View style={ deviceStyles.itemInfoName }>
										<Text style={ deviceStyles.itemInfoNameTxt }>{element.name} - {element.battery}</Text>
									</View>
									<View style={ deviceStyles.itemInfoIMEI }>
										<Text style={ deviceStyles.itemInfoIMEITxt }>IMEI: {element.imei}</Text>
									</View>
							</View>
						</TouchableOpacity>
					)) }
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

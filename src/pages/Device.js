import * as React from 'react';
import { Modal, Text, View, Image, TouchableOpacity, ScrollView, Alert, TextInput, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import api from '../services/api'
import AuthContext from '../contexts/auth'
import deviceStyles from '../styles/deviceStyles';

export default function Device({ navigation }) {
	const { forceLogout, user, token, chosenDevice } = React.useContext(AuthContext)
	const [modalVisible, setModalVisible] = React.useState(false);
	const [imei, setImei] = React.useState('')
	const [name, setName] = React.useState('')
	const [devices, setDevices] = React.useState(user.devices)
	const [onFocusName, setOnFocusName] = React.useState(false)
	const [onFocusImei, setOnFocusImei] = React.useState(false)

	function logout() {
		forceLogout()
	}

	function goToGPS(device) {
		chosenDevice(device)
		navigation.navigate('TabNavigation', { 
			screen: 'GPS', 
			params: { 
				device 
			} 
		})
	}

	async function createDevice() {
		if(name.length < 1 || imei.length < 1) {
			Alert.alert('Faça as coisas certas, por favor. Insira um nome e um imei decente')
		} else {
			const response = await api.post('device', {
				imei,
				name,
			}, {
				headers: { 
					Authorization: 'Bearer ' + token 
				}
			})
	
			const { sucess, devices } = response.data
			
			if(sucess) {
				setDevices(devices)
				setModalVisible(false)
			} else {
				const { error } = response.data
				Alert.alert(error)
			}
		}
	}
	


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
					{ devices.map(element => (
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
			<TouchableOpacity onPress={ () => setModalVisible(true) } style={ deviceStyles.floatingTcb }>
				<MaterialCommunityIcons name={'plus'} size={50} color={'#fff'}/>		
			</TouchableOpacity>

			<Modal
				animationType='slide'
				transparent={false}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(false)
				}}>
				<View style={ deviceStyles.modalView }>
					<View style={{ flex: 1, marginTop: 20 }}>
						<Text style={ deviceStyles.titleText }>Novo dispositivo</Text>
					</View>
					<View style={{ flex: 4, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
						<TextInput
							style={ onFocusName ? deviceStyles.infoTxtFocused : deviceStyles.infoTxt }
							onChangeText={user => setName(user)}
							onFocus={() => setOnFocusName(true)}
							onBlur={() => setOnFocusName(false)}
							autoCapitalize='words'
							value={name}
							placeholder='Nome do pet'
							placeholderTextColor='#777'
						/>
						<TextInput
							style={ onFocusImei ? deviceStyles.infoTxtFocused : deviceStyles.infoTxt }
							onChangeText={id => setImei(id)}
							onFocus={() => setOnFocusImei(true)}
							onBlur={() => setOnFocusImei(false)}
							autoCapitalize='characters'
							value={imei}
							placeholder='IMEI da coleira'
							placeholderTextColor='#777'
						/>
						
						<TouchableOpacity onPress={createDevice} style={ deviceStyles.registerTcb }>
							<Text style={ deviceStyles.registerTxt }>Registrar</Text>
						</TouchableOpacity>
					</View>
					<View style={{ flex: 1 }}>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
}

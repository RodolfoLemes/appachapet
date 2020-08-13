import React, { useState, useContext, useRef, useEffect } from 'react';
import { Text, View, Image, KeyboardAvoidingView, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import api from '../services/api'
import AuthContext from '../contexts/auth'
import dataStyles from '../styles/dataStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Data({ navigation }) {
	const { user, token, device } = useContext(AuthContext)

	const textRef = useRef(null)

	const [editable, isEditable] = useState(false)
	const [petName, setPetName] = useState(device.name)
	const [humanName, setHumanName] = useState(user.name)
	const [emergPhone, setEmergPhone] = useState(device.emergencialPhone)
	const [phone, setPhone] = useState(user.phone)
	const [cep, setCep] = useState(device.cep)
	const [onFocusPetName, setOnFocusPetName] = useState(false)
	const [onFocusHumanName, setOnFocusHumanName] = useState(false)
	const [onFocusEmergPhone, setOnFocusEmergPhone] = useState(false)
	const [onFocusPhone, setOnFocusPhone] = useState(false)
	const [onFocusCep, setOnFocusCep] = useState(false)

	const AuthString = 'Bearer ' + token

	useEffect(() => {
		if(editable) {
			textRef.current.focus()
		} else {
			textRef.current.blur()
		}
	}, [editable])

	async function sendData() {
		if(!editable) {
			isEditable(!editable)
		} else {
			const response = await api.patch(`device/${device._id}`, {
				petName,
				emergencialPhone: emergPhone,
				cep,
				phone
			}, {
				headers: { 
					Authorization: AuthString 
				}
			})
	
			const { user: newUser, device: newDevice } = response.data
			setPetName(newDevice.name)
			setHumanName(newUser.name)
			setEmergPhone(newDevice.emergencialPhone)
			setPhone(newUser.phone)
			setCep(newDevice.cep)

			isEditable(!editable)
		}
	}

	return (
		<SafeAreaView forceInset={{top: 'always'}} style={ dataStyles.container }>
			<ScrollView style={{ flex: 1, width: '100%' }}>
				<View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
					<View style={ dataStyles.topInfo }>
						<View style={ dataStyles.topInfoTexts }>
							<View style={ dataStyles.topInfoTextsTitle }>
								<Text style={ dataStyles.topInfoTextsTitleFont }>Tudo certo</Text>
							</View>
							<View style={ dataStyles.topInfoTextsSubtitle }>
								<Text style={ dataStyles.topInfoTextsSubtitleFont }>Estou em casa</Text>
							</View>
						</View>
						<View style={ dataStyles.topInfoImg }>
							<Image
							style={ dataStyles.topInfoImg }
							source={ require('../../assets/dog.jpg') }
							/>
						</View>
					</View>
					<TextInput
						ref={textRef}
						style={ onFocusPetName ? dataStyles.infoViewFocused : dataStyles.infoView }
						onChangeText={id => setPetName(id)}
						onFocus={() => setOnFocusPetName(true)}
						onBlur={() => setOnFocusPetName(false)}
						autoCapitalize='words'
						value={petName}
						placeholder='Nome do pet'
						placeholderTextColor='#777'
						editable={editable}
					/>
					<TextInput
						style={ onFocusEmergPhone ? dataStyles.infoViewFocused : dataStyles.infoView }
						onChangeText={id => setEmergPhone(id)}
						onFocus={() => setOnFocusEmergPhone(true)}
						onBlur={() => setOnFocusEmergPhone(false)}
						value={emergPhone}
						placeholder='Telefone emergencial'
						placeholderTextColor='#777'
						editable={editable}
					/>
					<TextInput
						style={ onFocusPhone ? dataStyles.infoViewFocused : dataStyles.infoView }
						onChangeText={id => setPhone(id)}
						onFocus={() => setOnFocusPhone(true)}
						onBlur={() => setOnFocusPhone(false)}
						value={phone}
						placeholder='Telefone secundário'
						placeholderTextColor='#777'
						editable={editable}
					/>
					<TextInput
						style={ onFocusCep ? dataStyles.infoViewFocused : dataStyles.infoView }
						onChangeText={id => setCep(id)}
						onFocus={() => setOnFocusCep(true)}
						onBlur={() => setOnFocusCep(false)}
						autoCapitalize='none'
						value={cep}
						placeholder='CEP'
						placeholderTextColor='#777'
						editable={editable}
					/>
					<TouchableOpacity 
						style={ dataStyles.bottomButton }
						onPress={sendData}
					>
						<Text style={ dataStyles.bottomButtonFont }>{ editable ? 'Enviar' : 'Editar' }</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { Text, View, Image, KeyboardAvoidingView, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import api from '../services/api'
import AuthContext from '../contexts/auth'
import dataStyles from '../styles/dataStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Data({ navigation }) {
	const { user, token, device } = useContext(AuthContext)

	const [editable, isEditable] = useState(false)
	const [petName, setPetName] = useState('')
	const [humanName, setHumanName] = useState('')
	const [emergPhone, setEmergPhone] = useState('')
	const [phone, setPhone] = useState('')
	const [cep, setCep] = useState('')
	const [onFocusPetName, setOnFocusPetName] = useState(false)
	const [onFocusHumanName, setOnFocusHumanName] = useState(false)
	const [onFocusEmergPhone, setOnFocusEmergPhone] = useState(false)
	const [onFocusPhone, setOnFocusPhone] = useState(false)
	const [onFocusCep, setOnFocusCep] = useState(false)

	const AuthString = 'Bearer ' + token

	// Acionado através de um botão para realizar essas atualizações de dados
	// PRECISA SER ADICIONADO
	async function sendData() {
		const response = await api.patch(`device/${device._id}`, {
			petName,
			emergencialPhone: emergPhone,
			cep,
			phone
		}, {
			header: { 
				Authorization: AuthString 
			}
		})

		const { user: newUser, device: newDevice } = response.data
		setPetName(newDevice.name)
		setHumanName(newUser.name)
		setEmergPhone(newDevice.emergencialPhone)
		setPhone(newUser.phone)
		setCep(newDevice.cep)
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
						style={ onFocusHumanName ? dataStyles.infoViewFocused : dataStyles.infoView }
						onChangeText={id => setHumanName(id)}
						onFocus={() => setOnFocusHumanName(true)}
						onBlur={() => setOnFocusHumanName(false)}
						autoCapitalize='words'
						value={humanName}
						placeholder='Nome do humano'
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
						onPress={() => isEditable(!editable)}
					>
						<Text style={ dataStyles.bottomButtonFont }>{ editable ? 'Enviar' : 'Editar' }</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
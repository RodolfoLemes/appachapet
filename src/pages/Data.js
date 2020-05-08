import * as React from 'react';
import { Text, View, Image, KeyboardAvoidingView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import dataStyles from '../styles/dataStyles';

export default function Data() {
	const [petName, setPetName] = React.useState('')
	const [humanName, setHumanName] = React.useState('')
	const [emergPhone, setEmergPhone] = React.useState('')
	const [phone, setPhone] = React.useState('')
	const [cep, setCep] = React.useState('')
	const [onFocusPetName, setOnFocusPetName] = React.useState(false)
	const [onFocusHumanName, setOnFocusHumanName] = React.useState(false)
	const [onFocusEmergPhone, setOnFocusEmergPhone] = React.useState(false)
	const [onFocusPhone, setOnFocusPhone] = React.useState(false)
	const [onFocusCep, setOnFocusCep] = React.useState(false)

	return (
		<SafeAreaView forceInset={{top: 'always'}} style={ dataStyles.container }>
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
				style={ onFocusPetName ? dataStyles.infoNameView : dataStyles.infoView }
				onChangeText={id => setPetName(id)}
				onFocus={() => setOnFocusPetName(true)}
				onBlur={() => setOnFocusPetName(false)}
				autoCapitalize='words'
				value={petName}
				placeholder='Nome do pet'
				placeholderTextColor='#777'
			/>
			<TextInput
				style={ onFocusHumanName ? dataStyles.infoNameView : dataStyles.infoView }
				onChangeText={id => setHumanName(id)}
				onFocus={() => setOnFocusHumanName(true)}
				onBlur={() => setOnFocusHumanName(false)}
				autoCapitalize='words'
				value={humanName}
				placeholder='Nome do humano'
				placeholderTextColor='#777'
			/>
			<TextInput
				style={ onFocusEmergPhone ? dataStyles.infoNameView : dataStyles.infoView }
				onChangeText={id => setEmergPhone(id)}
				onFocus={() => setOnFocusEmergPhone(true)}
				onBlur={() => setOnFocusEmergPhone(false)}
				value={emergPhone}
				placeholder='Telefone emergencial'
				placeholderTextColor='#777'
			/>
			<TextInput
				style={ onFocusPhone ? dataStyles.infoNameView : dataStyles.infoView }
				onChangeText={id => setPhone(id)}
				onFocus={() => setOnFocusPhone(true)}
				onBlur={() => setOnFocusPhone(false)}
				value={phone}
				placeholder='Telefone secundário'
				placeholderTextColor='#777'
			/>
			<TextInput
				style={ onFocusCep ? dataStyles.infoNameView : dataStyles.infoView }
				onChangeText={id => setCep(id)}
				onFocus={() => setOnFocusCep(true)}
				onBlur={() => setOnFocusCep(false)}
				autoCapitalize='none'
				value={cep}
				placeholder='CEP'
				placeholderTextColor='#777'
			/>
		</SafeAreaView>
	);
}
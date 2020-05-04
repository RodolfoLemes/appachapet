import * as React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import dataStyles from '../styles/dataStyles';

export default function Data() {
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
			<View style={ dataStyles.infoNameView }>
				<Text style={ dataStyles.infoFont }>Nome do pet</Text>
			</View>
			<View style={ dataStyles.infoView }>
				<Text style={ dataStyles.infoFont }>Nome do humano</Text>
			</View>
			<View style={ dataStyles.infoView }>
				<Text style={ dataStyles.infoFont }>Telefone emergencial</Text>
			</View>
			<View style={ dataStyles.infoView }>
				<Text style={ dataStyles.infoFont }>Telefone</Text>
			</View>
			<View style={ dataStyles.infoView }>
				<Text style={ dataStyles.infoFont }>CEP</Text>
			</View>		  
		</SafeAreaView>
	);
}
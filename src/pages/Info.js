import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import infoStyles from '../styles/infoStyles';


export default function Info({ route }) {
	console.log(route.params)
	return (
		<SafeAreaView forceInset={{top: 'always'}} style={ infoStyles.container }>
    		<View style={ infoStyles.topInfo }>
          <View style={ infoStyles.topInfoTexts }>
              <View style={ infoStyles.topInfoTextsTitle }>
                <Text style={ infoStyles.topInfoTextsTitleFont }>Olá, Humano</Text>
              </View>
              <View style={ infoStyles.topInfoTextsSubtitle }>
                <Text style={ infoStyles.topInfoTextsSubtitleFont }>Você sabe o que é a AchaPet?</Text>
              </View>
          </View>
          <View style={ infoStyles.topInfoImg }>
              <Image
              style={ infoStyles.topInfoImg }
              source={require('../../assets/achapet_dog.png')}
              />
          </View>
    	  </View>
        <View style={ infoStyles.textView }>
          <Text style={ infoStyles.textViewInfo1 }>
            Somos uma startup voltada à localização de pets
          </Text>
        </View>
		</SafeAreaView>
	);
}
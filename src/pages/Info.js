import * as React from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import infoStyles from '../styles/infoStyles';

export default function Info({ route }) {
  console.log(route.params);
  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={infoStyles.container}>
      <View>
        <Image
          source={require('../../assets/headerInfo.png')}
          style={[
            infoStyles.topInfoImg,
            {
              height: Dimensions.get('window').width / 3,
              width: Dimensions.get('window').width,
            },
          ]}
        />
      </View>
      <View style={infoStyles.middleInfoView}>
        <Image
          source={require('../../assets/headerText.png')}
          style={[
            infoStyles.topInfoImg,
            {
              height: Dimensions.get('window').width * 0.95,
              width: Dimensions.get('window').width * 0.95,
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}

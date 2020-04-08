import { React, useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import gpsStyles from '../styles/gpsStyles';

getMarkers = () => {
	const [markers, setMarkers] = useState({});
	setMarkers({_id: 1, lat: -23, lng: -51, img: 'https://post.healthline.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg'});
}

export default function Gps() {
	return (
		<SafeAreaView forceInset={{top: 'always'}} style={ gpsStyles.container }>
    		<View style={ gpsStyles.topInfo }>
        		<View style={ gpsStyles.topInfoTexts }>
          			<View style={ gpsStyles.topInfoTextsTitle }>
            			<Text style={ gpsStyles.topInfoTextsTitleFont }>Tudo certo</Text>
          			</View>
          			<View style={ gpsStyles.topInfoTextsSubtitle }>
            			<Text style={ gpsStyles.topInfoTextsSubtitleFont }>Estou em casa</Text>
          			</View>
        		</View>
        		<View style={ gpsStyles.topInfoImg }>
          			<Image
            		style={ gpsStyles.topInfoImg }
            		source={ require('../../assets/dog.jpg') }
          			/>
        		</View>
    	  	</View>
	  		<View style= { gpsStyles.middleInfo }>
				<MapView
                    style={gpsStyles.mapStyle}
                    initialRegion={{
                        latitude: -23.4227395,
                        longitude: -51.9375501,
                        latitudeDelta: 0.0022,
                        longitudeDelta: 0.0091,
                    }}
				>
				{ markers.map((element) => 
					(
					<Marker
                        style={ gpsStyles.topInfoImg }
                        coordinate={{latitude: element.lat, longitude: element.lng}} >
                        <Image source={element.img} style={{ borderRadius: 10, height: 20, width:20 }} />
                        </Marker>
					))
				}
				</MapView>
			</View>
		</SafeAreaView>
	);
}
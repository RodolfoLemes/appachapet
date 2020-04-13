import  React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import api from '../services/api'
import gpsStyles from '../styles/gpsStyles';	

/* getMarkers = () => {
	const [markers, setMarkers] = useState({});
	setMarkers({_id: 1, lat: -23, lng: -51, img: 'https://post.healthline.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg'});
} */

// Exemplo de um elemento do array vindo da API
/* Object {
    "__v": 0,
    "_id": "5e8de09c8a139f0021a44e10",
    "coords": Object {
      "lat": -23.42464,
      "lon": -51.92507,
      "timestamp": 1586356380374,
    },
    "createAt": "2020-04-08T14:23:42.230Z",
    "device": "5e8ddf1d8a139f0021a44e0b",
    "isWifi": true,
}, */


export default function Gps() {
	const [markers, setMarkers] = useState([])
	// Variavel para determinar a quanto tempo o usuario quer pegar localizações
	// Criar algum tipo de input para setar esse tempo:
	// Se time = 0, pega todas as localizações, se time = 1 pega todas as localizações de 1 hora atras e assim vai
	const [time, setTime] = useState(0) 

	// Esse dado dever vir quando ele selecionar o device, vir da navegação
	const device = '5e8ddf1d8a139f0021a44e0b'

	useEffect(() => {
		async function fetchData (device, time) {
			try {
				const response = await api.get('coords', {
					params: {
						device,
						time
					}
				})
				console.log(response.data.datas)
				setMarkers(response.data.datas)
			} catch (error) {
				console.log(error)
				return false
			}
		}
		fetchData(device, time)
	}, [])

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
				{ markers.map((element) => {
					const data = new Date(element.coords.timestamp)
					return (
						<Marker
							key={ element._id }
							title={ `${element.isWifi ? 'Wi-fi' : 'GPRS'} - Estive aqui as ${data.getHours()}:${data.getMinutes()} - Dia: ${data.getDate()}/${data.getMonth()}` }
							style={ gpsStyles.topInfoImg }
							coordinate={{ latitude: element.coords.lat, longitude: element.coords.lon }} >
							<Image 
								source={{ uri:'https://post.healthline.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg' }} 
								style={{ borderRadius: 10, height: 20, width:20 }} 
							/>
						</Marker>
					)
					})
				}
				</MapView>
			</View>
		</SafeAreaView>
	);
}
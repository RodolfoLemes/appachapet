import  React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import MapView from 'react-native-maps';
import { Marker, Polyline } from 'react-native-maps';

import api from '../services/api'
import gpsStyles from '../styles/gpsStyles';	

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

function linesMarkers(markers) {
	let reverseMarkers = markers.reverse()
	let arr = []

	reverseMarkers.map(element => {
		arr.push({
			latitude: element.coords.lat,
			longitude: element.coords.lon
		})
	})

	return arr
}

export default function Gps({ navigation, route }) {
	const [region, setRegion] = useState({
		latitude: -23.42464,
		longitude: -51.92507,
		latitudeDelta: 0.0022,
		longitudeDelta: 0.0091
	})
	const [markers, setMarkers] = useState([])
	const [init, isInit] = useState(true)
	// Variavel para determinar a quanto tempo o usuario quer pegar localizações
	// Criar algum tipo de input para setar esse tempo:
	// Se time = 0, pega todas as localizações, se time = 1 pega todas as localizações de 1 hora atras e assim vai
	const [time, setTime] = useState(0) 
	// Esse dado dever vir quando ele selecionar o device, vir da navegação
	const { device } = route.params

	useEffect(() => {
		async function fetchData (device, time) {
			try {
				const response = await api.get('coords', {
					params: {
						device,
						time
					}
				})
				let markersArr = response.data.datas
				setMarkers(markersArr)
				setRegion({
					latitude: markersArr[markersArr.length - 1].coords.lat,
					longitude: markersArr[markersArr.length - 1].coords.lon,
					latitudeDelta: 0.0022,
					longitudeDelta: 0.0091
				})
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
					region={region}
					//onRegionChange={() => setRegion(region)}
				>
				{ markers.map((element) => {
					const data = new Date(element.coords.timestamp)
					return (
						<Marker
							key={ element._id }
							title={ `${element.isWifi ? 'Wi-fi' : 'GPRS'} - Estive aqui as ${data.getHours()}:${data.getMinutes()} - Dia: ${data.getDate()}/${data.getMonth()}` }
							style={ gpsStyles.topInfoImg }
							coordinate={{ latitude: element.coords.lat, longitude: element.coords.lon }} 
							anchor={{ x: 0, y: 0 }}
						>
							<Image 
								source={{ uri:'https://post.healthline.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg' }} 
								style={{ borderRadius: 10, height: 20, width:20 }} 
							/>
						</Marker>
					)
					})
				}
				<Polyline 
					coordinates={linesMarkers(markers)}
				/>
				</MapView>
			</View>
		</SafeAreaView>
	);
}
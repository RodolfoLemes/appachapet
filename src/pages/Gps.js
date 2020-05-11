import  React, { useState, useEffect } from 'react';
import { Text, View, Image, Slider, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import io from 'socket.io-client'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import api from '../services/api'
import AuthContext from '../contexts/auth'
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
/*  
=> Tres botoes emcima no mapa, ao clicar suba um pouco e aparece um slider horizontal
	=> cada botao se relaciona com o proprio slider
		=> Ex: botão de geofencing da um clique no mapa
		=> Alerta sem slider
*/
var mySetTime
function sendingTimeToApi() {
	clearTimeout(mySetTime)

	mySetTime = setTimeout(() => {
		console.log('cu')
	}, 5000);
}

let deviceWidth = Dimensions.get('window').width

function moveDataToFirstInMarkers(data, markers) {
	if(markers == null) return markers
	let arr =[data]
	markers.map(element => arr.push(element))

	return arr
}

export default function Gps({ route }) {
	const { user, token } = useContext(AuthContext)

	const [markers, setMarkers] = useState(null)
	// Variavel para determinar a quanto tempo o usuario quer pegar localizações
	// Criar algum tipo de input para setar esse tempo:
	// Se time = 0, pega todas as localizações, se time = 1 pega todas as localizações de 1 hora atras e assim vai
	const [time, setTime] = useState(0) 
	const [maxValue, setMaxValue] = useState(100)
	const [value, setValue] = useState(0)

	// Esse dado dever vir quando ele selecionar o device, vir da navegação
	const { device } = route.params
	const AuthString = 'Bearer '.concat(token)

	useEffect(() => {
		async function fetchData () {
			try {
				const response = await api.get('coords', {
					params: {
						device: device._id,
						time
					},
					headers: {
						Authorization: AuthString
					}
				})
				let markersArr = response.data.datas
				setMarkers(markersArr)
			} catch (error) {
				console.log(error)
				return false
			}
		}
		fetchData(device, time)
	}, [])

	const left = value * (deviceWidth-30)/maxValue - 10;
		
	// Socket.IO
	useEffect(() => {
		const socket = io('http://achapet.herokuapp.com', {
			query: { 
				user: user._id 
			},
			extraHeaders: {
				Authorization: AuthString
			}
		})
		socket.on('data', data => {
			console.log('FOI BUSCRANA')
			let arr = moveDataToFirstInMarkers(data, markers)
			setMarkers(arr)
		})
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
			<View style={ gpsStyles.middleInfo }>
				<View style={ gpsStyles.buttonsView }>
					<TouchableOpacity style={ gpsStyles.buttonView }>
						<MaterialCommunityIcons name={'calendar'} size={32} color={ '#2344CE' } />
						<Text>Histórico</Text>
					</TouchableOpacity>
					<TouchableOpacity style={ gpsStyles.buttonView }>
						<MaterialCommunityIcons name={'home'} size={32} color={ '#2344CE' } />
						<Text>Casa</Text>
					</TouchableOpacity>
					<TouchableOpacity style={ gpsStyles.buttonView }>
						<MaterialCommunityIcons name={'dog-side'} size={32} color={ '#2344CE' } />
						<Text>Amigos</Text>
					</TouchableOpacity>
				</View>
				<View style={ gpsStyles.sliderView }>
					<Text style={ { width: 50, textAlign: 'center', left: left } }>
						{ Math.floor(value) }
					</Text>
					<Slider
						thumbTintColor={ '#2344CE' }
						minimumTrackTintColor={ '#2344CE' }
						maximumValue={ maxValue } 
						value={ value }
						onValueChange={value => setValue(value)}
						onSlidingComplete={sendingTimeToApi}
					/>
				</View>
			</View>	
	  		<View style= { gpsStyles.mapView }>
				{ markers === null 
				? (null)
				: (	<MapView
						style={gpsStyles.mapStyle}
						region={{
							latitude: markers[0].coords.lat,
							longitude: markers[0].coords.lon,
							latitudeDelta: 0.0022,
							longitudeDelta: 0.0091
						}}
					>
					<MapView.Circle
						center = {{ latitude: markers[0].coords.lat, longitude: markers[0].coords.lon}}
						radius = { 30 }
						strokeWidth = { 1 }
						strokeColor = { '#1a66ff' }
						fillColor = { 'rgba(230,238,255,0.5)' }
        			/>

					{ markers.map((element, index) => {
						if(index == 0) {
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
										style={{ borderRadius: 15, height: 30, width: 30 }} 
									/>
								</Marker>
							)
						} else {
							return (null)
						}})
					}
					{/* <Polyline 
						coordinates={linesMarkers(markers)}
					/> */}
					</MapView>)
				} 
				
			</View>
		</SafeAreaView>
	);
}

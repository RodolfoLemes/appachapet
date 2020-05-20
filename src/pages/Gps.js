import  React, { useState, useEffect, useContext, useRef } from 'react';
import { Text, View, Image, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import io from 'socket.io-client';
import Slider from 'react-native-slider'

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
	const [radius, setRadius] = useState(30)
	const [radiusFriends, setRadiusFriends] = useState(300)
	
	const [maxValue, setMaxValue] = useState(100)
	const [value, setValue] = useState(0)
	
	const [slider, setSlider] = useState('history') // history, home ou friends
	const [unit, setUnit] = useState('h') // history, home ou friends
	
	const [homeLat, setHomeLat] = useState(null)
	const [homeLon, setHomeLon] = useState(null)

	// Esse dado dever vir quando ele selecionar o device, vir da navegação
	const { device } = route.params
	const AuthString = 'Bearer '.concat(token)

	// VARIÁVEIS DE ANIMAÇÃO //

	// Componente de animação para TouchableOpacity, já que o animated não o suporta normalmente.
	const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity)
	// Variáveis para mudar a escala dos botões ao serem clicados.
	const scaleHistory = useRef(new Animated.Value(1)).current
	const scaleHome = useRef(new Animated.Value(1)).current
	const scaleFriends = useRef(new Animated.Value(1)).current

	// FIM DE VARIÁVEIS DE ANIMAÇÃO //

	// FUNÇÕES DE ANIMAÇÃO //
	function pressIn(param) {
		if (param == 'history'){
			Animated.timing(scaleHistory, {
				toValue: 0.8,
				duration: 100,
				useNativeDriver: true
			}).start()
		}
		else if (param == 'home'){
			Animated.timing(scaleHome, {
				toValue: 0.8,
				duration: 100,
				useNativeDriver: true
			}).start()
		}
		else if (param == 'friends'){
			Animated.timing(scaleFriends, {
				toValue: 0.8,
				duration: 100,
				useNativeDriver: true
			}).start()
		}
	}

	function pressOut(param) {
		if (param == 'history'){
			Animated.timing(scaleHistory, {
				toValue: 1,
				duration: 100,
				useNativeDriver: true
			}).start()
			}
			else if (param == 'home'){
			Animated.timing(scaleHome, {
				toValue: 1,
				duration: 100,
				useNativeDriver: true
			}).start()
			}
			else if (param == 'friends'){
			Animated.timing(scaleFriends, {
				toValue: 1,
				duration: 100,
				useNativeDriver: true
			}).start()
		}
		setSlider(param)
	}
	
	// FIM DE FUNÇÕES DE ANIMAÇÃO //

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
				setHomeLat(markersArr[0].coords.lat) // substituir por coords da home, obtido no banco de dados
				setHomeLon(markersArr[0].coords.lon)
			} catch (error) {
				console.log(error)
				return false
			}
		}
		fetchData(device, time)
	}, [])

	const left = value * (deviceWidth-100)/maxValue + deviceWidth*0.1;
		
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

	useEffect(() => {

		if (slider == 'history'){
			setTime(value)
		}
		else if (slider == 'home'){
			setRadius(value)
		}
		else if (slider == 'friends'){
			setRadiusFriends(value)
		}
		
	}, [value])

	useEffect(() => {

		if (slider == 'history'){
			setMaxValue(24)
			setUnit('h')
		}
		else if (slider == 'home'){
			setMaxValue(300)
			setUnit('m')
		}
		else if (slider == 'friends'){
			setMaxValue(800)
			setUnit('m')
		}
		
	}, [slider])

	/* const renderTextThumb = () => {
		console.log('sdasdasdsadas')
		return (
			<View style={{ height: 30, width: 30 }}>
				<Text>aaa</Text>
			</View>
		)
	} */
	
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
					<AnimatedButton
						style={ [gpsStyles.buttonView, {transform: [{scale: scaleHistory}]}] }
						onPressIn={() => {pressIn('history')}}
						onPressOut={() => {pressOut('history')}}
						activeOpacity={1}
					>
						<MaterialCommunityIcons name={'calendar'} size={ 40 } color={ slider == 'history' ? '#2344CE' : 'gray' } />
						<Text style={ slider == 'history' ? {color: '#2344CE', fontSize: 14} : {color: 'gray', fontSize: 12} }>Histórico</Text>
					</AnimatedButton>
					<AnimatedButton
						style={ [gpsStyles.buttonView, {transform: [{scale: scaleHome}]}] }
						onPressIn={() => {pressIn('home')}}
						onPressOut={() => pressOut('home')}
						activeOpacity={1}
					>
						<MaterialCommunityIcons name={'home'} size={ 40 } color={ slider == 'home' ? '#2344CE' : 'gray' } />
						<Text style={ slider == 'home' ? {color: '#2344CE', fontSize: 14} : {color: 'gray', fontSize: 12} }>Casa</Text>
					</AnimatedButton>
					<AnimatedButton
						style={ [gpsStyles.buttonView, {transform: [{scale: scaleFriends}]}] }
						onPressIn={() => {pressIn('friends')}}
						onPressOut={() => pressOut('friends')}
						activeOpacity={1}
					>
						<MaterialCommunityIcons name={'dog-side'} size={ 40 } color={ slider == 'friends' ? '#2344CE' : 'gray' } />
						<Text style={ slider == 'friends' ? {color: '#2344CE', fontSize: 14} : {color: 'gray', fontSize: 12} }>Amigos</Text>
					</AnimatedButton>
				</View>
				<View style={ gpsStyles.middleView }>
					<View style={{ height: '40%', justifyContent: 'center' }}>
						<Text style={ { width: 50, left: left } }>
							{ Math.floor(value) } { unit }
						</Text>
					</View>
					<View style={ gpsStyles.sliderView }>
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
						onLongPress={ (e) => {setHomeLat(e.nativeEvent.coordinate.latitude); setHomeLon(e.nativeEvent.coordinate.longitude)} }
					>
					<MapView.Circle
						center = {{ latitude: homeLat, longitude: homeLon }}
						radius = { radius }
						strokeWidth = { 1 }
						strokeColor = { '#1a66ff' }
						fillColor = { 'rgba(230,238,255,0.5)' }
        			/>
					<MapView.Marker coordinate={{latitude: homeLat, longitude: homeLon}}>
						<MaterialCommunityIcons name={'home'} size={ 20 } color={ '#2344CE' } />
					</MapView.Marker>

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
					{ (slider != 'history')
					? (null)
					: (<Polyline 
						coordinates={linesMarkers(markers)}
						strokeWidth={6}
						strokeColor='rgba(26,102,255,0.3)'
					/> )
					}
					
					</MapView>)
				} 
				
			</View>
		</SafeAreaView>
	);
}

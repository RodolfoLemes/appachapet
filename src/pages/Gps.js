import  React, { useState, useEffect, useContext, useRef } from 'react';
import { Text, View, Image, TouchableOpacity, Dimensions, Animated, Alert } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import io from 'socket.io-client';
import { Slider } from "@miblanchard/react-native-slider";

import api from '../services/api'
import AuthContext from '../contexts/auth'
import gpsStyles from '../styles/gpsStyles';

let deviceWidth = Dimensions.get('window').width

function moveDataToFirstInMarkers(data, markers) {
	if(markers == null) return markers
	let arr =[data]
	markers.map(element => arr.push(element))

	return arr
}


export default function Gps() {
	const { user, token, device } = useContext(AuthContext)

	// States
	const [markers, setMarkers] = useState(null)

	const [time, setTime] = useState(0)
	const [radius, setRadius] = useState(30)
	const [radiusFriends, setRadiusFriends] = useState(300)
	
	const [maxValue, setMaxValue] = useState(100)
	const [value, setValue] = useState(0)

	const [slider, setSlider] = useState('') // history, home ou friends
	const [unit, setUnit] = useState('h') // history, home ou friends
	
	const [homeLat, setHomeLat] = useState(null)
	const [homeLon, setHomeLon] = useState(null)

	const [battery, setBattery] = useState(device.battery)

	// Variables
	const AuthString = 'Bearer '.concat(token)
	const left = value * (deviceWidth-100)/maxValue + deviceWidth*0.1;
	var mySetTime = null

	// VARIÁVEIS DE ANIMAÇÃO //
	// Componente de animação para TouchableOpacity, já que o animated não o suporta normalmente.
	const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity)
	// Variáveis para mudar a escala dos botões ao serem clicados.
	const scaleHistory = useRef(new Animated.Value(1)).current
	const scaleHome = useRef(new Animated.Value(1)).current
	const scaleFriends = useRef(new Animated.Value(1)).current

	// FIM DE VARIÁVEIS DE ANIMAÇÃO //

	// Effects
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
				let { geofencing } = response.data
				setHomeLat(geofencing.coordCentralLat) // substituir por coords da home, obtido no banco de dados
				setHomeLon(geofencing.coordCentralLon)
				setRadius(geofencing.radius)
				setMarkers(markersArr)
			} catch (error) {
				console.log(error)
				return false
			}
		}
		fetchData()
	}, [])
		
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
			let arr = moveDataToFirstInMarkers(data.data, markers)
			setBattery(data.battery)
			setMarkers(arr)
		})
	}, [])

	useEffect(() => {
		console.log(value[0])
		if (slider == 'history') {
			setTime(value[0])
		}
		else if (slider == 'home') {
			setRadius(value[0])
		}
		else if (slider == 'friends') {
			setRadiusFriends(value[0])
		}
		
	}, [value])

	useEffect(() => {

		if (slider == 'history') {
			setValue(0)
			setMaxValue(24)
			setUnit('h')
		}
		else if (slider == 'home') {
			setValue(radius)
			setMaxValue(300)
			setUnit('m')
		}
		else if (slider == 'friends') {
			setValue(0)
			setMaxValue(800)
			setUnit('m')
		}
		
	}, [slider])

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
		if(param == slider) {
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
			setSlider('')
		} else {
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
	}
	// FIM DE FUNÇÕES DE ANIMAÇÃO //

	// Functions
	function linesMarkers() {
		let arr = []
		markers.map(element => {
			arr.push({
				latitude: element.coords.lat,
				longitude: element.coords.lon
			})
		})
		return arr
	}

	const sendingTimeHomeFriendsToApi = () => {
		clearTimeout(mySetTime)

		mySetTime = setTimeout(() => {
			if(slider == 'history') {
				submitTime()
			} else if(slider == 'home') {
				submitGeofencing()
			} else if(slider == 'friends') {
				console.log('foda-se')
			}
		}, 5000);
	}

	async function submitTime() {
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
	}

	async function submitGeofencing(latitude = homeLat, longitude = homeLon) {
		const response = await api.post(`device/${device._id}/geofencing`, {
			latitude,
			longitude,
			radius
		}, {
			headers:{
				Authorization: AuthString
			}
		})

		if(response.data.sucess) {
			setHomeLat(latitude)
			setHomeLon(longitude)
			console.log('foi')
		} 
	}

	const geofencingManagement = (latitude, longitude) => {
		Alert.alert(
			"Geofencing",
			"Deseja configuração a localização central da sua Geofencing?",
			[
				{ text: "Não", style: "cancel" },
				{ text: "Sim", onPress: () => submitGeofencing(latitude, longitude)}
			]
		)
	}

	return (
		<SafeAreaView forceInset={{top: 'always'}} style={ gpsStyles.container }>
			<View style={ gpsStyles.topInfo }>
				<View style={ gpsStyles.topInfoTexts }>
					<View style={ gpsStyles.topInfoTextsTitle }>
						<Text style={ gpsStyles.topInfoTextsTitleFont }>
							{ markers ? (markers[0].isWifi ? 'Tudo certo' : (markers[0].isGeofencing ? 'Tudo certo' : 'ALERTA PRETO')) : (null) }
						</Text>
					</View>
					<View style={ gpsStyles.topInfoTextsSubtitle }>
						<Text style={ gpsStyles.topInfoTextsSubtitleFont }>
							{ markers ? (markers[0].isWifi ? 'Seu pet está dentro do seu Wi-fi' : (markers[0].isGeofencing ? 'Seu pet está na redondezas' : 'SEU PET SAIU SOCORORRORO')) : (null) }
						</Text>
					</View>
					<View style={ gpsStyles.topInfoTextsSubtitle }>
						<Text style={ gpsStyles.topInfoTextsSubtitleFont }>{"A bateria está " + device.battery}</Text>
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
					{/* <AnimatedButton
						style={ [gpsStyles.buttonView, {transform: [{scale: scaleHistory}]}] }
						onPressIn={() => pressIn('history')}
						onPressOut={() => pressOut('history')}
						activeOpacity={1}
					>
						<MaterialCommunityIcons name={'calendar'} size={ 40 } color={ slider == 'history' ? '#2344CE' : 'gray' } />
						<Text style={ slider == 'history' ? {color: '#2344CE', fontSize: 14} : {color: 'gray', fontSize: 12} }>Histórico</Text>
					</AnimatedButton> */}
					{/* <AnimatedButton
						style={ [gpsStyles.buttonView, {transform: [{scale: scaleHome}]}] }
						onPressIn={() => pressIn('home')}
						onPressOut={() => pressOut('home')}
						activeOpacity={1}
					>
						<MaterialCommunityIcons name={'home'} size={ 40 } color={ slider == 'home' ? '#2344CE' : 'gray' } />
						<Text style={ slider == 'home' ? {color: '#2344CE', fontSize: 14} : {color: 'gray', fontSize: 12} }>Casa</Text>
					</AnimatedButton> */}
					{/* <AnimatedButton
						style={ [gpsStyles.buttonView, {transform: [{scale: scaleFriends}]}] }
						onPressIn={() => pressIn('friends')}
						onPressOut={() => pressOut('friends')}
						activeOpacity={1}
					>
						<MaterialCommunityIcons name={'dog-side'} size={ 40 } color={ slider == 'friends' ? '#2344CE' : 'gray' } />
						<Text style={ slider == 'friends' ? {color: '#2344CE', fontSize: 14} : {color: 'gray', fontSize: 12} }>Amigos</Text>
					</AnimatedButton> */}
				</View>
				{ slider == ''
				? (null)
				: (<View style={ gpsStyles.middleView }>
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
								onSlidingComplete={sendingTimeHomeFriendsToApi}
							/>				
						</View>
					</View>) 
				}
				</View>
	  		<View style= { gpsStyles.mapView }>
				{ markers === null 
				? (null)
				: (	<MapView
						style={gpsStyles.mapStyle}
						region={{
							latitude: homeLat,
							longitude: homeLon,
							latitudeDelta: 0.0022,
							longitudeDelta: 0.0091
						}}
						onLongPress={ (event) => geofencingManagement(event.nativeEvent.coordinate.latitude, event.nativeEvent.coordinate.longitude ) }
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
						}})
					}
					{ 	(slider == 'history' || slider == '')
						? (<Polyline 
							coordinates={linesMarkers()}
							strokeWidth={6}
							strokeColor='rgba(26,102,255,0.3)'
							/>)
						: (null)
					}
					
					</MapView>)
				} 
				
			</View>
		</SafeAreaView>
	);
}

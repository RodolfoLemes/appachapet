import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {MapView} from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import activityStyles from './src/styles/activityStyles';
import gpsStyles from './src/styles/gpsStyles';
import dataStyles from './src/styles/dataStyles';

function Activity() {
	return (
		<SafeAreaView forceInset={{top: 'always'}} style={ activityStyles.container }>
    		<View style={ activityStyles.topInfo }>
        		<View style={ activityStyles.topInfoTexts }>
          			<View style={ activityStyles.topInfoTextsTitle }>
            			<Text style={ activityStyles.topInfoTextsTitleFont }>Olá, Humano</Text>
          			</View>
          			<View style={ activityStyles.topInfoTextsSubtitle }>
            			<Text style={ activityStyles.topInfoTextsSubtitleFont }>Eu preciso correr!</Text>
          			</View>
        		</View>
        		<View style={ activityStyles.topInfoImg }>
          			<Image
            		style={ activityStyles.topInfoImg }
            		source={require('./src/assets/dog.jpg')}
          			/>
        		</View>
    	  	</View>
	  		<View style= { activityStyles.middleInfo }>
				<View style={ activityStyles.middleInfoLabel }>
					<Text style={ activityStyles.middleInfoLabelText }>Distância percorrida</Text>
				</View>
				<View style={ activityStyles.middleInfoInformation }>
					<Text style={ activityStyles.middleInfoInformationText }>750 metros</Text>
				</View>
				<View style={ activityStyles.middleInfoPack }>
					<View style={ activityStyles.middleInfoPackView }>
						<View style={{ flex: 1, justifyContent: 'center' }}>
							<Text style={ activityStyles.middleInfoPackTitle }>Calorias</Text>
						</View>
						<View style={{ flex: 1 }}>
							<Text style={ activityStyles.middleInfoPackSubtitle }>200</Text>
						</View>
					</View>
					<View style={ activityStyles.middleInfoPackView }>
						<View style={{ flex: 1, justifyContent: 'center' }}>
							<Text style={ activityStyles.middleInfoPackTitle }>Passos</Text>
						</View>
						<View style={{ flex: 1 }}>
							<Text style={ activityStyles.middleInfoPackSubtitle }>150</Text>
						</View>
					</View>
					<View style={ activityStyles.middleInfoPackView }>
						<View style={{ flex: 1, justifyContent: 'center' }}>
							<Text style={ activityStyles.middleInfoPackTitle }>Tempo</Text>
						</View>
						<View style={{ flex: 1 }}>
							<Text style={ activityStyles.middleInfoPackSubtitle }>30 min</Text>
						</View>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
}

function Gps() {
  	return (
		<SafeAreaView forceInset={{top: 'always'}} style={ activityStyles.container }>
			<View style={ activityStyles.topInfo }>
				<View style={ activityStyles.topInfoTexts }>
						<View style={ activityStyles.topInfoTextsTitle }>
						<Text style={ activityStyles.topInfoTextsTitleFont }>Quer me saber onde estou?</Text>
						</View>
						<View style={ activityStyles.topInfoTextsSubtitle }>
						<Text style={ activityStyles.topInfoTextsSubtitleitleFont }>Estou em casa.</Text>
						</View>
				</View>
				<View style={ activityStyles.topInfoImg }>
						<Image
					style={ activityStyles.topInfoImg }
					source={require('./src/assets/dog.jpg')}
						/>
				</View>
			</View>
			<View style={ activityStyles.MiddleInfo }>
				<MapView style={ activityStyles.mapStyle }
				initialRegion={{ latitude: -23.0000, longitude: -51.0000, latitudeDelta: 0.0922, longitudeDelta: 0.0421,}} >
				{/* <MapView.Marker
            	coordinate={{latitude: -23.0000, longitude: -51.0000}}
            	title={'teste'}
            	description={'teste'}
         		/> */}
				</MapView>
			</View>
		</SafeAreaView>
	);
}

function Data() {
	return (
	  	<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		    <Text>Data!</Text>
	  	</View>
	);
  }

const Tab = createBottomTabNavigator();

export default function App() {

	return (
	  	<NavigationContainer>
		<Tab.Navigator
		  	screenOptions={({ route }) => ({
			tabBarIcon: ({ focused, color, size }) => {
				  let iconName;
			  	if (route.name === 'Atividade') {
					iconName = focused
				  	? 'ios-podium'
					: 'ios-podium';
				} 
				else if (route.name === 'GPS') {
					iconName = focused 
					? 'ios-pin' 
					: 'ios-pin';
				}
				else if (route.name === 'Dados') {
					iconName = focused 
					? 'ios-paw' 
					: 'ios-paw';
					}

				return <Ionicons name={iconName} size={55} color={color} />;
				},
		  	})}
		  	tabBarOptions={{
				activeTintColor: '#2147D6',
			    inactiveTintColor: 'gray',
				style: {height: 70, elevation:0, borderTopWidth: 0, shadowOpacity:0},
            }}
			>
		  	<Tab.Screen name="Atividade" component={Activity} />
		  	<Tab.Screen name="GPS" component={Gps} />
		  	<Tab.Screen name="Dados" component={Data} />
		</Tab.Navigator>
	  	</NavigationContainer>
	);
  }

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
            			<Text style={ activityStyles.topInfoTextsTitleFont }>Olá, Humano.</Text>
          			</View>
          			<View style={ activityStyles.topInfoTextsSubtitle }>
            			<Text style={ activityStyles.topInfoTextsSubtitleitleFont }>Eu preciso correr!</Text>
          			</View>
        		</View>
        		<View style={ activityStyles.topInfoImg }>
          			<Image
            		style={ activityStyles.topInfoImg }
            		source={require('./src/assets/dog.jpg')}
          			/>
        		</View>
    	  	</View>
	  		<View style= { activityStyles.MiddleInfo }>
			
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

				return <Ionicons name={iconName} size={35} color={color} />;
				},
		  	})}
		  	tabBarOptions={{
				activeTintColor: '#2147D6',
			    inactiveTintColor: 'gray',
				style: {elevation:0, borderTopWidth: 0, shadowOpacity:0},
            }}
			>
		  	<Tab.Screen name="Atividade" component={Activity} />
		  	<Tab.Screen name="GPS" component={Gps} />
		  	<Tab.Screen name="Dados" component={Data} />
		</Tab.Navigator>
	  	</NavigationContainer>
	);
  }

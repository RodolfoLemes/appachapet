import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";


import activityStyles from './src/styles/activityStyles';
import gpsStyles from './src/styles/gpsStyles';
import dataStyles from './src/styles/dataStyles';

const data = {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
    datasets: [
      {
		data: [20, 45, 28, 55, 70, 43, 15],
	  },
	],
  };

const chartConfig = {
    backgroundGradientFrom: "#FFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFF", 
	backgroundGradientToOpacity: 0,
	fillShadowGradient: 'rgb(33, 71, 214)',
	fillShadowGradientOpacity: 1,
	barRadius: 8,
	strokeWidth: 0,
    color: (opacity = 1) => `rgba(33, 71, 214, ${opacity})`,
	barPercentage: 0.5,
};

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
			<View style={ activityStyles.chartInfo }>
				<BarChart
					data={data}
					width={responsiveWidth(90)}
					height={responsiveHeight(30)}
					chartConfig={chartConfig}
					showBarTops={false}
					withInnerLines={false}
					fromZero={true}
					/>
			</View>
		</SafeAreaView>
	);
}

function Gps() {
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
            		source={ require('./src/assets/dog.jpg') }
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
				<Marker
				style={ gpsStyles.topInfoImg }
				coordinate={{latitude: -23.4227395, longitude: -51.9375501}}
				image={require('./src/assets/dog-marker.png')}
				/>
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
				  	? 'chart-line'
					: 'chart-line';
				} 
				else if (route.name === 'GPS') {
					iconName = focused 
					? 'map-marker' 
					: 'map-marker';
				}
				else if (route.name === 'Dados') {
					iconName = focused 
					? 'paw' 
					: 'paw';
					}
				return < MaterialCommunityIcons name={iconName} size={50} color={color} />
				}}
			)}
		  	tabBarOptions={{
				activeTintColor: '#2147D6',
			  inactiveTintColor: 'gray',
				style: {height: 70, elevation:0, borderTopWidth: 0, shadowOpacity:0, marginBottom: 5},
			}}
			>
		  	<Tab.Screen name="Atividade" component={Activity} />
		  	<Tab.Screen name="GPS" component={Gps} />
		  	<Tab.Screen name="Dados" component={Data} />
		</Tab.Navigator>
	  	</NavigationContainer>
	);
  }

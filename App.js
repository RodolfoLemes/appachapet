import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/pages/Login'
import Device from './src/pages/Device'
import Activity from './src/pages/Activity'
import Gps from './src/pages/Gps'
import Data from './src/pages/Data'

const Tab = createBottomTabNavigator();

function TabNavigation() {
	return (
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
						return <MaterialCommunityIcons name={iconName} size={50} color={color} />
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
	)
}

const Stack = createStackNavigator()

function StackNavigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='Device' component={Device} />
				<Stack.Screen name='TabNavigation' component={TabNavigation} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}


const Switch = createSwitchNavigator({
	Login,
	StackNavigation
}, {
	initialRouteName: 'Login'
})


const Container = createAppContainer(Switch)

export default function App() {
	return (
		<Container />
	);
}

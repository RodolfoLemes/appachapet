import 'react-native-gesture-handler';
import * as React from 'react';
import { View, ActivityIndicator, StatusBar, TouchableOpacity, YellowBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';	

import AuthContext, { AuthProvider } from './src/contexts/auth';

import Intro from './src/pages/Intro'
import Login from './src/pages/Login'
import Device from './src/pages/Device'
import Activity from './src/pages/Activity'
import Gps from './src/pages/Gps'
import Data from './src/pages/Data'
import Info from './src/pages/Info'

YellowBox.ignoreWarnings([
	'Unrecognized WebSocket'
])

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
						else if (route.name === 'Info') {
							iconName = focused 
							? 'information-outline' 
							: 'information-outline';
							}
						return <MaterialCommunityIcons name={iconName} size={50} color={color} />
					}}
				)}
				tabBarOptions={{
					activeTintColor: '#2147D6',
					inactiveTintColor: 'gray',
					style: {height: 70, elevation:0, borderTopWidth: 0, shadowOpacity:0, marginBottom: 5},
					keyboardHidesTabBar: true,
				}}
				
				>
				{ /*<Tab.Screen name="Atividade" component={Activity} /> */ }
				<Tab.Screen name='Info' component={Info} />
				<Tab.Screen name="GPS" component={Gps} />
				<Tab.Screen name="Dados" component={Data} 
				/>
		</Tab.Navigator>
	)
}

const StackHome = createStackNavigator()
const StackLogin = createStackNavigator()

const HomeRoutes = () => (
	<StackHome.Navigator>
		<StackHome.Screen options={{ headerShown: false }} name='Device' component={ Device }/>
		<StackHome.Screen 
			name='TabNavigation' 
			component={ TabNavigation }
			options={({ navigation }) => ({
				headerStyle: {
					backgroundColor: '#fff',
					elevation: 0
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold',
				},
				headerTitle: '',
				headerLeft: () => (
					<TouchableOpacity onPress={() => navigation.navigate('Device')} style={{paddingLeft: 10}}>
						<MaterialCommunityIcons name={'reply'} size={50} color={'#2147D6'} />
					</TouchableOpacity>
				)
			})}
		/>
	</StackHome.Navigator>
)

const LoginRoutes = () => (
	<StackLogin.Navigator>
		<StackLogin.Screen options={{ headerShown: false }} name='Login' component={ Intro } />
	</StackLogin.Navigator>
)

export const Router = () => {
	const { signed, loading } = React.useContext(AuthContext)

	if(loading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItem: 'center' }}>
				<ActivityIndicator size='large' />
			</View>
		)
	}

	return signed ? <HomeRoutes /> : <LoginRoutes />
}

StatusBar.setBackgroundColor('#ffffff')
StatusBar.setBarStyle("dark-content")
StatusBar.setHidden(false)

export default function App() {
	return (
		<NavigationContainer>
			<AuthProvider>
				<Router />
			</AuthProvider>
		</NavigationContainer>
	)
	
}

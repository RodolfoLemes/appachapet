import React from 'react';
import { View, Button, Text } from 'react-native';

const Login = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Home ;D</Text>
    <Button 
      title="Ir para Main"
      onPress={() => navigation.navigate('Main') }
    />
  </View>
);

export default Login;

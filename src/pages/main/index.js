import React from 'react';
import { View, Button, Text } from 'react-native';

const Main = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Home ;D</Text>
    <Button 
      title="Ir para Profile"
      onPress={() => navigation.navigate('Profile') }
    />
  </View>
);

export default Main;

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from "./pages/MainScreen";
import Register from './pages/Register';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import { RootStackParamList } from './types/Navigator.types';
import { setRandomFallback } from 'bcryptjs';
import { getRandomValues } from 'react-native-get-random-values';

setRandomFallback((len) => {
  const values = new Uint8Array(len);
  getRandomValues(values);
  return values;
})

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Main'>
        <Stack.Screen name="Main" component={MainScreen}/>
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='UserProfile' component={UserProfile}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

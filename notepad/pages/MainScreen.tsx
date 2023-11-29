import React, { useEffect, useCallback } from 'react';
import {View , Text, Button, BackHandler, Platform} from 'react-native';
import { MainProps } from '../types/Navigator.types';
//import { isSmartphoneSafe } from '../utils/updateUtils';

const MainScreen = ({navigation}: MainProps) => {

    // const isDeviceSafe: boolean = isSmartphoneSafe;

    // const handleUnsafeDevice = useCallback(() => {
    //     if (Platform.OS === 'android') {
    //         BackHandler.exitApp();
    //     }
    // }, [])

    // useEffect(() => {
    //     if (!isDeviceSafe) {
    //         handleUnsafeDevice();
    //     }
    // }, [isDeviceSafe, handleUnsafeDevice]);

    return (
        <View style={{justifyContent: 'center'}}>
            <Text>Strona rejestracji</Text>
            <Button
            title="Zarejestruj użytkownika"
            onPress={() => navigation.navigate('Register')}
            />
            <Button 
            title='Logowanie'
            onPress={() => navigation.navigate('Login')}/>
        </View>
    );
};

export default MainScreen;
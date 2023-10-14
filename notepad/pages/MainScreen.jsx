import React from 'react';
import {View , Text, Button} from 'react-native';

const MainScreen = ({navigation}) => {

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
}

export default MainScreen;
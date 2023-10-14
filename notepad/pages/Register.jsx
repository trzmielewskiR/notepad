import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const Register = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleRegister = () => {
        if (password === repeatPassword) {
            console.log('wtf')
            //stworzenie uzytkownika jezeli zgadza sie haslo
            const user = { username, password };
            //stworzenie uztywkoniak mozna uzyc asyncstorage
            //potem powrot do glownego widoku
            navigation.navigate('Main');
        } else {
            alert('Password do not match');
        }
    }

    return (
        <View>
            <Text> Zarejestruj użytkownika</Text>
            <TextInput
                placeholder='Nazwa użytkownika'
                onChangeText={(username) => setUsername(username)}
                value={username}
            />
            <TextInput
                placeholder='Hasło'
                onChangeText={(password) => setPassword(password)}
                value={password}
                secureTextEntry={true}
            />
            <TextInput
                placeholder='Powtórz hasło'
                onChangeText={(repeatPassword) => setRepeatPassword(repeatPassword)}
                value={repeatPassword}
                secureTextEntry={true}
            />
            <Button
                title='Stwórz użytkownika'
                onPress={handleRegister}
            />
        </View>
    );
};

export default Register;
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isSafeSQL } from '../utils';
import { User, Users } from "../types/User.types";

const Register = ({navigation}: any) => {
    const [username, setUsername] = useState<User['username']>('');
    const [password, setPassword] = useState<User['password']>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');

    const handleRegister = async () => {
        if (!username || !password || !repeatPassword){
            alert('Nazwa użytkownika oraz hasło nie mogą być puste');
            return;
        } else if  (password === repeatPassword) {

            if (username.length <= 6) {
                alert('Nazwa użytkownika musi być dłuższa niż 6 znaków.');
                return;
            }

            if (password.length <= 6 || password.length <= 6){
                alert('Hasło musi być dłuższe niż 6 znaków.');
                return;
            }

            if (!(isSafeSQL(username) && isSafeSQL(password) && isSafeSQL(repeatPassword))) {
                alert('Nazwa użytkownika lub hasło zawierają niedozwolone frazy.');
                return;
            }

            try {
                const existingUserData = await AsyncStorage.getItem('users');
                let users: Users = [];

                if (existingUserData){
                    users = JSON.parse(existingUserData);
                }

                const usernameExists: boolean = users.some((user: User) => user.username === username);
                if (usernameExists){
                    alert('Nazwa użytkownika jest zajęta, proszę wybrać inną.');
                    return;
                }

                const newUser: User = {username, password, note: ''};

                if (users.length === 0){
                    users = [newUser];
                } else {
                    users.push(newUser);
                }
                await AsyncStorage.setItem('users', JSON.stringify(users));
                alert('Użytkownik został zarejestrowany');
                navigation.navigate('Main');
            } catch (error) {
                console.error('Error storing user data:', error);
            }
        } else {
            alert('Password do not match');
        }
    }

    return (
        <View>
            <Text>Strona rejestracji</Text>
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
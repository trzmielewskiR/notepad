import React, { useState} from "react";
import { View, Text, TextInput, Button } from "react-native";
import Note from "../components/Note";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserProfile = ({navigation, route}) => {
    const [newPassword, setNewPassword] = useState('');
    const { currentUser } = route.params;
    
    const handlePasswordChange = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                const user = JSON.parse(userData)
                if (user.username === currentUser.username){
                    user.password = newPassword;
                await AsyncStorage.setItem('user', JSON.stringify(user));
                alert('Hasło zostało zmienione');
                } else {
                    alert('Dane użytkownika nie zgadzają się z zapisanymi');
                }
        } else {
            alert('Nie znaleziono takiego użytkownika');
        }
    } catch (error) {
        console.error('Error updating password', error);
    }}

    const handleLogout = () => {
        navigation.popToTop('Main');
    }

    return (
    <View>
        {currentUser && (
            <Text>Zalogowano jako: {currentUser.username}</Text>
        )}
        <Note user={currentUser}/>
        <Text>Zmień hasło:</Text>
        <TextInput
        placeholder="Nowe hasło"
        onChangeText={(newPassword) => setNewPassword(newPassword)}
        value={newPassword}
        secureTextEntry={true}
        />
        <Button title="Zmień hasło" onPress={handlePasswordChange} />
        <Button title="Wyloguj się" onPress={handleLogout} />
    </View>
    );
}

export default UserProfile;
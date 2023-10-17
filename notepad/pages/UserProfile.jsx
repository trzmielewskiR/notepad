import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import Note from "../components/Note";
import users from "../components/storage/UsersStore";

const UserProfile = ({navigation}) => {
    const [newPassword, setNewPassword] = useState('');
    
    const handlePasswordChange = () => {
        const userIndex = users.findIndex((u) => u.name === 'exampleUser'); //to change
        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
        }
        alert('Hasło zostało zmienione');
    }

    const handleLogout = () => {

        navigation.popToTop('Main');
    }

    return (
    <View>
        <Text>Zalogowano jako: exampleUser</Text>
        <Note/>
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
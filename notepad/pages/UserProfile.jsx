import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

const UserProfile = ({navigation}) => {
    const [newPassword, setNewPassowrd] = useState('');
    
    const handlePasswordChange = () => {

        alert('Hasło zostało zmienione');
    }

    const handleLogout = () => {

        navigation.navigate('Main');
    }

    return (
    <View>
        <Text>Zalogowano jako: exampleUser</Text>
        <Text>Zmień hasło:</Text>
        <TextInput
        placeholder="Nowe hasło"
        onChangeText={(newPassword) => setPassword(newPassword)}
        value={newPassword}
        secureTextEntry={true}
        />
        <Button title="Zmień hasło" onPress={handlePasswordChange} />
        <Button title="Wyloguj się" onPress={handleLogout} />
    </View>
    );
}

export default UserProfile;
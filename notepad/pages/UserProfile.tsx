import React, { useState} from "react";
import { View, Text, TextInput, Button } from "react-native";
import Note from "../components/Note";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isSafeSQL } from "../utils";
import { UserProfileProps } from "../types/Navigator.types";
import { User, Users } from "../types/User.types";

const UserProfile = ({navigation, route}: UserProfileProps ) => {
    const [newPassword, setNewPassword] = useState<string>('');
    const { user } = route.params;
    
    const handlePasswordChange = async () => {
      if (!newPassword) {
        alert('Hasło nie może być puste.');
        return;
      } else if (newPassword) {

          if (newPassword.length <= 6){
            alert('Hasło musi być dłuższe niż 6 znaków.');
            return;
          }

          if (!(isSafeSQL(newPassword))) {
            alert('Hasło zawiera niedozwolone frazy.');
            return;
          }

          if (newPassword === user.password){
            alert('Nowe hasło nie może być takie samo jak stare hasło.');
            return;
          }
      
            try {
              const userData = await AsyncStorage.getItem('users');
              user.password = newPassword;
              if (userData) {
                const users: Users = JSON.parse(userData);
                const updatedUsers = users.map(
                  (u) => (u.username === user.username ? user : u));
      
                await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
                alert('Hasło zostało zmienione');
                setNewPassword('');
              } else {
                alert('Nie znaleziono takiego użytkownika');
              }
            } catch (error) {
              console.error('Error changing password:', error);
            }
          } else {
            alert('Hasło nie może być takie jest stare hasło. Wprowadź nowe.');
          }
        }

    const handleLogout = () => {
        navigation.popToTop();
    }


    return (
    <View>
        {user && (
            <Text>Zalogowano jako: {user.username}</Text>
        )}
        <Note {...user}/>
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
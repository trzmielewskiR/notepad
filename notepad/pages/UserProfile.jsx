import React, { useState} from "react";
import { View, Text, TextInput, Button } from "react-native";
import Note from "../components/Note";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isSafeSQL } from "../utils";

const UserProfile = ({navigation, route}) => {
    const [newPassword, setNewPassword] = useState('');
    const { currentUser } = route.params;
    
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

          if (newPassword === currentUser.password){
            alert('Nowe hasło nie może być takie samo jak stare hasło.');
            return;
          }
      
            try {
              const userData = await AsyncStorage.getItem('users');
              currentUser.password = newPassword;
              if (userData) {
                const users = JSON.parse(userData);
                const updatedUsers = users.map((u) => (u.username === currentUser.username ? currentUser : u));
      
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
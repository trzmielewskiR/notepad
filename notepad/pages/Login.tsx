import React, { useState} from "react";
import { View, Text, TextInput, Button } from "react-native";
import { User, Users } from "../types/User.types";
import { LoginProps } from "../types/Navigator.types";
import * as SecureStore from "expo-secure-store";

const Login = ({ navigation }: LoginProps) => {
    const [username, setUsername] = useState<User['username']>('');
    const [password, setPassword] = useState<User['password']>('');
    const resetUserFields = ()=>{
      setUsername('');
      setPassword('');
    }

    const handleLogin = async () => {
      try {
        const userData = await SecureStore.getItemAsync("users",
          {keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY});
        if (userData) {
          const users: Users = JSON.parse(userData);
          
          const user: User | undefined = users.find(
            (u) => u.username === username && u.password === password);
          if (user) {
            navigation.navigate({name: 'UserProfile', params: {user: user}});
            resetUserFields();
          } else {
            alert('Wprowadzono złe dane');
          }
        } else {
          alert('Taki użytkownik nie istnieje');
        }
      } catch (error) {
        console.error('Error retreving user data:', error);
      }
    }


    return (
        <View>
          <Text>Strona logowania</Text>
          <TextInput
            placeholder="Nazwa użytkownika"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <TextInput
            placeholder="Hasło"
            onChangeText={(pass) => setPassword(pass)}
            value={password}
            secureTextEntry={true}
          />
          <Button title="Zaloguj się" onPress={handleLogin} />
        </View>
      );
};

export default Login;
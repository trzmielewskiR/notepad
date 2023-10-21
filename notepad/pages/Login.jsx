import React, { useState} from "react";
import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem('users');
        if (userData) {
          const users = JSON.parse(userData);
          const user = users.find((u) => u.username === username && u.password === password);
          if (user) {
            navigation.navigate({name: 'UserProfile', params: {currentUser: user}});
            setUsername('');
            setPassword('');
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
import React, { useState} from "react";
import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          if (user.username === username && user.password === password) {
            navigation.navigate({name: 'UserProfile', params: {currentUser: user}});
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
          <Text>Login</Text>
          <TextInput
            placeholder="Name"
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
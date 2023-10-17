import React, { useState} from "react";
import { View, Text, TextInput, Button } from "react-native";
import users from "../components/storage/UsersStore";

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
      const user = users.find((u) => u.name === username && u.password === password);
      if (user){
            navigation.navigate('UserProfile');
        } else {
            alert('Wprowadzono złą nazwę użytkownika lub haslo');
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
import React, { useState} from "react";
import { View, Text, TextInput, Button } from "react-native";

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        //this is the worst way possible to handle login user
        const hardcodedUser = {username : 'admin', password: 'admin'};

        const credentials = (username === hardcodedUser.username && password === hardcodedUser.password);
        if (credentials === true) {
            //navigate to users profile page
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
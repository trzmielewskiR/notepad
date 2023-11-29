import React, { useState} from "react";
import { View, Text, TextInput, Button } from "react-native";
import { User, Users } from "../types/User.types";
import { LoginProps } from "../types/Navigator.types";
import * as SecureStore from "expo-secure-store";
import { compare} from "../utils/passwordUtils";
import * as bcrypt from "bcryptjs";

const Login = ({ navigation }: LoginProps) => {
    const [username, setUsername] = useState<User['username']>('');
    const [password, setPassword] = useState<User['password']>('');
    const resetUserFields = ()=>{
      setUsername('');
      setPassword('');
    }

    const checking = () => {
      const saltRounds = 10;
      const plainTextPassword = 'password123';
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(plainTextPassword, salt);
      
      const anotherPlainTextPassowrd = 'password123';
      const passwordMatch = bcrypt.compareSync(anotherPlainTextPassowrd, hashedPassword);
      console.log(passwordMatch);
    }

    const handleLogin = async () => {
      try {
        const userData = await SecureStore.getItemAsync("users",
          {keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY});
        if (userData) {
          const users: Users = JSON.parse(userData);
          
          const user: User | undefined = users.find(
            (u) => u.username === username);
          if (user) {
            console.log(user);
            checking();
            const passwordMatch = compare(password, user.password);

            if(passwordMatch) {
              navigation.navigate({name: 'UserProfile', params: {user: user}});
            resetUserFields();
            } else {
              alert('Hasła się nie zgadzają') 
            }
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
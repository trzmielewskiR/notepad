import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { isRegisterSafe } from "../utils/updateUtils";
import { User, Users } from "../types/User.types";
import { RegisterProps } from "../types/Navigator.types";
import * as SecureStore from "expo-secure-store";
import { generateRandomSalt, hashData, saltRounds } from "../utils/passwordUtils";

const Register = ({ navigation }: RegisterProps) => {
  const [username, setUsername] = useState<User["username"]>("");
  const [password, setPassword] = useState<User["password"]>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const handleRegister = async () => {
    const isSafe: boolean = isRegisterSafe(
      username,
      password,
      repeatPassword,
    );

    if (isSafe) {
      try {
        const existingUserData = await SecureStore.getItemAsync("users", 
          {keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY});
        let users: Users = [];

        if (existingUserData) {
          users = JSON.parse(existingUserData);
        }

        const usernameExists = users.some(
          (user: User) => user.username === username
        );
        if (usernameExists) {
          alert("Nazwa użytkownika jest zajęta, proszę wybrać inną.");
          return;
        }

        const salt = generateRandomSalt(saltRounds);
        const hashedPassword = hashData(password, salt);
        console.log(salt, hashedPassword);
        console.log(password);

        const newUser: User = { username, password: hashedPassword, salt, note: "" };
        users = [...users,newUser]
        
  
        await SecureStore.setItemAsync("users", JSON.stringify(users), 
          {keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY});
        alert("Użytkownik został zarejestrowany");
        navigation.navigate("Main");
      } catch (error) {
        console.error("Error storing user data:", error);
      }
    } else {
      alert("Złamano zasady dotyczące tworzenia nazwy użytkownika oraz hasła.");
      return;
    }
  };

  return (
    <View>
      <Text>Strona rejestracji</Text>
      <TextInput
        placeholder="Nazwa użytkownika"
        onChangeText={(username) => setUsername(username)}
        value={username}
      />
      <TextInput
        placeholder="Hasło"
        onChangeText={(password) => setPassword(password)}
        value={password}
        secureTextEntry={true}
      />
      <TextInput
        placeholder="Powtórz hasło"
        onChangeText={(repeatPassword) => setRepeatPassword(repeatPassword)}
        value={repeatPassword}
        secureTextEntry={true}
      />
      <Button title="Stwórz użytkownika" onPress={handleRegister} />
      <Text>
        Zasady dotyczące tworzenia nazwy użytkownika i hasła: Nazwa użytkownika
        muszą być dłuższe niż 6 znaków oraz nie mogą zawierać zabronionych fraz
        oraz słów.
      </Text>
    </View>
  );
};

export default Register;

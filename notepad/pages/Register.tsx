import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isRegisterSafe } from "../utils";
import { User, Users } from "../types/User.types";
import { RegisterProps } from "../types/Navigator.types";

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
        const existingUserData = await AsyncStorage.getItem("users");
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

        const newUser: User = { username, password, note: "" };

        if (users.length === 0) {
          users = [...users, newUser];
        } else {
          users.push(newUser);
        }
        await AsyncStorage.setItem("users", JSON.stringify(users));
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

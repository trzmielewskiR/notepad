import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import Note from "../components/Note";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isNewPasswordSafe, isNotTheSame } from "../utils";
import { UserProfileProps } from "../types/Navigator.types";
import { User, Users } from "../types/User.types";

const UserProfile = ({ navigation, route }: UserProfileProps) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const { user } = route.params;

  const handlePasswordChange = async () => {
    const isSafe: boolean =
      (isNewPasswordSafe(newPassword) 
      && isNotTheSame(newPassword, user.password));

    if (isSafe) {
      try {
        const userData = await AsyncStorage.getItem("users");
        const updatedUser = { ...user, password: newPassword };
        if (userData) {
          const users: Users = JSON.parse(userData);
          const updatedUsers = users.map((currUser) =>
            currUser.username === updatedUser.username ? currUser : updatedUser
          );

          await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
          alert("Hasło zostało zmienione");
          setNewPassword("");
        } else {
          alert("Nie znaleziono takiego użytkownika");
        }
      } catch (error) {
        console.error("Error changing password:", error);
      }
    } else {
      alert("Złamano zasady dotyczące tworzenia nowego hasła.");
      return;
    }
  };

  return (
    <View>
      <Text>Zalogowano jako: {user.username}</Text>
      <Note {...user} />
      <Text>Zmień hasło:</Text>
      <TextInput
        placeholder="Nowe hasło"
        onChangeText={(newPassword) => setNewPassword(newPassword)}
        value={newPassword}
        secureTextEntry={true}
      />
      <Text>
        Zasady dotyczące zmiany hasła sa następujące: Musi być dłuższe niż 6
        znaków, nie może zawierać zabronionych fraz i słów oraz nie może być
        takie samo jak stare hasło.
      </Text>
      <Button title="Zmień hasło" onPress={handlePasswordChange} />
      <Button title="Wyloguj się" onPress={() => navigation.popToTop()} />
    </View>
  );
};

export default UserProfile;

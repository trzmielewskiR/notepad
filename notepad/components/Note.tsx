import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/User.types";
import { EMPTY_NOTE, saveNote, deleteNote } from "../utils";

const Note: React.FC<User> = (user) => {
  const [note, setNote] = useState("");

  useEffect(() => {
    if (user.note) {
      setNote(user.note);
      //console.log(user.note);
    }
  }, [user]);

  const handleSaveNote = async () => {
    const success = await saveNote(user, note);
    if (success) {
      setNote(note);
      alert("Notatka została zapisana.");
    } else {
      alert("Nie znaleziono takiego użytkownika");
    }
  };

  const handleDeleteNote = async () => {
    const success = await deleteNote(user, EMPTY_NOTE);
    if (success) {
      setNote(EMPTY_NOTE);
      alert("Notatka została usunięta");
    } else {
      alert("Nie znaleziono takiego użytkownika");
    }
  };

  return (
    <View>
      <Text>Notatka: </Text>
      <TextInput
        placeholder="Wprowadź swoją notatkę"
        onChangeText={(text) => setNote(text)}
        value={note}
      />
      <Button title="Zapisz notatkę" onPress={handleSaveNote} />
      {note && <Button title="Usuń notatkę" onPress={handleDeleteNote} />}
    </View>
  );
};

export default Note;

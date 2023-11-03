import React, {useState, useEffect} from "react";
import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/User.types";
import { updateNote } from "../utils";

const Note:React.FC<User> = (user) => {
    const [note, setNote] = useState('');
    const emptyNote: string = '';

    useEffect(() => {
        if (user && user.note) {
            setNote(user.note);
        }
    }, [user]);

    const handleSaveNote = async () => {
      const success = await updateNote(user, note, 'save');
      if (success) {
        setNote('');
        alert('Notatka została zapisana.');
      } else {
        alert('Nie znaleziono takiego użytkownika');
      }
    };

    const handleDeleteNote = async () => {
      const success = await updateNote(user, emptyNote, 'delete');
      if (success) {
        setNote(emptyNote);
        alert('Notatka została usunięta');
      } else {
        alert('Nie znaleziono takiego użytkownika');
      }
    }
    
    return (
        <View>
            <Text>Notatka: </Text>
            <TextInput
                placeholder="Wprowadź swoją notatkę"
                onChangeText={(text) => setNote(text)}
                value={note}
            />
            <Button
                title='Zapisz notatkę' 
                onPress={handleSaveNote}
            />
            {note && (
                <Button
                title='Usuń notatkę'
                onPress={handleDeleteNote}
            />
            )}
        </View>
    );

};

export default Note;
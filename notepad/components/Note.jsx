import React, {useState, useEffect} from "react";
import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Note = ({user}) => {
    const [note, setNote] = useState('');


    useEffect(() => {
        if (user && user.note) {
            setNote(user.note);
        }
    }, [user]);


    const handleSaveNote = async () => {
        user.note = note;

        try {
          const userData = await AsyncStorage.getItem('users');
          if (userData) {
            const users = JSON.parse(userData);
            const updatedUsers = users.map((u) => (u.username === user.username ? user : u));
    
            await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
            alert('Notatka zostałą zapisana');
          } else {
            alert('Nie znaleziono takiego użytkownika');
          }
        } catch (error) {
          console.error('Error saving user note:', error);
        }
      }

    const handleDeleteNote = async () => {
        user.note = '';

        try {
        const userData = await AsyncStorage.getItem('users');
        if (userData) {
            const users = JSON.parse(userData);
            const updatedUsers = users.map((u) => (u.username === user.username ? user : u));

            await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
            setNote('');
            alert('Notatka została usunięta');
        } else {
            alert('Nie znaleziono takiego użytkownika');
        }
        } catch (error) {
        console.error('Error deleting user note:', error);
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
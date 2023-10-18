import React, {useState, useEffect} from "react";
import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Note = ({user}) => {
    const [note, setNote] = useState('');


    useEffect(() => {
        const getNote = async () => {
            try {
                setNote(user.note);
            } catch (error) {
                console.error('Error retrieving user note: ', error);
            }
        };

        getNote();
    }, [user]);


    const handleSaveNote = async () => {
        const newNote = note;

        try {
            user.note = newNote;
            await AsyncStorage.setItem('user', JSON.stringify(user));
            alert('Notatka została zapisana');
        } catch (error) {
            console.error('Error with saving note: ', error);
        }
    }

    const handleDeleteNote = async () => {
        try {
            user.note = '';
            await AsyncStorage.setItem('user', JSON.stringify(user));
            setNote('');
            alert('Notatka została usunięta pomyślnie');
        } catch (error) {
            console.error('Error deleting users note: ', error);
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
import React, {useState} from "react";
import { View, Text, TextInput, Button } from "react-native";

const Note = () => {
    const [note, setNote] = useState('');
    const [editing, setEditing] = useState(false);

    const handleSaveNote = () => {
        alert('Notatka została zapisana');
    };

    
    const handleEditNote = () => {
        setEditing(true);
    };

    const handleDeleteNote = () => {

        alert('Notatka została usunięta');
        setNote('');
        setEditing(false);
    }

    return (
        <View>
            <Text>Notatka:</Text>
            {editing ? (
                <TextInput
                    placeholder="Wprowadź swoją notatkę"
                    onChangeText={(text) => setNote(text)}
                    value={note}
                />
            ) : (
                <Text>{note}</Text>
            )}
            <Button
                title={editing ? 'Zapisz notatkę' : 'Edytuj notatkę'}
                onPress={editing ? handleSaveNote : handleEditNote}
            />
            {note && (
                <Button
                    title="Usuń notatkę" onPress={handleDeleteNote}
                />
            )}
        </View>
    );

};

export default Note;
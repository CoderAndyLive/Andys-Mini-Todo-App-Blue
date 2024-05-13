import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';

export default function EditTodo({ id, text, onSave, onCancel, onDelete }) {
  const [editedText, setEditedText] = useState(text);// State to store the edited text
  
  // Function to save the edited todo
  const saveEditHandler = () => {
    if (editedText.trim()) {
      onSave(id, editedText.trim());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Todo</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setEditedText}
          value={editedText}
          placeholder="Enter edited text..."
          autoFocus
          multiline
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={saveEditHandler} color="#2196F3" />
        <Button title="Delete" onPress={() => onDelete(id)} color="#f44336" /> 
        <Button title="Cancel" onPress={onCancel} color="#607d8b" /> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#007bff', // Blue border color
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
  }
});

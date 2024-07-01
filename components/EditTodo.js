import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function EditTodo({ id, todo, onSave, onCancel, onDelete }) {
  const [editedText, setEditedText] = useState(todo.text);
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate);
  const [editedTime, setEditedTime] = useState(todo.time);
  const [editedPriority, setEditedPriority] = useState(todo.priority);

  const saveEditHandler = () => {
    if (editedText.trim()) {
      onSave(id, editedText.trim(), editedDueDate, editedTime, editedPriority);
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
        <Picker
          selectedValue={editedPriority}
          onValueChange={(itemValue) => setEditedPriority(itemValue)}
        >
          <Picker.Item label="Low" value="low" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="High" value="high" />
        </Picker>
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
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderColor: '#007bff',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

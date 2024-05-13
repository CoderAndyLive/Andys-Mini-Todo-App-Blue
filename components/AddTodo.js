import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';

export default function AddTodo({ onAddTodo }) {
  const [todoText, setTodoText] = useState(''); // State to store the input text

  // Function to update the todoText state when the input changes
  const textChangeHandler = (enteredText) => {
    setTodoText(enteredText);
  };

  // Function to add a new todo
  const addTodo = () => {
    if (todoText.trim().length === 0) { // Check if the input is not empty
      Alert.alert('Invalid Todo', 'Please enter a valid todo item.');
      return;
    }
    onAddTodo(todoText.trim()); // Call the onAddTodo function passed from App.js
    setTodoText(''); // Clear the input field
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="New Todo"
        style={styles.input}
        onChangeText={textChangeHandler}
        value={todoText}
      />
      <Button title="ADD" onPress={addTodo} color="#007bff" />
    </View>
  );
}

const styles = StyleSheet.create({
  // Styles for the input container and the text input
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center' 
  },
  input: {
    borderColor: '#007bff', 
    borderWidth: 1,
    padding: 10,
    width: '80%' 
  },
});

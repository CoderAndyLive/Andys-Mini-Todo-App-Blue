import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import { TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

export default function AddTodo({ onAddTodo }) {
  const [todoText, setTodoText] = useState(''); // State to store the input text
  const [dueDate, setDueDate] = useState(new Date()); // State to store the due date
  const [time, setTime] = useState(new Date()); // State to store the time
  const [priority, setPriority] = useState('low'); // State to store the priority
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control the visibility of the date picker
  const [showTimePicker, setShowTimePicker] = useState(false); // State to control the visibility of the time picker

  // Function to update the todoText state when the input changes
  const textChangeHandler = (enteredText) => {
    setTodoText(enteredText);
  };

  // Function to handle the "Choose Date" button press
  const chooseDateHandler = () => {
    setShowDatePicker(true);
  };

  // Function to handle the "Choose Time" button press
  const chooseTimeHandler = () => {
    setShowTimePicker(true);
  };

  // Function to handle the date selection
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  // Function to handle the time selection
  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  // Function to add a new todo
  const addTodo = () => {
    if (todoText.trim().length === 0) {
      Alert.alert('Invalid Todo', 'Please enter a valid todo item.');
      return;
    }
    onAddTodo(todoText.trim(), dueDate, time, priority);
    setTodoText('');
  };

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="New Todo"
          style={styles.input}
          onChangeText={textChangeHandler}
          value={todoText}
        />
        <TouchableOpacity style={styles.miniButton} onPress={chooseDateHandler}>
          <Text>Choose Date</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.miniButton} onPress={chooseTimeHandler}>
          <Text>Choose Time</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputRow}>
        <Text>Priority:</Text>
        <View style={styles.dropdown}>
          <Picker
            selectedValue={priority}
            onValueChange={(itemValue) => setPriority(itemValue)}
          >
            <Picker.Item label="Low" value="low" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="High" value="high" />
          </Picker>
        </View>
      </View>
      <Button title="ADD" onPress={addTodo} color="#007bff" />

      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Styles for the input container and the text input
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    borderColor: '#007bff',
    borderWidth: 1,
    padding: 10,
    width: '60%',
  },
  miniButton: {
    backgroundColor: '#007bff',
    padding: 5,
    marginLeft: 10,
  },
  dropdown: {
    borderColor: '#007bff',
    borderWidth: 2, // Increased border width to make it thicker
    padding: 5,
    marginLeft: 10,
    width: '60%'
  },
});

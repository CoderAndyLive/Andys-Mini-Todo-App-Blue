import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function TodoItem({ id, text, onDelete, onEdit }) {
  return (
    <TouchableOpacity onPress={onEdit}>
      <View style={styles.todoItem}>
        <Text style={styles.todoText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  todoItem: {
    padding: 16,
    marginTop: 16,
    borderColor: '#007bff',  // Blue border color
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
  },
  todoText: {
    color: '#212529', // Dark text for better contrast
  },
});

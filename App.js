import React, { useState } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, Modal, Text } from 'react-native';
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';
import EditTodo from './components/EditTodo';
import { DatePickerIOS } from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null);

  // Add a new todo item
  const addTodoHandler = (todoText, dueDate, time, priority) => {
    setTodos(currentTodos => [
      ...currentTodos, 
      { 
        id: Math.random().toString(), 
        text: todoText,
        dueDate: dueDate,
        time: time,
        priority: priority,
        completed: false
      }
    ]);
  };

  // Remove a todo item
  const removeTodoHandler = (todoId) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
    setEditingTodoId(null); 
  };

  // Start editing a todo item (opens the modal)
  const startEditHandler = (todoId) => {
    setEditingTodoId(todoId); 
  };

  // Save the edited todo item and close the modal
  const saveEditHandler = (todoId, editedText, editedDueDate, editedTime, editedPriority) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === todoId ? { 
          ...todo, 
          text: editedText,
          dueDate: editedDueDate,
          time: editedTime,
          priority: editedPriority
        } : todo
      )
    );
    setEditingTodoId(null); 
  };

  // Cancel editing and close the modal
  const cancelEditHandler = () => {
    setEditingTodoId(null); 
  };

  // Mark a todo item as completed
  const markTodoAsCompleted = (todoId) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed: true } : todo
      )
    );
  };

  return (
    <SafeAreaView style={styles.screen}> 
      {/* App Title */}
      <View style={styles.appTitleContainer}>
        <Text style={styles.appTitle}>Todo App</Text>
      </View>

      {/* Modal for Editing (Visible only when editing) */}
      <Modal visible={editingTodoId !== null} animationType="slide">
        <View style={styles.modalContent}>
          <EditTodo
            id={editingTodoId}
            todo={todos.find(todo => todo.id === editingTodoId)}
            onSave={saveEditHandler}
            onCancel={cancelEditHandler}
            onDelete={removeTodoHandler}
          />
        </View>
      </Modal>

      {/* Main Content (Add Todo and Todo List) */}
      <View style={styles.container}>
        <AddTodo onAddTodo={addTodoHandler} />
        <FlatList
          keyExtractor={(item) => item.id} 
          data={todos}
          renderItem={({item}) => ( 
            <TodoItem
              todo={item}         // Pass the todo object to TodoItem
              onDelete={removeTodoHandler}  // Function to handle delete
              onEdit={() => startEditHandler(item.id)} // Function to handle edit
              onComplete={() => markTodoAsCompleted(item.id)} // Function to mark as completed
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

// Styles for the app
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff', // White background
  },
  appTitleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000', // Black color for the title
  },
  container: {
    flex: 1,
    paddingTop: 20, 
    backgroundColor: '#f0f8ff', // Light Blue background for the container
    borderRadius: 10, // Rounded corners
    paddingHorizontal: 20, // Horizontal padding
  },
  modalContent: {
    flex: 1, 
    justifyContent: 'center', 
    padding: 20,
    backgroundColor: '#ffffff', // White background for the modal content
    borderRadius: 10, // Rounded corners
  }
});

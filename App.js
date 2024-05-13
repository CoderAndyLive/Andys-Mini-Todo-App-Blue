import React, { useState } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, Modal, Text } from 'react-native';
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';
import EditTodo from './components/EditTodo';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null);

  // Add a new todo item
  const addTodoHandler = (todoText) => {
    setTodos(currentTodos => [
      ...currentTodos, 
      { id: Math.random().toString(), text: todoText }
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
  const saveEditHandler = (todoId, editedText) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === todoId ? { ...todo, text: editedText } : todo
      )
    );
    setEditingTodoId(null); 
  };

  // Cancel editing and close the modal
  const cancelEditHandler = () => {
    setEditingTodoId(null); 
  };

  return (
    <SafeAreaView style={styles.screen}> 
      {/* App Title */}
      <View style={styles.appTitleContainer}>
        <Text style={styles.appTitle}>Andy's Todo App</Text>
      </View>

      {/* Modal for Editing (Visible only when editing) */}
      <Modal visible={editingTodoId !== null} animationType="slide">
        <View style={styles.modalContent}>
          <EditTodo
            id={editingTodoId}
            text={todos.find(todo => todo.id === editingTodoId)?.text || ''}
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
              id={item.id}         // Pass the id to TodoItem
              text={item.text}       // Pass the text to TodoItem
              onDelete={removeTodoHandler}  // Function to handle delete
              onEdit={() => startEditHandler(item.id)} // Function to handle edit
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
    padding: 50,
    backgroundColor: '#f0f8ff', // Light Blue background
  },
  appTitleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007bff', // Blue color for the title
  },
  container: {
    flex: 1,
    paddingTop: 20, 
  },
  modalContent: {
    flex: 1, 
    justifyContent: 'center', 
    padding: 20,
  }
});

import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function TodoItem({ todo, onEdit }) {
  const { text, dueDate, time, priority } = todo;

  return (
    <TouchableOpacity onPress={onEdit}>
      <View style={styles.container}>
        <View style={styles.bubble} />
        <View style={styles.content}>
          <Text style={styles.task}>{text}</Text>
          <Text style={styles.details}>
            Due Date: {dueDate.toString()} | Time: {time.toString()} | Priority: {priority}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bubble: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  task: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 12,
    color: 'gray',
  },
});

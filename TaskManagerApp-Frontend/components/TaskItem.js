// components/TaskItem.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TaskItem = ({ task, onEdit, onDelete }) => (
  <View style={styles.taskItem}>
    <Text style={styles.taskText}>{task.title}</Text>
    <Text style={styles.taskDescription}>{task.description}</Text>
    <Text style={styles.taskStatus}>Status: {task.status}</Text>
    <Text style={styles.taskDueDate}>Due: {new Date(task.dueDate).toLocaleDateString()}</Text>
    <Button title="Edit" onPress={() => onEdit(task)} />
    <Button title="Delete" onPress={() => onDelete(task.id)} />
  </View>
);

const styles = StyleSheet.create({
  taskItem: {
    padding: 10,
    marginVertical: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  taskText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
  },
  taskStatus: {
    fontSize: 14,
    color: 'gray',
  },
  taskDueDate: {
    fontSize: 14,
    color: 'gray',
  },
});

export default TaskItem;

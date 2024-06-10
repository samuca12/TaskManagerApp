import React from 'react';
import { FlatList, View, Text, Button, StyleSheet } from 'react-native';

const TaskList = ({ tasks, onEdit, onDelete }) => (
  <FlatList
    data={tasks}
    keyExtractor={(item) => item.id} 
    renderItem={({ item }) => (
      <View style={styles.taskItem}>
        <Text>{item.title}</Text>
        <Button title="Edit" onPress={() => onEdit(item)} />
        <Button title="Delete" onPress={() => onDelete(item.id)} />
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9c2ff', 
  },
});

export default TaskList;

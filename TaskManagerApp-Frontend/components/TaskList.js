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
  container: {
    flex: 1,
    justifyContent: 'center', // Centraliza a lista verticalmente
    alignItems: 'center',    // Centraliza a lista horizontalmente
  },
  listContent: {
    alignItems: 'center',     // Centraliza os itens na lista horizontalmente
  },
  taskItem: {
    flexDirection: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',  // Centraliza o conteúdo verticalmente
    width: 250,          // Largura do quadrado
    height: 200,         // Altura do quadrado
    margin: 50,          // Espaçamento entre os quadrados
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

export default TaskList;

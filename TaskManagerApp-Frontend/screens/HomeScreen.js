import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import TaskList from '../components/TaskList';
import FeedbackModal from '../components/FeedbackModal';
import { fetchTasks, createTask, deleteTask } from '../services/api';

const HomeScreen = ({ navigation, route }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      setModalMessage(`Error: ${error.message}`);
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (route.params?.updated) {
        loadTasks(); 
      }
    }, [route])
  );

  useEffect(() => {
    loadTasks(); 
  }, []);

  const handleAddTask = async (task) => {
    try {
      await createTask(task);
      setModalMessage('Task added successfully!');
      setIsSuccess(true);
      setModalVisible(true);
    } catch (error) {
      setModalMessage(`Failed to add task: ${error.message}`);
      setIsSuccess(false);
      setModalVisible(true);
    }
  };

  const handleEditTask = (task) => {
    navigation.navigate('TaskScreen', { task });
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setModalMessage('Task deleted successfully!');
      setIsSuccess(true);
      setModalVisible(true);
      loadTasks(); 
    } catch (error) {
      setModalMessage(`Failed to delete task: ${error.message}`);
      setIsSuccess(false);
      setModalVisible(true);
    }
  };

  const confirmDelete = (taskId) => {
    setModalMessage('Are you sure you want to delete this task?');
    setConfirmAction(() => () => handleDelete(taskId));
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setConfirmAction(null);
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  const confirmModalAction = () => {
    if (confirmAction) {
      confirmAction();
      setConfirmAction(null);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>; 
  }

  return (
    <View style={styles.container}>
      <Button title="Add Task" onPress={() => navigation.navigate('TaskScreen', { task: null })} />
      <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={confirmDelete} />
      <FeedbackModal
        visible={modalVisible}
        message={modalMessage}
        onClose={closeModal}
        onConfirm={confirmAction ? confirmModalAction : null}
        onCancel={closeModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default HomeScreen;

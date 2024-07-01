import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TaskForm from '../components/TaskForm';
import FeedbackModal from '../components/FeedbackModal';
import { updateTask,createTask, fetchTaskById, deleteTask } from '../services/api';

const TaskScreen = ({ route, navigation }) => {
  const { task } = route.params;
  const [initialValues, setInitialValues] = useState({ id: null, title: '', description: '', status: '', dueDate: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    if (task) {
      const loadTask = async () => {
        try {
          const data = await fetchTaskById(task.id); 
          setInitialValues({
            id: data.id.toString(),
            description: data.description,
            status: data.status,
            dueDate: data.dueDate,
          });
        } catch (error) {
          setModalMessage(`Error: ${error.message}`);
          setModalVisible(true);
        }
      };
      loadTask();
    }
  }, [task]);

  const handleSubmit = async (formValues) => {
    try {
      if (task) {
        await updateTask(task.id, formValues);
        setModalMessage('Task updated successfully!');
      } else {
        await createTask(formValues);
        setModalMessage('Task added successfully!');
      }
      setIsSuccess(true);
      setModalVisible(true);
    } catch (error) {
      setModalMessage(`Failed to save task: ${error.message}`);
      setIsSuccess(false);
      setModalVisible(true);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id); 
      setModalMessage('Task deleted successfully!');
      setIsSuccess(true);
      setModalVisible(true);
    } catch (error) {
      setModalMessage(`Failed to delete task: ${error.message}`);
      setIsSuccess(false);
      setModalVisible(true);
    }
  };

  const confirmDelete = () => {
    setModalMessage('Are you sure you want to delete this task?');
    setConfirmAction(() => handleDelete);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    if (isSuccess) {
      navigation.navigate('Home', { updated: true });
    }
  };

  const confirmModalAction = () => {
    if (confirmAction) {
      confirmAction();
      setConfirmAction(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{task ? 'Edit Task' : 'Add Task'}</Text>
      <TaskForm initialValues={initialValues} onSubmit={handleSubmit} />
      {task && <Button title="Delete Task" onPress={confirmDelete} />}
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

export default TaskScreen;

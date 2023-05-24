import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { Container, TasksContainer, TaskEmptyContainer, TaskEmptyImage, CenteredContainer } from './styles';

import Header from '../components/Header';
import AddTaskButton from '../components/AddTaskButton';
import Tasks from '../components/Tasks';
import NewTaskModal from '../components/NewTaskModal';
import EditTaskModal from '../components/EditTaskModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

import empty from '../assets/images/task.png';

import { Text } from '../components/Text';

import { createTable, createTask, deleteTask, listTasks, updateStatus, updateTask } from '../services/TasksService';

export default function Main() {
  const [isNewTaskModalVisible, setIsNewTaskModalVisible] = useState(false);
  const [isEditTaskModalVisible, setIsEditTaskModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [taskBeingDeleted, setTaskBeingDeleted] = useState(null);
  const [taskBeingEdit, setTaskBeingEdit] = useState(null);

  useEffect(() => {
    createTable();
    loadTasks();
  }, []);

  const loadTasks = useCallback(async () => {
    setIsLoading(true);

    const taskList = await listTasks();

    setTasks(taskList);

    setIsLoading(false);
  });

  async function handleCreateTask(task) {
    await createTask(task);
    loadTasks();
    setIsNewTaskModalVisible(false);
  }

  function handleDeleteTask(task) {
    setTaskBeingDeleted(task);
    setIsDeleteModalVisible(true);
  }

  function handleEditTask(task) {
    setTaskBeingEdit(task);
    setIsEditTaskModalVisible(true);
  }

  async function handleSaveEdit(task) {
    await updateTask({ ...task, id: taskBeingEdit.id });

    loadTasks();

    setIsEditTaskModalVisible(false);
  }

  async function handleConfirmDeleteTask() {
    await deleteTask(taskBeingDeleted);
    loadTasks();
    setIsDeleteModalVisible(false);
  }

  async function handleChangeStatus(task) {
    await updateStatus(task);
    loadTasks();
  }

  return (
    <Container>

      <Header />

      {!isLoading && (
        <TasksContainer>
          {tasks.length > 0 ? (
            <Tasks
              onDelete={handleDeleteTask}
              onChangeStatus={handleChangeStatus}
              onEditTask={handleEditTask}
              tasks={tasks}
            />
          ) : (
            <TaskEmptyContainer>
              <TaskEmptyImage source={empty} />

              <Text size={20} opacity={0.8} weight="600" style={{ marginTop: 16 }}>Sem Tarefas</Text>
              <Text opacity={0.5} style={{ marginTop: 8 }}>Não há tarefas a serem visualizadas</Text>
            </TaskEmptyContainer>
          )}
        </TasksContainer>
      )}

      {isLoading && (
        <CenteredContainer>
          <ActivityIndicator color="#666" size="large" />
        </CenteredContainer>
      )}

      <AddTaskButton onPress={() => setIsNewTaskModalVisible(true)} />

      <NewTaskModal
        visible={isNewTaskModalVisible}
        onSave={handleCreateTask}
        onClose={() => setIsNewTaskModalVisible(false)}
      />

      <EditTaskModal
        visible={isEditTaskModalVisible}
        onSave={handleSaveEdit}
        onClose={() => setIsEditTaskModalVisible(false)}
        task={taskBeingEdit}
      />

      <DeleteConfirmModal
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onConfirm={handleConfirmDeleteTask}
      />
    </Container >
  );
}
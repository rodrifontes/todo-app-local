import { useState } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { Task, ActionIcon, TaskActions, TaskDescription, TaskFooter, TaskHeader, TaskStatus } from './styles';

import done from '../../assets/images/done.png';
import pending from '../../assets/images/pending.png';
import edit from '../../assets/images/edit.png';
import excluir from '../../assets/images/delete.png';

export default function Tasks({ onDelete, tasks, onChangeStatus, onEditTask }) {

  return (
    <FlatList
      data={tasks}
      keyExtractor={task => task.id}
      renderItem={({ item: task }) => (
        <Task>
          <TaskHeader>
            <Text size={18} weight="600">{task.title}</Text>
          </TaskHeader>

          <TaskDescription>
            <Text opacity={0.5}>{task.description}</Text>
          </TaskDescription>

          <TaskFooter>
            <TaskStatus onPress={() => onChangeStatus(task)}>
              <ActionIcon source={task.done ? done : pending} />
              <Text color={task.done ? '#2192d8' : '#e620ae'}> {task.done ? 'Feita' : 'Pendente'} </Text>
            </TaskStatus>

            <TaskActions>
              <TouchableOpacity onPress={() => onEditTask(task)}>
                <ActionIcon source={edit} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onDelete(task)}>
                <ActionIcon source={excluir} />
              </TouchableOpacity>
            </TaskActions>
          </TaskFooter>
        </Task>
      )}
    />
  );
}
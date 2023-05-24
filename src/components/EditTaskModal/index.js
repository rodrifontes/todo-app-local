import { Image, TouchableOpacity } from 'react-native';

import CustomModal from '../CustomModal';

import { Header } from './styles';
import { Text } from '../Text';
import TaskForm from '../TaskForm';

import close from '../../assets/images/close.png';

export default function EditTaskModal({ visible, onClose, onSave, task }) {
  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
    >
      <Header>
        <Text weight="600">Editar Tarefa</Text>

        <TouchableOpacity onPress={onClose}>
          <Image source={close} />
        </TouchableOpacity>
      </Header>

      <TaskForm
        buttonLabel="Alterar"
        onSave={onSave}
        task={task}
      />
    </CustomModal>
  );
}
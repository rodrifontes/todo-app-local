import { Text } from '../Text';
import { Container, AddButton } from './styles';

export default function AddTaskButton({ onPress }) {
  return (
    <Container onPress={onPress}>
      <AddButton>
        <Text size={40} color="#FFFFFF">+</Text>
      </AddButton>
    </Container>
  );
}
import { Modal } from 'react-native';

import { Overlay, ModalBody } from './styles';

export default function CustomModal({ children, visible, onClose }) {
  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Overlay>
        <ModalBody>
          {children}
        </ModalBody>
      </Overlay>
    </Modal >
  );
}
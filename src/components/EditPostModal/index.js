import React from 'react';
import { Modal, Button } from 'react-native';
import { ModalContainer, ModalContent, ModalTitle, TextInput, ButtonContainer } from './EditPostModalStyles';

function EditPostModal({ visible, onClose, onSave, title, setTitle, body, setBody }) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <ModalContainer>
                <ModalContent>
                    <ModalTitle>Editando...</ModalTitle>
                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Title"
                    />
                    <TextInput
                        value={body}
                        onChangeText={setBody}
                        placeholder="Body"
                        multiline
                    />
                    <ButtonContainer>
                        <Button title="Save" onPress={onSave} />
                        <Button title="Cancel" onPress={onClose} />
                    </ButtonContainer>
                </ModalContent>
            </ModalContainer>
        </Modal>
    );
}

export default EditPostModal;

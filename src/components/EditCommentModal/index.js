import React from 'react';
import { Modal, Button } from 'react-native';
import { ModalBackground, ModalContainer, Input, ButtonContainer } from './EditCommentModalStyles';

const EditCommentModal = ({ visible, onClose, onSave, text, setText }) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <ModalBackground>
                <ModalContainer>
                    <Input
                        placeholder="Edite o Comentário"
                        value={text}
                        onChangeText={setText}
                    />
                    <ButtonContainer>
                        <Button title="Salvar" onPress={onSave} />
                        <Button title="Cancelar" color="red" onPress={onClose} />
                    </ButtonContainer>
                </ModalContainer>
            </ModalBackground>
        </Modal>
    );
};

export default EditCommentModal;

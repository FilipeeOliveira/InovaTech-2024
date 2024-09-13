import styled from 'styled-components/native';

export const ModalContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.5);
`;

export const ModalContent = styled.View`
    width: 300px;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
`;

export const ModalTitle = styled.Text`
    font-size: 20px;
    margin-bottom: 16px;
`;

export const TextInput = styled.TextInput`
    border-width: 1px;
    border-color: #ccc;
    padding: 8px;
    margin-bottom: 16px;
    width: 100%;
`;

export const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 8px;
`;

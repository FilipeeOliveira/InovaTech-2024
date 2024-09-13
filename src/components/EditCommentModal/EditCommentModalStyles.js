import styled from 'styled-components/native';

export const ModalBackground = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled.View`
    width: 300px;
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
`;

export const Input = styled.TextInput`
    border-color: #ccc;
    border-width: 1px;
    border-radius: 4px;
    padding: 8px;
    margin-bottom: 16px;
`;

export const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

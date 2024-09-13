import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding-horizontal: 20px;
`;

export const ProfileImage = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin-bottom: 20px;
`;

export const Placeholder = styled.View`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    background-color: #ccc;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

export const PlaceholderText = styled.Text`
    color: #888;
`;

export const Input = styled.TextInput`
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
    border-width: 1px;
    border-color: #ccc;
    border-radius: 4px;
    padding-horizontal: 10px;
`;

export const Username = styled.Text`
    font-size: 20px;
    margin-vertical: 10px;
`;

export const Password = styled.Text`
    font-size: 16px;
    color: #888;
    margin-bottom: 20px;
`;

export const Buttons = styled.View`
    align-items: center;
    margin-top: 10px;
`;

export const ButtonContainer = styled.View`
    margin-bottom: 10px;
`;

import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding-horizontal: 20px;
    background-color: #F25E3D; 
`;

export const MessageContainer = styled.View`
    width: 100%;
    margin-bottom: 10px;
    margin-left: 15px;
    align-items: center;
`;

export const NewHereText = styled.Text`
    color: #FFFFFF; 
    font-weight: normal;
`;

export const HighlightText = styled.Text`
    color: #FFFFFF;
    font-weight: bold;
    text-decoration-line: underline; 
    text-decoration-color: #FFFFFF; 
`;

export const Input = styled.TextInput`
    width: 100%;
    height: 55px; 
    margin-bottom: 24px; 
    border-width: 5px;
    border-color: rgba(255, 255, 255, 0.0);
    border-radius: 30px; 
    padding-horizontal: 20px;
    background-color: rgba(255, 255, 255, 0.2); 
    color: #ffff;  
    font-size: 16px;  
`;

export const ButtonsContainer = styled.View`
    width: 100%;
    flex-direction: column; 
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`;

export const LoginButton = styled.TouchableOpacity`
    background-color: #FFFFFF;
    padding: 12px;
    border-radius: 30px; 
    width: 100%;
    align-items: center;
    margin-bottom: 32px; 
`;

export const RegisterButton = styled.TouchableOpacity`
    background-color: rgba(242, 157, 53, 0.8); 
    padding: 12px;
    border-radius: 30px; 
    width: 100%;
    align-items: center;
`;

export const ButtonText = styled.Text`
    color: #F25E3D; 
    font-size: 20px;
    font-weight: bold;
`;

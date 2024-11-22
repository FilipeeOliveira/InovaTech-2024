import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    padding-horizontal: 20px;
    background-color: #000; 
    justify-content: space-between; 
`;

export const Content = styled.View`
    flex: 1; 
    justify-content: center; 
    align-items: center; 
`;

export const Label = styled.Text`
    font-size: 18px;
    margin-vertical: 8px;
    color: #fff; 
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
    color: #fff; 
    font-size: 16px;
`;

export const BottomContainer = styled.View`
    width: 100%;
    align-items: center;
    margin-bottom: 32px;
`;

export const SubmitButton = styled.TouchableOpacity`
    background-color: #FFFFFF;
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

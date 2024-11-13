import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #fff;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between; /* Ajustado para espaço entre o botão e a imagem */
    align-items: center;
    padding-top: 10px; /* Menos padding superior */
    padding-left: 20px;
    padding-right: 20px;
    background-color: #f8f9fa;
`;

export const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-top: 20px;
    text-align: left;
    width: 100%;
    padding-left: 10px;
`;

export const Content = styled.View`
    flex: 1;
    padding: 20px;
`;

export const EditButtonContainer = styled.View`
    margin-right: 10px; /* Alinhar para a direita */
`;

export const ImageContainer = styled.View`
    margin-left: 20px; /* Mais afastado do botão de editar */
`;

export const TouchableImage = styled.TouchableOpacity`
    width: 80px;
    height: 80px;
`;

export const ProfileImage = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 40px;
`;

export const Placeholder = styled.View`
    width: 100%;
    height: 100%;
    border-radius: 40px;
    background-color: #ccc;
    justify-content: center;
    align-items: center;
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

export const Buttons = styled.View`
    margin-top: 20px;
`;

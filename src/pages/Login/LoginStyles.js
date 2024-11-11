import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding-horizontal: 20px;
    background-color: #F25E3D; /* Fundo do container */
`;

export const MessageContainer = styled.View`
    width: 100%;
    margin-bottom: 10px;
    margin-left: 15px;
    align-items: center;
`;

export const NewHereText = styled.Text`
    color: #FFFFFF; /* Cor para "Novo por aqui?" */
    font-weight: normal;
`;

export const HighlightText = styled.Text`
    color: #FFFFFF; /* Cor do texto */
    font-weight: bold;
    text-decoration-line: underline; /* Cria o underline */
    text-decoration-color: #FFFFFF; /* Cor do underline */
`;

export const Input = styled.TextInput`
    width: 100%;
    height: 55px; 
    margin-bottom: 24px; /* Ajustado para 24px de distância entre os campos */
    border-width: 5px;
    border-color: rgba(255, 255, 255, 0.0);
    border-radius: 30px; 
    padding-horizontal: 20px;
    background-color: rgba(255, 255, 255, 0.2); 
    color: #ffff;  /* Cor do texto */
    font-size: 16px;  /* Aumenta o tamanho da fonte, se desejar */
`;

export const ButtonsContainer = styled.View`
    width: 100%;
    flex-direction: column; /* Alinha os botões em coluna */
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`;

export const LoginButton = styled.TouchableOpacity`
    background-color: #FFFFFF; /* Cor do botão com opacidade */
    padding: 12px;
    border-radius: 30px; /* Botão arredondado */
    width: 100%;
    align-items: center;
    margin-bottom: 32px; /* Ajustado para 32px de distância entre o botão de login e o de registro */
`;

export const RegisterButton = styled.TouchableOpacity`
    background-color: rgba(242, 157, 53, 0.8); /* Cor do botão com opacidade */
    padding: 12px;
    border-radius: 30px; /* Botão arredondado */
    width: 100%;
    align-items: center;
`;

export const ButtonText = styled.Text`
    color: #F25E3D; /* Cor do texto */
    font-size: 20px;
    font-weight: bold;
`;

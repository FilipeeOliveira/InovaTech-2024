import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #101010;
  padding-top: 60px;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: space-between; /* Ajustado para espaço entre o botão e a imagem */
  align-items: center;
  padding: 20px;
  background-color: #101010;
`;

export const ContainerHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between; /* Ajustado para espaço entre o botão e a imagem */
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #f8f8f8;
  margin-top: 20px;
  text-align: left;
  width: 100%;
  padding-left: 20px;
  padding-bottom: 8px;
  text-transform: capitalize;
`;

export const Content = styled.View`
  flex: 1;
  padding: 20px;
`;

export const EditButtonContainer = styled.View`
  border-width: 0.5px;
  border-radius: 10px;
  padding: 10px;
  border-color: #292828;
`;

export const ImageContainer = styled.View`
  margin-left: 20px; /* Mais afastado do botão de editar */
`;

export const TouchableImage = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
`;

export const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 40px;
`;

export const Placeholder = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 60px;
  background-color: #363535;
  justify-content: center;
  align-items: center;
`;

export const PlaceholderText = styled.Text`
  color: #888;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 10px;
  background-color: #292828;
  color: #fff;
`;

export const Buttons = styled.View`
  margin-top: 20px;
`;

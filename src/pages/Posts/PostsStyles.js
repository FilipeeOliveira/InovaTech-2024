import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding-top: 40px;
  background-color: #101010;
`;

export const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.View`
  background-color: transparent;
  border-radius: 8px;
  padding: 20px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-offset: 0px 2px; /* Corrigido */
  shadow-radius: 8px;
  elevation: 2;
`;

export const PostItem = styled.View`
  margin-bottom: 16px;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #ffff;
`;

export const Body = styled.Text`
  font-size: 14px;
  color: #fbfbfb;
  max-width: 350px;
`;

export const ButtonContainer = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export const IconContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const IconText = styled.Text`
  margin-left: 5px;
  color: white;
`;

export const ShareContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ShareText = styled.Text`
  margin-left: 5px;
  color: blue;
`;

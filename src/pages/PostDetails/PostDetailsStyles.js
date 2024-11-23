import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding-top: 60px;
  background-color: #101010;
`;

export const PostContainer = styled.View`
  padding: 16px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #fbfbfb;
`;

export const Body = styled.Text`
  font-size: 16px;
  margin-bottom: 16px;
  color: #fbfbfb;
`;

export const CommentItem = styled.View`
  background-color: #1f1f1f;
  border-radius: 8px;
  padding: 16px;
  margin-top: 20px;
  margin: 10px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 2;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;

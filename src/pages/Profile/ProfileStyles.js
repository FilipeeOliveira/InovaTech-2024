import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #101010;
  padding-top: 60px;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #101010;
`;

export const ContainerHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
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
  margin-left: 20px;
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

/** Estilos para os posts */
export const PostCard = styled.View`
  background-color: #292828;
  border-radius: 8px;
  padding: 15px;
  margin-vertical: 8px;
`;

export const PostHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const PostTitle = styled.Text`
  font-size: 18px;
  color: #f8f8f8;
  font-weight: bold;
  align-items: center;
`;

export const PostBody = styled.Text`
  font-size: 14px;
  color: #ccc;
  margin-bottom: 10px;
`;

export const PostFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const PostDate = styled.Text`
  font-size: 12px;
  color: #aaa;
`;

export const PostActions = styled.View`
  flex-direction: row;
`;

export const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
`;

export const ActionText = styled.Text`
  font-size: 14px;
  color: #f8f8f8;
  margin-left: 5px;
`;

export const Separator = styled.View`
  width: 100%;
  height: 0.5px;
  background-color: #f25e3d;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const EmptyText = styled.Text`
  font-size: 16px;
  color: #f8f8f8;
`;

export const ButtonRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 20px;
`;

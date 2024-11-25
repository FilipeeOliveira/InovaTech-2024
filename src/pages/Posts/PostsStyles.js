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
  background-color: #1f1f1f;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-offset: 0px 4px;
  shadow-radius: 6px;
  elevation: 3;
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
  color: #f5f5f5;
  align-items: center;
`;

export const Body = styled.Text`
  font-size: 14px;
  color: #b3b3b3;
  line-height: 20px;
  max-width: 350px;
`;

export const ButtonContainer = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-around;
`;

export const IconContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #292929;
`;

export const IconText = styled.Text`
  margin-left: 8px;
  color: #f5f5f5;
  font-size: 14px;
`;

export const ShareContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ShareText = styled.Text`
  margin-left: 5px;
  color: #007aff;
`;

export const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  background-color: #f25e3d;
  width: 60px;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px;
  border-radius: 100px;
  elevation: 5;
`;

export const FloatingButtonText = styled.Text`
  color: #ffffff;
  font-size: 30px;
  font-weight: bold;
`;

export const BottomSheetOption = styled.TouchableOpacity`
  background-color: #3c3a3a;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const BottomSheetOptionText = styled.Text`
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
`;

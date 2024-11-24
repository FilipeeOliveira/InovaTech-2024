import styled from "styled-components/native";

export const Container = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  position: absolute;
  bottom: 20px;
  left: 10px;
  right: 10px;
  background-color: transparent;
  border-radius: 20px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5; /* Para Android */
`;

export const Input = styled.TextInput`
  flex: 1;
  border-radius: 14px;
  padding: 14px;
  margin-right: 8px;
  color: #fff;
  background-color: #1f1f1f;
  font-size: 16px;
`;

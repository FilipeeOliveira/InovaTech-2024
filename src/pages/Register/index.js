import React, { useState } from "react";
import { Alert } from "react-native";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Container,
  Input,
  RegisterButton,
  ButtonText,
  WelcomeText,
  ButtonsContainer,
} from "./RegisterStyles";

function Register({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    try {
      const existingUser = await AsyncStorage.getItem(username);
      if (existingUser !== null) {
        Alert.alert("Erro", "Nome de usuário já existe");
      } else {
        const userId = uuid.v4();

        await AsyncStorage.setItem(
          username,
          JSON.stringify({ password, userId })
        );
        Alert.alert("Sucesso", "Usuário registrado com sucesso");
        navigation.replace("Login");
      }
    } catch (error) {
      console.error("Erro ao salvar dados de registro:", error);
    }
  };

  return (
    <Container>
      <WelcomeText>Crie sua conta</WelcomeText>

      <Input
        placeholder="Digite seu usuário"
        placeholderTextColor="#FFFFFF"
        value={username}
        onChangeText={setUsername}
      />
      <Input
        placeholder="Digite sua senha"
        placeholderTextColor="#FFFFFF"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <ButtonsContainer>
        <RegisterButton onPress={handleRegister}>
          <ButtonText>Registre-se</ButtonText>
        </RegisterButton>
      </ButtonsContainer>
    </Container>
  );
}

export default Register;

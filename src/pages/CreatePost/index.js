import React, { useState } from "react";
import { Modal, View, Image, TouchableOpacity, Text } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import {
  Container,
  Label,
  Input,
  SubmitButton,
  ButtonText,
  Content,
  BottomContainer,
} from "./CreatePostStyles";

function CreatePost({ navigation, route }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { onPostCreated } = route.params || {};
  const { userCredentials } = route.params || {};

  console.log(userCredentials);

  const handleImagePick = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaType: "photo",
      includeBase64: false, // Não inclui base64 para imagens grandes
    });

    if (!image) {
      throw new Error("Imagem não selecionada");
    }

    setImageUri(image.assets[0].uri);
  };

  const handleSubmit = async () => {
    const newPost = {
      id: Math.floor(Math.random() * 100000),
      title,
      body,
      image: imageUri,
      userId: userCredentials?.userId,
      createdAt: new Date().toLocaleDateString(),
    };
    try {
      const storedPosts = (await AsyncStorage.getItem("posts")) || "[]";
      const postsArray = JSON.parse(storedPosts);
      postsArray.push(newPost);
      await AsyncStorage.setItem("posts", JSON.stringify(postsArray));
      onPostCreated && onPostCreated(newPost);
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar o post:", error);
    }
  };

  return (
    <Container>
      <Content>
        <Label>Título</Label>
        <Input value={title} onChangeText={setTitle} />
        <Label>Mensagem</Label>
        <Input value={body} onChangeText={setBody} />

        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Label>Selecionar Imagem</Label>
        </TouchableOpacity>
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{ width: 100, height: 100, marginTop: 10, borderRadius: 10 }}
          />
        )}
      </Content>

      <BottomContainer>
        <SubmitButton onPress={handleSubmit}>
          <ButtonText>Enviar</ButtonText>
        </SubmitButton>
      </BottomContainer>

      {/* Modal para selecionar imagem */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.8)",
          }}
        >
          <TouchableOpacity
            style={{
              padding: 20,
              backgroundColor: "#fff",
              borderRadius: 10,
            }}
            onPress={handleImagePick}
          >
            <Text>Escolher uma imagem da galeria</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginTop: 20,
              padding: 15,
              backgroundColor: "#F25E3D",
              borderRadius: 10,
            }}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={{ color: "#fff" }}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Container>
  );
}

export default CreatePost;

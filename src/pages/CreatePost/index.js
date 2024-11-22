import React, { useEffect, useState } from "react";
import { savePost } from "../../utils/storagePosts";
import { Container, Label, Input, SubmitButton, ButtonText, Content, BottomContainer } from "./CreatePostStyles";

function CreatePost({ navigation, route }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { onPostCreated } = route.params || {};
  const { userCredentials } = route.params || {};

  const handleSubmit = async () => {
    const newPost = {
      id: Math.floor(Math.random() * 100000),
      title,
      body,
      userId: userCredentials.userId,
    };
    try {
      await savePost(newPost);
      onPostCreated && onPostCreated(newPost);
      navigation.goBack();
    } catch (error) {
      console.error("Error ao salvar o post:", error);
    }
  };

  return (
    <Container>
      <Content>
        <Label>Título</Label>
        <Input value={title} onChangeText={setTitle} />
        <Label>Mensagem</Label>
        <Input value={body} onChangeText={setBody} />
      </Content>

      <BottomContainer>
        <SubmitButton onPress={handleSubmit}>
          <ButtonText>Enviar</ButtonText>
        </SubmitButton>
      </BottomContainer>
    </Container>
  );
}

export default CreatePost;

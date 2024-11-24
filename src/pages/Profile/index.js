import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Alert, FlatList, View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faThumbsUp,
  faShare,
  faEllipsis,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Header,
  ContainerHeader,
  ImageContainer,
  TouchableImage,
  ProfileImage,
  Placeholder,
  Title,
  EditButtonContainer,
  ButtonRow,
  PostCard,
  PostHeader,
  PostTitle,
  PostBody,
  PostFooter,
  PostDate,
  PostActions,
  ActionButton,
  ActionText,
  Separator,
  EmptyContainer,
  EmptyText,
  Input,
} from "./ProfileStyles";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";

const STORAGE_KEY_POSTS = "@profile_posts";

function Profile({ userCredentials }) {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState(userCredentials.username);
  const [password, setPassword] = useState(userCredentials.password);
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ["50%"], []);

  // Carregar imagem de perfil
  useEffect(() => {
    const loadProfileImage = async () => {
      const savedImage = await AsyncStorage.getItem(`${username}_profile_image`);
      if (savedImage) setProfileImage(savedImage);
    };
    loadProfileImage();
  }, [username]);

  // Carregar posts
  useEffect(() => {
    const loadPosts = async () => {
      const storedPosts = await AsyncStorage.getItem(STORAGE_KEY_POSTS);
      if (storedPosts) setPosts(JSON.parse(storedPosts));
    };
    loadPosts();
  }, []);

  // Salvar novo post
  const saveNewPost = async (newPost) => {
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    await AsyncStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(updatedPosts));
  };

  // Simular publicação de um novo post
  const handleNewPost = () => {
    const newPost = {
      id: Date.now(),
      title: "Novo Post",
      body: "Conteúdo do novo post.",
      date: new Date().toLocaleDateString(),
    };
    saveNewPost(newPost);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Permissão de mídia é necessária.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      await AsyncStorage.setItem(`${username}_profile_image`, result.uri);
      setProfileImage(result.uri);
    };
  };

  // Salvar dados do perfil
  const saveProfileData = async () => {
    if (username.trim() === "" || password.trim() === "") {
      Alert.alert("Erro", "Os campos de usuário e senha não podem estar vazios.");
      return;
    }

    try {
      const updatedUserData = { username, password };
      await AsyncStorage.setItem(username, JSON.stringify(updatedUserData));
      setIsEditing(false);
      Alert.alert("Sucesso", "Dados do perfil atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar dados do perfil:", error);
      Alert.alert("Erro", "Ocorreu um erro ao salvar os dados do perfil");
    }
  };

  const renderItem = ({ item }) => (
    <PostCard>
      <PostHeader>
        <PostTitle>{item.title}</PostTitle>
        <TouchableOpacity onPress={() => {}}>
          <FontAwesomeIcon icon={faEllipsis} size={20} color="#fbfbfb" />
        </TouchableOpacity>
      </PostHeader>
      <PostBody>{item.body}</PostBody>
      <PostFooter>
        <PostDate>Publicado em {item.date || "Desconhecido"}</PostDate>
        <PostActions>
          <ActionButton>
            <FontAwesomeIcon icon={faThumbsUp} size={16} color="#f8f8f8" />
            <ActionText>Curtir</ActionText>
          </ActionButton>
          <ActionButton>
            <FontAwesomeIcon icon={faShare} size={16} color="#f8f8f8" />
            <ActionText>Compartilhar</ActionText>
          </ActionButton>
        </PostActions>
      </PostFooter>
    </PostCard>
  );

  return (
    <BottomSheetModalProvider>
      <Container>
        <Header>
          <ContainerHeader>
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "#f8f8f8" }}>
              {username}
            </Text>
            <ImageContainer>
              <TouchableImage onPress={pickImage}>
                {profileImage ? (
                  <ProfileImage source={{ uri: profileImage }} />
                ) : (
                  <Placeholder>
                    <FontAwesomeIcon icon={faUserPlus} size={30} color="#fbfbfb" />
                  </Placeholder>
                )}
              </TouchableImage>
            </ImageContainer>
          </ContainerHeader>
          <ButtonRow>
            <TouchableOpacity onPress={handleNewPost}>
              <Text style={{ color: "#fff", fontSize: 16 }}>Publicar Novo Post</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => bottomSheetModalRef.current?.present()}>
              <Text style={{ color: "#fff", fontSize: 16 }}>Editar Perfil</Text>
            </TouchableOpacity>
          </ButtonRow>
        </Header>

        <Title>Minhas Denúncias</Title>

        {posts.length > 0 ? (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            ItemSeparatorComponent={<Separator />}
          />
        ) : (
          <EmptyContainer>
            <EmptyText>Nenhuma denúncia encontrada</EmptyText>
          </EmptyContainer>
        )}

        {/* Modal de edição de perfil */}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          index={0}
          backgroundStyle={{ backgroundColor: "#292828" }}
          handleIndicatorStyle={{ backgroundColor: "#fff" }}
        >
          <BottomSheetView style={{ padding: 20 }}>
            <Text style={{ color: "#fff", marginBottom: 10 }}>Nome de Usuário</Text>
            <Input value={username} onChangeText={setUsername} placeholder="Usuário" />
            <Text style={{ color: "#fff", marginBottom: 10 }}>Senha</Text>
            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="Senha"
              secureTextEntry={true}
            />
            <EditButtonContainer>
              <TouchableOpacity onPress={saveProfileData}>
                <Text style={{ color: "#fff", fontSize: 16 }}>Salvar</Text>
              </TouchableOpacity>
            </EditButtonContainer>
          </BottomSheetView>
        </BottomSheetModal>
      </Container>
    </BottomSheetModalProvider>
  );
}

export default Profile;

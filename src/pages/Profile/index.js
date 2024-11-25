import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  Alert,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faThumbsUp,
  faShare,
  faEllipsis,
  faUserPlus,
  faEdit,
  faHeart,
  faShareNodes,
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
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { addNewPost } from "../../utils/addNewPost";
import { loadProfilePosts } from "../../utils/postService";
import { CustomBottomSheetPost } from "../../components/CustomBottomSheetPost";
import { likePost } from "../../utils/likePost";
import { handleSharePost } from "../../utils/share";

const STORAGE_KEY_POSTS = "@profile_posts";

function Profile({ userCredentials }) {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState(userCredentials.username);
  const [password, setPassword] = useState(userCredentials.password);
  const [posts, setPosts] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  const navigation = useNavigation();

  const bottomSheetModalProfileRef = useRef(null);
  const bottomSheetModalPostRef = useRef(null);

  const snapPoints = useMemo(() => ["50%"], []);

  const handlePresentModalPostPress = (title, body, image) => {
    bottomSheetModalPostRef.current?.present();
    passPostInformation(title, body, image);
  };

  // Carregar imagem de perfil
  useEffect(() => {
    const loadProfileImage = async () => {
      const savedImage = await AsyncStorage.getItem(
        `${username}_profile_image`
      );
      if (savedImage) setProfileImage(savedImage);
    };
    loadProfileImage();
  }, [username]);

  const { userId } = userCredentials;

  // Carregar posts
  useEffect(() => {
    loadProfilePosts(setPosts, userId);
  });

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
    }
  };

  // Salvar dados do perfil
  const saveProfileData = async () => {
    if (username.trim() === "" || password.trim() === "") {
      Alert.alert(
        "Erro",
        "Os campos de usuário e senha não podem estar vazios."
      );
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

  const renderItem = useCallback(({ item }) => (
    <PostCard>
      <PostHeader>
        <PostTitle>
          {item.title} <PostDate> {item.createdAt || "Desconhecido"}</PostDate>
        </PostTitle>
        <TouchableOpacity>
          <FontAwesomeIcon icon={faEdit} size={20} color="#fbfbfb" />
        </TouchableOpacity>
      </PostHeader>
      <PostBody>{item.body}</PostBody>

      {item.image ? (
        <Image
          source={{ uri: item.image }}
          style={{
            width: "100%",
            height: 400,
            borderRadius: 20,
            marginBottom: 20,
            marginTop: 16,
          }}
        />
      ) : null}
      <PostFooter>
        <PostActions>
          <TouchableOpacity
            onPress={() => handleSharePost(item.title, item.body)}
          >
            <ActionButton>
              <FontAwesomeIcon icon={faShareNodes} size={20} color="#f8f8f8" />
            </ActionButton>
          </TouchableOpacity>
        </PostActions>
      </PostFooter>
    </PostCard>
  ));

  return (
    <BottomSheetModalProvider>
      <Container>
        <Header>
          <ContainerHeader>
            <Text
              style={{ fontSize: 25, fontWeight: "bold", color: "#f8f8f8" }}
            >
              {username}
            </Text>
            <ImageContainer>
              <TouchableImage onPress={pickImage}>
                {profileImage ? (
                  <ProfileImage source={{ uri: profileImage }} />
                ) : (
                  <Placeholder>
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      size={30}
                      color="#fbfbfb"
                    />
                  </Placeholder>
                )}
              </TouchableImage>
            </ImageContainer>
          </ContainerHeader>
          <ButtonRow>
            <TouchableOpacity
              onPress={() => bottomSheetModalProfileRef.current?.present()}
            >
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
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        ) : (
          <EmptyContainer>
            <EmptyText>Nenhuma denúncia encontrada</EmptyText>
          </EmptyContainer>
        )}

        {/* Modal de edição de perfil */}

        <BottomSheetModal
          ref={bottomSheetModalProfileRef}
          snapPoints={snapPoints}
          index={0}
          backgroundStyle={{ backgroundColor: "#292828" }}
          handleIndicatorStyle={{ backgroundColor: "#fff" }}
        >
          <BottomSheetView style={{ padding: 20 }}>
            <Text style={{ color: "#fff", marginBottom: 10 }}>
              Nome de Usuário
            </Text>
            <Input
              value={username}
              onChangeText={setUsername}
              placeholder="Usuário"
            />
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

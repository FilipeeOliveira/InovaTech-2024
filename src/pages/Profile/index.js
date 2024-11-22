import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Alert,
  Button,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  faThumbsUp,
  faShare,
  faHeart,
  faEllipsis,
  faUserAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import * as ImagePicker from "expo-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  ContainerHeader,
  Header,
  ImageContainer,
  TouchableImage,
  ProfileImage,
  Placeholder,
  PlaceholderText,
  EditButtonContainer,
  Content,
  Input,
  Buttons,
  Title,
  Container,
} from "./ProfileStyles";

import { Body, ButtonContainer } from "../Posts/PostsStyles";
import { loadProfilePosts } from "../../utils/postService";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { useNavigation } from "@react-navigation/native";

const STORAGE_KEY = "@profile_image";

function Profile({ userCredentials }) {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState(userCredentials.username);
  const [password, setPassword] = useState(userCredentials.password);
  const [posts, setPosts] = useState([]);

  const navigation = useNavigation();

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ["50%", "50%"]);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const [isEditing, setIsEditing] = useState(false);

  const { userId } = userCredentials;

  useEffect(() => {
    loadProfileImage();
  }, [userId]);

  useEffect(() => {
    loadProfilePosts(setPosts, userId);
  });

  const loadProfileImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem(
        `${username}_profile_image`
      );
      if (savedImage) {
        setProfileImage(savedImage);
      }
    } catch (error) {
      console.error("Erro ao carregar imagem do perfil:", error);
    }
  };

  const saveProfileImage = async (imageUri) => {
    if (imageUri) {
      try {
        await AsyncStorage.setItem(`${username}_profile_image`, imageUri);
        setProfileImage(imageUri);
      } catch (error) {
        console.error("Erro ao salvar imagem do perfil:", error);
      }
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de permissão para acessar sua biblioteca de mídia."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      saveProfileImage(result.assets[0].uri);
    }
  };

  const handleImagePress = () => {
    Alert.alert(
      "Alterar Imagem de Perfil",
      "Você deseja alterar a imagem de perfil?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sim", onPress: pickImage },
      ]
    );
  };

  const saveProfileData = async () => {
    if (username.trim() === "" || password.trim() === "") {
      Alert.alert(
        "Erro",
        "Os campos de usuário e senha não podem estar vazios."
      );
      return;
    }

    try {
      await AsyncStorage.removeItem(userCredentials.username);

      const updatedUserData = { username, password };
      await AsyncStorage.setItem(username, JSON.stringify(updatedUserData));

      setIsEditing(false);
      Alert.alert("Sucesso", "Dados do perfil atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar dados do usuário:", error);
      Alert.alert("Erro", "Ocorreu um erro ao salvar os dados do perfil");
    }
  };

  const renderItem = useCallback(({ item }) => (
    <View
      style={{ backgroundColor: "transparent", borderRadius: 8, padding: 20 }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
        onPress={() => navigation.navigate("PostDetails", { post: item })}
      >
        <View style={{ flexDirection: "column" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#f8f8f8",
                fontWeight: "bold",
                paddingBottom: 8,
              }}
            >
              {item.title}
            </Text>
            <FontAwesomeIcon icon={faEllipsis} size={20} color="#fbfbfb" />
          </View>

          <Body>{item.body}</Body>
        </View>
      </TouchableOpacity>
      <ButtonContainer>
        {/* <Button title="Editar" onPress={() => handleEditPost(item)} /> */}
        {/* <TouchableOpacity onPress={() => handleLikePost(item.id)}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesomeIcon
                icon={faHeart}
                size={20}
                color={likedPosts.includes(item.id) ? "red" : "white"}
              />
              <IconText>{likeCounts[item.id] || 0}</IconText>
            </View>
          </TouchableOpacity> */}
        {/* <TouchableOpacity
            onPress={() => handleSharePost(item.title, item.body)}
          >
            <View style={ShareContainer}>
              <FontAwesomeIcon icon={faShare} size={20} color="blue" />
            </View>
          </TouchableOpacity> */}
        {/* <Button
            title="Deletar"
            color="red"
            onPress={() => handleDeletePost(item.id)}
          /> */}
      </ButtonContainer>
    </View>
  ));

  return (
    <Container>
      <Header>
        <ContainerHeader>
          <View style={{ marginRight: 10 }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                textTransform: "capitalize",
                width: "100%",
                marginRight: 10,
                color: "#f8f8f8",
              }}
            >
              {username}
            </Text>
          </View>
          <ImageContainer>
            <TouchableImage onPress={handleImagePress}>
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

        <ContainerHeader>
          <EditButtonContainer>
            <TouchableOpacity onPress={handlePresentModalPress}>
              <Text style={{ color: "#f8f8f8" }}>Editar perfil</Text>
            </TouchableOpacity>
          </EditButtonContainer>
        </ContainerHeader>
      </Header>
      <View
        style={{ width: "100%", height: 0.3, backgroundColor: "#857f7f" }}
      />

      {/* Título "Minhas Denúncias" */}
      <Title>Minhas Denúncias</Title>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={
          <View
            style={{ width: "100%", height: 0.5, backgroundColor: "#F25E3D" }}
          />
        }
      />

      <GestureHandlerRootView style={styles.container}>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={snapPoints}
            index={1}
            backgroundStyle={{ backgroundColor: "#292828" }}
            handleIndicatorStyle={{ backgroundColor: "#fff" }}
          >
            <BottomSheetView style={styles.contentContainer}>
              <Text style={{ color: "#fff", marginLeft: 5, marginBottom: 6 }}>
                Nome
              </Text>
              <Input
                value={username}
                onChangeText={setUsername}
                placeholder="Usuário"
              />
              <Text style={{ color: "#fff", marginLeft: 5, marginBottom: 6 }}>
                Senha
              </Text>
              <Input
                value={password}
                onChangeText={setPassword}
                placeholder="Senha"
                secureTextEntry={true}
              />

              <EditButtonContainer
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity onPress={saveProfileData}>
                  <Text style={{ color: "#fff", fontSize: 20 }}>Salvar</Text>
                </TouchableOpacity>
              </EditButtonContainer>
              <EditButtonContainer
                style={{ flexDirection: "column", alignItems: "center" }}
              >
                <TouchableOpacity onPress={handleSheetClose}>
                  <Text style={{ color: "#fff", fontSize: 20 }}>Cancelar</Text>
                </TouchableOpacity>
              </EditButtonContainer>
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    zIndex: 20,
    justifyContent: "center",
    backgroundColor: "#transparent",
    position: "static",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    flexDirection: "column",
    gap: 10,
  },
});

export default Profile;

import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  Text,
  Image,
  StatusBar,
  StyleSheet,
} from "react-native";
import {
  faThumbsUp,
  faShare,
  faHeart,
  faEllipsis,
  faSave,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { loadPostsFromStorage } from "../../utils/postService";
import { restoreLikesFromStorage } from "../../utils/storage";
import { addNewPost } from "../../utils/addNewPost";
import { deletePost } from "../../utils/deletePost";
import { editPost } from "../../utils/editPost";
import { saveEdit } from "../../utils/saveEdit";
import { likePost } from "../../utils/likePost";
import {
  Container,
  Loader,
  Card,
  PostItem,
  Title,
  Body,
  ButtonContainer,
  IconContainer,
  IconText,
} from "./PostsStyles";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { useRef, useMemo } from "react";

function Posts({ userCredentials }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [likedPosts, setLikedPosts] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});

  const navigation = useNavigation();

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ["50%", "50%"]);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    loadPostsFromStorage(setPosts, setLoading);
  }, []);

  // useEffect(() => {
  //     if (route.params?.newPost) {
  //         addNewPost(route.params.newPost, posts, setPosts);
  //     }
  // }, [route.params?.newPost]);

  useEffect(() => {
    restoreLikesFromStorage(setLikedPosts, setLikeCounts);
  }, []);

  const handleCreatePost = () => {
    navigation.navigate("CreatePost", {
      onPostCreated: (newPost) => addNewPost(newPost, posts, setPosts),
      userCredentials: userCredentials,
    });
  };

  const handleDeletePost = (postId) => {
    deletePost(postId, posts, setPosts);
  };

  const handleEditPost = (post) => {
    editPost(post, setCurrentPost, setTitle, setBody, setModalVisible);
  };

  const handleSaveEdit = async () => {
    saveEdit(currentPost, title, body, posts, setPosts, setModalVisible);
  };

  const handleLikePost = async (postId) => {
    likePost(postId, likedPosts, setLikedPosts, likeCounts, setLikeCounts);
  };

  const renderItem = useCallback(
    ({ item }) => (
      <Card>
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
              <Title>{item.title}</Title>
              <TouchableOpacity onPress={handlePresentModalPress}>
                <FontAwesomeIcon icon={faEllipsis} size={20} color="#fbfbfb" />
              </TouchableOpacity>
            </View>

            <Body>{item.body}</Body>
          </View>
        </TouchableOpacity>
        <ButtonContainer>
          {/* <Button title="Editar" onPress={() => handleEditPost(item)} /> */}
          <TouchableOpacity onPress={() => handleLikePost(item.id)}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesomeIcon
                icon={faHeart}
                size={20}
                color={likedPosts.includes(item.id) ? "red" : "white"}
              />
              <IconText>{likeCounts[item.id] || 0}</IconText>
            </View>
          </TouchableOpacity>
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
      </Card>
    ),
    [likedPosts, likeCounts]
  );

  if (loading) {
    return (
      <Loader>
        <ActivityIndicator size="large" color="#0000ff" />
      </Loader>
    );
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        hidden={false}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ marginTop: 10 }}
        ListHeaderComponent={
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 15,
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>
              Posts
            </Text>
            <Image
              source={require("../../../assets/fire-icon.png")}
              style={{ width: 40, height: 40 }}
            />
          </View>
        }
        /* ItemSeparatorComponent={
          <View
            style={{ width: "100%", height: 0.5, backgroundColor: "#F25E3D" }}
          />
        } */
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          backgroundColor: "#F25E3D",
          width: 60,
          bottom: 20,
          left: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 14,
          borderRadius: 100,
          zIndex: 20,
        }}
        onPress={handleCreatePost}
      >
        <Text style={{ color: "#ffff", fontSize: 30, fontWeight: "bold" }}>
          +
        </Text>
      </TouchableOpacity>

      <GestureHandlerRootView style={styles.container}>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}
            snapPoints={snapPoints}
            index={1}
            backgroundStyle={{ backgroundColor: "#292828" }}
            handleIndicatorStyle={{
              backgroundColor: "#fff",
            }}
          >
            <BottomSheetView style={styles.contentContainer}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#3c3a3a",
                  width: "100%",
                  padding: 20,
                  borderRadius: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "semibold",
                    fontSize: 15,
                  }}
                >
                  Compartilhar
                </Text>

                <FontAwesomeIcon icon={faShare} size={20} color="#fbfbfb" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#3c3a3a",
                  width: "100%",
                  padding: 20,
                  borderRadius: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "semibold",
                    fontSize: 15,
                  }}
                >
                  Salvar
                </Text>

                <FontAwesomeIcon icon={faBookmark} size={20} color="#fbfbfb" />
              </TouchableOpacity>
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>

      {/* <EditPostModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveEdit}
        title={title}
        setTitle={setTitle}
        body={body}
        setBody={setBody}
      /> */}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 20,
    justifyContent: "center",
    backgroundColor: "transparent",
    position: "static",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#292828",
    padding: 20,
    flexDirection: "column",
    gap: 10,
  },
});

export default Posts;

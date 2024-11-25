import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Text,
  FlatList,
  Button,
  Alert,
  View,
  KeyboardAvoidingView,
  Animated,
  Keyboard,
  TouchableOpacity,
  Image,
} from "react-native";
import CommentInput from "../../components/CommentInput";
import EditCommentModal from "../../components/EditCommentModal";
import {
  loadPostComments,
  savePostComments,
} from "../../utils/storageComments";
import {
  Container,
  Title,
  Body,
  CommentItem,
  ButtonContainer,
  PostContainer,
} from "./PostDetailsStyles";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { CustomBottomSheetPost } from "../../components/CustomBottomSheetPost";
const STORAGE_KEY = "@comments_";

function PostDetails({ route }) {
  const { post } = route.params;
  const [comments, setComments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [information, setInformation] = useState({});

  const bottomSheetModalRef = useRef(null);

  const handlePresentModalPress = (title, body) => {
    bottomSheetModalRef.current?.present();
    passPostInformation(title, body);
  };

  useEffect(() => {
    const loadComments = async () => {
      const postComments = await loadPostComments(post.id);
      setComments(postComments);
    };
    loadComments();
  }, [post.id]);

  const handleAddComment = async (comment) => {
    const newComment = {
      id: Date.now().toString(),
      text: comment,
    };
    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    await savePostComments(post.id, updatedComments);
  };

  const handleDeleteComment = async (commentId) => {
    Alert.alert(
      "Deletar Comentário",
      "Prosseguir?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            const updatedComments = comments.filter(
              (comment) => comment.id !== commentId
            );
            setComments(updatedComments);
            await savePostComments(post.id, updatedComments);
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handleEditComment = (comment) => {
    setCurrentComment(comment);
    setCommentText(comment.text);
    setModalVisible(true);
  };

  const handleSaveEdit = async () => {
    const updatedComment = { ...currentComment, text: commentText };
    const updatedComments = comments.map((comment) =>
      comment.id === updatedComment.id ? updatedComment : comment
    );
    setComments(updatedComments);
    await savePostComments(post.id, updatedComments);
    setModalVisible(false);
  };

  const passPostInformation = (title, body) => {
    setInformation({
      title: post.title,
      body: post.body,
    });
  };

  console.log(post);
  console.log(comments);

  return (
    <Container>
      <PostContainer>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 10,
          }}
        >
          <Title>{post.title}</Title>
          <TouchableOpacity
            onPress={() => handlePresentModalPress(post.title, post.body)}
          >
            <FontAwesomeIcon icon={faEllipsis} size={20} color="#fbfbfb" />
          </TouchableOpacity>
        </View>

        <Body>{post.body}</Body>

        {post.image ? (
          <Image
            source={{ uri: post.image }}
            style={{
              width: 200,
              height: 300,
              borderRadius: 20,
              marginTop: 20,
            }}
          />
        ) : null}
      </PostContainer>

      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          borderColor: "#857f7f",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Comentários</Text>
      </View>

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CommentItem>
            {/* <ButtonContainer>
              <Button title="Editar" onPress={() => handleEditComment(item)} />
              <Button
                title="Deletar"
                color="red"
                onPress={() => handleDeleteComment(item.id)}
              />
            </ButtonContainer> */}
            <Text style={{ color: "#fbfbfb" }}>{item.text}</Text>
          </CommentItem>
        )}
        extraData={comments}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
      <EditCommentModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveEdit}
        text={commentText}
        setText={setCommentText}
      />

      <CustomBottomSheetPost
        ref={bottomSheetModalRef}
        postInformation={information}
      />
      <KeyboardAvoidingView behavior="padding">
        <CommentInput onAddComment={handleAddComment} />
      </KeyboardAvoidingView>
    </Container>
  );
}

export default PostDetails;

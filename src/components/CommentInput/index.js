import React, { useState } from "react";
import { TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { Container, Input } from "./CommentInputStyles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const CommentInput = ({ onAddComment }) => {
  const [comment, setComment] = useState("");

  const handleAddComment = () => {
    if (comment.trim()) {
      onAddComment(comment);
      setComment("");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Container>
        <Input
          placeholder="Envie um comentário..."
          placeholderTextColor="#aaa"
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handleAddComment}
        >
          <FontAwesomeIcon icon={faArrowUp} size={25} color="#fa4925" />
        </TouchableOpacity>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default CommentInput;

import React, { useState } from "react";
import { Button, TouchableOpacity } from "react-native";
import { Container, Input } from "./CommentInputStyles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowCircleUp, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const CommentInput = ({ onAddComment }) => {
  const [comment, setComment] = useState("");

  const handleAddComment = () => {
    if (comment.trim()) {
      onAddComment(comment);
      setComment("");
    }
  };

  return (
    <Container>
      <Input
        placeholder="Envie um Comentário..."
        value={comment}
        onChangeText={setComment}
      />
      <TouchableOpacity
        style={{ backgroundColor: "#fff", padding: 10, borderRadius: 30 }}
        onPress={handleAddComment}
      >
        <FontAwesomeIcon icon={faArrowUp} size={25} />
      </TouchableOpacity>
    </Container>
  );
};

export default CommentInput;

import React, { useState } from 'react';
import { Button } from 'react-native';
import { Container, Input } from './CommentInputStyles';

const CommentInput = ({ onAddComment }) => {
    const [comment, setComment] = useState('');

    const handleAddComment = () => {
        if (comment.trim()) {
            onAddComment(comment);
            setComment('');
        }
    };

    return (
        <Container>
            <Input
                placeholder="Envie um Comentário"
                value={comment}
                onChangeText={setComment}
            />
            <Button title="Adicionar" onPress={handleAddComment} />
        </Container>
    );
};

export default CommentInput;

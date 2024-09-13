import React, { useState, useEffect } from 'react';
import { Text, FlatList, Button, Alert } from 'react-native';
import CommentInput from '../../components/CommentInput';
import EditCommentModal from '../../components/EditCommentModal';
import { loadPostComments, savePostComments } from '../../utils/storageComments';
import { Container, Title, Body, CommentItem, ButtonContainer } from './PostDetailsStyles';

const STORAGE_KEY = '@comments_';

function PostDetails({ route }) {
    const { post } = route.params;
    const [comments, setComments] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentComment, setCurrentComment] = useState(null);
    const [commentText, setCommentText] = useState('');

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
            'Deletar Comentário',
            'Prosseguir?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        const updatedComments = comments.filter(comment => comment.id !== commentId);
                        setComments(updatedComments);
                        await savePostComments(post.id, updatedComments);
                    },
                    style: 'destructive',
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
        const updatedComments = comments.map(comment => (comment.id === updatedComment.id ? updatedComment : comment));
        setComments(updatedComments);
        await savePostComments(post.id, updatedComments);
        setModalVisible(false);
    };

    return (
        <Container>
            <Title>{post.title}</Title>
            <Body>{post.body}</Body>
            <CommentInput onAddComment={handleAddComment} />
            <FlatList
                data={comments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CommentItem>
                        <Text>{item.text}</Text>
                        <ButtonContainer>
                            <Button title="Editar" onPress={() => handleEditComment(item)} />
                            <Button title="Deletar" color="red" onPress={() => handleDeleteComment(item.id)} />
                        </ButtonContainer>
                    </CommentItem>
                )}
                ListEmptyComponent={<Text>Sem comentários...</Text>}
                extraData={comments}
            />
            <EditCommentModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleSaveEdit}
                text={commentText}
                setText={setCommentText}
            />
        </Container>
    );
}

export default PostDetails;

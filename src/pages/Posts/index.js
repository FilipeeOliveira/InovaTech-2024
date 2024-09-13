import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import EditPostModal from '../../components/EditPostModal';
import { faThumbsUp, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { loadPostsFromStorage } from '../../utils/postService';
import { restoreLikesFromStorage } from '../../utils/storage';
import { handleSharePost } from '../../utils/share';
import { addNewPost } from '../../utils/addNewPost';
import { deletePost } from '../../utils/deletePost';
import { editPost } from '../../utils/editPost';
import { saveEdit } from '../../utils/saveEdit';
import { likePost } from '../../utils/likePost';
import { Container, Loader, Card, PostItem, Title, Body, ButtonContainer, IconContainer, IconText, ShareContainer, ShareText } from './PostsStyles';

function Posts({ navigation, route }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [likedPosts, setLikedPosts] = useState([]);
    const [likeCounts, setLikeCounts] = useState({});

    useEffect(() => {
        loadPostsFromStorage(setPosts, setLoading);
    }, []);

    useEffect(() => {
        if (route.params?.newPost) {
            addNewPost(route.params.newPost, posts, setPosts);
        }
    }, [route.params?.newPost]);

    useEffect(() => {
        restoreLikesFromStorage(setLikedPosts, setLikeCounts);
    }, []);

    const handleCreatePost = () => {
        navigation.navigate('CreatePost', { onPostCreated: newPost => addNewPost(newPost, posts, setPosts) });
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

    const renderItem = useCallback(({ item }) => (
        <Card>
            <TouchableOpacity
                style={PostItem}
                onPress={() => navigation.navigate('PostDetails', { post: item })}
            >
                <Title>{item.title}</Title>
                <Body>{item.body}</Body>
            </TouchableOpacity>
            <ButtonContainer>
                <Button title="Editar" onPress={() => handleEditPost(item)} />
                <TouchableOpacity onPress={() => handleLikePost(item.id)}>
                    <View style={IconContainer}>
                        <FontAwesomeIcon icon={faThumbsUp} size={20} color={likedPosts.includes(item.id) ? 'green' : 'black'} />
                        <IconText>{likeCounts[item.id] || 0}</IconText>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSharePost(item.title, item.body)}>
                    <View style={ShareContainer}>
                        <FontAwesomeIcon icon={faShare} size={20} color="blue" />
                        <ShareText>Compartilhar</ShareText>
                    </View>
                </TouchableOpacity>
                <Button title="Deletar" color="red" onPress={() => handleDeletePost(item.id)} />
            </ButtonContainer>
        </Card>
    ), [likedPosts, likeCounts]);

    if (loading) {
        return (
            <Loader>
                <ActivityIndicator size="large" color="#0000ff" />
            </Loader>
        );
    }

    return (
        <Container>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
            <Button title="Novo Post" onPress={handleCreatePost} />
            <EditPostModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleSaveEdit}
                title={title}
                setTitle={setTitle}
                body={body}
                setBody={setBody}
            />
        </Container>
    );
};

export default Posts;

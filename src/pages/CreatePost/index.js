// CreatePost.js
import React, { useState } from 'react';
import { savePost } from '../../utils/storagePosts';
import { Container, Label, Input, SubmitButton } from './CreatePostStyles';

function CreatePost({ navigation, route }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const { onPostCreated } = route.params || {};

    const handleSubmit = async () => {
        const newPost = { id: Math.floor(Math.random() * 100000), title, body };
        try {
            await savePost(newPost);
            onPostCreated && onPostCreated(newPost);
            navigation.goBack();
        } catch (error) {
            console.error('Error ao salvar o post:', error);
        }
    };

    return (
        <Container>
            <Label>Título</Label>
            <Input
                value={title}
                onChangeText={setTitle}
            />
            <Label>Mensagem</Label>
            <Input
                value={body}
                onChangeText={setBody}
            />
            <SubmitButton
                title="Enviar"
                onPress={handleSubmit}
            />
        </Container>
    );
}

export default CreatePost;

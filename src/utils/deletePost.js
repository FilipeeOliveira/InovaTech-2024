import { savePosts } from './postService';
import { Alert } from 'react-native';

export const deletePost = async (postId, posts, setPosts) => {
    Alert.alert(
        'Apagar Post',
        'Prosseguir?',
        [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                onPress: async () => {
                    const updatedPosts = posts.filter(post => post.id !== postId);
                    setPosts(updatedPosts);
                    await savePosts(updatedPosts);
                },
                style: 'destructive',
            },
        ],
        { cancelable: true }
    );
};

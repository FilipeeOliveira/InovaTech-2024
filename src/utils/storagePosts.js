import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@posts';

export const savePost = async (post) => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        const existingPosts = jsonValue ? JSON.parse(jsonValue) : [];
        const updatedPosts = [...existingPosts, post];
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
        console.log('Post salvo com sucesso:', post);
    } catch (error) {
        console.error('Erro ao salvar o post:', error);
    }
};

export const deletePostFromStorage = async (postId) => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        const existingPosts = jsonValue ? JSON.parse(jsonValue) : [];
        const updatedPosts = existingPosts.filter(post => post.id !== postId);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
        console.log('Post deletado com sucesso:', postId);
    } catch (error) {
        console.error('Erro ao deletar o post:', error);
    }
};

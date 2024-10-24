import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@comments_';

export const loadPostComments = async (postId) => {
    try {
        const jsonValue = await AsyncStorage.getItem(`${STORAGE_KEY}${postId}`);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
        console.error('Error ao carregar os comentarios:', error);
        return [];
    }
};

export const savePostComments = async (postId, comments) => {
    try {
        await AsyncStorage.setItem(`${STORAGE_KEY}${postId}`, JSON.stringify(comments));
    } catch (error) {
        console.error('Error ao salvar os comentarios:', error);
    }
};

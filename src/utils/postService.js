import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const STORAGE_KEY = '@posts';

export const loadPosts = async (setPosts, setLoading) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const posts = response.data;
        setPosts(posts);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (error) {
        console.error('Error ao carregar os posts da API:', error);
    } finally {
        setLoading(false);
    }
};

export const loadPostsFromStorage = async (setPosts, setLoading) => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        const savedPosts = jsonValue != null ? JSON.parse(jsonValue) : [];
        if (savedPosts.length > 0) {
            setPosts(savedPosts);
        } else {
            await loadPosts(setPosts, setLoading);
        }
    } catch (error) {
        console.error('Error ao carregar os posts do armazenamento:', error);
    } finally {
        setLoading(false);
    }
};

export const savePosts = async (updatedPosts) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
        console.log('Posts salvos com sucesso');
    } catch (error) {
        console.error('Erro ao salvar os posts localmente:', error);
    }
};

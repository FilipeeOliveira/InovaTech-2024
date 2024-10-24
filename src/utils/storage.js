import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveLikes = async (likedPosts, likeCounts) => {
    try {
        const updatedLikes = {
            likedPosts,
            likeCounts,
        };
        await AsyncStorage.setItem('@likes', JSON.stringify(updatedLikes));
    } catch (error) {
        console.error('Error saving likes:', error);
    }
};

export const restoreLikesFromStorage = async (setLikedPosts, setLikeCounts) => {
    try {
        const jsonValue = await AsyncStorage.getItem('@likes');
        if (jsonValue !== null) {
            const savedLikes = JSON.parse(jsonValue);
            setLikedPosts(savedLikes.likedPosts);
            setLikeCounts(savedLikes.likeCounts);
        }
    } catch (error) {
        console.error('Error restoring likes from storage:', error);
    }
};

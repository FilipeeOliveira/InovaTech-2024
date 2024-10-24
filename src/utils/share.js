import { Share } from 'react-native';

export const handleSharePost = async (postTitle, postBody) => {
    try {
        const message = `Confira este post: ${postTitle}\n${postBody}`;
        await Share.share({
            message,
            title: 'Compartilhar Post',
        });
    } catch (error) {
        console.error('Erro ao compartilhar o post:', error.message);
    }
};

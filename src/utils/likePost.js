import { saveLikes } from './storage';

export const likePost = async (postId, likedPosts, setLikedPosts, likeCounts, setLikeCounts) => {
    const isLiked = likedPosts.includes(postId);
    const updatedLikedPosts = isLiked
        ? likedPosts.filter(id => id !== postId)
        : [...likedPosts, postId];

    setLikedPosts(updatedLikedPosts);
    setLikeCounts(prevLikeCounts => ({
        ...prevLikeCounts,
        [postId]: isLiked ? prevLikeCounts[postId] - 1 : (prevLikeCounts[postId] || 0) + 1,
    }));

    await saveLikes(updatedLikedPosts, {
        ...likeCounts,
        [postId]: isLiked ? likeCounts[postId] - 1 : (likeCounts[postId] || 0) + 1,
    });
};

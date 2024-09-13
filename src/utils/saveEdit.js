import { savePosts } from './postService';

export const saveEdit = async (currentPost, title, body, posts, setPosts, setModalVisible) => {
    const updatedPost = { ...currentPost, title, body };
    const updatedPosts = posts.map(post => (post.id === updatedPost.id ? updatedPost : post));
    setPosts(updatedPosts);
    await savePosts(updatedPosts);
    setModalVisible(false);
};

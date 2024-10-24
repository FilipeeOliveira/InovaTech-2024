import { savePosts } from './postService';

export function addNewPost(newPost, posts, setPosts) {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    savePosts(updatedPosts);
};

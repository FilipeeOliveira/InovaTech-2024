export const editPost = (post, setCurrentPost, setTitle, setBody, setModalVisible) => {
    setCurrentPost(post);
    setTitle(post.title);
    setBody(post.body);
    setModalVisible(true);
};

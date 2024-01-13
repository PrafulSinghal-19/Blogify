import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
    $id: 1,
    title: 'BlogApp',
    content: 'A website to create blogs',
    featuredImage: 1
}]

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        getPost: (state, action) => { },
        addPost: (state, action) => { },
        updatePost: (state, action) => { },
        deletePost: (state, action)=>{}
    }
})

export const { getPost, addPost, updatePost, deletePost } = postSlice.actions;

export default postSlice.reducer;
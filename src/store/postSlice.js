import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postServices from "../appwrite/postServices";
import htmlParser from "html-parser";

const initialState = {
    posts: [],
    promiseStatus: 'idle',
    error: ''
}

export const getPosts = createAsyncThunk('post/getPosts', async () => {
    try {
        const posts = await postServices.getPosts();
        return posts;
    }
    catch (error) {
        console.log(error.message);
        return [];
    }
})

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        addPost: (state, action) => { 
            state.posts = [action.payload, ...state.posts];
        },
        updatePost: (state, action) => { 
            state.posts = state.posts.map(post => ((post.$id === action.payload.$id) ? action.payload : post));
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter(post => (post.$id !== action.payload.$id));
        }
    },
    extraReducers(builder) {
        builder.addCase(getPosts.pending, (state, action) => {
            state.promiseStatus='pending'
        })
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.promiseStatus = 'fulfilled';
            state.posts = action.payload;
        })
        builder.addCase('rejected', (state, action) => {
            state.promiseStatus = 'rejected';
        })
    }
})

export const { addPost, updatePost, deletePost } = postSlice.actions;

export default postSlice.reducer;
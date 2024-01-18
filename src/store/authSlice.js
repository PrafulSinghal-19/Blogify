import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../appwrite/auth"

const initialState = {
    userStatus: false,
    userId: null,
    error: "",
    promiseStatus: 'idle',
}

export const getActiveUser = createAsyncThunk('user/status', async () => {
    try {
        const userAccount = await authService.getActiveUser();
        if (userAccount) {
            return userAccount.$id;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error.message);
        return false;
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userStatus = true;
            state.userId = action.payload;
        },
        logout: (state, action) => {
            state.userStatus = false;
            state.userId = null;
        }
    },
    extraReducers(builder) {
        builder.addCase(getActiveUser.pending, (state, action) => {
            state.promiseStatus = 'pending';
        })
        builder.addCase(getActiveUser.fulfilled, (state, action) => {
            if (action.payload) {
                state.userId = action.payload;
                state.userStatus = true;
            }
            state.promiseStatus = 'fulfilled';
        })
        builder.addCase(getActiveUser.rejected, (state, action) => {
            state.promiseStatus = 'rejected';
        })
    }
})

export const { login, logout} = authSlice.actions;

export default authSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance/AxiosInstance';

const baseUrl = process.env.REACT_APP_BACKEND_URL + "/api"
export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async () => {
        const response = await axiosInstance.get(`/getUserData`);
        return response.data;
    }
);

export const fetchAllUsers = createAsyncThunk(
    'user/fetchAllUsers',
    async () => {
        const response = await axiosInstance.get(baseUrl + '/getAllUsers');
        return response.data.allUsers;
    }
);

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        allUsers: [],
        user: {},
        status: 'idle',
        error: null,
    },
    reducers: {
        resetAllUserData: (state) => {
            state.allUsers = [];
            state.status = 'idle';
            state.error = null;
        },
        resetUserData: (state) => {
            state.user = {};
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetch Single user
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Fetch list of allUsers
            .addCase(fetchAllUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allUsers = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const { resetUserData, resetAllUserData } = UserSlice.actions;
export default UserSlice.reducer;

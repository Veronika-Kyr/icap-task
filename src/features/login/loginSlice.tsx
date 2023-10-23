import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ILoginData } from '../../interfaces/user';
//import { IQuery } from '../interfaces/query';

export const fetchLogin = createAsyncThunk(
    "login/fetch",
    async function (userData: ILoginData) {
        const response = await fetch('http://146.190.118.121/api/login/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }
        );
        return response.json();
    }
);

const loginSlice = createSlice({
    name: 'login',
    initialState: { data: [], fetchStatus: '', isSubscribed: false } /*as { data: string[], fetchStatus: string, isSubscribed: boolean }*/,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.data = action.payload
            state.fetchStatus = 'success'
            state.isSubscribed = !state.isSubscribed
            /* if (!action.payload.error) {
                 state.data = action.payload
                 state.fetchStatus = 'success'
                 state.isSubscribed = !state.isSubscribed
             }
             else {
                 state.data = action.payload
                 state.fetchStatus = ''
                 state.isSubscribed = false
             }*/
        })
            .addCase(fetchLogin.pending, (state) => {
                state.fetchStatus = 'loading'
            })
            .addCase(fetchLogin.rejected, (state) => {
                state.fetchStatus = 'error'
            })
    },
})


export default loginSlice;

//export const { updateUsers } = loginSlice.actions;
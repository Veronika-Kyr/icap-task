import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ILoginData } from '../../interfaces/user';

export const fetchLogin = createAsyncThunk(
    "login/fetch",
    async function (userData: ILoginData) {
        const response = await fetch('https://technical-task-api.icapgroupgmbh.com/api/login/', {
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
    initialState: { data: {}, fetchStatus: '', isSubscribed: false } as { data: { message?: string, error?: string }, fetchStatus: string, isSubscribed: boolean },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchLogin.fulfilled, (state, action) => {

            if (!action.payload.error) {
                state.data = action.payload
                state.fetchStatus = 'success'
                state.isSubscribed = !state.isSubscribed
            }
            else {
                state.data = action.payload
                state.fetchStatus = ''
                state.isSubscribed = false
            }
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


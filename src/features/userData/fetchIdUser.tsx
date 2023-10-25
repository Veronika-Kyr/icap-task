import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/user';


export const fetchIdUser = createAsyncThunk(
    "user/fetch",
    async (id: string) => {
        const response = await fetch(`https://technical-task-api.icapgroupgmbh.com/api/table/${id}`);
        return response.json();
    }
);

const idUserSlice = createSlice({
    name: 'user',
    initialState: { onIDdata: {}, fetchStatus: '' } as { onIDdata: IUser, fetchStatus: string },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchIdUser.fulfilled, (state, action) => {
            state.onIDdata = action.payload
            state.fetchStatus = 'success'
        })
            .addCase(fetchIdUser.pending, (state) => {
                state.fetchStatus = 'loading'
            })
            .addCase(fetchIdUser.rejected, (state) => {
                state.fetchStatus = 'error'
            })
    },
})


export default idUserSlice;

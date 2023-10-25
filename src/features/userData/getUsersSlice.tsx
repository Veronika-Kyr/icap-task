import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/user';

export const fetchUsers = createAsyncThunk(
    "users/fetch",
    async () => {
        const response = await fetch(`https://technical-task-api.icapgroupgmbh.com/api/table/`);
        return response.json();
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState: { data: {}, fetchStatus: '' } as { data: { results: IUser[] }, fetchStatus: string },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.data = action.payload
            state.fetchStatus = 'success'
        })
            .addCase(fetchUsers.pending, (state) => {
                state.fetchStatus = 'loading'
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.fetchStatus = 'error'
            })
    },
})


export default usersSlice;


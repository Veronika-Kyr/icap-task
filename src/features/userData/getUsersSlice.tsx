import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/user';

export const fetchUsers = createAsyncThunk(
    "users/fetch",
    async () => {
        const response = await fetch(`http://146.190.118.121/api/table/`);
        return (await response.json()) as IUser[];
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState: { data: [], fetchStatus: '' } as { data: IUser[], fetchStatus: string },
    reducers: {
        /*  updateUsers(state, action) {
              state.data = action.payload;
          }*/
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

//export const { updateUsers } = usersSlice.actions;
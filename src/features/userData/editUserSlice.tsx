import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/user';

export const fetchEdit = createAsyncThunk(
    "edit/fetch",
    async function (userDataUPD: IUser) {
        const response = await fetch(`https://technical-task-api.icapgroupgmbh.com/api/table/${userDataUPD.id}/`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDataUPD)
        }
        );
        return response.json();
    }
);

const editUserSlice = createSlice({
    name: 'edit',
    initialState: { data: {}, fetchStatus: '' } as { data: { message?: string, error?: string }, fetchStatus: string },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchEdit.fulfilled, (state, action) => {

            if (!action.payload.error) {
                state.data = action.payload
                state.fetchStatus = 'success'

            }
            else {
                state.data = action.payload
                state.fetchStatus = ''

            }
        })
            .addCase(fetchEdit.pending, (state) => {
                state.fetchStatus = 'loading'
            })
            .addCase(fetchEdit.rejected, (state) => {
                state.fetchStatus = 'error'
            })
    },
})


export default editUserSlice;


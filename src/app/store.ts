import { configureStore } from '@reduxjs/toolkit';
import loginSlice from '../features/login/loginSlice';
import usersSlice from '../features/userData/getUsersSlice';
import idUserSlice from '../features/userData/fetchIdUser';
import editUserSlice from '../features/userData/editUserSlice';

const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        users: usersSlice.reducer,
        user: idUserSlice.reducer,
        edit: editUserSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;

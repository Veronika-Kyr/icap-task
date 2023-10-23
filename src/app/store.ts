import { configureStore } from '@reduxjs/toolkit';
import loginSlice from '../features/login/loginSlice';
import usersSlice from '../features/userData/getUsersSlice';


const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        users: usersSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;

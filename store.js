/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit';
import preloginReducer from './slices/preloginSlice';
import dashReducer from './slices/dashSlice';

export const store = configureStore({
    reducer: {
        preLogin: preloginReducer,
        dash: dashReducer,
    },
});
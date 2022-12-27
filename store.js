/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit';
import preloginReducer from './slices/preloginSlice';

export const store = configureStore({
    reducer: {
        preLogin: preloginReducer,
    },
});
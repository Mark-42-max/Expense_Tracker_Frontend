/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: '',
};

export const preloginSlice = createSlice({
    name: 'preLogin',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
});

export const { setToken } = preloginSlice.actions;

export const selectToken = (state) => state.preLogin.token;

export default preloginSlice.reducer;
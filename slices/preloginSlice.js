/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loginStatus: 'no',
    token: '',
};

export const preloginSlice = createSlice({
    name: 'preLogin',
    initialState,
    reducers: {

        setLoginStatus: (state, action) => {
            state.loginStatus = action.payload;
        },

        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
});

export const { setLoginStatus, setToken } = preloginSlice.actions;

export const selectLoginStatus = (state) => state.preLogin.loginStatus;
export const selectToken = (state) => state.preLogin.token;

export default preloginSlice.reducer;
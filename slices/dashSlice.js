/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    expenses: [],
};

export const dashSlice = createSlice({
    name: 'dash',
    initialState,
    reducers: {

        setExpenses: (state, action) => {
            state.expenses = action.payload;
        },
    },
});

export const { setExpenses } = dashSlice.actions;

export const selectExpenses = (state) => state.dash.expenses;

export default dashSlice.reducer;
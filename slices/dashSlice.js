/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    expenses: [],
    total: 0,
    totalExpenses: 0,
};

export const dashSlice = createSlice({
    name: 'dash',
    initialState,
    reducers: {

        setExpenses: (state, action) => {
            state.expenses = action.payload;
        },

        setTotal: (state, action) => {
            state.total = action.payload;
        },

        setTotalExpenses: (state, action) => {
            state.totalExpenses = action.payload;
        },
    },
});

export const { setExpenses, setTotal, setTotalExpenses } = dashSlice.actions;

export const selectExpenses = (state) => state.dash.expenses;
export const selectTotal = (state) => state.dash.total;
export const selectTotalExpenses = (state) => state.dash.totalExpenses;

export default dashSlice.reducer;
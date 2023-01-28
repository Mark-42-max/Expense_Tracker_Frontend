/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    expenses: [],
    total: 0,
    totalExpenses: 0,
    name: '',
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

        setName: (state, action) => {
            state.name = action.payload;
        },
    },
});

export const { setExpenses, setTotal, setTotalExpenses, setName } = dashSlice.actions;

export const selectExpenses = (state) => state.dash.expenses;
export const selectTotal = (state) => state.dash.total;
export const selectTotalExpenses = (state) => state.dash.totalExpenses;
export const selectName = (state) => state.dash.name;

export default dashSlice.reducer;
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    currentPage: 1,
    sortType: "rating (ASC)"
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSortType(state, action) {
            state.sortType = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.sortType = `${action.payload.sortBy} (${action.payload.order.toLocaleUpperCase()})`;
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
        }
    }
});

export const {setCategoryId, setSortType, setCurrentPage, setFilters} = filterSlice.actions;

export default filterSlice.reducer;
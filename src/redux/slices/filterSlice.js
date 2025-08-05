import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    searchValue: '',
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
        setSearchValue(state, action) {
            state.searchValue = action.payload;
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

export const selectFilter = (state) => state.filter;
export const selectSortType = (state) => state.filter.sortType;

export const {
    setCategoryId,
    setSortType,
    setCurrentPage,
    setFilters,
    setSearchValue
} = filterSlice.actions;

export default filterSlice.reducer;
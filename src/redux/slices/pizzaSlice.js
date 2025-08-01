import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

//reusable asynchronous action
export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus',
    async ({url}) => {
        const {data} = await axios.get(url);
        return data;
    }
)

const initialState = {
    items: [],
    status: 'loading',//loading, success, or error.
};


const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading';
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'success';
            })
            .addCase(fetchPizzas.rejected, (state)=>{
                state.status = 'error';
                state.items = [];
            })
    }
});

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;
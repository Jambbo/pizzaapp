import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    totalCount: 0,
    items: []
};

const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
    return Math.round((total + Number.EPSILON) * 100) / 100;
};

const calculateTotalCount = (items) => {
    return items.reduce((sum, item) => sum + item.count, 0);
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({...action.payload, count: 1,});
            }
            state.totalPrice = calculateTotalPrice(state.items);
            state.totalCount = calculateTotalCount(state.items);

        },
        minusItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id);

            if (findItem && findItem.count > 0) {
                if (findItem.count === 1) {
                    if (window.confirm('Are you sure you want to remove this item?')) {
                        findItem.count--;
                        return;
                    }
                }
                findItem.count--;
            }
            state.items = state.items.filter(obj => obj.count > 0);
            state.totalPrice = calculateTotalPrice(state.items);
            state.totalCount = calculateTotalCount(state.items);

        },

        removeItem(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload);
            state.totalPrice = calculateTotalPrice(state.items);
            state.totalCount = calculateTotalCount(state.items);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
            state.totalCount = 0;
        },
    }
});

export const selectCart = (state) => state.cart;
export const selectCartItemByObjId = (id) => (state) => state.cart.items.find(obj=>obj.id===id)

export const {addItem, minusItem, removeItem, clearItems} = cartSlice.actions;

export default cartSlice.reducer;
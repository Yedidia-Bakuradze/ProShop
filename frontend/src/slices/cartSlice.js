//Not api sicne with dont use async
import { createSlice } from '@reduxjs/toolkit';

//Load existing data of cart, if not exsiting - initiate an empty array in cartItems
const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : { cartItems: [] };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {} //The action that would be made and effect the state
});

export default cartSlice.reducer;

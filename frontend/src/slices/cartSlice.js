//Not api sicne with dont use async
import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../untils/cartUtils';
//Load existing data of cart, if not exsiting - initiate an empty array in cartItems
const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((i) => i._id === item._id);
            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existItem._id ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (item) => item._id !== action.payload
            );
            return updateCart(state);
        },
        //Reducer for modifing the shipping address
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        },
        //Reducer for modifing the payment method
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state);
        },
        //Clears the items in cart
        clearCartItems: (state, action) => {
            state.cartItems = [];
            return updateCart(state);
        },
        resetCart: (state) => (state = initialState)
    } //The action that would be made and effect the state
});

export const {
    addToCart,
    removeFromCart,
    saveShippingAddress,
    savePaymentMethod,
    clearCartItems,
    resetCart
} = cartSlice.actions;
export default cartSlice.reducer;

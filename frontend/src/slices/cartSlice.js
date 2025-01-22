//Not api sicne with dont use async
import { createSlice } from '@reduxjs/toolkit';

//Load existing data of cart, if not exsiting - initiate an empty array in cartItems
const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : { cartItems: [] };

// Two decimal plcaes
const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

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

            //Calculate the cart price
            state.itemsPrice = addDecimals(
                state.cartItems.reducer(
                    (acc, item) => acc + item.price * item.qty,
                    0
                )
            );
            //Calculate the shipping price
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
            //Calculate the tax price
            state.taxPrice = addDecimals(
                Number((0.15 * state.itemsPrice).toFixed(2))
            );
            //Calculate the total price
            state.totalPrice = (
                Number(state.itemsPrice) +
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            ).toFixed(2);

            //Save in local storge
            localStorage.setItem('cart', JSON.stringify(state));
        }
    } //The action that would be made and effect the state
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;

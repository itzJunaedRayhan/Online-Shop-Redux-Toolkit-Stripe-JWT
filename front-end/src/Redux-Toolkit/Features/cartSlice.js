import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info(`increase ${state.cartItems[itemIndex].name} cart quantity`, {
                    position: "bottom-left",
                });
            }else{
                const tempProduct = {...action.payload, cartQuantity: 1}
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} added to cart`, {
                    position: "bottom-left",
                });
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        //  Remove From Cart
        removeFromCart(state, action) {
            const nextCartItems = state.cartItems.filter((cartItem) => cartItem.id !== action.payload.id)
            state.cartItems = nextCartItems;

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            toast.error(`${action.payload.name} removed from cart`, {
                position: "bottom-left",
            });
        },

        //  Decrease Cart:
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(cartItem => cartItem.id === action.payload.id);
            
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;

                toast.info(`Decreased ${action.payload.name} cart Quantity`, {
                    position: "bottom-left",
                });
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter((cartItem) => cartItem.id !== action.payload.id)
                state.cartItems = nextCartItems;
                toast.error(`${action.payload.name} removed from cart`, {
                    position: "bottom-left",
                });
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            }
        },

        getTotals (state) {
            let {total, quantity} = state.cartItems.reduce((cartTotal, cartItem) => {
                    const {price, cartQuantity} = cartItem;
                    const itemTotal = price * cartQuantity;

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;

                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0,
                }
            );

            total = parseFloat(total.toFixed(2));
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },

        clearCart(state){
            state.cartItems = [];
            toast.error(`Cart Cleared`, {
                position: "bottom-left",
            });
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
    }
});

export const {addToCart, removeFromCart, decreaseCart, getTotals, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
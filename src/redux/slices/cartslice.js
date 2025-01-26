import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cart : [],
    loading: false
};

export const cartslice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        fetchsCartstart(state){
            state.loading = true;
        },
        setCartItems(state,action){
            state.cart = action.payload;
            state.loading = false;
        },
        incrementQuantity(state, action) {
            const item = state.cart.find((cartItem) => cartItem.uid === action.payload);
            if (item && item.quantity < 10) {
              item.quantity += 1;
            }
            else{
              toast.error("We're sorry! Only 10 unit(s) allowed in each order");
            }
          },
        decrementQuantity(state, action) {
          const item = state.cart.find((cartItem) => cartItem.uid === action.payload);
          if (item && item.quantity > 1) item.quantity -= 1; 
        },
    }
});

export const {fetchsCartstart,setCartItems, incrementQuantity, decrementQuantity} = cartslice.actions;
export default cartslice.reducer;
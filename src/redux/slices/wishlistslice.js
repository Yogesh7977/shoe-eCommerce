import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    wishlist : [],
    loading : false
}

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        fetchWishlistStart(state){
            state.loading = true;
        },
        fetchWishlistSuccess(state, action){
            state.wishlist = action.payload;
            state.loading = false;
        },
    }
});

export const {fetchWishlistStart, fetchWishlistSuccess} = wishlistSlice.actions;
export default wishlistSlice.reducer;
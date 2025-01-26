import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shoes : [],
    loading: false
};

export const shoesslice = createSlice({
    name: 'shoes',
    initialState,
    reducers: {
        fetchshoesstart(state){
            state.loading = true;
        }
        ,
        fetchShoesSuccess(state, action) {
            state.shoes = action.payload;
            state.loading = false;
        },
    }
});

export const {fetchshoesstart, fetchShoesSuccess} = shoesslice.actions;
export default shoesslice.reducer;
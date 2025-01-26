import { configureStore } from '@reduxjs/toolkit';
import authslice from "./slices/authslice";
import shoesslice from "./slices/shoesslice";
import cartslice from "./slices/cartslice";
import wishlistSlice  from './slices/wishlistslice';

export default configureStore({
  reducer: {
    auth: authslice,
    shoes: shoesslice,
    cart: cartslice,
    wishlist: wishlistSlice,
  }
})
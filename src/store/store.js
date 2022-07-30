import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./auth-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    auth: AuthSlice.reducer,
  },
});
export default store;

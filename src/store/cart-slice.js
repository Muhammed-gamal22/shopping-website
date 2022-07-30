import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    AllPrice: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.AllPrice = action.payload.AllPrice;
    },
    resetCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.AllPrice = 0;
    },
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.AllPrice = state.AllPrice + newItem.price * newItem.quantity;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          quantity: newItem.quantity,
          price: newItem.price,
          totalPrice: newItem.price,
          img: newItem.img,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItem(state, action) {
      state.totalQuantity--;
      const id = action.payload;
      state.changed = true;
      const existingCartItem = state.items.find((item) => item.id === id);
      state.AllPrice = state.AllPrice - existingCartItem.price;
      if (existingCartItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingCartItem.quantity--;
        existingCartItem.totalPrice =
          existingCartItem.totalPrice - existingCartItem.price;
      }
    },
  },
});
export const cartActions = cartSlice.actions;
export default cartSlice;
export const sendCartData = (cartData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://products-app-64dbc-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cartData.items,
            totalQuantity: cartData.totalQuantity,
            AllPrice: cartData.AllPrice,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Send Cart Data Failed !");
      }
    } catch (e) {
      console.log(e);
    }
    dispatch(
      cartActions.replaceCart({
        items: cartData.items,
        totalQuantity: cartData.totalQuantity,
        AllPrice: cartData.AllPrice,
      })
    );
  };
};

export const fetchCartData = (reset = false) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://products-app-64dbc-default-rtdb.firebaseio.com/cart.json"
    );
    if (!response.ok) {
      throw new Error("Fetch Cart Data From Server Failed");
    }
    const data = await response.json();
    reset
      ? dispatch(cartActions.resetCart())
      : dispatch(
          cartActions.replaceCart({
            items: data.items || [],
            AllPrice: data.AllPrice,
            totalQuantity: data.totalQuantity,
          })
        );
  };
};

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import cartItems from "../../cartItem";
import { open } from "../modal/modalSlice";
const url = "https://course-api.com/react-useReducer-cart-project";
const initialTotal = () => {
  let total = 0;
  cartItems.map((e) => {
    total += e.amount * e.price;
  });
  return `$ ${total.toLocaleString()}`;
};
export const getCartItems = createAsyncThunk("cart", async (name, thunkApi) => {
  // console.log(name);
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(thunkApi.rejectWithValue("SOMETHING WENT WRONG"));
  }
});
const initialState = {
  cartItem: [],
  amount: cartItems.length,
  total: initialTotal(),
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clear: (state) => {
      state.cartItem = [];
    },
    remove: (state, action) => {
      const adi = state.cartItem.filter((e) => e.id !== action.payload.id);
      state.cartItem = adi;
    },
    increase: (state, action) => {
      const adi = state.cartItem.find((e) => e.id === action.payload);
      adi.amount += 1;
    },
    decrease: (state, action) => {
      const adi = state.cartItem.find((e) => e.id === action.payload);
      adi.amount -= 1;
    },
    calculate: (state) => {
      let total = 0;
      let amount = 0;
      state.cartItem.map((e) => {
        amount += e.amount;
        total += e.amount * e.price;
      });
      state.amount = amount;
      state.total = `$ ${total.toLocaleString()}`;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItem = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { clear, remove, increase, decrease, calculate } =
  cartSlice.actions;

export default cartSlice.reducer;

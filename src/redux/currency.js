import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  currency_prefrence: "usd",
};

export const currencySlice = createSlice({
  name: "currency",
  initialState: {
    value: initialValue,
  },
  reducers: {
    setCurrencyPrefrence: (state, action) => {
      state.value.currency_prefrence = action.payload.currency_prefrence;
    },
  },
});

export const { setCurrencyPrefrence} = currencySlice.actions;
export default currencySlice.reducer;

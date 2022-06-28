import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
    currency_type: "BTC",
    price:"",
    
};

export const buySellSlice = createSlice({
  name: "buySell",
  initialState: {
    value: initialValue,
  },
  reducers: {
    setCurrency_type: (state, action) => {
      state.value.currency_type = action.payload.currency_type;
    },
    setPrice: (state, action) => {
      state.value.price = action.payload;
    },
   
    
  },
});

export const { setCurrency_type ,setPrice} = buySellSlice.actions;
export default buySellSlice.reducer;

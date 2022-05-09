import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
    currency_type: "btc",
    
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
   
    
  },
});

export const { setCurrency_type } = buySellSlice.actions;
export default buySellSlice.reducer;

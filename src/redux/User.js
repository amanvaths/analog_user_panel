import { createSlice } from "@reduxjs/toolkit";
import { act } from "@testing-library/react";
const initialValue = {
  isLoggedIn: false,
  userInfo: {},
  totalBalance: ''
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialValue,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state, action) => {
      state.value = initialValue;
    },
    setTotalBalance: (state, action)=>{
      state.value.totalBalance = action.payload.totalBalance
    }
  },
});

export const { logout, login, setTotalBalance} = userSlice.actions;
export default userSlice.reducer;

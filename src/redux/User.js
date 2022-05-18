import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  isLoggedIn: false,
  userInfo: {},
  referralCode: ''
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
    setReferralCode: (state, action)=>{
      state.value.referralCode = action.payload.referralCode
    }

  },
});

export const { logout, login, setReferralCode} = userSlice.actions;
export default userSlice.reducer;

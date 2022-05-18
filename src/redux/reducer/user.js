import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  isLoggedIn: false,
  userInfo: {},
  settingPages: {
    activity: false,
    personalInfo: true,
    securitySettings: false,
    notification: false,
    changePassword: false,
    ipWhiteListing: false,
  } ,
  oneUsdPrice: '',
  totalAna: ''
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialValue,
  },
  reducers: {
    setIsLoggedIn: (state, action)=>{
      state.value.isLoggedIn = action.payload.isLoggedIn
    },
    setUserInfo: (state, action) => {
     
      state.value.userInfo = action.payload.userInfo;
    },
    setSettingPage: (state, action)=> {
      state.value.settingPages = action.payload.settingPages
    },
    setOneUsdPrice: (state, action) => {
      state.value.oneUsdPrice = action.payload.oneUsdPrice
    },
    setTotalAna: (state, action) => {
      state.value.totalAna = action.payload.totalAna
    },

  },
});

export const {setIsLoggedIn, setUserInfo, setSettingPage, setOneUsdPrice, setTotalAna} = userSlice.actions;
export default userSlice.reducer;
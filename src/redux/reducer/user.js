import { createSlice } from "@reduxjs/toolkit";

let email = localStorage.getItem("exchange-inrx-email");
let token = localStorage.getItem("exchange-inrx-token");

const initialValue = {
  user : {
    email:email?email:'',
    token:token?token:'',
  },
  otpSend: false,
  isLoggedIn:(email && token)?true:false, 
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
      localStorage.setItem("exchange-inrx-email", action.payload.LoginDetails.email);
      localStorage.setItem("exchange-inrx-token", action.payload.LoginDetails.token);
      state.value.user = action.payload.LoginDetails;
      state.value.isLoggedIn = true
    },
    sendOtp: (state, action)=>{
      state.value.user = action.payload.LoginDetails;
      state.value.otpSend = true
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
    logout: (state, action) => {
      localStorage.removeItem("exchange-inrx-email");
      localStorage.removeItem("exchange-inrx-token");
      state.value.user={};
      state.value.isLoggedIn = false;
    },
    setOneCoinPrice: (state, action) => {
      state.value.coinPrice = action.payload.coinPrice
    },

  },
});

export const {setIsLoggedIn, setUserInfo, setSettingPage, setOneUsdPrice, setTotalAna, logout, sendOtp, setOneCoinPrice} = userSlice.actions;
export default userSlice.reducer;

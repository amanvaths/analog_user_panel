import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
    activity: false,
    personalInfo: true,
    securitySettings: false,
    notification: false,
    changePassword: false,
    ipWhiteListing: false,
    isLoginActivityOn: true,
    isTwoFactOn: false,


};

export const settingSlice = createSlice({
    name: "setting",
    initialState: {
        value: initialValue,
    },
    reducers: {
        setActivity: (state, action) => {
            state.value.activity = action.payload.activity;
        },
        setPersonalInfo: (state, action) => {
            state.value.personalInfo = action.payload.personalInfo;
        },
        setSecuritySettings: (state, action) => {
            state.value.securitySettings = action.payload.securitySettings
        },
        setNotification: (state, action) => {
            state.value.notification = action.payload.notification
        },
        setChangePassword: (state, action) => {
            state.value.changePassword = action.payload.changePassword
        },
         setIpWhiteListing: (state, action) => {
            state.value.ipWhiteListing = action.payload.ipWhiteListing
        },
        setIsLoginActivityOn:(state, action)=>{
            state.value.isLoginActivityOn = action.payload.isLoginActivityOn
        },
        setIpWhiteListing: (state, action) => {
            state.value.ipWhiteListing = action.payload.ipWhiteListing
        },
    },
});

export const { setActivity, setPersonalInfo, setSecuritySettings, setNotification, setChangePassword, setIpWhiteListing } = settingSlice.actions;
export default settingSlice.reducer;
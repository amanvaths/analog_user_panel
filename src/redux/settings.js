import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
    activity: false,
    personalInfo: true,
    securitySettings: false,
    notification: false,
    changePassword: false,
};

export const settingSlice = createSlice({
    name: "setting",
    initialState: {
        value: initialValue,
    },
    reducers: {
        setActivity: (state, action) => {
            state.value.activity = action.payload;
        },
        setPersonalInfo: (state, action) => {
            state.value.personalInfo = action.payload;
        },
        setSecuritySettings: (state, action) => {
            state.value.securitySettings = action.payload
        },
        setNotification: (state, action) => {
            state.value.notification = action.payload
        },
        setChangePassword: (state, action) => {
            state.value.changePassword = action.payload
        }
    },
});

export const { setActivity, setPersonalInfo, setSecuritySettings, setNotification, setChangePassword } = settingSlice.actions;
export default settingSlice.reducer;
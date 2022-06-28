import { configureStore } from "@reduxjs/toolkit";

import userReducer from '../reducer/user';
import currencyReducer from '../reducer/currency'
import settingReducer from '../reducer/settings'
import buySellReducer from "../buySell";

export const store = configureStore({
    reducer: {
        user: userReducer,
        currency: currencyReducer,
        setting: settingReducer,
        buySell: buySellReducer
    }
})
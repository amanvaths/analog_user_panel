import { configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux";

import userReducer from '../reducer/user';
import currencyReducer from '../reducer/currency'
import settingReducer from '../reducer/settings'
import buySellReducer from "../buySell";

const reducers = combineReducers({
    user: userReducer,
    currency: currencyReducer,
    setting: settingReducer,
    buySell: buySellReducer,
    
   });
   

const persistConfig = {
    key: 'root',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer
    // reducer: {
    //     user: userReducer,
    //     currency: currencyReducer,
    //     setting: settingReducer,
    //     buySell: buySellReducer,
    //     persistedReducer
    // }

})


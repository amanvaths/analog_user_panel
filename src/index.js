import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/User";
import currencyReducer from './redux/currency'
import settingReducer from './redux/settings'
import  buySellReducer  from "./redux/buySell";
import { navsetterreducer } from "./redux/reducers/websiteDBReducer";
import { navsettersreducer } from "./redux/reducers/websiteDBReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    currency: currencyReducer,
    setting: settingReducer,
    buySell: buySellReducer,
    navsetter: navsetterreducer,
    navsetters: navsettersreducer
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

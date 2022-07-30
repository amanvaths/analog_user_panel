import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker.js";
import { Provider } from "react-redux";
import {store} from './redux/store/user';
import {subscribeUser} from './web-push.config';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
serviceWorker.register();
let persistor = persistStore(store);
// console.log(persistor, "persistor");
const loadingMarkup = (
  <div></div>
)
ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
 </React.StrictMode>
 </Suspense>
  ,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from "./Api_connection/config";
import "./App.css";
import Home from "./pages/Home";
import Psecurity from "./pages/Psecurity";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Terms from "./pages/Terms";
import Faq from "./pages/Faq";
import Affiliate from "./pages/Affiliate";
import Transactions from "./pages/Transactions";
import Projects from "./pages/Projects";
import EmailOtp from "./pages/EmailOtp";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import ResendOtp from "./pages/ResendOtp";
import Wallet from "./pages/Wallet";
import AccountSettings from "./pages/AccountSettings";
import CryptoTransaction from "./pages/CryptoTransaction";
import UserList from "./pages/UserList";
import BuySell from "./pages/BuySell";
import CandleGraph from "./components/CandleGraph";
import ChangePassword from "./components/ChangePassword";
import OtpTFA from "./pages/OtpTFA";
import { useDispatch, useSelector } from 'react-redux'
import Orders from "./components/Orders";

import {
  setIsTwoFactOn,
  setIsNewBrowserOn,
  setIsLoginActivityOn,
  setIsUnusualActivityOn,
  setIsSalesOn,
  setIsFeaturesOn,
  setIsTipsOn,
  setSettings
} from './redux/settings'

import { setCurrencyPrefrence } from './redux/currency'
import { setReferralCode } from './redux/User'

import GoogleOtp from "./components/GoogleOtp";
import { getSettings } from "./Api_connection/ApiFunction";

function App() {
  const dispatch = useDispatch();
  // const [data, setData] = useState({});
  const { referralCode } = useSelector((state) => state.user.value)
  const {
    activity,
    personalInfo,
    securitySettings,
    notification,
    changePassword,
    ipWhiteListing,
    isLoginActivityOn,
    isTwoFactOn,
    isNewBrowserOn,
    isUnusualActivityOn,
    isSalesOn,
    isNewFeaturesOn,
    isTipsOn } = useSelector((state) => state.setting.value)
  console.table(referralCode, "referal code in app.js file");
  console.table(activity,
    personalInfo,
    securitySettings,
    notification,
    changePassword,
    ipWhiteListing,
    isLoginActivityOn,
    isTwoFactOn,
    isNewBrowserOn,
    isUnusualActivityOn,
    isSalesOn,
    isNewFeaturesOn,
    isTipsOn,
    "settings Data in app.js file"
  );

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");


  const getAllSettings = async () => {
    getSettings(email).then((res) => {
      // console.log("thunkcheck::", res.data)
      dispatch(setSettings({ settings: res.data }));
      dispatch(setIsLoginActivityOn({ isLoginActivityOn: res.data.login_activity }));
      dispatch(setIsNewBrowserOn({ isNewBrowserOn: res.data.new_browser }));
      dispatch(setIsTwoFactOn({ isTwoFactOn: res.data.google_authenticator }));
      dispatch(setCurrencyPrefrence({ currency_prefrence: res.data.currency_preference }));
      dispatch(setIsUnusualActivityOn({ isUnusualActivityOn: res.data.unusual_activity }));
      dispatch(setIsSalesOn({ isSalesOn: res.data.sales_latest_news }));
      dispatch(setIsFeaturesOn({ isNewFeaturesOn: res.data.new_features_updates }));
      dispatch(setIsTipsOn({ isTipsOn: res.data.tips }));
      dispatch(setReferralCode({ referralCode: res.data.refferal }));
    }).catch((er) => {
      console.log("app getsettingserror::", er);
    })
    // try {
    //   const data = await axios.post(`${BASE_URL}/configSettings`, { email: email });

    // } catch (error) {
    //   console.log(error);
    // }

  }

  // getAllSettings()

  // useEffect(async () => {
  //   const data = await axios.post(`${BASE_URL}/configSettings`, { email: email });
  //   setData(data);
  //   console.log(data.data, "response from api seetings data");
  // }, []);

  useEffect(() => {
    getAllSettings();
  }, []);


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={email && token ? <Home /> : <Navigate to='/Login' />} />
          <Route path="/Psecurity" element={<Psecurity />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Terms" element={<Terms />} />
          <Route path="/Faq" element={<Faq />} />
          <Route path="/Affiliate" element={<Affiliate />} />
          <Route path="/Transactions" element={<Transactions />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/EmailOtp" element={<EmailOtp />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/ResendOtp" element={<ResendOtp />} />
          <Route path="/wallet" element={email && token ? <Wallet /> : <Navigate to="/login" />} />
          <Route path="/accountSettings" element={<AccountSettings />} />
          <Route path="/cryptoTransaction/:title" element={<CryptoTransaction />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/buysell" element={< BuySell />} />
          <Route path="/candlegraph" element={<CandleGraph />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/googleotp" element={<GoogleOtp />} />
          <Route path="/2faAuthentication" element={<OtpTFA />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

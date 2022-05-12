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
import { useDispatch, useSelector} from 'react-redux'

import {
  setIsTwoFactOn,
  setIsNewBrowserOn,
  setIsLoginActivityOn,
  setIsUnusualActivityOn,
  setIsSalesOn,
  setIsFeaturesOn,
  setIsTipsOn
} from './redux/settings'

import { setCurrencyPrefrence } from './redux/currency'
import { setReferralCode } from './redux/User'

import GoogleOtp from "./components/GoogleOtp";

function App() {
  const dispatch = useDispatch();
  // const [data, setData] = useState({});
  const {referralCode} = useSelector((stae)=> stae.user.value)
  console.log(referralCode, "referal code in app.js file");

  const getAllSettings = async() => {
    try {
      const data = await axios.post(`${BASE_URL}/configSettings`, { email: email });
      dispatch(setIsLoginActivityOn({ isLoginActivityOn: data.data.login_activity }));
      dispatch(setIsNewBrowserOn({ isNewBrowserOn: data.data.new_browser }));
      dispatch(setIsTwoFactOn({ isTwoFactOn: data.data.google_authenticator }));
      dispatch(setCurrencyPrefrence({ currency_prefrence: data.data.currency_preference }));
      dispatch(setIsUnusualActivityOn({ isUnusualActivityOn: data.data.unusual_activity }));
      dispatch(setIsSalesOn({ isSalesOn: data.data.sales_latest_news }));
      dispatch(setIsFeaturesOn({ isNewFeaturesOn: data.data.new_features_updates }));
      dispatch(setIsTipsOn({ isTipsOn: data.data.tips }));
      dispatch(setReferralCode({ referralCode: data.data.refferal }));
    } catch (error) {
        console.log(error);
    }
   
  }

  // useEffect(async () => {
  //   const data = await axios.post(`${BASE_URL}/configSettings`, { email: email });
  //   setData(data);
  //   console.log(data.data, "response from api seetings data");
  // }, []);

  useEffect(() => {
    getAllSettings();
  },[]);
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

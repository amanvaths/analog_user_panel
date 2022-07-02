import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
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
import BuySell from "./pages/BuySell";
import ChangePassword from "./components/ChangePassword";
import OtpTFA from "./pages/OtpTFA";
import Bounty from "./pages/Bounty";
import AirDrop from "./pages/AirDrop";
import Withdrawal from './pages/Withdrawal'
import { useSelector } from "react-redux";
import { subscribeUser } from "./web-push.config";
import AllNotifications from './pages/AllNotifications'


function App(props) {
  const {user, } = useSelector((state)=> state.user.value)
  console.log("user", user);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={(user.email && user.token)?<Home />:<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/EmailOtp" element={<EmailOtp />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/ResendOtp" element={<ResendOtp />} />
          <Route path="/2faAuthentication" element={<OtpTFA />} />


          <Route path="/Profile" element={<Profile />} />
          <Route path="/Terms" element={<Terms />} />
          <Route path="/Faq" element={<Faq />} />
          <Route path="/Projects" element={<Projects />} />

          
         
          <Route path="/home" element={(user.email && user.token)?<Home />:<Login /> } />
          <Route path="/Affiliate" element={<Affiliate />} />
          {/* <Route path="/Transactions" element={<Transactions />} /> */}
          <Route path="/wallet" element={(user.email && user.token)? <Wallet /> : <Login />} />
          <Route path="/accountSettings" element={<AccountSettings />} />
          <Route path="/cryptoTransaction" element={<CryptoTransaction />} />
          <Route path="/buysell" element={(user.email && user.token)? < BuySell /> : <Login />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/*" element={(user.email && user.token)?<Home />:<Login />} />
          <Route path="/Bounty" element={(user.email && user.token)?<Bounty />:<Login />} />
          <Route path="/Airdrop" element={(user.email && user.token)?<AirDrop />:<Login />} />
          <Route path="/Withdrawal" element={(user.email && user.token)?<Withdrawal />:<Login />} />
          <Route path="/Handout" element={(user.email && user.token)?<Handout />:<Login />} />
          <Route path="/Notification" element={(user.email && user.token)?<AllNotifications />:<Login />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
 
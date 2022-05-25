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
// import UserList from "./pages/Affiliate";
import BuySell from "./pages/BuySell";
import ChangePassword from "./components/ChangePassword";
import OtpTFA from "./pages/OtpTFA";
import MyAccount from "./pages/MyAccount";
import AffiliateTable from "./pages/AffiliateTable";
import { useSelector } from "react-redux";

function App(props) {
  const {user, } = useSelector((state)=> state.user.value)
  console.log("user", user);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path="/home" element={(user.email && user.token)?<Home />:<Login /> } />
          <Route path="/Psecurity" element={<Psecurity />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/login" element={(user.email && user.token)?<Home />:<Login />} />
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
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/accountSettings" element={<AccountSettings />} />
          <Route path="/cryptoTransaction" element={<CryptoTransaction />} />
          {/* <Route path="/userlist" element={<UserList />} /> */}
          <Route path="/buysell" element={< BuySell />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/2faAuthentication" element={<OtpTFA />} />
          <Route path="/myAccount" element={<MyAccount />} />
          <Route path="/*" element={(user.email && user.token)?<Home />:<Login />} />
          <Route path="/AffiliateList" element={(user.email && user.token)?<AffiliateTable />:<Login />} />
          {/* <Route path="/orders" element={<Orders />} /> */}
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;

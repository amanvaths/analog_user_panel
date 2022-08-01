import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import { useSelec/tor} from "react-redux";
import { Toaster } from 'react-hot-toast';
import axios from "axios";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Affiliate from "./pages/Affiliate";
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
import Handout from "./pages/Handout";
import { useSelector } from "react-redux";
import { subscribeUser } from "./web-push.config";
import AllNotifications from './pages/AllNotifications';
import NewsPR from './pages/NewsPR';
import Offer from './pages/Offer';
import TeamMember from './pages/TeamMember';
import BlockChain from './pages/BlockChain';
import RoadMap from './pages/RoadMap';
import NewsArticle from './pages/NewsArticle';
import NotificationAlert from './pages/NotificationAlert';

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from 'i18next-http-backend';
import tEn from '../src/locales/en/translation.json';
import tEs from '../src/locales/es/translation.json';
import tAr from '../src/locales/ar/translation.json';
import tCh from '../src/locales/ch/translation.json';
import tFr from '../src/locales/fr/translation.json';
// import { BASE_URL } from "./Api_connection/config";



function App(props) {

  const { userInfo, user, selectedLanguage } = useSelector((state) => state.user.value)
  i18n
    .use(initReactI18next)
    .use(HttpApi) // passes i18n down to react-i18next
    .init({

      lng: selectedLanguage?.code,
      fallbackLng: "en",
       resources: {
         en: {
          translation: tEn
         },
         es: {
          translation: tEs
         },
         fr: {
          translation: tFr
         },
         ar: {
          translation: tAr
         },
         ch: {
          translation: tCh
         },
       }
    })
  console.log(userInfo?.webPush_Public_Key, "KEY");
  console.log(user?.email, "email");
  if (userInfo?.webPush_Public_Key && user?.email) {
    console.log('Called');
    subscribeUser(userInfo?.webPush_Public_Key, user?.email);
  } else {
    console.log("User public key not found!");
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={(user.email && user.token) ? <Home /> : <Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/EmailOtp" element={<EmailOtp />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/ResendOtp" element={<ResendOtp />} />
          <Route path="/2faAuthentication" element={<OtpTFA />} />
          <Route path="/home" element={(user.email && user.token) ? <Home /> : <Login />} />
          <Route path="/Affiliate" element={(user.email && user.token) ? <Affiliate /> : <Login />} />
          <Route path="/wallet" element={(user.email && user.token) ? <Wallet /> : <Login />} />
          <Route path="/accountSettings" element={(user.email && user.token) ? <AccountSettings /> : <Login />} />
          <Route path="/cryptoTransaction" element={(user.email && user.token) ? <CryptoTransaction /> : <Login />} />
          <Route path="/buysell" element={(user.email && user.token) ? < BuySell /> : <Login />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/*" element={(user.email && user.token) ? <Home /> : <Login />} />
          <Route path="/Bounty" element={(user.email && user.token) ? <Bounty /> : <Login />} />
          <Route path="/Airdrop" element={(user.email && user.token) ? <AirDrop /> : <Login />} />
          <Route path="/Withdrawal" element={(user.email && user.token) ? <Withdrawal /> : <Login />} />
          <Route path="/Handout" element={(user.email && user.token) ? <Handout /> : <Login />} />
          <Route path="/Notification" element={(user.email && user.token) ? <AllNotifications /> : <Login />} />
          <Route path="/NewsPR" element={(user.email && user.token) ? <NewsPR /> : <Login />} />
          <Route path="/Offer" element={(user.email && user.token) ? <Offer /> : <Login />} />
          <Route path="/TeamMember" element={(user.email && user.token) ? <TeamMember /> : <Login />} />
          <Route path="/BlockChain" element={(user.email && user.token) ? <BlockChain /> : <Login />} />
          <Route path="/RoadMap" element={(user.email && user.token) ? <RoadMap /> : <Login />} />
          <Route path="/NewsArticle" element={(user.email && user.token) ? <NewsArticle /> : <Login />} />
          <Route path="/NotificationAlert" element={(user.email && user.token) ? <NotificationAlert /> : <Login />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="right-bottom"
        toastOptions={{
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div >
  );
}

export default App;

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import { useSelec/tor} from "react-redux";
import { Toaster } from 'react-hot-toast';

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

// const setLang = ()=>{
//   const newLang = localStorage.getItem("lang")
//   console.log(newLang, 'NEW LANG');
//   return newLang
// }



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
      //  {
      //    en: {translation: tEn}
      //   },
      //    es: {
      //    translation: tEs
      //  {
      //       "available_balance": "SALDO DISPONIBLE",
      //       "dashboard": "Tablero",
      //       "my_account": "Mi cuenta",
      //       "wallets": "Carteras",
      //       "buy_sell": "Compra venta",
      //       "affiliate": "Afiliado",
      //       "team_member": "Miembro del equipo",
      //       "news_pr": "Noticias y relaciones públicas",
      //       "offers": "Ofertas",
      //       "blockchain": "cadena de bloques",
      //       "docs": "documentos",
      //       "roadmap": "Mapa vial",
      //       "crypto_accounts": "CUENTAS CRIPTO",
      //       "usdt_wallet": "CARTERA",
      //       "support": "Apoyo",
      //       "energy": "Energía"
      //     }
      //  },
      //    fr: {
      //      translation: tFr
      //  {
      //       "available_balance": "SOLDE DISPONIBLE",
      //       "dashboard": "Tableau de bord",
      //       "my_account": "Mon compte",
      //       "wallets": "portefeuilles",
      //       "buy_sell": "Acheter vendre",
      //       "affiliate": "Affilier",
      //       "team_member": "Membre de l'équipe",
      //       "news_pr": "Actualités et RP",
      //       "offers": "Des offres",
      //       "blockchain": "Chaîne de blocs",
      //       "docs": "Documents",
      //       "roadmap": "Feuille de route",
      //       "crypto_accounts": "COMPTES CRYPTO",
      //       "usdt_wallet": "PORTE MONNAIE",
      //       "support": "Soutien",
      //       "energy": "Énergie"
        //    }
        //  },
        //  ar: {
      //     translation: {
      //       "available_balance": "الرصيد المتوفر",
      //       "dashboard": "لوحة القيادة",
      //       "my_account": "حسابي",
      //       "wallets": "محافظ",
      //       "buy_sell": "شراء بيع",
      //       "affiliate": "شركة تابعة",
      //       "team_member": "أعضاء الفريق",
      //       "news_pr": "الأخبار والعلاقات العامة",
      //       "offers": "عروض",
      //       "blockchain": "بلوكشين",
      //       "docs": "المستندات",
      //       "roadmap": "خريطة الطريق",
      //       "crypto_accounts": "حسابات CRYPTO",
      //       "usdt_wallet": "محفظة جيب",
      //       "support": "الدعم",
      //       "energy": "طاقة"
      //     }
      //   },
      //   ch: {
      //     translation: {
      //       "available_balance": "可用余额",
      //       "dashboard": "仪表板",
      //       "my_account": "我的帐户",
      //       "wallets": "钱包",
      //       "buy_sell": "买卖",
      //       "affiliate": "附属公司",
      //       "team_member": "队员",
      //       "news_pr": "新闻与公关",
      //       "offers": "优惠",
      //       "blockchain": "区块链",
      //       "docs": "文档",
      //       "roadmap": "路线图",
      //       "crypto_accounts": "加密账户",
      //       "usdt_wallet": "钱包",
      //       "support": "支持",
      //       "energy": "活力"
      //     }
      //   }
      // }

      // backend:{
      //   // loadPath: '../src/locales/{{lng}}/translation.json',
      //   // addPath: '../src/locales/add/{{lng}}/translation.json'
      // }
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

import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import { BASE_URL } from "../Api_connection/config";
import { setOneUsdPrice, setTotalAna } from "../redux/reducer/user";


function Menu (){
  const dispatch = useDispatch()
  const {user, oneUsdPrice} = useSelector((state)=> state.user.value)
  const email = user.email;
  const [anaBalancce, setAnaBalance] = useState('')
  const [usdPrice, setUsdPrice] = useState('')
  const [walletBalance, setWalletBalance] = useState(0)

  

  const getData = async()=>{
    try {
        const data = await axios.post(`${BASE_URL}/userWalletData`, {email: email})
        if(data){
          setAnaBalance(data.data.token_balance)
          dispatch(setTotalAna({totalAna: data.data.token_balance}))
        }
        
    } catch (error) {
      console.log(error);
    }
  }

  const getUsdPrice = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/getCoinData`, { currency: "inr"});
      if(res.data){
        setUsdPrice(res.data.USDT.quote.INR.price)
        dispatch(setOneUsdPrice({oneUsdPrice: res.data.USDT.quote.INR.price}))
      }
    } catch (error) {
      console.log(error);
    }
  };

  const gettotalWalletFund = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/getWalletData`, {email: email})
      const d = res.data.find((data,i)=>data.symbol=="USDT");
      setWalletBalance(d.usdt_balance)  
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getUsdPrice()
    getData()
    gettotalWalletFund()
  },[])
   const btn = useSelector(store=>store.navsetter);
   const {userInfo} = useSelector((state)=> state.user.value)
  
 

    return (
      <>
        <div
          className={btn?" nk-responsive nk-sidebar nk-sidebar-fixed nk-sidebar-mobile nk-sidebar-active":"nk-responsive nk-sidebar nk-sidebar-fixed nk-sidebar-mobile"}
          data-content="sidebarMenu" id="nk-sidebar"
        >
          <div className="nk-sidebar-element nk-sidebar-head">
            <div className="nk-sidebar-brand">
              <Link
                to=""
                className="logo-link nk-sidebar-logo"
              >
                <img
                  className="logo-light logo-img"
                  src="images/logo-dark.png"
                  // srcSet="images/logo-dark.png 2x"
                  alt="logo"                 
                />
                <img
                  className="logo-dark logo-img"
                  src="images/logo.png"
                  // srcSet="images/logo-dark.png 2x"
                  alt="logo-dark"                
                />
                {/* <span className="nio-version">ANALOG</span> */}
              </Link>
            </div>
            <div className="nk-menu-trigger mr-n2" >
              <Link
                to=""
                className="nk-nav-toggle nk-quick-nav-icon d-xl-none"
                data-target="sidebarMenu" id="nk-nav-toggle"
              >
                <em className="icon ni ni-arrow-left"  ></em>
              </Link>
            </div>
          </div>
          <div className="nk-sidebar-element">
            <div className="nk-sidebar-body" data-simplebar>
              <div className="nk-sidebar-content">
                <div className="nk-sidebar-widget d-none d-xl-block">
                  <div className="user-account-info between-center">
                    <div className="user-account-main">
                      <h2 className="overline-title-alt text-teal fs-6">Available Balance</h2>
                      <div className="user-balance">
                      { Number(anaBalancce)?.toFixed(2)}{" "}
                        <small className="currency currency-btc">ANA</small>
                      </div>
                      <div className="user-balance-alt">
                        {userInfo?.currency_preference == "inr" ? (userInfo?.anaPrice * Number(anaBalancce))>0?(userInfo?.anaPrice * Number(anaBalancce)).toFixed(2):0 : 
                          ((userInfo?.anaPrice / usdPrice) * Number(anaBalancce))>0?((userInfo?.anaPrice / usdPrice) * Number(anaBalancce)).toFixed(2):0
                        }
                        {" "}
                        <span className="currency currency-btc">
                          {userInfo?.currency_preference?userInfo?.currency_preference=='inr'?"INRX":"USDT":''}
                          </span>
                      </div>
                    </div>
                    {/* <a href="#" className="btn btn-white btn-icon btn-light">
                      <em className="icon ni ni-line-chart"></em>
                    </a> */}
                  </div>
                  {/* <ul className="user-account-data gy-1">
                    <li>
                      <div className="user-account-label">
                        <span className="sub-text">Profits (7d)</span>
                      </div>
                      <div className="user-account-value">
                        <span className="lead-text">
                          + 0.0526{" "}
                          <span className="currency currency-btc">ANA</span>
                        </span>
                        <span className="text-success ml-2">
                          3.1% <em className="icon ni ni-arrow-long-up"></em>
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="user-account-label">
                        <span className="sub-text">Deposit in orders</span>
                      </div>
                      <div className="user-account-value">
                        <span className="sub-text">
                          0.005400{" "}
                          <span className="currency currency-btc">BTC</span>
                        </span>
                      </div>
                    </li>
                  </ul> */}
                  {/* <div className="user-account-actions">
                                <ul className="g-3">
                                    <li><a href="#" className="btn btn-lg btn-primary"><span>Deposit</span></a></li>
                                    <li><a href="#" className="btn btn-lg btn-warning"><span>Withdraw</span></a></li>
                                </ul>
                            </div> */}
                </div>
                <div className="nk-sidebar-widget nk-sidebar-widget-full d-xl-none pt-0">
                  <Link
                  to=""
                    className="nk-profile-toggle toggle-expand"
                    data-target="sidebarProfile"
                 
                  >
                    <div className="user-card-wrap">
                      <div className="user-card">
                        <div className="user-avatar">
                          <span>{userInfo?.username?.charAt(0)?.toUpperCase()}</span>
                        </div>
                        <div className="user-info">
                          <span className="fw-500 h4">
                            {userInfo?.username}
                          </span>
                          <span className="sub-text">{userInfo?.user_id}</span>
                        </div>
                        <div className="user-action">
                          <em className="icon ni ni-chevron-down"></em>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div
                    className="nk-profile-content toggle-expand-content"
                    data-content="sidebarProfile"
                  >
                    
                  </div>
                </div>
                <div className="nk-sidebar-menu">
                  <ul className="nk-menu">
                    <li className="nk-menu-heading">
                      <h6 className="overline-title-alt text-teal fs-6">Inceptive</h6>
                    </li>
                    <li className="nk-menu-item">
                      <Link to="/home" className="nk-menu-link">
                        <span className="nk-menu-icon">
                          <em className="icon ni ni-dashboard"></em>
                        </span>
                        <span className="nk-menu-text">Dashboard</span>
                      </Link>
                    </li>
                    <li className="nk-menu-item">
                      <Link to="/accountSettings" className="nk-menu-link">
                        <span className="nk-menu-icon">
                          <em className="icon ni ni-user-c"></em>
                        </span>
                        <span className="nk-menu-text">My Account</span>
                      </Link>
                    </li>
                    <li className="nk-menu-item">
                      <Link to="/wallet" className="nk-menu-link">
                        <span className="nk-menu-icon">
                          <em className="icon ni ni-wallet-alt"></em>
                        </span>
                        <span className="nk-menu-text">Wallets</span>
                      </Link>
                    </li>
                    <li className="nk-menu-item">
                      <Link
                        to="/buysell"
                        className="nk-menu-link"
                      >
                        <span className="nk-menu-icon">
                          <em className="icon ni ni-coins"></em>
                        </span>
                        <span className="nk-menu-text">Buy / Sell</span>
                      </Link>
                    </li>
                    


                    {/* Add Line */}

                    <li className="nk-menu-item">
                      <Link to="/Affiliate" className="nk-menu-link">
                        <span className="nk-menu-icon">
                          <em className="icon ni ni-user-circle"></em>
                        </span>
                        <span className="nk-menu-text">Affiliate</span>
                      </Link>
                    </li>
                   
                  </ul>
                </div>
                <div className="nk-sidebar-widget">
                  <div className="widget-title">
                    <h6 className="overline-title-alt text-teal fs-6">
                      Crypto Accounts <span></span>
                    </h6>
                    {/* <a href="#" className="link">
                      View All
                    </a> */}
                  </div>
                  <div class="card card-bordered shadow-sm bg-success-dim">
                    <div class="pricing-head p-2">
                      <div class="pricing-title">                      
                        <div className="text-dark wallet-name">
                          <em className="icon ni ni-sign-kobo"></em> {userInfo?.currency_preference == 'inr'? 'INRX' : "USDT"} WALLET</div>                          
                      </div>                      
                    </div>
                    <div className="pricing-body p-3">
                      <div class="card-text">
                        <div class="text-center">
                          <span className="h6 fw-500 text-teal wallet-balance">
                            {userInfo?.currency_preference == 'usd' ? Number(walletBalance)?.toFixed(3) : (walletBalance * oneUsdPrice)?.toFixed(3)}
                            {" "}
                            <span className="text-white rounded px-2 bg-teal currency currency-nio">
                            {userInfo?.currency_preference == 'inr'? 'INRX' : "USDT"}
                            </span>
                          </span>                          
                        </div>
                      </div>  
                    </div>                   
                  </div>
                </div>
                <div className="nk-sidebar-footer sidebar-bg">
                  <ul className="nk-menu nk-menu-footer">
                    <li className="nk-menu-item">
                      <Link to="" className="nk-menu-link">
                        <span className="nk-menu-icon">
                          <em className="icon ni ni-help-alt"></em>
                        </span>
                        <span className="nk-menu-text">Support</span>
                      </Link>
                    </li>

                    <li className="nk-menu-item ml-auto">
                      <div className="dropup">
                        <Link
                          to=""
                          className="nk-menu-link dropdown-indicator has-indicator"
                          data-toggle="dropdown"
                          data-offset="0,10"
                        >
                          <span className="nk-menu-icon">
                            <em className="icon ni ni-globe"></em>
                          </span>
                          <span className="nk-menu-text">English</span>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                          <ul className="language-list">
                            <li>
                              <Link to="" className="language-item">
                                <img
                                  src="images/flags/english.png"
                                  alt=""
                                  className="language-flag"
                                />
                                <span className="language-name">English</span>
                              </Link>
                            </li>
                            <li>
                              <Link to="" className="language-item">
                                <img
                                  src="images/flags/spanish.png"
                                  alt=""
                                  className="language-flag"
                                />
                                <span className="language-name">Español</span>
                              </Link>
                            </li>
                            <li>
                              <Link to="" className="language-item">
                                <img
                                  src="images/flags/french.png"
                                  alt=""
                                  className="language-flag"
                                />
                                <span className="language-name">Français</span>
                              </Link>
                            </li>
                            <li>
                              <Link to="" className="language-item">
                                <img
                                  src="images/flags/turkey.png"
                                  alt=""
                                  className="language-flag"
                                />
                                <span className="language-name">Türkçe</span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

export default Menu;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL, BASE_URL_2 } from "../Api_connection/config";
import { setOneUsdPrice, setTotalAna, setLanguage } from "../redux/reducer/user";
import { useTranslation } from "react-i18next";
// import { FloatingLabel } from "react-bootstrap";
import i18next from "i18next";


function Menu() {
  const dispatch = useDispatch()
  const { user, oneUsdPrice, totalAna, userInfo, selectedLanguage } = useSelector((state) => state.user.value)
  const email = user.email;
  const [anaBalancce, setAnaBalance] = useState('')
  const [usdPrice, setUsdPrice] = useState('')
  const [walletBalance, setWalletBalance] = useState(0)
  const { t } = useTranslation();
  console.log(selectedLanguage, "selected language");

  function refreshPage(location) {
    window.location = location;
    window.location.reload();
  }

  const getData = async () => {
    try {
      const data = await axios.post(`${BASE_URL}/userWalletData`, { email: email })
      if (data) {
        setAnaBalance(data.data.token_balance)
        dispatch(setTotalAna({ totalAna: data.data.token_balance }))
      }

    } catch (error) {
      console.log(error);
    }
  }

  const getUsdPrice = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/getCoinData`, { currency: "inr" });
      if (res.data) {
        setUsdPrice(res.data.USDT.quote.INR.price)
        dispatch(setOneUsdPrice({ oneUsdPrice: res.data.USDT.quote.INR.price }))
      }
    } catch (error) {
      console.log(error);
    }
  };

  const gettotalWalletFund = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/getWalletData`, { email: email })
      const d = res.data.find((data, i) => data.symbol == "USDT");
      setWalletBalance(d.usdt_balance)
    } catch (error) {
      console.log(error);
    }
  };


  const changeLang = (countryCode, lang) => {
    // console.log(countryCode, lang);
    // i18next.changeLanguage(countryCode)
    dispatch(setLanguage({selectedLanguage:{ code: countryCode, name: lang }}))
  }

  const flags = [
    {
      img: "images/flags/english.png",
      language: "English",
      code: "en"

    },
    {
      img: "images/flags/spain.png",
      language: "Española",
      code: "es"

    }, {
      img: "images/flags/french.png",
      language: "Français",
      code: "fr"

    }, {
      img: "images/flags/arabic.png",
      language: "لعربية",
      code: "ar"

    }, {
      img: "images/flags/china.png",
      language: "中国人",
      code: "ch"

    }
  ]

  useEffect(() => {
    getUsdPrice()
    getData()
    gettotalWalletFund()
  }, [])
  const btn = useSelector(store => store.navsetter);
  //  const {userInfo} = useSelector((state)=> state.user.value)



  return (
    <>
      <div
        className={btn ? " nk-responsive nk-sidebar nk-sidebar-fixed nk-sidebar-mobile nk-sidebar-active" : "nk-responsive nk-sidebar nk-sidebar-fixed nk-sidebar-mobile"}
        data-content="sidebarMenu" id="nk-sidebar"
      >
        <div className="nk-sidebar-element nk-sidebar-head">
          <div className="nk-sidebar-brand">
            <Link
              to=""
              className="logo-link nk-sidebar-logo"
            >
              <img
                width={100}
                className="logo-light logo-img"
                src="https://api.analog.live/images/logo_1658832710895-image.svg"
                // srcSet="images/logo-dark.png 2x"
                alt="logo"
              />
              <img
                width={100}
                className="logo-dark logo-img"
                src="https://api.analog.live/images/dark_logo_1658832710900-image.svg"
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
              <div className="nk-sidebar-widget d-none d-xl-block pt-3">
                <div className="user-account-info between-center">
                  <div className="user-account-main">
                    <h2 className="overline-title-alt text-teal fs-6">{t('available_balance')}</h2>
                    <div className="user-balance">
                      {Number(totalAna)?.toFixed(2)}{" "}
                      <small className="currency currency-btc">ANA</small>
                    </div>
                    <div className="user-balance-alt">
                      {userInfo?.currency_preference == "inr" ? (userInfo?.anaPrice * Number(anaBalancce)) > 0 ? (userInfo?.anaPrice * Number(anaBalancce)).toFixed(2) : 0 :
                        ((userInfo?.anaPrice / usdPrice) * Number(anaBalancce)) > 0 ? ((userInfo?.anaPrice / usdPrice) * Number(anaBalancce)).toFixed(2) : 0
                      }
                      {" "}
                      <span className="currency currency-btc">
                        {userInfo?.currency_preference ? userInfo?.currency_preference == 'inr' ? "INRX" : "USDT" : ''}
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
              <div className="nk-sidebar-menu p-0">
                <ul className="nk-menu">
                  <li className="nk-menu-heading">
                    <h6 className="overline-title-alt text-teal fs-6">Inceptive</h6>
                  </li>
                  <li className="nk-menu-item">
                    <Link to="/home" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-dashboard"></em>
                      </span>
                      <span className="nk-menu-text">{t('dashboard')}</span>
                    </Link>
                  </li>
                  <li className="nk-menu-item">
                    <Link to="/accountSettings" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-user-c"></em>
                      </span>
                      <span className="nk-menu-text">{t('my_account')}</span>
                    </Link>
                  </li>
                  <li className="nk-menu-item">
                    <Link to="/wallet" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-wallet-alt"></em>
                      </span>
                      <span className="nk-menu-text">{t('wallets')}</span>
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
                      <span className="nk-menu-text">{t('buy_sell')}</span>
                    </Link>
                  </li>



                  {/* Add Line */}

                  <li className="nk-menu-item">
                    <Link to="/Affiliate" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-user-list"></em>
                      </span>
                      <span className="nk-menu-text">{t('affiliate')}</span>
                    </Link>
                  </li>

                  <hr></hr>
                  <li className="nk-menu-item">
                    <Link to="/TeamMember" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-users"></em>
                      </span>
                      <span className="nk-menu-text">{t('team_member')}</span>
                    </Link>
                  </li>
                  <li className="nk-menu-item">
                    <Link to="/NewsPR" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-article"></em>
                      </span>
                      <span className="nk-menu-text">{t('news_pr')}</span>
                    </Link>
                  </li>
                  <li className="nk-menu-item">
                    <Link to="/Offer" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-offer"></em>
                      </span>
                      <span className="nk-menu-text">{t('offers')}</span>
                    </Link>
                  </li>
                  <li className="nk-menu-item">
                    <Link to="/BlockChain" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-opt-dot-alt"></em>
                      </span>
                      <span className="nk-menu-text">{t('blockchain')}</span>
                    </Link>
                  </li>
                  <li className="nk-menu-item">
                    <Link to="" className="nk-menu-link" onClick={() => window.open("https://docs.analog.live/")}>
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-list-round"></em>
                      </span>
                      <span className="nk-menu-text">{t('docs')}</span>
                    </Link>
                  </li>
                  <li className="nk-menu-item">
                    <Link to="/Roadmap" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-map-pin"></em>
                      </span>
                      <span className="nk-menu-text">{t('crypto_accounts')}</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="nk-sidebar-widget pt-0">
                <div className="widget-title">
                  <h6 className="overline-title-alt text-teal fs-6">
                    {t('crypto_accounts')} <span></span>
                  </h6>
                  {/* <a href="#" className="link">
                      View All
                    </a> */}
                </div>
                <div class="">
                  <div className="text-dark wallet-name">
                    {userInfo?.currency_preference == 'inr' ? 'INRX' : "USDT"} {t('usdt_wallet')}</div>

                  <span className="h6 fw-500 text-teal wallet-balance">
                    {userInfo?.currency_preference == 'usd' ? Number(walletBalance)?.toFixed(3) : (walletBalance * oneUsdPrice)?.toFixed(3)}
                    {" "}
                    <span className="text-white rounded px-2 bg-teal currency currency-nio">
                      {userInfo?.currency_preference == 'inr' ? 'INRX' : "USDT"}
                    </span>
                  </span>
                </div>
              </div>
              <div className="nk-sidebar-footer sidebar-bg">
                <ul className="nk-menu nk-menu-footer">
                  <li className="nk-menu-item">
                    <Link to="" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-help-alt"></em>
                      </span>
                      <span className="nk-menu-text">{t('support')}</span>
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
                        <span className="nk-menu-text">{selectedLanguage?.name}</span>
                      </Link>
                      <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                        <ul className="language-list">
                          {
                            flags.map((element, index) => {
                              return (
                                <>
                                  <li key={index} onClick={() => changeLang(element.code, element.language)}>
                                    <Link to="" className="language-item">
                                      <img
                                        src={element.img}
                                        alt=""
                                        className="language-flag"
                                      />
                                      <span className="language-name">{element.language}</span>
                                    </Link>
                                  </li>
                                </>
                              )
                            })
                          }
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

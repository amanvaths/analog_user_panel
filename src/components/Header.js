import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo, logout, setTheme } from "../redux/reducer/user";
import axios from "axios";
import { BASE_URL } from "../Api_connection/config";
import { navsetter } from "../redux/actions/websiteDBAction";


const Header = () => {

  const { user, userInfo } = useSelector((state) => state.user.value)
  const email = user.email;
  const btn = useSelector((store) => store.navsetter)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const sidebarMenu = async () => {

    var element = document.getElementById("myBody");
    element.classList.add("nav-shown");
    element = document.getElementById("nk-sidebar");
    element.classList.add("nk-sidebar-active");
    element = document.getElementById("nk-nav-toggle");
    element.classList.add("toggle-active");

    var element1 = document.getElementById("myBody");
    if (element1.classList.contains("toggle-shown")) {
      element1.classList.remove("toggle-shown")
    }
    var element2 = document.getElementById("toggleBtn");
    if (element2) {
      if (element2.classList.contains("active")) {
        element2.classList.remove("active")
      }
    }
    var element3 = document.getElementById("cardAside")
    if (element3) {
      if (element3.classList.contains("content-active")) {
        element3.classList.remove("content-active")
      }

    }

  }


  const mode = localStorage.getItem("theme")
  if (mode == 1) {
    var element = document.getElementById("myBody");
    element.classList.add("dark-mode")
  } else {
    element = document.getElementById("myBody");
    element.classList.remove("dark-mode")
  }






  const signOut = () => {
    // navigate("/", { replace: true });
    dispatch(logout())
    navigate("/login")
  };

  useEffect(() => {
    const fetchdata = async () => {
      const data = await axios.post(`${BASE_URL}/configSettings`, { email: email })
      if (data) {
        dispatch(setUserInfo({ userInfo: data.data }))
      }
    }
    fetchdata().catch(console.error)
  }, [])



  return (
    <>
      <div className="nk-header nk-header-fluid is-light ">
        <div className="container-fluid">
          <div className="nk-header-wrap">
            <div className="nk-menu-trigger d-xl-none ml-n1">
              <b
              
                onClick={() => dispatch(navsetter())}
                // className= "nk-nav-toggle nk-quick-nav-icon toggle-active"
                className={btn ? "nk-nav-toggle nk-quick-nav-icon toggle-active" : "nk-nav-toggle nk-quick-nav-icon"}
                data-target="sidebarMenu"
              >
                <em className="icon ni ni-menu" onClick={sidebarMenu}></em>
              </b>
            </div>
            <div className=" nk-header-brand d-xl-none">
              <Link to="/home" className="logo-link">
                <img
                  className="logo-light logo-img"
                  src="images/logo.png"
                  srcSet="images/logo.png 2x"
                  alt="logo"
                />
                <img
                  className="logo-dark logo-img"
                  src="images/logo.png"
                  srcSet="images/logo.png 2x"
                  alt="logo-dark"
                />
                {/* <span className="nio-version">Crypto</span> */}
              </Link>
            </div>
            <div className="nk-header-news d-none d-xl-block">
              <div className="nk-news-list">
                <b className="nk-news-item" >
                  <div className="nk-news-icon">
                    <em className="icon ni ni-card-view"></em>
                  </div>
                  <div className="nk-news-text">
                    <p>
                      Do you know the latest update of 2019?{" "}
                      <span>
                        {" "}
                        A overview of our is now available on YouTube
                      </span>
                    </p>
                    <em className="icon ni ni-external"></em>
                  </div>
                </b>
              </div>
            </div>
            <div className="nk-header-tools" style={{ width: "100%", display: "flex", justifyContent: "end" }}>
              <ul className="nk-quick-nav">
                <li>
                  <div className="nk-block-head logohide">
                    {/* <div className="nk-block-head-sub">
                        <span>Welcome!</span>
                      </div> */}
                    <div className="nk-block-between-md g-4">
                      <div className="nk-block-head-content">
                        {/* <h2 className="nk-block-title fw-normal">
                            Ia5ghTL2paqchJTR65nBKvZ
                          </h2> */}
                        {/* <div className="nk-block-des">
                            <p>
                              At a glance summary of your account. Have fun!
                            </p>
                          </div> */}
                      </div>
                      <div class="energy">
                        <div class="nk-block-head-content">
                          <ul class="nk-block-tools gx-3">
                            <divx></divx>
                            <divx></divx>
                            <divx></divx>
                            <divx></divx>
                            <divx></divx>
                            <divx></divx>
                            <divx></divx>
                            <divx></divx>
                            <divx></divx>
                            <divx></divx>
                            <divx></divx>
                            <divx></divx>
                            <divx></divx>
                            <divx></divx>
                            <divx></divx>
                            <divx></divx>
                            <divx></divx>
                          </ul>
                          <div className="energy-container">
                            [ <b className="energy-text ">{"    "}Energy</b>{" "}
                            <span style={{ color: "green" }} className="timer">
                              5,6881.00
                            </span>
                            {"  "} J]
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="dropdown notification-dropdown mr-n1">
                  <b
                    
                    className="dropdown-toggle nk-quick-nav-icon"
                    data-toggle="dropdown"
                  >
                    <div className="icon-status icon-status-info">
                      <em className="icon ni ni-bell"></em>
                    </div>
                  </b>
                  <div
                    className="dropdown-menu dropdown-menu-xl dropdown-menu-right dropdown-menu-s2"
                    style={{ width: 305 }}
                  >
                    <div className="dropdown-head">
                      <span className="sub-title nk-dropdown-title">
                        Notifications
                      </span>
                      <b>Mark All as Read</b>
                    </div>
                    <div className="dropdown-body">
                      <div className="nk-notification">
                        <div className="nk-notification-item dropdown-inner">
                          <div className="nk-notification-icon">
                            <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right"></em>
                          </div>
                          <div className="nk-notification-content">
                            <div className="nk-notification-text">
                              You have requested to <span>Widthdrawl</span>
                            </div>
                            <div className="nk-notification-time">
                              2 hrs ago
                            </div>
                          </div>
                        </div>
                        <div className="nk-notification-item dropdown-inner">
                          <div className="nk-notification-icon">
                            <em className="icon icon-circle bg-success-dim ni ni-curve-down-left"></em>
                          </div>
                          <div className="nk-notification-content">
                            <div className="nk-notification-text">
                              Your <span>Deposit Order</span> is placed
                            </div>
                            <div className="nk-notification-time">
                              2 hrs ago
                            </div>
                          </div>
                        </div>
                        <div className="nk-notification-item dropdown-inner">
                          <div className="nk-notification-icon">
                            <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right"></em>
                          </div>
                          <div className="nk-notification-content">
                            <div className="nk-notification-text">
                              You have requested to <span>Widthdrawl</span>
                            </div>
                            <div className="nk-notification-time">
                              2 hrs ago
                            </div>
                          </div>
                        </div>
                        <div className="nk-notification-item dropdown-inner">
                          <div className="nk-notification-icon">
                            <em className="icon icon-circle bg-success-dim ni ni-curve-down-left"></em>
                          </div>
                          <div className="nk-notification-content">
                            <div className="nk-notification-text">
                              Your <span>Deposit Order</span> is placed
                            </div>
                            <div className="nk-notification-time">
                              2 hrs ago
                            </div>
                          </div>
                        </div>
                        <div className="nk-notification-item dropdown-inner">
                          <div className="nk-notification-icon">
                            <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right"></em>
                          </div>
                          <div className="nk-notification-content">
                            <div className="nk-notification-text">
                              You have requested to <span>Widthdrawl</span>
                            </div>
                            <div className="nk-notification-time">
                              2 hrs ago
                            </div>
                          </div>
                        </div>
                        <div className="nk-notification-item dropdown-inner">
                          <div className="nk-notification-icon">
                            <em className="icon icon-circle bg-success-dim ni ni-curve-down-left"></em>
                          </div>
                          <div className="nk-notification-content">
                            <div className="nk-notification-text">
                              Your <span>Deposit Order</span> is placed
                            </div>
                            <div className="nk-notification-time">
                              2 hrs ago
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-foot center">
                      <b>View All</b>
                    </div>
                  </div>
                </li>
                <li className="dropdown user-dropdown">
                  <b
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <div className="user-toggle">
                      <div className="user-avatar sm">
                        <em className="icon ni ni-user-alt"></em>
                      </div>
                      {/* <div className="user-info d-none d-md-block">
                          <div className="user-status user-status-unverified">
                            Unverified
                          </div>
                          <div className="user-name dropdown-indicator">
                            Profile
                          </div>
                        </div> */}
                    </div>
                  </b>


                  {/* Amit */}

                  <div className="dropdown-menu dropdown-menu-md dropdown-menu-right dropdown-menu-s1" style={{ width: "210px" }}>
                    <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                      <div className="user-card">
                        <div className="user-avatar">
                          <span>{(userInfo?.username)?.charAt(0)?.toUpperCase()}</span>
                        </div>
                        <div className="user-info">
                          <span className="lead-text">
                            {userInfo?.username}
                          </span>
                          <span className="sub-text">
                            {userInfo?.user_id}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <div className="dropdown-inner user-account-info">
                      <h6 className="overline-title-alt">Analog Wallet Account</h6>
                      <div className="user-balance m-2">
                        12.395769{" "}
                        <small className="currency currency-btc">BTC</small>
                      </div>
                      <div className="user-balance-sub">
                        Locked{" "}
                        <span>
                          0.344939{" "}
                          <span className="currency currency-btc">BTC</span>
                        </span>
                      </div>
                       <a href="#" className="link">
                        <span>Withdraw Funds</span>{" "}
                        <em className="icon ni ni-wallet-out"></em>
                      </a> 
                    </div> */}
                    <div className="dropdown-inner">
                      <ul className="link-list">
                        {/* <li>
                          <a href="html/crypto/profile.html">
                            <em className="icon ni ni-user-alt"></em>
                            <span>View Profile</span>
                          </a>
                        </li> */}
                        <li>
                          <Link to="/accountSettings">
                            <em className="icon ni ni-setting-alt"></em>
                            <span>Account Setting</span>
                          </Link>
                        </li>
                        {/* <li>
                          <Link to="/login">
                            <em className="icon ni ni-activity-alt"></em>
                            <span>Login Activity</span>
                          </Link>
                        </li> */}
                        <li>
                          {
                            mode == 0 ? <Link to=""
                              onClick={() => {
                                dispatch(setTheme({ theme: 1 }))
                                mode == 1 ? localStorage.setItem("theme", "0") : localStorage.setItem("theme", "1")
                              }}>
                              <em className="icon ni ni-moon mr-1"></em>
                              <span className="mr-1">Dark Mode</span>
                            </Link> : <Link to="" onClick={() => {
                              dispatch(setTheme({ theme: 0 }))
                              mode == 1 ? localStorage.setItem("theme", "0") : localStorage.setItem("theme", "1")
                            }}>
                              <em className="icon ni ni-sun mr-1"></em>
                              <span className="mr-1">Light Mode</span>
                            </Link>
                          }
                        </li>
                      </ul>
                    </div>
                    <div className="dropdown-inner">
                      <ul className="link-list">
                        <li>
                          <b  style={{cursor: "pointer"}}>
                            <em className="icon ni ni-signout"></em>
                            <span onClick={() => signOut()}>Sign out</span>
                          </b>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                {/* Remove */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

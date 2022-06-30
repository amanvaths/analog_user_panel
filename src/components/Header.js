import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo, logout } from "../redux/reducer/user";
import axios from "axios";
import { BASE_URL } from "../Api_connection/config";


const Header = () => {
  var flag=0;
  const [isopen, setIsopen] = useState(0);
  const { user, userInfo } = useSelector((state) => state.user.value)
  const email = user.email;
  const btn = useSelector((store) => store.navsetter)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const sidebarMenu = async () => {
   
  
   if(flag==0){
    var element = document.getElementById("nk-sidebar");
    element.classList.add("nk-sidebar-active");
    document.getElementById("nk-sidebar").style.visibility="visible"
    flag++; 
    console.log("uppper - hello");
   }


  else if(flag==1){
  

    var element2 = document.getElementById("nk-sidebar");
      element2.classList.remove("nk-sidebar-active");
      document.getElementById("nk-sidebar").style.display="hidden"
      console.log("hello");
      flag=0;
   
  }

      
  }
  const mode = localStorage.getItem("theme")
  if (mode == 1) {
    var element = document.getElementById("myBody");
    element.classList.add("dark-mode")
  } else {
    var element = document.getElementById("myBody");
    element.classList.remove("dark-mode")
  }
  

//    if(flag==0){
//     document.getElementById("nk-sidebar").style.display="block";
// flag++
//    } 

 
  




  const signOut = () => {
    // navigate("/", { replace: true });
    dispatch(logout())
    navigate("/login")
  };

  useEffect(async () => {
    const data = await axios.post(`${BASE_URL}/configSettings`, { email: email })
    if (data) {
      dispatch(setUserInfo({ userInfo: data.data }))
    }
  }, [])



  return (
    <>
      <div className="nk-header nk-header-fluid is-light mobile_view_setter">
        <div className="container-fluid" >
          <div className="nk-header-wrap">
            <div className="nk-menu-trigger d-xl-none ml-n1">
              <a
                href="#"
                // onClick={()=>dispatch(navsetter())}
                // className= "nk-nav-toggle nk-quick-nav-icon toggle-active"
                className={btn ? "nk-nav-toggle nk-quick-nav-icon toggle-active" : "nk-nav-toggle nk-quick-nav-icon"}
                data-target="sidebarMenu"
              >
                <em className="icon ni ni-menu"  onClick={sidebarMenu}></em>
              </a>
            </div>
            <div className="nk-header-brand d-xl-none">
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
                <a className="nk-news-item" href="#">
                  <div className="nk-news-icon">
                    <em className="icon ni ni-card-view text-success"></em>
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
                </a>
              </div>
            </div>
            <div className="nk-header-tools">
              <ul className="nk-quick-nav">
                <li>
                  <div className="nk-block-head">
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
                          <ul class="nk-block-tools">
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
                            <divx></divx>
                            <divx></divx>
                          </ul>
                          <div className="energy-container text-right">
                            [ <span className="text-success font-weight-bold energy-text">{"    "}Energy</span>{" "}
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
                  <a
                    href="#"
                    className="dropdown-toggle nk-quick-nav-icon"
                    data-toggle="dropdown"
                  >
                    <div className="icon-status icon-status-info">
                      <em className="ni ni-bell"></em>
                    </div>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-xl dropdown-menu-right dropdown-menu-s2"
                    style={{ width: 305 ,zIndex:1000}}
                  >
                    <div className="dropdown-head">
                      <span className="sub-title nk-dropdown-title">
                        Notifications
                      </span>
                      <a href="#">Mark All as Read</a>
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
                      <a href="#">View All</a>
                    </div>
                  </div>
                </li>
                <li className="dropdown user-dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <div className="user-toggle">
                      <div className="user-avatar sm bg-success">
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
                  </a>


                  {/* Amit */}

                  <div className="dropdown-menu dropdown-menu-md dropdown-menu-right dropdown-menu-s1" style={{ width: "210px" }}>
                    <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                      <div className="user-card">
                        <div className="user-avatar bg-teal">
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
                              onClick={() => mode == 1 ? localStorage.setItem("theme", "0") : localStorage.setItem("theme", "1")}>
                              <em className="icon ni ni-moon mr-1"></em>
                              <span className="mr-1">Dark Mode</span>
                            </Link> : <Link to="" onClick={() => mode == 1 ? localStorage.setItem("theme", "0") : localStorage.setItem("theme", "1")}>
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
                          <a href="#">
                            <em className="icon ni ni-signout"></em>
                            <span onClick={() => signOut()}>Sign out</span>
                          </a>
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

import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import PersonalInfo from "../components/PersonalInfo";
import SecuritySettings from "../components/SecuritySettings";
import Notification from "../components/Notification";
import ChangePassword from "../components/ChangePassword";
import IPwhiteListing from "../components/IPwhiteListing";

import { navsetters } from "../redux/actions/websiteDBAction";


import { Link } from "react-router-dom";
import axios from "axios";
import { IoLocation } from 'react-icons/io5'
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo, setSettingPage } from "../redux/reducer/user";
import { BASE_URL } from "../Api_connection/config";


const AccountSettings = () => {
  const dispatch = useDispatch()
  const { userInfo, settingPages, user } = useSelector((state) => state.user.value)
  const [logData, setLogData] = useState([])
  const email = user.email
  const [pMenu, setPMenu] = useState(0);

  const getLoginLog = async () => {
    try {
      const data = await axios.post(`${BASE_URL}/loginhistory`, { email: email })
      setLogData(data.data.login_record)
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(async () => {
    const data = await axios.post(`${BASE_URL}/configSettings`, { email: email })
    if (data) {
      dispatch(setUserInfo({ userInfo: data.data }))
      getLoginLog()
    }

  }, [])

  const profileMenuRemove = ()=>{
    var element = document.getElementById("myBody"); 
  element.classList.remove("toggle-shown"); 
  var element = document.getElementById("toggleBtn"); 
  element.classList.remove("active");                                 
  var element = document.getElementById("cardAside"); 
  element.classList.remove("content-active"); 
  }

 
  return (
    <>
      <div>
        <div className="nk-app-root">
          <div className="nk-main ">
            <Menu />
            <div className="nk-wrap">
              <Header />
              <div className="nk-content nk-content-fluid">
                <div className="container-xl wide-lg"></div>
                <div className="nk-content-body">
                  <div className="nk-block">
                    <div className="card card-bordered">
                      <div className="card-aside-wrap">
                        {settingPages.ipWhiteListing == true ? <IPwhiteListing /> : null}
                        {settingPages.changePassword == true ? <ChangePassword /> : null}
                        {settingPages.notification == true ? <Notification /> : null}
                        {settingPages.securitySettings == true ? <SecuritySettings /> : null}

                        {settingPages.personalInfo == true && <PersonalInfo />}

                        {settingPages.activity == true ? (
                          <div className="card-inner card-inner-lg">
                            <div className="nk-block-head nk-block-head-lg">
                              <div className="nk-block-between">
                                <div className="nk-block-head-content">
                                  <h4 className="nk-block-title active" >Login Activity</h4>
                                  <div className="nk-block-des">
                                    <p> {` Here is your last ${logData.length} login activities log.`}

                                      <span className="text-soft">

                                      </span>
                                    </p>
                                  </div>
                                </div>
                                <div onClick={()=>dispatch(navsetters())} className="nk-block-head-content align-self-start d-lg-none">
                                  <a
                                  
                                    className="toggle btn btn-icon btn-trigger mt-n1"
                                    id = "toggleBtn"
                                    // className={btn1?"toggle btn btn-icon btn-trigger mt-n1 active":"toggle btn btn-icon btn-trigger mt-n1"}
                                    data-target="userAside"                                  
                                  >
                                    <em className="icon ni ni-menu-alt-r" onClick={()=>profileMenuRemove()}  ></em>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="nk-block card card-bordered">
                              <div className="table-responsive">    
                                <table className="table table-hover table-ulogs">
                                    <thead className="bg-teal-dim text-teal">
                                      <tr>
                                        <th className="tb-col-os">
                                          <span>
                                            Browser
                                            <span className="d-sm-none">/ IP</span>
                                          </span>
                                        </th>
                                        <th className="tb-col-ip">
                                          <span>Device</span>
                                        </th>
                                        <th className="tb-col-ip">
                                          <span>IP</span>
                                        </th>
                                        <th className="tb-col-time">
                                          <span>Time</span>
                                        </th>
                                        <th className="tb-col-action">
                                          <span>&nbsp;</span>
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {
                                        logData.map((element, index) => {
                                          const a = new Date(element.createdAt)
                                          return (
                                            <tr>
                                              <td className="tb-col-os">{element.browser_name}</td>
                                              <td className="tb-col-os">{element.request_device}</td>
                                              <td className="tb-col-ip">
                                              <span className="text-grey">
                                                  {element.request_address}
                                                </span>
                                              </td>
                                              <td className="tb-col-time">
                                              <span className="text-grey">{a.toDateString()} {a.toLocaleTimeString()}</span>
                                              </td>
                                              <td className="tb-col-action">{ }</td>
                                            </tr>
                                          )
                                        })
                                      }

                                    </tbody>
                                  </table>
                                 </div> 
                            </div>
                          </div>
                        ) : null}

                        <div
                        className="card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg"
                          // className={btn1?"card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg content-active":"card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg"}
                          data-toggle-body="true"
                          data-content="userAside"
                          data-toggle-screen="lg"
                          data-toggle-overlay="true"
                          id = "cardAside"
                        >
                          <div className="card-inner-group">
                            <div className="card-inner">
                              <div className="user-card">
                                <div className="user-avatar bg-teal">
                                  <span>{userInfo?.username?.charAt(0)?.toUpperCase()}</span>
                                </div>
                                <div className="user-info">
                                  <span className="lead-text text-uppercase">
                                    {userInfo?.username}
                                  </span>
                                  <span className="text-grey">{userInfo?.user_id}</span>
                                </div>
                                {/* <div className="user-action">
                                  <div className="dropdown">
                                    <a
                                      className="btn btn-icon btn-trigger me-n2"
                                      data-bs-toggle="dropdown"
                                      href="#"
                                    >
                                      <em className="icon ni ni-arrow-left" onClick={profileMenuRemove}></em>
                                    </a> 
                                     <div className="dropdown-menu dropdown-menu-end">
                                      <ul className="link-list-opt no-bdr">
                                        <li>
                                          <a href="#">
                                            <em className="icon ni ni-camera-fill"></em>
                                            <span>Change Photo</span>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <em className="icon ni ni-edit-fill"></em>
                                            <span>Update Profile</span>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>  
                                   </div>
                                </div> */}
                              </div>
                            </div>
                            <div className="card-inner">
                              <div className="user-account-info py-0">
                                <h6 className="overline-title-alt p-2">
                                  Analog Wallet Balance
                                </h6>
                                <div className="user-balance text-warning p-2">
                                  12.395769
                                  <small className="currency currency-btc p-2">
                                    BTC
                                  </small>
                                </div>
                                <div className="user-balance-sub px-2">
                                  Locked
                                  <span className="p-2">
                                    0.344939
                                    <span className="currency currency-btc p-2">
                                      BTC
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="card-inner p-0">
                              <ul className="link-list-menu">
                                <li>
                                  <Link
                                    to="#"
                                    className={settingPages.personalInfo ? "active" : " "}
                                    onClick={() => {
                                      const obj5 = {
                                        personalInfo: true,
                                        activity: false,
                                        securitySettings: false,
                                        notification: false,
                                        changePassword: false,
                                        ipWhiteListing: false
                                      }
                                      dispatch(setSettingPage({settingPages: obj5}))
                                    }}
                                  >
                                    <em className="icon ni ni-user-fill-c"></em>
                                    <span>Personal Infomation</span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#"
                                    onClick={() => {
                                      const obj4 = {
                                        personalInfo: false,
                                        activity: false,
                                        securitySettings: false,
                                        notification: true,
                                        changePassword: false,
                                        ipWhiteListing: false
                                      }
                                      dispatch(setSettingPage({ settingPages: obj4 }));
                                    }}>
                                    <em className="icon ni ni-bell-fill"></em>
                                    <span>Notifications</span>
                                  </Link>
                                </li>
                                <li>
                                  <Link className={settingPages.activity ? "active" : " "} to="#">
                                    <em className="icon ni ni-activity-round-fill"></em>
                                    <span
                                      onClick={() => {
                                        const obj3 = {
                                          personalInfo: false,
                                          activity: true,
                                          securitySettings: false,
                                          notification: false,
                                          changePassword: false,
                                          ipWhiteListing: false
                                        }
                                        dispatch(setSettingPage({settingPages: obj3}))
                                      }}
                                    >
                                      Account Activity
                                    </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#"
                                    className={settingPages.securitySettings ? "active" : " "}
                                    onClick={() => {
                                      const obj2 = {
                                        personalInfo: false,
                                        activity: false,
                                        securitySettings: true,
                                        notification: false,
                                        changePassword: false,
                                        ipWhiteListing: false
                                      }
                                      dispatch(setSettingPage({settingPages: obj2}))
                                    }}>
                                    <em className="icon ni ni-lock-alt-fill"></em>
                                    <span> Security Settings</span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#"
                                    className={settingPages.ipWhiteListing ? "active" : " "}
                                    onClick={() => {
                                      const obj1 = {
                                        personalInfo: false,
                                        activity: false,
                                        securitySettings: false,
                                        notification: false,
                                        changePassword: false,
                                        ipWhiteListing: true
                                      }
                                      dispatch(setSettingPage({settingPages: obj1}))
                                    }}>
                                    <IoLocation />&nbsp; &nbsp;
                                    <span>IP Whitelisting</span>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;

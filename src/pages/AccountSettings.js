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
import { removeSideMenu } from "../Api_connection/ApiFunction";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoLocation } from 'react-icons/io5'
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo, setSettingPage } from "../redux/reducer/user";
import { BASE_URL } from "../Api_connection/config";
import SettingButton from "../components/SettingButton";
import { useTranslation } from "react-i18next";


const AccountSettings = () => {
  const dispatch = useDispatch()
  const { userInfo, settingPages, user, totalAna } = useSelector((state) => state.user.value)
  const [logData, setLogData] = useState([])
  const email = user.email
  const { t } = useTranslation();
  const btn1 = useSelector((store) => store.navsetters)


  const getLoginLog = async () => {
    try {
      const data = await axios.post(`${BASE_URL}/loginhistory`, { email: email })
      setLogData(data.data.login_record)
    } catch (error) {
      console.log(error);
    }
  }

  const go = async()=>{
    try {
      const data = await axios.post(`${BASE_URL}/configSettings`, { email: email })
      if (data) {
        dispatch(setUserInfo({ userInfo: data.data }))
        getLoginLog()
    }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect( () => {
   go()
  }, [])
console.log(logData, "LLOGDATA");

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
                          <div className="card-inner card-inner-lg bg-light">
                            <div className="nk-block-head nk-block-head-lg">
                              <div className="nk-block-between">
                                <div className="nk-block-head-content">
                                  <h4 className="nk-block-title active" >{t('login_activity')}</h4>
                                  <div className="nk-block-des">
                                    <p>
                                       {/* {` Here is your last ${logData.length} login activities log.`} */}
                                      {t('login_activity_tagline',{logData})}
                                      <span className="text-soft">

                                      </span>
                                    </p>
                                  </div>
                                </div>
                                <div className="nk-block-head-content align-self-start d-lg-none">
                                  {/*<a
                                  
                                    className="toggle btn btn-icon btn-trigger mt-n1"
                                    id = "toggleBtn"
                                    // className={btn1?"toggle btn btn-icon btn-trigger mt-n1 active":"toggle btn btn-icon btn-trigger mt-n1"}
                                    data-target="userAside"                                  
                                  >
                                    <em className="icon ni ni-menu-alt-r" onClick={()=>profileMenuRemove()}  ></em>
                                  </a> */}
                                   <SettingButton></SettingButton>
                                </div>
                              </div>
                            </div>
                            <div className="nk-block card card-bordered">
                              <div className="">    
                                <table className="table table-ulogs">
                                    <thead className="tb-tnx-head">
                                      <tr>
                                        <th className="tb-col-os">
                                          <span>
                                            {t('browser')}
                                            <span className="d-sm-none">/ IP</span>
                                          </span>
                                        </th>
                                        <th className="tb-col-ip">
                                          <span>{t('device')}</span>
                                        </th>
                                        <th className="tb-col-ip">
                                          <span>IP</span>
                                        </th>
                                        <th className="tb-col-time">
                                          <span>{t('time')}</span>
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
                                            <tr className="zoom_on_table" key={index}>
                                              <td className="tb-col-os text-danger">{element.browser_name}</td>
                                              <td className="tb-col-os text-capitalize text-teal">{element.request_device}</td>
                                              <td className="tb-col-ip">
                                              <span className="badge bg-light">
                                                  {element.request_address}
                                                </span>
                                              </td>
                                              <td className="tb-col-time">
                                              <span className="text-dark"> <em className="icon ni ni-clock valign"></em> {a.toDateString()} {a.toLocaleTimeString()}</span>
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
                                  <span className="fw-500 h4">
                                    {userInfo?.username}
                                  </span>
                                  <span className="sub-text">{userInfo?.user_id}</span>
                                </div>
                                {/* <div className="user-action">
                                  <div className="dropdown">
                                    <Link
                                      className="btn btn-icon btn-trigger me-n2"
                                      data-bs-toggle="dropdown"
                                      to=''
                                    >
                                      <em className="icon ni ni-arrow-left" onClick={profileMenuRemove}></em>
                                    </Link> 
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
                                </div>  */}
                              </div>
                            </div>
                            <div className="card-inner">
                              <div className="user-account-info py-0">
                                <h6 className="overline-title-alt p-2">
                                  Analog {t('analog_wallet_balance')}
                                </h6>
                                <div className="user-balance p-2">
                                  {totalAna&&totalAna?.toFixed(3)} ANA
                                  {/* <small className="currency currency-btc p-2">
                                    BTC
                                  </small> */}
                                </div>
                                {/* <div className="user-balance-sub">
                                  Locked
                                  <span className="p-2">
                                    0.344939
                                    <span className="currency currency-btc p-2">
                                      BTC
                                    </span>
                                  </span>
                                </div> */}
                              </div>
                            </div>
                            <div className="card-inner p-0">
                              <ul className="link-list-menu">
                                <li>
                                  <Link
                                    to="#"
                                    className={settingPages.personalInfo ? "active" : " "}
                                    onClick={() => {
                                      removeSideMenu()
                                      const obj5 = {
                                        personalInfo: true,
                                        activity: false,
                                        securitySettings: false,
                                        notification: false,
                                        changePassword: false,
                                        ipWhiteListing: false
                                      }
                                      dispatch(setSettingPage({settingPages: obj5}))
                                      go()                                    
                                      // getSetti(email)
                                      // dispatch(setUserInfo({currency_prefrence: userInfo?.currency_prefrence}))
                                      // dispatch(setUserInfo({ currency_prefrence: "inr" }))
                                    }}
                                  >
                                    <em className="icon ni ni-user-fill-c"></em>
                                    <span>{t('personal_information')}</span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#"
                                    onClick={() => {
                                      removeSideMenu()
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
                                    <span>{t('notification')}</span>
                                  </Link>
                                </li>
                                <li>
                                  <Link className={settingPages.activity ? "active" : " "} to="#">
                                    <em className="icon ni ni-activity-round-fill"></em>
                                    <span
                                      onClick={() => {
                                        removeSideMenu()
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
                                      {t('account_activity')}
                                    </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#"
                                    className={settingPages.securitySettings ? "active" : " "}
                                    onClick={() => {
                                      removeSideMenu()
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
                                    <span>{t('security_settings')}</span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#"
                                    className={settingPages.ipWhiteListing ? "active" : " "}
                                    onClick={() => {
                                      removeSideMenu()
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
                                    <span>IP {t('whitelisting')}</span>
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

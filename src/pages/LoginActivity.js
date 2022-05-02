import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import PersonalInfo from "../components/PersonalInfo";
import SecuritySettings from "../components/SecuritySettings";
import { Link } from "react-router-dom";
import axios from "axios";
const Loginactivity = () => {
  const [activity, setActivity] = useState(true);
  const [personaInfo, setPersonalInfo] = useState(false);
  const [securitySettings, setSecuritySettings] = useState(false)
  const [logData, setLogData] = useState([])
  const [dt, setDt] = useState('')
  const email = localStorage.getItem("email")

  const getLoginLog = async()=>{

    try {
      const data = await axios.post('http://localhost:3001/api/loginhistory',{email: email})
      setLogData(data.data.login_record)
    } catch (error) {
      console.log(error);
    }
  }
  
   

  useEffect(()=>{
    getLoginLog()
  },[])
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
                          {securitySettings == true ? <SecuritySettings/> : null}
                        
                        {personaInfo == true && <PersonalInfo />}

                        {activity == true ? (
                          <div className="card-inner card-inner-lg">
                            <div className="nk-block-head nk-block-head-lg">
                              <div className="nk-block-between">
                                <div className="nk-block-head-content">
                                  <h4 className="nk-block-title">Login Activity</h4>
                                  <div className="nk-block-des">
                                    <p> {` Here is your last ${logData.length} login activities log.`}
                                     
                                      <span className="text-soft">
                                        <em className="icon ni ni-info"></em>
                                      </span>
                                    </p>
                                  </div>
                                </div>
                                <div className="nk-block-head-content align-self-start d-lg-none">
                                  <a
                                    href="#"
                                    className="toggle btn btn-icon btn-trigger mt-n1"
                                    data-target="userAside"
                                  >
                                    <em className="icon ni ni-menu-alt-r"></em>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="nk-block card card-bordered">
                              <table className="table table-ulogs">
                                <thead className="table-light">
                                  <tr>
                                    <th className="tb-col-os">
                                      <span className="overline-title">
                                        Browser
                                        <span className="d-sm-none">/ IP</span>
                                      </span>
                                    </th>
                                    <th className="tb-col-ip">
                                      <span className="overline-title">Device</span>
                                    </th>
                                    <th className="tb-col-ip">
                                      <span className="overline-title">IP</span>
                                    </th>
                                    <th className="tb-col-time">
                                      <span className="overline-title">Time</span>
                                    </th>
                                    <th className="tb-col-action">
                                      <span className="overline-title">&nbsp;</span>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                      logData.map((element, index)=>{
                                        const a = new Date(element.createdAt)
                                        return(
                                          <tr>
                                          <td className="tb-col-os">{element.browser_name}</td>
                                          <td className="tb-col-os">{element.request_device}</td>
                                          <td className="tb-col-ip">
                                            <span className="sub-text">
                                              {element.request_address}
                                            </span>
                                          </td>
                                          <td className="tb-col-time">
                                            <span className="sub-text">{a.toDateString() } {a.toLocaleTimeString()}</span>
                                          </td>
                                          <td className="tb-col-action">{}</td>
                                        </tr>
                                        )
                                      })
                                  }

                                  
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ) : null}

                        <div
                          className="card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg"
                          data-toggle-body="true"
                          data-content="userAside"
                          data-toggle-screen="lg"
                          data-toggle-overlay="true"
                        >
                          <div className="card-inner-group">
                            <div className="card-inner">
                              <div className="user-card">
                                <div className="user-avatar bg-primary">
                                  <span>AB</span>
                                </div>
                                <div className="user-info">
                                  <span className="lead-text">
                                    Abu Bin Ishtiyak
                                  </span>
                                  <span className="sub-text">info@softnio.com</span>
                                </div>
                                <div className="user-action">
                                  <div className="dropdown">
                                    <a
                                      className="btn btn-icon btn-trigger me-n2"
                                      data-bs-toggle="dropdown"
                                      href="#"
                                    >
                                      <em className="icon ni ni-more-v"></em>
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
                                </div>
                              </div>
                            </div>
                            <div className="card-inner">
                              <div className="user-account-info py-0">
                                <h6 className="overline-title-alt">
                                  Nio Wallet Account
                                </h6>
                                <div className="user-balance">
                                  12.395769
                                  <small className="currency currency-btc">
                                    BTC
                                  </small>
                                </div>
                                <div className="user-balance-sub">
                                  Locked
                                  <span>
                                    0.344939
                                    <span className="currency currency-btc">
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
                                    onClick={() => {
                                      setPersonalInfo(true);
                                      setActivity(false);
                                      setSecuritySettings(false);
                                    }}
                                  >
                                    <em className="icon ni ni-user-fill-c"></em>
                                    <span>Personal Infomation</span>
                                  </Link>
                                </li>
                                <li>
                                  <a href="/demo5/user-profile-notification.html">
                                    <em className="icon ni ni-bell-fill"></em>
                                    <span>Notifications</span>
                                  </a>
                                </li>
                                <li>
                                  <Link className="active" to="#">
                                    <em className="icon ni ni-activity-round-fill"></em>
                                    <span
                                      onClick={() => {
                                        setActivity(true);
                                        setPersonalInfo(false);
                                        setSecuritySettings(false);
                                      }}
                                    >
                                      Account Activity
                                    </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#" onClick={()=> {
                                    setSecuritySettings(true);
                                    setActivity(false);
                                    setPersonalInfo(false);
                                  }}>
                                    <em className="icon ni ni-lock-alt-fill"></em>
                                    <span>Security Settings</span>
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

export default Loginactivity;

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import PersonalInfo from "../components/PersonalInfo";
import SecuritySettings from "../components/SecuritySettings";
import { Link } from "react-router-dom";
const Loginactivity = () => {
  const [activity, setActivity] = useState(true);
  const [personaInfo, setPersonalInfo] = useState(false);
  const [securitySettings, setSecuritySettings] = useState(false)
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
                                    <p>
                                      Here is your last 20 login activities log.
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
                                  <tr>
                                    <td className="tb-col-os">Chrome on Window</td>
                                    <td className="tb-col-ip">
                                      <span className="sub-text">
                                        192.149.122.128
                                      </span>
                                    </td>
                                    <td className="tb-col-time">
                                      <span className="sub-text">11:34 PM</span>
                                    </td>
                                    <td className="tb-col-action"></td>
                                  </tr>
                                  <tr>
                                    <td className="tb-col-os">Mozilla on Window</td>
                                    <td className="tb-col-ip">
                                      <span className="sub-text">
                                        86.188.154.225
                                      </span>
                                    </td>
                                    <td className="tb-col-time">
                                      <span className="sub-text">
                                        Nov 20, 2019
                                        <span className="d-none d-sm-inline-block">
                                          10:34 PM
                                        </span>
                                      </span>
                                    </td>
                                    <td className="tb-col-action">
                                      <a href="#" className="link-cross me-sm-n1">
                                        <em className="icon ni ni-cross"></em>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="tb-col-os">Chrome on iMac</td>
                                    <td className="tb-col-ip">
                                      <span className="sub-text">
                                        192.149.122.128
                                      </span>
                                    </td>
                                    <td className="tb-col-time">
                                      <span className="sub-text">
                                        Nov 12, 2019
                                        <span className="d-none d-sm-inline-block">
                                          08:56 PM
                                        </span>
                                      </span>
                                    </td>
                                    <td className="tb-col-action">
                                      <a href="#" className="link-cross me-sm-n1">
                                        <em className="icon ni ni-cross"></em>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="tb-col-os">Chrome on Window</td>
                                    <td className="tb-col-ip">
                                      <span className="sub-text">
                                        192.149.122.128
                                      </span>
                                    </td>
                                    <td className="tb-col-time">
                                      <span className="sub-text">
                                        Nov 03, 2019
                                        <span className="d-none d-sm-inline-block">
                                          04:29 PM
                                        </span>
                                      </span>
                                    </td>
                                    <td className="tb-col-action">
                                      <a href="#" className="link-cross me-sm-n1">
                                        <em className="icon ni ni-cross"></em>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="tb-col-os">Mozilla on Window</td>
                                    <td className="tb-col-ip">
                                      <span className="sub-text">
                                        86.188.154.225
                                      </span>
                                    </td>
                                    <td className="tb-col-time">
                                      <span className="sub-text">
                                        Oct 29, 2019
                                        <span className="d-none d-sm-inline-block">
                                          09:38 AM
                                        </span>
                                      </span>
                                    </td>
                                    <td className="tb-col-action">
                                      <a href="#" className="link-cross me-sm-n1">
                                        <em className="icon ni ni-cross"></em>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="tb-col-os">Chrome on iMac</td>
                                    <td className="tb-col-ip">
                                      <span className="sub-text">
                                        192.149.122.128
                                      </span>
                                    </td>
                                    <td className="tb-col-time">
                                      <span className="sub-text">
                                        Oct 23, 2019
                                        <span className="d-none d-sm-inline-block">
                                          04:16 PM
                                        </span>
                                      </span>
                                    </td>
                                    <td className="tb-col-action">
                                      <a href="#" className="link-cross me-sm-n1">
                                        <em className="icon ni ni-cross"></em>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="tb-col-os">Chrome on Window</td>
                                    <td className="tb-col-ip">
                                      <span className="sub-text">
                                        192.149.122.128
                                      </span>
                                    </td>
                                    <td className="tb-col-time">
                                      <span className="sub-text">
                                        Oct 15, 2019
                                        <span className="d-none d-sm-inline-block">
                                          11:41 PM
                                        </span>
                                      </span>
                                    </td>
                                    <td className="tb-col-action">
                                      <a href="#" className="link-cross me-sm-n1">
                                        <em className="icon ni ni-cross"></em>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="tb-col-os">Mozilla on Window</td>
                                    <td className="tb-col-ip">
                                      <span className="sub-text">
                                        86.188.154.225
                                      </span>
                                    </td>
                                    <td className="tb-col-time">
                                      <span className="sub-text">
                                        Oct 13, 2019
                                        <span className="d-none d-sm-inline-block">
                                          05:43 AM
                                        </span>
                                      </span>
                                    </td>
                                    <td className="tb-col-action">
                                      <a href="#" className="link-cross me-sm-n1">
                                        <em className="icon ni ni-cross"></em>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="tb-col-os">Chrome on iMac</td>
                                    <td className="tb-col-ip">
                                      <span className="sub-text">
                                        192.149.122.128
                                      </span>
                                    </td>
                                    <td className="tb-col-time">
                                      <span className="sub-text">
                                        Oct 03, 2019
                                        <span className="d-none d-sm-inline-block">
                                          04:12 AM
                                        </span>
                                      </span>
                                    </td>
                                    <td className="tb-col-action">
                                      <a href="#" className="link-cross me-sm-n1">
                                        <em className="icon ni ni-cross"></em>
                                      </a>
                                    </td>
                                  </tr>
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

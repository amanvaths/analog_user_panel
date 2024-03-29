import React, { Component } from "react";
import { Link } from "react-router-dom";
class Menu extends React.Component {
  render() {
    return (
      <>
        <div
          className="nk-sidebar nk-sidebar-fixed "
          data-content="sidebarMenu"
        >
          <div className="nk-sidebar-element nk-sidebar-head">
            <div className="nk-sidebar-brand">
              <a
                href="html/crypto/index.html"
                className="logo-link nk-sidebar-logo"
              >
                <img
                  className="logo-light logo-img"
                  src="images/logo.png"
                  srcSet="images/logo2x.png 2x"
                  alt="logo"
                />
                <img
                  className="logo-dark logo-img"
                  src="images/logo-dark.png"
                  srcSet="images/logo-dark2x.png 2x"
                  alt="logo-dark"
                />
                {/* <span className="nio-version">ANALOG</span> */}
              </a>
            </div>
            <div className="nk-menu-trigger mr-n2">
              <a
                href="#"
                className="nk-nav-toggle nk-quick-nav-icon d-xl-none"
                data-target="sidebarMenu"
              >
                <em className="icon ni ni-arrow-left"></em>
              </a>
            </div>
          </div>
          <div className="nk-sidebar-element">
            <div className="nk-sidebar-body" data-simplebar>
              <div className="nk-sidebar-content">
                <div className="nk-sidebar-widget d-none d-xl-block">
                  <div className="user-account-info between-center">
                    <div className="user-account-main">
                      <h6 className="overline-title-alt " style={{paddingBottom:14}}>Available Balance</h6>
                      <div className="user-balance">
                        2.014095{" "}
                        <small className="currency currency-btc">ANA</small>
                      </div>
                      <div className="user-balance-alt">
                        18,934.84{" "}
                        <span className="currency currency-btc">USD</span>
                      </div>
                    </div>
                    <a href="#" className="btn btn-white btn-icon btn-light">
                      <em className="icon ni ni-line-chart"></em>
                    </a>
                  </div>
                  <ul className="user-account-data gy-1">
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
                  </ul>
                  {/* <div className="user-account-actions">
                                <ul className="g-3">
                                    <li><a href="#" className="btn btn-lg btn-primary"><span>Deposit</span></a></li>
                                    <li><a href="#" className="btn btn-lg btn-warning"><span>Withdraw</span></a></li>
                                </ul>
                            </div> */}
                </div>
                <div className="nk-sidebar-widget nk-sidebar-widget-full d-xl-none pt-0">
                  <a
                    className="nk-profile-toggle toggle-expand"
                    data-target="sidebarProfile"
                    href="#"
                  >
                    <div className="user-card-wrap">
                      <div className="user-card">
                        <div className="user-avatar">
                          <span>AB</span>
                        </div>
                        <div className="user-info">
                          <span className="lead-text">
                            Ia5ghTL2paqchJTR65nBKvZ
                          </span>
                          <span className="sub-text">user@inrx.network</span>
                        </div>
                        <div className="user-action">
                          <em className="icon ni ni-chevron-down"></em>
                        </div>
                      </div>
                    </div>
                  </a>
                  <div
                    className="nk-profile-content toggle-expand-content"
                    data-content="sidebarProfile"
                  >
                    <div className="user-account-info between-center">
                      <div className="user-account-main">
                        <h6 className="overline-title-alt">
                          Available Balance
                        </h6>
                        <div className="user-balance">
                          2.014095{" "}
                          <small className="currency currency-btc">ANA</small>
                        </div>
                        <div className="user-balance-alt">
                          18,934.84{" "}
                          <span className="currency currency-btc">USD</span>
                        </div>
                      </div>
                      <a href="#" className="btn btn-icon btn-light">
                        <em className="icon ni ni-line-chart"></em>
                      </a>
                    </div>
                    <ul className="user-account-data">
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
                          <span className="sub-text text-base">
                            0.005400{" "}
                            <span className="currency currency-btc">BTC</span>
                          </span>
                        </div>
                      </li>
                    </ul>
                    <ul className="user-account-links">
                      <li>
                        <a href="#" className="link">
                          <span>Withdraw Funds</span>{" "}
                          <em className="icon ni ni-wallet-out"></em>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="link">
                          <span>Deposit Funds</span>{" "}
                          <em className="icon ni ni-wallet-in"></em>
                        </a>
                      </li>
                    </ul>
                    <ul className="link-list">
                      <li>
                        <a href="html/crypto/profile.html">
                          <em className="icon ni ni-user-alt"></em>
                          <span>View Profile</span>
                        </a>
                      </li>
                      <li>
                        <a href="html/crypto/profile-security.html">
                          <em className="icon ni ni-setting-alt"></em>
                          <span>Account Setting</span>
                        </a>
                      </li>
                      <li>
                        <a href="html/crypto/profile-activity.html">
                          <em className="icon ni ni-activity-alt"></em>
                          <span>Login Activity</span>
                        </a>
                      </li>
                    </ul>
                    <ul className="link-list">
                      <li>
                        <a href="#">
                          <em className="icon ni ni-signout"></em>
                          <span>Sign out</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="nk-sidebar-menu">
                  <ul className="nk-menu">
                    <li className="nk-menu-heading">
                      <h6 className="overline-title">Inceptive</h6>
                    </li>
                    <li className="nk-menu-item">
                      <Link to="/home" className="nk-menu-link">
                        <span className="nk-menu-icon">
                          <em className="icon ni ni-dashboard"></em>
                        </span>
                        <span className="nk-menu-text">Dashboard</span>
                      </Link>
                    </li>
                    <li class="nk-menu-item">
                      <a href="html/crypto/wallets.html" class="nk-menu-link">
                        <span class="nk-menu-icon">
                          <em class="icon ni ni-user-c"></em>
                        </span>
                        <span className="nk-menu-text">My Account</span>
                      </a>
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
                    <li className="nk-menu-item">
                      <a
                        href="html/crypto/order-history.html"
                        className="nk-menu-link"
                      >
                        <span className="nk-menu-icon">
                          <em className="icon ni ni-repeat"></em>
                        </span>
                        <span className="nk-menu-text">Orders</span>
                      </a>
                    </li>
                    <li className="nk-menu-item">
                      <a href="html/crypto/chats.html" className="nk-menu-link">
                        <span className="nk-menu-icon">
                          <em className="icon ni ni-chat-circle"></em>
                        </span>
                        <span className="nk-menu-text">Chats</span>
                      </a>
                    </li>

                    <li className="nk-menu-item has-sub">
                      <a href="#" className="nk-menu-link nk-menu-toggle">
                        <span className="nk-menu-icon">
                          <em className="icon ni ni-files"></em>
                        </span>
                        <span className="nk-menu-text">Additional Pages</span>
                      </a>
                      <ul className="nk-menu-sub">
                        <li className="nk-menu-item">
                          <a
                            href="html/crypto/welcome.html"
                            className="nk-menu-link"
                          >
                            <span className="nk-menu-text">Welcome</span>
                          </a>
                        </li>
                        <li className="nk-menu-item">
                          <a
                            href="html/crypto/kyc-application.html"
                            className="nk-menu-link"
                          >
                            <span className="nk-menu-text">
                              KYC - Get Started
                            </span>
                          </a>
                        </li>
                        <li className="nk-menu-item">
                          <a
                            href="html/crypto/kyc-form.html"
                            className="nk-menu-link"
                          >
                            <span className="nk-menu-text">
                              KYC - Application Form
                            </span>
                          </a>
                        </li>
                      </ul>
                    </li>
                    {/* Add Line */}

                    <li class="nk-menu-item">
                      <Link to="/userlist" class="nk-menu-link">
                        <span class="nk-menu-icon">
                          <em class="icon ni ni-user-circle"></em>
                        </span>
                        <span class="nk-menu-text">Affiliate</span>
                      </Link>
                    </li>
                    <li className="nk-menu-heading">
                      <h6 className="overline-title">Fundamentals</h6>
                    </li>
                    <li className="nk-menu-item">
                      <a href="html/index.html" className="nk-menu-link">
                        <span className="nk-menu-icon">
                          <em className="icon ni ni-dashlite"></em>
                        </span>
                        <span className="nk-menu-text">Energy</span>
                      </a>
                    </li>
                    <li className="nk-menu-item">
                      <a href="html/components.html" className="nk-menu-link">
                        <span className="nk-menu-icon">
                          <em className="icon ni ni-layers"></em>
                        </span>
                        <span className="nk-menu-text">Radiation</span>
                      </a>
                    </li>
                    <li className="nk-menu-item">
                      <a href="html/components.html" className="nk-menu-link">
                        <span className="nk-menu-icon">
                          <em className="icon ni ni-layers"></em>
                        </span>
                        <span className="nk-menu-text">Shield</span>
                      </a>
                    </li>
                    <li className="nk-menu-item">
                      <a href="html/components.html" className="nk-menu-link">
                        <span className="nk-menu-icon">
                          <em className="icon ni ni-layers"></em>
                        </span>
                        <span className="nk-menu-text">Salvage</span>
                      </a>
                    </li>
                    <li class="nk-menu-item">
                      <Link to="html/components.html" class="nk-menu-link">
                        <span class="nk-menu-icon">
                          <em class="icon ni ni-layers"></em>
                        </span>
                        <span class="nk-menu-text">Affiliate</span>
                      </Link>
                    </li>
                    <li className="nk-menu-item">
                      <a href="html/components.html" className="nk-menu-link">
                        <span className="nk-menu-icon">
                          <em className="icon ni ni-layers"></em>
                        </span>
                        <span className="nk-menu-text">Plebiscite</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="nk-sidebar-widget">
                  <div className="widget-title">
                    <h6 className="overline-title">
                      Crypto Accounts <span>(4)</span>
                    </h6>
                    <a href="#" className="link">
                      View All
                    </a>
                  </div>
                  <ul className="wallet-list">
                    <li className="wallet-item">
                      <a href="#">
                        <div className="wallet-icon">
                          <em className="icon ni ni-sign-kobo"></em>
                        </div>
                        <div className="wallet-text">
                          <h6 className="wallet-name">INRX Wallet</h6>
                          <span className="wallet-balance">
                            30.959040{" "}
                            <span className="currency currency-nio">ANA</span>
                          </span>
                        </div>
                      </a>
                    </li>
                    <li className="wallet-item">
                      <a href="#">
                        <div className="wallet-icon">
                          <em className="icon ni ni-sign-btc"></em>
                        </div>
                        <div className="wallet-text">
                          <h6 className="wallet-name">Bitcoin Wallet</h6>
                          <span className="wallet-balance">
                            0.0495950{" "}
                            <span className="currency currency-btc">BTC</span>
                          </span>
                        </div>
                      </a>
                    </li>
                    <li className="wallet-item wallet-item-add">
                      <a href="#">
                        <div className="wallet-icon">
                          <em className="icon ni ni-plus"></em>
                        </div>
                        <div className="wallet-text">
                          <h6 className="wallet-name">Add another wallet</h6>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="nk-sidebar-footer">
                  <ul className="nk-menu nk-menu-footer">
                    <li className="nk-menu-item">
                      <a href="#" className="nk-menu-link">
                        <span className="nk-menu-icon">
                          <em className="icon ni ni-help-alt"></em>
                        </span>
                        <span className="nk-menu-text">Support</span>
                      </a>
                    </li>

                    <li className="nk-menu-item ml-auto">
                      <div className="dropup">
                        <a
                          href="#"
                          className="nk-menu-link dropdown-indicator has-indicator"
                          data-toggle="dropdown"
                          data-offset="0,10"
                        >
                          <span className="nk-menu-icon">
                            <em className="icon ni ni-globe"></em>
                          </span>
                          <span className="nk-menu-text">English</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                          <ul className="language-list">
                            <li>
                              <a href="#" className="language-item">
                                <img
                                  src="images/flags/english.png"
                                  alt=""
                                  className="language-flag"
                                />
                                <span className="language-name">English</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="language-item">
                                <img
                                  src="images/flags/spanish.png"
                                  alt=""
                                  className="language-flag"
                                />
                                <span className="language-name">Español</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="language-item">
                                <img
                                  src="images/flags/french.png"
                                  alt=""
                                  className="language-flag"
                                />
                                <span className="language-name">Français</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="language-item">
                                <img
                                  src="images/flags/turkey.png"
                                  alt=""
                                  className="language-flag"
                                />
                                <span className="language-name">Türkçe</span>
                              </a>
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
}
export default Menu;

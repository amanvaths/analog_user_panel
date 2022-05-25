import React, {useEffect } from "react";
import Particles from "react-particles-js";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const AffiliateTable = () => {
  
    return (
      <div>
        <div className="nk-app-root">
          <div className="nk-main ">
            <Menu />

            <div className="nk-wrap ">
              <Header />

              <div className="nk-content ">

            
                <div className="container wide-xl">
                  <div className="nk-content-inner">
                    <div className="nk-content-body">
                      <div className="nk-content-wrap">
                        <div className="nk-block-head">
                          <div className="nk-block-between">
                            <div className="nk-block-head-content">
                              <h3 className="nk-block-title page-title">
                                Affiliate List
                              </h3>
                              <div className="nk-block-des text-soft">
                                <p>Level 1</p>
                              </div>
                            </div>
                            <div className="nk-block-head-content">
                              <div className="toggle-wrap nk-block-tools-toggle">
                                <a
                                  href="#"
                                  className="btn btn-icon btn-trigger toggle-expand mr-n1"
                                  data-target="pageMenu"
                                >
                                  <em className="icon ni ni-menu-alt-r"></em>
                                </a>
                                <div
                                  className="toggle-expand-content"
                                  data-content="pageMenu"
                                >
                                  {/* <ul className="nk-block-tools g-3">
                                    <li>
                                      <a
                                        href="#"
                                        className="btn btn-white btn-outline-light"
                                      >
                                        <em className="icon ni ni-download-cloud"></em>
                                        <span>Export</span>
                                      </a>
                                    </li>
                                    <li className="nk-block-tools-opt">
                                      <div className="drodown">
                                        <a
                                          href="#"
                                          className="dropdown-toggle btn btn-icon btn-primary"
                                          data-toggle="dropdown"
                                        >
                                          <em className="icon ni ni-plus"></em>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <ul className="link-list-opt no-bdr">
                                            <li>
                                              <a href="#">
                                                <span>Add User</span>
                                              </a>
                                            </li>
                                            <li>
                                              <a href="#">
                                                <span>Add Team</span>
                                              </a>
                                            </li>
                                            <li>
                                              <a href="#">
                                                <span>Import User</span>
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </li>
                                  </ul> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="nk-block">
                          <div className="card card-bordered card-stretch">
                            <div className="card-inner-group">
                              <div className="card-inner position-relative card-tools-toggle">
                                <div className="card-title-group">
                                  <div className="card-tools">
                                    <div className="form-inline flex-nowrap gx-3">
                                      <div className="form-wrap w-150px">
                                        <select
                                          className="form-select form-select-sm"
                                          data-search="off"
                                          data-placeholder="Bulk Action"
                                        >
                                          <option value="">Bulk Action</option>
                                          <option value="email">
                                            Send Email
                                          </option>
                                          <option value="group">
                                            Change Group
                                          </option>
                                          <option value="suspend">
                                            Suspend User
                                          </option>
                                          <option value="delete">
                                            Delete User
                                          </option>
                                        </select>
                                      </div>
                                      <div className="btn-wrap">
                                        <span className="d-none d-md-block">
                                          <button className="btn btn-dim btn-outline-light disabled">
                                            Apply
                                          </button>
                                        </span>
                                        <span className="d-md-none">
                                          <button className="btn btn-dim btn-outline-light btn-icon disabled">
                                            <em className="icon ni ni-arrow-right"></em>
                                          </button>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="card-tools mr-n1">
                                    <ul className="btn-toolbar gx-1">
                                      <li>
                                        <a
                                          href="#"
                                          className="btn btn-icon search-toggle toggle-search"
                                          data-target="search"
                                        >
                                          <em className="icon ni ni-search"></em>
                                        </a>
                                      </li>
                                      <li className="btn-toolbar-sep"></li>
                                      <li>
                                        <div className="toggle-wrap">
                                          <a
                                            href="#"
                                            className="btn btn-icon btn-trigger toggle"
                                            data-target="cardTools"
                                          >
                                            <em className="icon ni ni-menu-right"></em>
                                          </a>
                                          <div
                                            className="toggle-content"
                                            data-content="cardTools"
                                          >
                                            <ul className="btn-toolbar gx-1">
                                              <li className="toggle-close">
                                                <a
                                                  href="#"
                                                  className="btn btn-icon btn-trigger toggle"
                                                  data-target="cardTools"
                                                >
                                                  <em className="icon ni ni-arrow-left"></em>
                                                </a>
                                              </li>
                                              <li>
                                                <div className="dropdown">
                                                  <a
                                                    href="#"
                                                    className="btn btn-trigger btn-icon dropdown-toggle"
                                                    data-toggle="dropdown"
                                                  >
                                                    <div className="dot dot-primary"></div>
                                                    <em className="icon ni ni-filter-alt"></em>
                                                  </a>
                                                  <div className="filter-wg dropdown-menu dropdown-menu-xl dropdown-menu-right">
                                                    <div className="dropdown-head">
                                                      <span className="sub-title dropdown-title">
                                                        Filter Users
                                                      </span>
                                                      <div className="dropdown">
                                                        <a
                                                          href="#"
                                                          className="btn btn-sm btn-icon"
                                                        >
                                                          <em className="icon ni ni-more-h"></em>
                                                        </a>
                                                      </div>
                                                    </div>
                                                    <div className="dropdown-body dropdown-body-rg">
                                                      <div className="row gx-6 gy-3">
                                                        <div className="col-6">
                                                          <div className="custom-control custom-control-sm custom-checkbox">
                                                            <input
                                                              type="checkbox"
                                                              className="custom-control-input"
                                                              id="hasBalance"
                                                            />
                                                            <label
                                                              className="custom-control-label"
                                                              for="hasBalance"
                                                            >
                                                              {" "}
                                                              Have Balance
                                                            </label>
                                                          </div>
                                                        </div>
                                                        <div className="col-6">
                                                          <div className="custom-control custom-control-sm custom-checkbox">
                                                            <input
                                                              type="checkbox"
                                                              className="custom-control-input"
                                                              id="hasKYC"
                                                            />
                                                            <label
                                                              className="custom-control-label"
                                                              for="hasKYC"
                                                            >
                                                              {" "}
                                                              KYC Verified
                                                            </label>
                                                          </div>
                                                        </div>
                                                        <div className="col-6">
                                                          <div className="form-group">
                                                            <label className="overline-title overline-title-alt">
                                                              Role
                                                            </label>
                                                            <select className="form-select form-select-sm">
                                                              <option value="any">
                                                                Any Role
                                                              </option>
                                                              <option value="investor">
                                                                Investor
                                                              </option>
                                                              <option value="seller">
                                                                Seller
                                                              </option>
                                                              <option value="buyer">
                                                                Buyer
                                                              </option>
                                                            </select>
                                                          </div>
                                                        </div>
                                                        <div className="col-6">
                                                          <div className="form-group">
                                                            <label className="overline-title overline-title-alt">
                                                              Status
                                                            </label>
                                                            <select className="form-select form-select-sm">
                                                              <option value="any">
                                                                Any Status
                                                              </option>
                                                              <option value="active">
                                                                Active
                                                              </option>
                                                              <option value="pending">
                                                                Pending
                                                              </option>
                                                              <option value="suspend">
                                                                Suspend
                                                              </option>
                                                              <option value="deleted">
                                                                Deleted
                                                              </option>
                                                            </select>
                                                          </div>
                                                        </div>
                                                        <div className="col-12">
                                                          <div className="form-group">
                                                            <button
                                                              type="button"
                                                              className="btn btn-secondary"
                                                            >
                                                              Filter
                                                            </button>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div className="dropdown-foot between">
                                                      <a
                                                        className="clickable"
                                                        href="#"
                                                      >
                                                        Reset Filter
                                                      </a>
                                                      <a href="#">
                                                        Save Filter
                                                      </a>
                                                    </div>
                                                  </div>
                                                </div>
                                              </li>
                                              <li>
                                                <div className="dropdown">
                                                  <a
                                                    href="#"
                                                    className="btn btn-trigger btn-icon dropdown-toggle"
                                                    data-toggle="dropdown"
                                                  >
                                                    <em className="icon ni ni-setting"></em>
                                                  </a>
                                                  <div className="dropdown-menu dropdown-menu-xs dropdown-menu-right">
                                                    <ul className="link-check">
                                                      <li>
                                                        <span>Show</span>
                                                      </li>
                                                      <li className="active">
                                                        <a href="#">10</a>
                                                      </li>
                                                      <li>
                                                        <a href="#">20</a>
                                                      </li>
                                                      <li>
                                                        <a href="#">50</a>
                                                      </li>
                                                    </ul>
                                                    <ul className="link-check">
                                                      <li>
                                                        <span>Order</span>
                                                      </li>
                                                      <li className="active">
                                                        <a href="#">DESC</a>
                                                      </li>
                                                      <li>
                                                        <a href="#">ASC</a>
                                                      </li>
                                                    </ul>
                                                  </div>
                                                </div>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div
                                  className="card-search search-wrap"
                                  data-search="search"
                                >
                                  <div className="card-body">
                                    <div className="search-content">
                                      <a
                                        href="#"
                                        className="search-back btn btn-icon toggle-search"
                                        data-target="search"
                                      >
                                        <em className="icon ni ni-arrow-left"></em>
                                      </a>
                                      <input
                                        type="text"
                                        className="form-control border-transparent form-focus-none"
                                        placeholder="Search by user or email"
                                      />
                                      <button className="search-submit btn btn-icon">
                                        <em className="icon ni ni-search"></em>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="card-inner p-0">
                                <div className="nk-tb-list nk-tb-ulist is-compact">
                                  <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-md">
                                        <span className="">Sr No.</span>
                                        </div>
                                    <div className="nk-tb-col">
                                      <span className="sub-text">User ID</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span className="sub-text">Email</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-sm">
                                      <span className="sub-text">Amount</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span className="sub-text">Quantity</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span className="sub-text">Date</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span className="sub-text">Time</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      {/* <span className="sub-text">Balance</span> */}
                                    </div>
                                    <div className="nk-tb-col">
                                      {/* <span className="sub-text">
                                        Plebiscite
                                      </span> */}
                                    </div>
                                    <div className="nk-tb-col nk-tb-col-tools text-right">
                                      <div className="dropdown">
                                        <a
                                          href="#"
                                          className="btn btn-xs btn-outline-light btn-icon dropdown-toggle"
                                          data-toggle="dropdown"
                                          data-offset="0,5"
                                        >
                                          <em className="icon ni ni-plus"></em>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-xs dropdown-menu-right">
                                          <ul className="link-tidy sm no-bdr">
                                            <li>
                                              <div className="custom-control custom-control-sm custom-checkbox">
                                                <input
                                                  type="checkbox"
                                                  className="custom-control-input"
                                                  checked=""
                                                  id="bl"
                                                />
                                                <label
                                                  className="custom-control-label"
                                                  for="bl"
                                                >
                                                  Balance
                                                </label>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="custom-control custom-control-sm custom-checkbox">
                                                <input
                                                  type="checkbox"
                                                  className="custom-control-input"
                                                  checked=""
                                                  id="ph"
                                                />
                                                <label
                                                  className="custom-control-label"
                                                  for="ph"
                                                >
                                                  Phone
                                                </label>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="custom-control custom-control-sm custom-checkbox">
                                                <input
                                                  type="checkbox"
                                                  className="custom-control-input"
                                                  id="vri"
                                                />
                                                <label
                                                  className="custom-control-label"
                                                  for="vri"
                                                >
                                                  Verified
                                                </label>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="custom-control custom-control-sm custom-checkbox">
                                                <input
                                                  type="checkbox"
                                                  className="custom-control-input"
                                                  id="st"
                                                />
                                                <label
                                                  className="custom-control-label"
                                                  for="st"
                                                >
                                                  Status
                                                </label>
                                              </div>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="nk-tb-item">
                                    <div className="nk-tb-col tb-col-md">
                                    <span className="">1</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                    <span className="tb-lead">ANA99856</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>amitnadcab@gmail.com</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-sm">
                                      <span>8963248.00 ANA</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>10</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-sm">
                                      <span>25/10/23</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-sm">
                                      
                                          <span>10:50 PM</span>
                                        
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      {/* <span>10 Feb 2020</span> */}
                                    </div>
                                    <div className="nk-tb-col">
                                      {/* <span className="tb-status text-success">
                                        Active
                                      </span> */}
                                    </div>
                                    <div className="nk-tb-col nk-tb-col-tools">
                                      <ul className="nk-tb-actions gx-2">
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Wallet"
                                          >
                                            <em className="icon ni ni-wallet-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Send Email"
                                          >
                                            <em className="icon ni ni-mail-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Suspend"
                                          >
                                            <em className="icon ni ni-user-cross-fill"></em>
                                          </a>
                                        </li>
                                        <li>
                                          <div className="drodown">
                                            <a
                                              href="#"
                                              className="btn btn-sm btn-icon btn-trigger dropdown-toggle"
                                              data-toggle="dropdown"
                                            >
                                              <em className="icon ni ni-more-h"></em>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              <ul className="link-list-opt no-bdr">
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-eye"></em>
                                                    <span>View Details</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-repeat"></em>
                                                    <span>Orders</span>
                                                  </a>
                                                </li>
                                                <li className="divider"></li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-star"></em>
                                                    <span>Reset Pass</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-off"></em>
                                                    <span>Reset 2FA</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-na"></em>
                                                    <span>Suspend User</span>
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="nk-tb-item">
                                    <div className="nk-tb-col nk-tb-col-check">
                                      <div className="custom-control custom-control-sm custom-checkbox notext">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="uid2"
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="uid2"
                                        ></label>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col">
                                      <div className="user-card">
                                        <div className="user-avatar xs bg-warning">
                                          <span>PN</span>
                                        </div>
                                        <div className="user-name">
                                          <span className="tb-lead">
                                            Patrick Newman
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>Investor</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-sm">
                                      <span>patrick@example.com</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>+942 238-4474</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>United States</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <ul className="list-status">
                                        <li>
                                          <em className="icon text-success ni ni-check-circle"></em>{" "}
                                          <span>Email</span>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>06 Feb 2020</span>
                                    </div>
                                    <div className="nk-tb-col">
                                      <span className="tb-status text-success">
                                        Active
                                      </span>
                                    </div>
                                    <div className="nk-tb-col nk-tb-col-tools">
                                      <ul className="nk-tb-actions gx-2">
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Wallet"
                                          >
                                            <em className="icon ni ni-wallet-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Send Email"
                                          >
                                            <em className="icon ni ni-mail-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Suspend"
                                          >
                                            <em className="icon ni ni-user-cross-fill"></em>
                                          </a>
                                        </li>
                                        <li>
                                          <div className="drodown">
                                            <a
                                              href="#"
                                              className="btn btn-sm btn-icon btn-trigger dropdown-toggle"
                                              data-toggle="dropdown"
                                            >
                                              <em className="icon ni ni-more-h"></em>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              <ul className="link-list-opt no-bdr">
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-eye"></em>
                                                    <span>View Details</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-repeat"></em>
                                                    <span>Orders</span>
                                                  </a>
                                                </li>
                                                <li className="divider"></li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-star"></em>
                                                    <span>Reset Pass</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-off"></em>
                                                    <span>Reset 2FA</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-na"></em>
                                                    <span>Suspend User</span>
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="nk-tb-item">
                                    <div className="nk-tb-col nk-tb-col-check">
                                      <div className="custom-control custom-control-sm custom-checkbox notext">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="uid3"
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="uid3"
                                        ></label>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col">
                                      <div className="user-card">
                                        <div className="user-avatar xs bg-success">
                                          <span>HK</span>
                                        </div>
                                        <div className="user-name">
                                          <span className="tb-lead">
                                            Howard Kennedy
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>Customer</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-sm">
                                      <span>howard@example.com</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>+447 595-6725</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>England</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <ul className="list-status">
                                        <li>
                                          <em className="icon text-info ni ni-alarm-alt"></em>{" "}
                                          <span>Email</span>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>01 Feb 2020</span>
                                    </div>
                                    <div className="nk-tb-col">
                                      <span className="tb-status text-warning">
                                        Pending
                                      </span>
                                    </div>
                                    <div className="nk-tb-col nk-tb-col-tools">
                                      <ul className="nk-tb-actions gx-2">
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Wallet"
                                          >
                                            <em className="icon ni ni-wallet-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Send Email"
                                          >
                                            <em className="icon ni ni-mail-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Suspend"
                                          >
                                            <em className="icon ni ni-user-cross-fill"></em>
                                          </a>
                                        </li>
                                        <li>
                                          <div className="drodown">
                                            <a
                                              href="#"
                                              className="btn btn-sm btn-icon btn-trigger dropdown-toggle"
                                              data-toggle="dropdown"
                                            >
                                              <em className="icon ni ni-more-h"></em>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              <ul className="link-list-opt no-bdr">
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-eye"></em>
                                                    <span>View Details</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-repeat"></em>
                                                    <span>Orders</span>
                                                  </a>
                                                </li>
                                                <li className="divider"></li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-star"></em>
                                                    <span>Reset Pass</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-off"></em>
                                                    <span>Reset 2FA</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-na"></em>
                                                    <span>Suspend User</span>
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="nk-tb-item">
                                    <div className="nk-tb-col nk-tb-col-check">
                                      <div className="custom-control custom-control-sm custom-checkbox notext">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="uid4"
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="uid4"
                                        ></label>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col">
                                      <div className="user-card">
                                        <div className="user-avatar xs bg-purple">
                                          <span>AB</span>
                                        </div>
                                        <div className="user-name">
                                          <span className="tb-lead">
                                            Albert Brown
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>Subscriber</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-sm">
                                      <span>howard@example.com</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>+408 595-6725</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>United States</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <ul className="list-status">
                                        <li>
                                          <em className="icon ni ni-alert-circle"></em>{" "}
                                          <span>Email</span>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>31 Jan 2020</span>
                                    </div>
                                    <div className="nk-tb-col">
                                      <span className="tb-status text-success">
                                        Active
                                      </span>
                                    </div>
                                    <div className="nk-tb-col nk-tb-col-tools">
                                      <ul className="nk-tb-actions gx-2">
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Wallet"
                                          >
                                            <em className="icon ni ni-wallet-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Send Email"
                                          >
                                            <em className="icon ni ni-mail-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Suspend"
                                          >
                                            <em className="icon ni ni-user-cross-fill"></em>
                                          </a>
                                        </li>
                                        <li>
                                          <div className="drodown">
                                            <a
                                              href="#"
                                              className="btn btn-sm btn-icon btn-trigger dropdown-toggle"
                                              data-toggle="dropdown"
                                            >
                                              <em className="icon ni ni-more-h"></em>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              <ul className="link-list-opt no-bdr">
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-eye"></em>
                                                    <span>View Details</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-repeat"></em>
                                                    <span>Orders</span>
                                                  </a>
                                                </li>
                                                <li className="divider"></li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-star"></em>
                                                    <span>Reset Pass</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-off"></em>
                                                    <span>Reset 2FA</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-na"></em>
                                                    <span>Suspend User</span>
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="nk-tb-item">
                                    <div className="nk-tb-col nk-tb-col-check">
                                      <div className="custom-control custom-control-sm custom-checkbox notext">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="uid5"
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="uid5"
                                        ></label>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col">
                                      <div className="user-card">
                                        <div className="user-avatar xs bg-danger">
                                          <span>BH</span>
                                        </div>
                                        <div className="user-name">
                                          <span className="tb-lead">
                                            Brian Hunter
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>Manager</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-sm">
                                      <span>brian@example.com</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>+811 521-6695</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>Bangladesh</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <ul className="list-status">
                                        <li>
                                          <em className="icon text-success ni ni-check-circle"></em>{" "}
                                          <span>Email</span>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>28 Jan 2020</span>
                                    </div>
                                    <div className="nk-tb-col">
                                      <span className="tb-status text-info">
                                        Inactive
                                      </span>
                                    </div>
                                    <div className="nk-tb-col nk-tb-col-tools">
                                      <ul className="nk-tb-actions gx-2">
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Wallet"
                                          >
                                            <em className="icon ni ni-wallet-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Send Email"
                                          >
                                            <em className="icon ni ni-mail-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Suspend"
                                          >
                                            <em className="icon ni ni-user-cross-fill"></em>
                                          </a>
                                        </li>
                                        <li>
                                          <div className="drodown">
                                            <a
                                              href="#"
                                              className="btn btn-sm btn-icon btn-trigger dropdown-toggle"
                                              data-toggle="dropdown"
                                            >
                                              <em className="icon ni ni-more-h"></em>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              <ul className="link-list-opt no-bdr">
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-eye"></em>
                                                    <span>View Details</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-repeat"></em>
                                                    <span>Orders</span>
                                                  </a>
                                                </li>
                                                <li className="divider"></li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-star"></em>
                                                    <span>Reset Pass</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-off"></em>
                                                    <span>Reset 2FA</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-na"></em>
                                                    <span>Suspend User</span>
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="nk-tb-item">
                                    <div className="nk-tb-col nk-tb-col-check">
                                      <div className="custom-control custom-control-sm custom-checkbox notext">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="uid6"
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="uid6"
                                        ></label>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col">
                                      <div className="user-card">
                                        <div className="user-avatar xs bg-dark">
                                          <span>TS</span>
                                        </div>
                                        <div className="user-name">
                                          <span className="tb-lead">
                                            Timothy Silva
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>Investor</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-sm">
                                      <span>timothy@example.com</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>+91 411-5392</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>India</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <ul className="list-status">
                                        <li>
                                          <em className="icon text-success ni ni-check-circle"></em>{" "}
                                          <span>Email</span>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>26 Jan 2020</span>
                                    </div>
                                    <div className="nk-tb-col">
                                      <span className="tb-status text-info">
                                        Inactive
                                      </span>
                                    </div>
                                    <div className="nk-tb-col nk-tb-col-tools">
                                      <ul className="nk-tb-actions gx-2">
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Wallet"
                                          >
                                            <em className="icon ni ni-wallet-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Send Email"
                                          >
                                            <em className="icon ni ni-mail-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Suspend"
                                          >
                                            <em className="icon ni ni-user-cross-fill"></em>
                                          </a>
                                        </li>
                                        <li>
                                          <div className="drodown">
                                            <a
                                              href="#"
                                              className="btn btn-sm btn-icon btn-trigger dropdown-toggle"
                                              data-toggle="dropdown"
                                            >
                                              <em className="icon ni ni-more-h"></em>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              <ul className="link-list-opt no-bdr">
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-eye"></em>
                                                    <span>View Details</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-repeat"></em>
                                                    <span>Orders</span>
                                                  </a>
                                                </li>
                                                <li className="divider"></li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-star"></em>
                                                    <span>Reset Pass</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-off"></em>
                                                    <span>Reset 2FA</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-na"></em>
                                                    <span>Suspend User</span>
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="nk-tb-item">
                                    <div className="nk-tb-col nk-tb-col-check">
                                      <div className="custom-control custom-control-sm custom-checkbox notext">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="uid7"
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="uid7"
                                        ></label>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col">
                                      <div className="user-card">
                                        <div className="user-avatar xs bg-success">
                                          <span>JC</span>
                                        </div>
                                        <div className="user-name">
                                          <span className="tb-lead">
                                            Janice Cooper
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>Investor</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-sm">
                                      <span>janice@example.com</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>+91 483-6614</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>India</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <ul className="list-status">
                                        <li>
                                          <em className="icon text-warning ni ni-alarm-alt"></em>{" "}
                                          <span>Email</span>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>21 Jan 2020</span>
                                    </div>
                                    <div className="nk-tb-col">
                                      <span className="tb-status text-danger">
                                        Suspend
                                      </span>
                                    </div>
                                    <div className="nk-tb-col nk-tb-col-tools">
                                      <ul className="nk-tb-actions gx-2">
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Wallet"
                                          >
                                            <em className="icon ni ni-wallet-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Send Email"
                                          >
                                            <em className="icon ni ni-mail-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Suspend"
                                          >
                                            <em className="icon ni ni-user-cross-fill"></em>
                                          </a>
                                        </li>
                                        <li>
                                          <div className="drodown">
                                            <a
                                              href="#"
                                              className="btn btn-sm btn-icon btn-trigger dropdown-toggle"
                                              data-toggle="dropdown"
                                            >
                                              <em className="icon ni ni-more-h"></em>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              <ul className="link-list-opt no-bdr">
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-eye"></em>
                                                    <span>View Details</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-repeat"></em>
                                                    <span>Orders</span>
                                                  </a>
                                                </li>
                                                <li className="divider"></li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-star"></em>
                                                    <span>Reset Pass</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-off"></em>
                                                    <span>Reset 2FA</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-na"></em>
                                                    <span>Suspend User</span>
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="nk-tb-item">
                                    <div className="nk-tb-col nk-tb-col-check">
                                      <div className="custom-control custom-control-sm custom-checkbox notext">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="uid8"
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="uid8"
                                        ></label>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col">
                                      <div className="user-card">
                                        <div className="user-avatar xs bg-dark">
                                          <span>EC</span>
                                        </div>
                                        <div className="user-name">
                                          <span className="tb-lead">
                                            Elizabeth Carter
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>Customer</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-sm">
                                      <span>elizabeth93@example.com</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>+862 507-4068</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>China</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <ul className="list-status">
                                        <li>
                                          <em className="icon text-info ni ni-alarm-alt"></em>{" "}
                                          <span>Email</span>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>21 Jan 2020</span>
                                    </div>
                                    <div className="nk-tb-col">
                                      <span className="tb-status text-success">
                                        Active
                                      </span>
                                    </div>
                                    <div className="nk-tb-col nk-tb-col-tools">
                                      <ul className="nk-tb-actions gx-2">
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Wallet"
                                          >
                                            <em className="icon ni ni-wallet-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Send Email"
                                          >
                                            <em className="icon ni ni-mail-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Suspend"
                                          >
                                            <em className="icon ni ni-user-cross-fill"></em>
                                          </a>
                                        </li>
                                        <li>
                                          <div className="drodown">
                                            <a
                                              href="#"
                                              className="btn btn-sm btn-icon btn-trigger dropdown-toggle"
                                              data-toggle="dropdown"
                                            >
                                              <em className="icon ni ni-more-h"></em>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              <ul className="link-list-opt no-bdr">
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-eye"></em>
                                                    <span>View Details</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-repeat"></em>
                                                    <span>Orders</span>
                                                  </a>
                                                </li>
                                                <li className="divider"></li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-star"></em>
                                                    <span>Reset Pass</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-off"></em>
                                                    <span>Reset 2FA</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-na"></em>
                                                    <span>Suspend User</span>
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="nk-tb-item">
                                    <div className="nk-tb-col nk-tb-col-check">
                                      <div className="custom-control custom-control-sm custom-checkbox notext">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="uid9"
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="uid9"
                                        ></label>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col">
                                      <div className="user-card">
                                        <div className="user-avatar xs bg-warning">
                                          <span>LN</span>
                                        </div>
                                        <div className="user-name">
                                          <span className="tb-lead">
                                            Lori Newman
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>Investor</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-sm">
                                      <span>newman@example.com</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>+123 287-2360</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>United States</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <ul className="list-status">
                                        <li>
                                          <em className="icon text-info ni ni-alarm-alt"></em>{" "}
                                          <span>Email</span>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>18 Jan 2020</span>
                                    </div>
                                    <div className="nk-tb-col">
                                      <span className="tb-status text-success">
                                        Active
                                      </span>
                                    </div>
                                    <div className="nk-tb-col nk-tb-col-tools">
                                      <ul className="nk-tb-actions gx-2">
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Wallet"
                                          >
                                            <em className="icon ni ni-wallet-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Send Email"
                                          >
                                            <em className="icon ni ni-mail-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Suspend"
                                          >
                                            <em className="icon ni ni-user-cross-fill"></em>
                                          </a>
                                        </li>
                                        <li>
                                          <div className="drodown">
                                            <a
                                              href="#"
                                              className="btn btn-sm btn-icon btn-trigger dropdown-toggle"
                                              data-toggle="dropdown"
                                            >
                                              <em className="icon ni ni-more-h"></em>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              <ul className="link-list-opt no-bdr">
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-eye"></em>
                                                    <span>View Details</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-repeat"></em>
                                                    <span>Orders</span>
                                                  </a>
                                                </li>
                                                <li className="divider"></li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-star"></em>
                                                    <span>Reset Pass</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-off"></em>
                                                    <span>Reset 2FA</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-na"></em>
                                                    <span>Suspend User</span>
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="nk-tb-item">
                                    <div className="nk-tb-col nk-tb-col-check">
                                      <div className="custom-control custom-control-sm custom-checkbox notext">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="uid10"
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="uid10"
                                        ></label>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col">
                                      <div className="user-card">
                                        <div className="user-avatar xs bg-success">
                                          <span>AC</span>
                                        </div>
                                        <div className="user-name">
                                          <span className="tb-lead">
                                            Alice Contreras
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>Manager</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-sm">
                                      <span>alice92@example.com</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>+123 751-5981</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>United States</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <ul className="list-status">
                                        <li>
                                          <em className="icon text-success ni ni-check-circle"></em>{" "}
                                          <span>Email</span>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>11 Jan 2020</span>
                                    </div>
                                    <div className="nk-tb-col">
                                      <span className="tb-status text-success">
                                        Active
                                      </span>
                                    </div>
                                    <div className="nk-tb-col nk-tb-col-tools">
                                      <ul className="nk-tb-actions gx-2">
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Wallet"
                                          >
                                            <em className="icon ni ni-wallet-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Send Email"
                                          >
                                            <em className="icon ni ni-mail-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Suspend"
                                          >
                                            <em className="icon ni ni-user-cross-fill"></em>
                                          </a>
                                        </li>
                                        <li>
                                          <div className="drodown">
                                            <a
                                              href="#"
                                              className="btn btn-sm btn-icon btn-trigger dropdown-toggle"
                                              data-toggle="dropdown"
                                            >
                                              <em className="icon ni ni-more-h"></em>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              <ul className="link-list-opt no-bdr">
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-eye"></em>
                                                    <span>View Details</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-repeat"></em>
                                                    <span>Orders</span>
                                                  </a>
                                                </li>
                                                <li className="divider"></li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-star"></em>
                                                    <span>Reset Pass</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-off"></em>
                                                    <span>Reset 2FA</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-na"></em>
                                                    <span>Suspend User</span>
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="nk-tb-item">
                                    <div className="nk-tb-col nk-tb-col-check">
                                      <div className="custom-control custom-control-sm custom-checkbox notext">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="uid11"
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="uid11"
                                        ></label>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col">
                                      <div className="user-card">
                                        <div className="user-avatar xs bg-primary">
                                          <span>JG</span>
                                        </div>
                                        <div className="user-name">
                                          <span className="tb-lead">
                                            Jesse Guzman
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>Customer</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-sm">
                                      <span>guzman@example.com</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>+842 842-2621</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>Vietnam</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <ul className="list-status">
                                        <li>
                                          <em className="icon text-success ni ni-check-circle"></em>{" "}
                                          <span>Email</span>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>10 Jan 2020</span>
                                    </div>
                                    <div className="nk-tb-col">
                                      <span className="tb-status text-success">
                                        Active
                                      </span>
                                    </div>
                                    <div className="nk-tb-col nk-tb-col-tools">
                                      <ul className="nk-tb-actions gx-2">
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Wallet"
                                          >
                                            <em className="icon ni ni-wallet-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Send Email"
                                          >
                                            <em className="icon ni ni-mail-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Suspend"
                                          >
                                            <em className="icon ni ni-user-cross-fill"></em>
                                          </a>
                                        </li>
                                        <li>
                                          <div className="drodown">
                                            <a
                                              href="#"
                                              className="btn btn-sm btn-icon btn-trigger dropdown-toggle"
                                              data-toggle="dropdown"
                                            >
                                              <em className="icon ni ni-more-h"></em>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              <ul className="link-list-opt no-bdr">
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-eye"></em>
                                                    <span>View Details</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-repeat"></em>
                                                    <span>Orders</span>
                                                  </a>
                                                </li>
                                                <li className="divider"></li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-star"></em>
                                                    <span>Reset Pass</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-off"></em>
                                                    <span>Reset 2FA</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-na"></em>
                                                    <span>Suspend User</span>
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="nk-tb-item">
                                    <div className="nk-tb-col nk-tb-col-check">
                                      <div className="custom-control custom-control-sm custom-checkbox notext">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="uid12"
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="uid12"
                                        ></label>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col">
                                      <div className="user-card">
                                        <div className="user-avatar xs bg-danger">
                                          <span>GB</span>
                                        </div>
                                        <div className="user-name">
                                          <span className="tb-lead">
                                            Gary Bishop
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>Customer</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-sm">
                                      <span>bishop@example.com</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>+651 979-7962</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>Singapore</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <ul className="list-status">
                                        <li>
                                          <em className="icon text-success ni ni-check-circle"></em>{" "}
                                          <span>Email</span>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>10 Jan 2020</span>
                                    </div>
                                    <div className="nk-tb-col">
                                      <span className="tb-status text-warning">
                                        Pending
                                      </span>
                                    </div>
                                    <div className="nk-tb-col nk-tb-col-tools">
                                      <ul className="nk-tb-actions gx-2">
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Wallet"
                                          >
                                            <em className="icon ni ni-wallet-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Send Email"
                                          >
                                            <em className="icon ni ni-mail-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Suspend"
                                          >
                                            <em className="icon ni ni-user-cross-fill"></em>
                                          </a>
                                        </li>
                                        <li>
                                          <div className="drodown">
                                            <a
                                              href="#"
                                              className="btn btn-sm btn-icon btn-trigger dropdown-toggle"
                                              data-toggle="dropdown"
                                            >
                                              <em className="icon ni ni-more-h"></em>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              <ul className="link-list-opt no-bdr">
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-eye"></em>
                                                    <span>View Details</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-repeat"></em>
                                                    <span>Orders</span>
                                                  </a>
                                                </li>
                                                <li className="divider"></li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-star"></em>
                                                    <span>Reset Pass</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-off"></em>
                                                    <span>Reset 2FA</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-na"></em>
                                                    <span>Suspend User</span>
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="nk-tb-item">
                                    <div className="nk-tb-col nk-tb-col-check">
                                      <div className="custom-control custom-control-sm custom-checkbox notext">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="uid13"
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="uid13"
                                        ></label>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col">
                                      <div className="user-card">
                                        <div className="user-avatar xs bg-dark">
                                          <span>WL</span>
                                        </div>
                                        <div className="user-name">
                                          <span className="tb-lead">
                                            Wayne Lewis
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>Customer</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-sm">
                                      <span>waynelewis@example.com</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>+632 979-7962</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>Philippines</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <ul className="list-status">
                                        <li>
                                          <em className="icon text-success ni ni-check-circle"></em>{" "}
                                          <span>Email</span>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>05 Jan 2020</span>
                                    </div>
                                    <div className="nk-tb-col">
                                      <span className="tb-status text-warning">
                                        Pending
                                      </span>
                                    </div>
                                    <div className="nk-tb-col nk-tb-col-tools">
                                      <ul className="nk-tb-actions gx-2">
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Wallet"
                                          >
                                            <em className="icon ni ni-wallet-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Send Email"
                                          >
                                            <em className="icon ni ni-mail-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Suspend"
                                          >
                                            <em className="icon ni ni-user-cross-fill"></em>
                                          </a>
                                        </li>
                                        <li>
                                          <div className="drodown">
                                            <a
                                              href="#"
                                              className="btn btn-sm btn-icon btn-trigger dropdown-toggle"
                                              data-toggle="dropdown"
                                            >
                                              <em className="icon ni ni-more-h"></em>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              <ul className="link-list-opt no-bdr">
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-eye"></em>
                                                    <span>View Details</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-repeat"></em>
                                                    <span>Orders</span>
                                                  </a>
                                                </li>
                                                <li className="divider"></li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-star"></em>
                                                    <span>Reset Pass</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-off"></em>
                                                    <span>Reset 2FA</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-na"></em>
                                                    <span>Suspend User</span>
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="nk-tb-item">
                                    <div className="nk-tb-col nk-tb-col-check">
                                      <div className="custom-control custom-control-sm custom-checkbox notext">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="uid14"
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="uid14"
                                        ></label>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col">
                                      <div className="user-card">
                                        <div className="user-avatar xs bg-warning">
                                          <span>FP</span>
                                        </div>
                                        <div className="user-name">
                                          <span className="tb-lead">
                                            Frank Phillips
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>Customer</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-sm">
                                      <span>frank97@example.com</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>+632 577-9342</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>Philippines</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <ul className="list-status">
                                        <li>
                                          <em className="icon text-success ni ni-check-circle"></em>{" "}
                                          <span>Email</span>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>01 Jan 2020</span>
                                    </div>
                                    <div className="nk-tb-col">
                                      <span className="tb-status text-success">
                                        Active
                                      </span>
                                    </div>
                                    <div className="nk-tb-col nk-tb-col-tools">
                                      <ul className="nk-tb-actions gx-2">
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Wallet"
                                          >
                                            <em className="icon ni ni-wallet-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Send Email"
                                          >
                                            <em className="icon ni ni-mail-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Suspend"
                                          >
                                            <em className="icon ni ni-user-cross-fill"></em>
                                          </a>
                                        </li>
                                        <li>
                                          <div className="drodown">
                                            <a
                                              href="#"
                                              className="btn btn-sm btn-icon btn-trigger dropdown-toggle"
                                              data-toggle="dropdown"
                                            >
                                              <em className="icon ni ni-more-h"></em>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              <ul className="link-list-opt no-bdr">
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-eye"></em>
                                                    <span>View Details</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-repeat"></em>
                                                    <span>Orders</span>
                                                  </a>
                                                </li>
                                                <li className="divider"></li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-star"></em>
                                                    <span>Reset Pass</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-off"></em>
                                                    <span>Reset 2FA</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-na"></em>
                                                    <span>Suspend User</span>
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="nk-tb-item">
                                    <div className="nk-tb-col nk-tb-col-check">
                                      <div className="custom-control custom-control-sm custom-checkbox notext">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="uid15"
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="uid15"
                                        ></label>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col">
                                      <div className="user-card">
                                        <div className="user-avatar xs bg-success">
                                          <span>MB</span>
                                        </div>
                                        <div className="user-name">
                                          <span className="tb-lead">
                                            Marilyn Bradley
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>Customer</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-sm">
                                      <span>marilyn84@example.com</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>+601 890-3578</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>Malaysia</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <ul className="list-status">
                                        <li>
                                          <em className="icon text-warning/ ni ni-alarm-alt"></em>{" "}
                                          <span>Email</span>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="nk-tb-col tb-col-xl">
                                      <span>01 Jan 2020</span>
                                    </div>
                                    <div className="nk-tb-col">
                                      <span className="tb-status text-success">
                                        Active
                                      </span>
                                    </div>
                                    <div className="nk-tb-col nk-tb-col-tools">
                                      <ul className="nk-tb-actions gx-2">
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Wallet"
                                          >
                                            <em className="icon ni ni-wallet-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Send Email"
                                          >
                                            <em className="icon ni ni-mail-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Suspend"
                                          >
                                            <em className="icon ni ni-user-cross-fill"></em>
                                          </a>
                                        </li>
                                        <li>
                                          <div className="drodown">
                                            <a
                                              href="#"
                                              className="btn btn-sm btn-icon btn-trigger dropdown-toggle"
                                              data-toggle="dropdown"
                                            >
                                              <em className="icon ni ni-more-h"></em>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              <ul className="link-list-opt no-bdr">
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-eye"></em>
                                                    <span>View Details</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-repeat"></em>
                                                    <span>Orders</span>
                                                  </a>
                                                </li>
                                                <li className="divider"></li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-star"></em>
                                                    <span>Reset Pass</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-shield-off"></em>
                                                    <span>Reset 2FA</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-na"></em>
                                                    <span>Suspend User</span>
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
                              <div className="card-inner">
                                <ul className="pagination justify-content-center justify-content-md-start">
                                  <li className="page-item">
                                    <a className="page-link" href="#">
                                      Prev
                                    </a>
                                  </li>
                                  <li className="page-item">
                                    <a className="page-link" href="#">
                                      1
                                    </a>
                                  </li>
                                  <li className="page-item">
                                    <a className="page-link" href="#">
                                      2
                                    </a>
                                  </li>
                                  <li className="page-item">
                                    <span className="page-link">
                                      <em className="icon ni ni-more-h"></em>
                                    </span>
                                  </li>
                                  <li className="page-item">
                                    <a className="page-link" href="#">
                                      6
                                    </a>
                                  </li>
                                  <li className="page-item">
                                    <a className="page-link" href="#">
                                      7
                                    </a>
                                  </li>
                                  <li className="page-item">
                                    <a className="page-link" href="#">
                                      Next
                                    </a>
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
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
 
}
export default AffiliateTable;

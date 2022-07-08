import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

const NotificationAlert = () => {


    return (
        <div className="nk-app-root">
            <div className="nk-main ">
                <Menu />
                <div className="nk-wrap">
                    <Header />
                    <div className="nk-content nk-content-fluid bg-light min-height">
                        <div className="container-xl wide-lg">
                            <div className="nk-content-body">
                                <div class="nk-block-head nk-block-head-lg">
                                    <div class="nk-block-head-content">
                                        <h2 class="nk-block-title fw-normal"> All Notification</h2>
                                        <div class="nk-block-des">
                                            <p class="lead">Digital PR focuses on different forms of social media, blogs, online news sites, influencer marketing, and more.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nk-block alert_div">
                                    <div class="card card-bordered card-full">
                                        <div class="card-inner-group">
                                            <div class="card-inner">
                                                <div class="card-title-group">
                                                    <div class="card-title">
                                                        <h5 class="title">Alerts</h5>
                                                    </div>
                                                    <div class="card-tools"></div>
                                                </div>
                                            </div>
                                            <div class="card-inner">
                                                <div class="user-card">
                                                    <div class="user-avatar bg-success-dim"><em class="ni ni-bell fs-4"></em></div>
                                                    <div class="user-info"><span class="lead-text">Abu Bin Ishtiyak</span><span
                                                        class="sub-text">Added an integration to this channel. Successfully setuop is done</span></div>
                                                    <div class="user-action">
                                                        <div class="drodown"><a href="#" class="dropdown-toggle btn btn-icon btn-trigger me-n1"
                                                            data-bs-toggle="dropdown" aria-expanded="false"><em class="icon ni ni-more-h"></em></a>
                                                            <div class="dropdown-menu dropdown-menu-end">
                                                                <ul class="link-list-opt no-bdr">
                                                                    <li><a href="#"><em class="icon ni ni-setting"></em><span>Action Settings</span></a>
                                                                    </li>
                                                                    <li><a href="#"><em class="icon ni ni-notify"></em><span>Push Notification</span></a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-inner card-inner-md">
                                                <div class="user-card">
                                                    <div class="user-avatar bg-success-dim"><em class="ni ni-bell fs-4"></em></div>
                                                    <div class="user-info"><span class="lead-text">Sharon Walker</span><span
                                                        class="sub-text">Bitcoin (BTC) went above 5,000.00 USD on Gemini.Digital PR focuses on different forms of social media, blogs, online news sites, influencer marketing, and more.
                                                        Digital PR focuses on different forms of social media, blogs, online news sites, influencer marketing, and more. Digital PR focuses on different forms of social media, blogs, online news sites, influencer marketing, and more.</span></div>
                                                    <div class="user-action">
                                                        <div class="drodown"><a href="#" class="dropdown-toggle btn btn-icon btn-trigger me-n1"
                                                            data-bs-toggle="dropdown" aria-expanded="false"><em class="icon ni ni-more-h"></em></a>
                                                            <div class="dropdown-menu dropdown-menu-end">
                                                                <ul class="link-list-opt no-bdr">
                                                                    <li><a href="#"><em class="icon ni ni-setting"></em><span>Action Settings</span></a>
                                                                    </li>
                                                                    <li><a href="#"><em class="icon ni ni-notify"></em><span>Push Notification</span></a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-inner card-inner-md">
                                                <div class="user-card">
                                                <div class="user-avatar bg-success-dim"><em class="ni ni-bell fs-4"></em></div>
                                                    <div class="user-info"><span class="lead-text">Gloria Oliver</span><span
                                                        class="sub-text">The size of the Bitcoin memopool went below 45.0 megabytes</span></div>
                                                    <div class="user-action">
                                                        <div class="drodown"><a href="#" class="dropdown-toggle btn btn-icon btn-trigger me-n1"
                                                            data-bs-toggle="dropdown" aria-expanded="false"><em class="icon ni ni-more-h"></em></a>
                                                            <div class="dropdown-menu dropdown-menu-end">
                                                                <ul class="link-list-opt no-bdr">
                                                                    <li><a href="#"><em class="icon ni ni-setting"></em><span>Action Settings</span></a>
                                                                    </li>
                                                                    <li><a href="#"><em class="icon ni ni-notify"></em><span>Push Notification</span></a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-inner card-inner-md">
                                                <div class="user-card">
                                                    <div class="user-avatar bg-success-dim"><em class="ni ni-bell fs-4"></em></div>
                                                    <div class="user-info"><span class="lead-text">Phillip Sullivan</span><span
                                                        class="sub-text">Bitcoin cash wallet is now $3,487.89</span></div>
                                                    <div class="user-action">
                                                        <div class="drodown"><a href="#" class="dropdown-toggle btn btn-icon btn-trigger me-n1"
                                                            data-bs-toggle="dropdown" aria-expanded="false"><em class="icon ni ni-more-h"></em></a>
                                                            <div class="dropdown-menu dropdown-menu-end">
                                                                <ul class="link-list-opt no-bdr">
                                                                    <li><a href="#"><em class="icon ni ni-setting"></em><span>Action Settings</span></a>
                                                                    </li>
                                                                    <li><a href="#"><em class="icon ni ni-notify"></em><span>Push Notification</span></a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-inner card-inner-md">
                                                <div class="user-card">
                                                <div class="user-avatar bg-success-dim"><em class="ni ni-bell fs-4"></em></div>
                                                    <div class="user-info"><span class="lead-text">Thomas Barry</span><span
                                                        class="sub-text">You received 3 Bitcoins in your account, register immediately and accept the transfer.</span></div>
                                                    <div class="user-action">
                                                        <div class="drodown"><a href="#" class="dropdown-toggle btn btn-icon btn-trigger me-n1"
                                                            data-bs-toggle="dropdown" aria-expanded="false"><em class="icon ni ni-more-h"></em></a>
                                                            <div class="dropdown-menu dropdown-menu-end">
                                                                <ul class="link-list-opt no-bdr">
                                                                    <li><a href="#"><em class="icon ni ni-setting"></em><span>Action Settings</span></a>
                                                                    </li>
                                                                    <li><a href="#"><em class="icon ni ni-notify"></em><span>Push Notification</span></a>
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
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );

}
export default NotificationAlert;

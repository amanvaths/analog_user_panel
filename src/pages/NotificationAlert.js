import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

import axios from "axios";
import { BASE_URL } from "../Api_connection/config";

const NotificationAlert = () => {
    const { user } = useSelector((state) => state.user.value)
    const email = user.email;
    const [notification, setNotification] = useState([]);

    const userNotification = async () => {
        const data = await axios.post(`${BASE_URL}/notification`, { email: email })
        if (data) {
            //console.log(data.data, ":: notification");
            setNotification(data.data);
        }
    }
    useEffect(() => {
        userNotification()
    })
    return (
        <div className="nk-app-root">
            <div className="nk-main ">
                <Menu />
                <div className="nk-wrap">
                    <Header />
                    <div className="nk-content nk-content-fluid bg-light min-height">
                        <div className="container-xl wide-lg">
                            <div className="nk-content-body">
                                <div className="nk-block-head nk-block-head-lg">
                                    <div className="nk-block-head-content">
                                        <h2 className="nk-block-title fw-normal"> All Notification</h2>
                                        <div className="nk-block-des">
                                            <p className="lead">Digital PR focuses on different forms of social media, blogs, online news sites, influencer marketing, and more.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-block alert_div">
                                    <div className="card card-bordered card-full">
                                        <div className="card-inner-group">
                                            <div className="card-inner">
                                                <div className="card-title-group">
                                                    <div className="card-title">
                                                        <h5 className="title">Alerts</h5>
                                                    </div>
                                                    <div className="card-tools"></div>
                                                </div>
                                            </div>
                                            <div className="card-inner card-inner-md">
                                                {
                                                    notification.map((element, index) => {
                                                        return (
                                                            <div className="card-inner card-inner-md" key={index}>
                                                                <div className="user-card">
                                                                    <div className="user-avatar bg-success-dim">
                                                                        {/* <em className="ni ni-bell fs-4"></em> */}
                                                                        {
                                                                            element.type == 1 ?
                                                                                <em className="icon icon-circle bg-success-dim ni ni-curve-down-right"></em>
                                                                                :
                                                                                <em className="icon icon-circle bg-warning-dim ni ni-curve-down-left"></em>

                                                                        }
                                                                    </div>
                                                                    <div className="user-info"><span className="lead-text">{element.message}</span><span
                                                                        className="sub-text">{element.timeDifference}</span></div>
                                                                    <div className="user-action">
                                                                        <div className="drodown"><a href="#" className="dropdown-toggle btn btn-icon btn-trigger me-n1"
                                                                            data-bs-toggle="dropdown" aria-expanded="false"><em className="icon ni ni-more-h"></em></a>
                                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                                <ul className="link-list-opt no-bdr">
                                                                                    <li><a href="#"><em className="icon ni ni-setting"></em><span>Action Settings</span></a>
                                                                                    </li>
                                                                                    <li><a href="#"><em className="icon ni ni-notify"></em><span>Push Notification</span></a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </div>
                                            {/* <div className="card-inner card-inner-md">
                                                <div className="user-card">
                                                    <div className="user-avatar bg-success-dim"><em className="ni ni-bell fs-4"></em></div>
                                                    <div className="user-info"><span className="lead-text">Sharon Walker</span><span
                                                        className="sub-text">Bitcoin (BTC) went above 5,000.00 USD on Gemini.Digital PR focuses on different forms of social media, blogs, online news sites, influencer marketing, and more.
                                                        Digital PR focuses on different forms of social media, blogs, online news sites, influencer marketing, and more. Digital PR focuses on different forms of social media, blogs, online news sites, influencer marketing, and more.</span></div>
                                                    <div className="user-action">
                                                        <div className="drodown"><a href="#" className="dropdown-toggle btn btn-icon btn-trigger me-n1"
                                                            data-bs-toggle="dropdown" aria-expanded="false"><em className="icon ni ni-more-h"></em></a>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                <ul className="link-list-opt no-bdr">
                                                                    <li><a href="#"><em className="icon ni ni-setting"></em><span>Action Settings</span></a>
                                                                    </li>
                                                                    <li><a href="#"><em className="icon ni ni-notify"></em><span>Push Notification</span></a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-inner card-inner-md">
                                                <div className="user-card">
                                                <div className="user-avatar bg-success-dim"><em className="ni ni-bell fs-4"></em></div>
                                                    <div className="user-info"><span className="lead-text">Gloria Oliver</span><span
                                                        className="sub-text">The size of the Bitcoin memopool went below 45.0 megabytes</span></div>
                                                    <div className="user-action">
                                                        <div className="drodown"><a href="#" className="dropdown-toggle btn btn-icon btn-trigger me-n1"
                                                            data-bs-toggle="dropdown" aria-expanded="false"><em className="icon ni ni-more-h"></em></a>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                <ul className="link-list-opt no-bdr">
                                                                    <li><a href="#"><em className="icon ni ni-setting"></em><span>Action Settings</span></a>
                                                                    </li>
                                                                    <li><a href="#"><em className="icon ni ni-notify"></em><span>Push Notification</span></a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-inner card-inner-md">
                                                <div className="user-card">
                                                    <div className="user-avatar bg-success-dim"><em className="ni ni-bell fs-4"></em></div>
                                                    <div className="user-info"><span className="lead-text">Phillip Sullivan</span><span
                                                        className="sub-text">Bitcoin cash wallet is now $3,487.89</span></div>
                                                    <div className="user-action">
                                                        <div className="drodown"><a href="#" className="dropdown-toggle btn btn-icon btn-trigger me-n1"
                                                            data-bs-toggle="dropdown" aria-expanded="false"><em className="icon ni ni-more-h"></em></a>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                <ul className="link-list-opt no-bdr">
                                                                    <li><a href="#"><em className="icon ni ni-setting"></em><span>Action Settings</span></a>
                                                                    </li>
                                                                    <li><a href="#"><em className="icon ni ni-notify"></em><span>Push Notification</span></a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-inner card-inner-md">
                                                <div className="user-card">
                                                <div className="user-avatar bg-success-dim"><em className="ni ni-bell fs-4"></em></div>
                                                    <div className="user-info"><span className="lead-text">Thomas Barry</span><span
                                                        className="sub-text">You received 3 Bitcoins in your account, register immediately and accept the transfer.</span></div>
                                                    <div className="user-action">
                                                        <div className="drodown"><a href="#" className="dropdown-toggle btn btn-icon btn-trigger me-n1"
                                                            data-bs-toggle="dropdown" aria-expanded="false"><em className="icon ni ni-more-h"></em></a>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                <ul className="link-list-opt no-bdr">
                                                                    <li><a href="#"><em className="icon ni ni-setting"></em><span>Action Settings</span></a>
                                                                    </li>
                                                                    <li><a href="#"><em className="icon ni ni-notify"></em><span>Push Notification</span></a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
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

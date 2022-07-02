import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Api_connection/config";
import { useSelector, useDispatch } from "react-redux";
import { profileMenu } from "../Api_connection/ApiFunction";
import { setUserInfo} from "../redux/reducer/user";
import { Link } from "react-router-dom";

const Notification = () => {
    const { userInfo, user } = useSelector((state) => state.user.value)
    const email = user.email
    const [reflect, setReflect] = useState(true);
    const [isInit, setInit] = useState(false);
    const dispatch = useDispatch()
    
   

    const setNotification = async (e) => {
        try {
            const data = await axios.post(`${BASE_URL}/notificationSettings`, {
                email: email,
                unusual_activity: userInfo.unusual_activity,
                new_browser: userInfo.new_browser,
                sales: userInfo.sales_latest_news,
                new_features: userInfo.new_features_updates,
                tips: userInfo.tips
            })
            console.log(data.data, "response from notification api");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(isInit){
        console.log("reflect called");
        setNotification();
        }
        else {
            setInit(true);
        }
    },[reflect]);

    useEffect(()=>{
        const conSetting = async()=>{
            const data = await axios.post(`${BASE_URL}/configSettings`, {email: email})
        if(data){
            dispatch(setUserInfo({userInfo: data.data}))
        }
        }

        conSetting()
        
    },[])

    return (
        <>
            <div className="card-inner card-inner-lg">
                <div className="nk-block-head nk-block-head-lg">
                    <div className="nk-block-between">
                        <div className="nk-block-head-content">
                            <h4 className="nk-block-title">Notification Settings</h4>
                            <div className="nk-block-des">
                                <p>You will get only notification what have enabled.</p>
                            </div>
                        </div>
                        <div className="nk-block-head-content align-self-start d-lg-none">
                            <Link
                            to="" className="toggle btn btn-icon btn-trigger mt-n1"
                            data-target="userAside"   id = "toggleBtn">
                                <em
                                className="icon ni ni-menu-alt-r" onClick={ profileMenu }></em>
                               </Link>
                               </div>
                    </div>
                </div>
                <div className="nk-block-head nk-block-head-sm">
                    <div className="nk-block-head-content">
                        <h6 className="p-2">Security Alerts</h6>
                        <p className="p-2">You will get only those email notification what you want.</p>
                    </div>
                </div>
                <div className="nk-block-content">
                    <div className="gy-3">
                        <div className="g-item">
                            <div className="custom-control custom-switch">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="unusual-activity"
                                    checked={userInfo?.unusual_activity}
                                    onChange={(e) => {
                                        const obj ={userInfo}
                                        if (userInfo?.unusual_activity) {
                                            obj['unusual_activity'] = 0
                                            dispatch(setUserInfo({ userInfo: obj }))
                                        } else {
                                         obj['unusual_activity'] = 1
                                            dispatch(setUserInfo({ userInfo: obj }))
                                        }
                                        setReflect(!reflect);

                                    }}
                                />
                                <label
                                    className="custom-control-label"
                                    for="unusual-activity">
                                    Email me whenever encounterunusual activity</label>
                            </div>
                        </div>
                        <div className="g-item">
                            <div className="custom-control custom-switch">
                                <input type="checkbox"
                                    className="custom-control-input"
                                    id="new-browser"
                                    checked={userInfo?.new_browser}
                                    onChange={() => {
                                        const obj ={userInfo}
                                        if (userInfo?.new_browser) {
                                          obj['new_browser'] = 0
                                            dispatch(setUserInfo({ userInfo: obj }))
                                        } else {
                                            obj['new_browser'] = 1
                                            dispatch(setUserInfo({ userInfo: obj }))
                                        }
                                        setReflect(!reflect);
                                    }}
                                />
                                <label
                                    className="custom-control-label" for="new-browser">Email me
                                    if new browser is used to sign in</label></div>
                        </div>
                    </div>
                </div>
                <div className="nk-block-head nk-block-head-sm">
                    <div className="nk-block-head-content">
                        <h6 className="p-2">News</h6>
                        <p className="p-2">You will get only those email notification what you want.</p>
                    </div>
                </div>
                <div className="nk-block-content">
                    <div className="gy-3">
                        <div className="g-item">
                            <div className="custom-control custom-switch">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="latest-sale"
                                   
                                    checked={userInfo?.sales_latest_news}
                                    onChange={(e) => {
                                        const obj ={userInfo}
                                        if (userInfo?.sales_latest_news) {
                                            obj['sales_latest_news'] = 0
                                            dispatch(setUserInfo({ userInfo: obj }))
                                        } else {
                                            obj['sales_latest_news'] = 1
                                            dispatch(setUserInfo({ userInfo: obj }))
                                        }
                                        setReflect(!reflect);
                                    }}
                                />
                                <label className="custom-control-label"
                                    for="latest-sale">
                                    Notify me by email about sales and latest news</label></div>
                        </div>
                        <div className="g-item">
                            <div className="custom-control custom-switch">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="feature-update"
                                    checked={userInfo?.new_features_updates}
                                    onChange={() => {
                                        const obj ={userInfo}
                                        if (userInfo?.new_features_updates) {
                                            obj['new_features_updates'] = 0
                                            dispatch(setUserInfo({ userInfo: obj }))
                                        } else {
                                            obj['new_features_updates'] = 1
                                            dispatch(setUserInfo({ userInfo: obj }))
                                        }
                                        setReflect(!reflect);
                                    }}
                                />
                                <label
                                    className="custom-control-label" for="feature-update">Email
                                    me about new features and updates</label></div>
                        </div>
                        <div className="g-item">
                            <div className="custom-control custom-switch">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="account-tips"
                                    checked={userInfo?.tips}
                                    onChange={() => {
                                        const obj ={userInfo}
                                        if (userInfo?.tips) {
                                            obj['tips'] = 0
                                            dispatch(setUserInfo({ userInfo: obj }))
                                        } else {
                                            obj['tips'] = 1
                                            dispatch(setUserInfo({ userInfo: obj }))
                                        }
                                        setReflect(!reflect);
                                    }}
                                /><label className="custom-control-label"
                                    for="account-tips">Email me about tips on using
                                    account</label></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notification;
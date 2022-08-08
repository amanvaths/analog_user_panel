import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Api_connection/config";
import { useSelector, useDispatch } from "react-redux";
import { profileMenu } from "../Api_connection/ApiFunction";
import { setUserInfo } from "../redux/reducer/user";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast'
import SettingButton from "./SettingButton";
import { useTranslation } from "react-i18next";


const Notification = () => {
    const { userInfo, user } = useSelector((state) => state.user.value)
    const email = user.email
    const [reflect, setReflect] = useState(true);
    const [isInit, setInit] = useState(false);
    const dispatch = useDispatch()
    const { t } = useTranslation();

    const setNotification = async (e) => {
        try {
            const data = await axios.post(`${BASE_URL}/notificationSettings`, {
                email: email,
                unusual_activity: userInfo?.unusual_activity,
                new_browser: userInfo?.new_browser,
                sales: userInfo?.sales_latest_news,
                new_features: userInfo?.new_features_updates,
                tips: userInfo?.tips
            })
            console.log(data.data, "response from notification api");
        } catch (error) {
            console.log(error);
        }
    }

    const conSetting = async () => {
        const data = await axios.post(`${BASE_URL}/configSettings`, { email: email })
        if (data) {
            dispatch(setUserInfo({ userInfo: data.data }))
        }
    }
    useEffect(() => {
        if (isInit) {
            console.log("reflect called");
            setNotification();
            // conSetting()
        }
        else {
            setInit(true);
        }
    }, [reflect]);

    useEffect(() => {

        conSetting()
    }, [])

    return (
        <>
            <div className="card-inner card-inner-lg bg-light">
                <div className="nk-block-head nk-block-head-lg">
                    <div className="nk-block-between">
                        <div className="nk-block-head-content">
                            <h4 className="nk-block-title">{t('notification_settings')}</h4>
                            <div className="nk-block-des">
                                <p>{t('notification_tagline')}</p>
                            </div>
                        </div>
                        <div className="nk-block-head-content align-self-start d-lg-none">
                        <SettingButton></SettingButton>
                            {/* <a
                                href="#" className="toggle btn btn-icon btn-trigger mt-n1"
                                data-target="userAside" id="toggleBtn">
                                <em
                                    className="icon ni ni-menu-alt-r" onClick={profileMenu}></em>
                            </a> */}
                        </div>
                    </div>
                    <hr className="mb-0"></hr>
                </div>
                <div className="nk-block-head nk-block-head-sm">
                    <div className="nk-block-head-content">
                        <h4>{t('security_alert')}</h4>
                        <p>{t('notification_tagline2')}</p>

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
                                    checked={userInfo.unusual_activity}
                                    onChange={(e) => {
                                        const obj = { ...userInfo };
                                        if (userInfo?.unusual_activity) {
                                            console.log(obj);
                                            obj['unusual_activity'] = 0;
                                            toast.success("Unusual Activity alert deactivated")
                                            dispatch(setUserInfo({ userInfo: obj }))
                                        } else {
                                            obj['unusual_activity'] = 1
                                            toast.success("Unusual Activity alert activated")
                                            dispatch(setUserInfo({ userInfo: obj }))
                                        }
                                        setReflect(!reflect);

                                    }}
                                />
                                <label
                                    className="custom-control-label"
                                    for="unusual-activity">
                                    {t('unusual_activity_alert')}</label>
                            </div>
                        </div>
                        <div className="g-item">
                            <div className="custom-control custom-switch">
                                <input type="checkbox"
                                    className="custom-control-input"
                                    id="new-browser"
                                    checked={userInfo?.new_browser}
                                    onChange={() => {
                                        const obj = { ...userInfo };

                                        if (userInfo?.new_browser) {
                                            obj['new_browser'] = 0
                                            toast.success("New Browser alert deactivated")
                                            dispatch(setUserInfo({ userInfo: obj }))
                                        } else {
                                            obj['new_browser'] = 1
                                            toast.success("New Browser alert activated")
                                            dispatch(setUserInfo({ userInfo: obj }))
                                        }
                                        setReflect(!reflect);
                                    }}
                                />
                                <label
                                    className="custom-control-label" for="new-browser">
                                        {t('new_browser_alert')}</label></div>
                        </div>
                    </div>
                </div>
                <div className="nk-block-head nk-block-head-sm">
                    <div className="nk-block-head-content">
                        <h4>{t('news')}</h4>
                        <p>{t('notification_tagline2')}</p>
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
                                        const obj = { ...userInfo };

                                        if (userInfo?.sales_latest_news) {
                                            obj['sales_latest_news'] = 0
                                            toast.success("Sales and News alert deactivated")
                                            dispatch(setUserInfo({ userInfo: obj }))
                                        } else {
                                            obj['sales_latest_news'] = 1
                                            toast.success("Sales and News alert activated")
                                            dispatch(setUserInfo({ userInfo: obj }))
                                        }
                                        setReflect(!reflect);
                                    }}
                                />
                                <label className="custom-control-label"
                                    for="latest-sale">
                                    {t('news_alert')}</label></div>
                        </div>
                        <div className="g-item">
                            <div className="custom-control custom-switch">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="feature-update"
                                    checked={userInfo?.new_features_updates}
                                    onChange={() => {
                                        const obj = { ...userInfo };

                                        if (userInfo?.new_features_updates) {
                                            obj['new_features_updates'] = 0
                                            toast.success("Features and News alert deactivated")
                                            dispatch(setUserInfo({ userInfo: obj }))
                                        } else {
                                            obj['new_features_updates'] = 1
                                            toast.success("Features and News alert activated")
                                            dispatch(setUserInfo({ userInfo: obj }))
                                        }
                                        setReflect(!reflect);
                                    }}
                                />
                                <label
                                    className="custom-control-label" for="feature-update">{t('features_update_alert')}</label></div>
                        </div>
                        <div className="g-item">
                            <div className="custom-control custom-switch">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="account-tips"
                                    checked={userInfo?.tips ? userInfo?.tips : false}
                                    onChange={() => {
                                        const obj = { ...userInfo };

                                        if (userInfo?.tips) {
                                            obj['tips'] = 0
                                            toast.success("Tips alert deactivated")
                                            dispatch(setUserInfo({ userInfo: obj }))
                                        } else {
                                            obj['tips'] = 1
                                            toast.success("Tips alert activated")
                                            dispatch(setUserInfo({ userInfo: obj }))
                                        }
                                        setReflect(!reflect);
                                    }}
                                /><label className="custom-control-label"
                                    for="account-tips">{t('tips_alert')}</label></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notification;
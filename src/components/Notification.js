import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setIsNewBrowserOn,
    setIsUnusualActivityOn,
    setIsSalesOn,
    setIsFeaturesOn,
    setIsTipsOn
} from "../redux/settings";

const Notification = () => {
    const dispatch = useDispatch()
    const {
        isNewBrowserOn,
        isUnusualActivityOn,
        isSalesOn,
        isNewFeaturesOn,
        isTipsOn
    } = useSelector((state) => state.setting.value)

    console.log(isNewBrowserOn,
        isUnusualActivityOn,
        isSalesOn,
        isNewFeaturesOn,
        isTipsOn, "sduilsdjlksdjfsdlfjsdlfjsdklfhsdjklfhsdjkfhsdjkfsdjkfsdfhsf");
    return (
        <>
            <div class="card-inner card-inner-lg">
                <div class="nk-block-head nk-block-head-lg">
                    <div class="nk-block-between">
                        <div class="nk-block-head-content">
                            <h4 class="nk-block-title">Notification Settings</h4>
                            <div class="nk-block-des">
                                <p>You will get only notification what have enabled.</p>
                            </div>
                        </div>
                        <div class="nk-block-head-content align-self-start d-lg-none"><a
                            href="#" class="toggle btn btn-icon btn-trigger mt-n1"
                            data-target="userAside"><em
                                class="icon ni ni-menu-alt-r"></em></a></div>
                    </div>
                </div>
                <div class="nk-block-head nk-block-head-sm">
                    <div class="nk-block-head-content">
                        <h6 className="p-2">Security Alerts</h6>
                        <p className="p-2">You will get only those email notification what you want.</p>
                    </div>
                </div>
                <div class="nk-block-content">
                    <div class="gy-3">
                        <div class="g-item">
                            <div class="custom-control custom-switch">
                                <input
                                    type="checkbox"
                                    class="custom-control-input"
                                    id="unusual-activity"
                                    checked={isUnusualActivityOn}
                                    onChange={() => {
                                        if (isUnusualActivityOn) {
                                            dispatch(setIsUnusualActivityOn({ isUnusualActivityOn: 1 }))
                                        } else {
                                            dispatch(setIsUnusualActivityOn({ isUnusualActivityOn: 0 }))
                                        }
                                    }}
                                />
                                <label
                                    class="custom-control-label"
                                    for="unusual-activity">
                                    Email me whenever encounterunusual activity</label>
                            </div>
                        </div>
                        <div class="g-item">
                            <div class="custom-control custom-switch">
                                <input type="checkbox"
                                    class="custom-control-input"
                                    id="new-browser"
                                    checked={isNewBrowserOn}
                                    onChange={() => {
                                        if (isNewBrowserOn) {
                                            dispatch(setIsNewBrowserOn({ isNewBrowserOn: 1 }))
                                        } else {
                                            dispatch(setIsNewBrowserOn({ isNewBrowserOn: 0 }))
                                        }
                                    }}
                                />
                                <label
                                    class="custom-control-label" for="new-browser">Email me
                                    if new browser is used to sign in</label></div>
                        </div>
                    </div>
                </div>
                <div class="nk-block-head nk-block-head-sm">
                    <div class="nk-block-head-content">
                        <h6 className="p-2">News</h6>
                        <p className="p-2">You will get only those email notification what you want.</p>
                    </div>
                </div>
                <div class="nk-block-content">
                    <div class="gy-3">
                        <div class="g-item">
                            <div class="custom-control custom-switch">
                                <input
                                    type="checkbox"
                                    class="custom-control-input"
                                    id="latest-sale"
                                    name="amit"
                                    checked={isSalesOn}
                                    onChange={(e) => {
                                        if (isSalesOn) {
                                            dispatch(setIsSalesOn({ isSalesOn: 1 }))
                                        } else {
                                            dispatch(setIsSalesOn({ isSalesOn: 0 }))
                                        }
                                    }}
                                />
                                <label class="custom-control-label"
                                    for="latest-sale">
                                    Notify me by email about sales and latest news</label></div>
                        </div>
                        <div class="g-item">
                            <div class="custom-control custom-switch">
                                <input
                                    type="checkbox"
                                    class="custom-control-input"
                                    id="feature-update"
                                    checked={isNewFeaturesOn}
                                    onChange={() => {
                                        if (isNewFeaturesOn) {
                                            dispatch(setIsFeaturesOn({ isNewFeaturesOn: 1 }))
                                        } else {
                                            dispatch(setIsFeaturesOn({ isNewFeaturesOn: 0 }))
                                        }
                                    }}
                                />
                                <label
                                    class="custom-control-label" for="feature-update">Email
                                    me about new features and updates</label></div>
                        </div>
                        <div class="g-item">
                            <div class="custom-control custom-switch">
                                <input
                                    type="checkbox"
                                    class="custom-control-input"
                                    id="account-tips"
                                    checked={isTipsOn}
                                    onChange={() => {
                                        if (isTipsOn) {
                                            dispatch(setIsTipsOn({ isTipsOn: 1 }))
                                        } else {
                                            dispatch(setIsTipsOn({ isTipsOn: 0 }))
                                        }
                                    }}
                                /><label class="custom-control-label"
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
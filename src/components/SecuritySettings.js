import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { setActivity, setNotification, setChangePassword, setPersonalInfo, setSecuritySettings, setIpWhiteListing, setIsLoginActivityOn, setIsTwoFactOn } from "../redux/settings";
import { Button } from 'bootstrap';


const SecuritySettings = () => {
  const dispatch = useDispatch()
  const { isLoginActivityOn, isTwoFactOn } = useSelector((state) => state.setting.value)
  console.log(isTwoFactOn, "state::::");
  const email = localStorage.getItem("email")
  const [lable, setLable] = useState(false)

  const onAuth = () => {
    setLable(!lable)
    console.log(!isTwoFactOn, "reverse 1");
    dispatch(setIsTwoFactOn({isTwoFactOn: !isTwoFactOn}))
    console.log(!isTwoFactOn, "reverse 2");
  }

  console.log(isTwoFactOn, "reverse out ");
  const handelLog = async (e) => {
    try {
      const state = e.target.checked
      dispatch(setIsLoginActivityOn({ isLoginActivityOn: state }))
      console.log(state ? 1 : 0, "::State");
      const data = await axios.post('http://localhost:3001/api/login_activity', { email: email, login_activity: state })
      console.log(data, "response from api");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="card-inner card-inner-lg">
        <div className="nk-block-head nk-block-head-lg">
          <div className="nk-block-between">
            <div className="nk-block-head-content">
              <h4 className="nk-block-title">Security Settings</h4>
              <div className="nk-block-des">
                <p>
                  These settings are helps you keep your account
                  secure.
                </p>
              </div>
            </div>
            <div
              className="nk-block-head-content align-self-start d-lg-none"
            >
              <a
                href="#"
                className="toggle btn btn-icon btn-trigger mt-n1"
                data-target="userAside"
              ><em className="icon ni ni-menu-alt-r"></em
              ></a>
            </div>
          </div>
        </div>
        <div className="nk-block">
          <div className="card card-bordered">
            <div className="card-inner-group">
              <div className="card-inner">
                <div
                  className="between-center flex-wrap flex-md-nowrap g-3"
                >
                  <div className="nk-block-text">
                    <h6 className='p-1'>Save my Activity Logs</h6>
                    <p className='p-1'>
                      You can save your all activity logs
                      including unusual activity detected.
                    </p>
                  </div>
                  <div className="nk-block-actions">
                    <ul className="align-center gx-3">
                      <li className="order-md-last">
                        <div class="custom-control custom-switch me-n2">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="usdt"
                            checked={isLoginActivityOn}
                            onChange={(e) => {
                              if (isLoginActivityOn) {
                                dispatch(setIsLoginActivityOn({ isLoginActivityOn: 0 }))
                              } else {
                                dispatch(setIsLoginActivityOn({ isLoginActivityOn: 1 }))
                              }
                              handelLog(e)
                            }}
                          /><label class="custom-control-label" for="usdt" ></label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-inner">
                <div className="between-center flex-wrap g-3">
                  <div className="nk-block-text">
                    <h6 className='p-1'>Change Password</h6>
                    <p className='p-1'>
                      Set a unique password to protect your
                      account.
                    </p>
                  </div>
                  <div
                    className="nk-block-actions flex-shrink-sm-0"
                  >
                    <ul
                      className="align-center flex-wrap flex-sm-nowrap gx-3 gy-2"
                    >
                      <li className="order-md-last">
                        <Link to="#" className="btn btn-primary"
                          onClick={() => {
                            dispatch(setPersonalInfo({ personalInfo: false }))
                            dispatch(setActivity({ activity: false }))
                            dispatch(setSecuritySettings({ securitySettings: false }))
                            dispatch(setNotification({ notification: false }))
                            dispatch(setChangePassword({ changePassword: true }))
                            dispatch(setIpWhiteListing({ ipWhiteListing: false }))
                          }}>Change Password</Link>
                      </li>
                      <li>
                        <em className="text-soft text-date fs-12px"
                        >Last changed:
                          <span>Oct 2, 2019</span></em
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-inner">
                <div
                  className="between-center flex-wrap flex-md-nowrap g-3"
                >
                  <div className="nk-block-text">
                    <h6 className='p-1'>
                      2 Factor Auth &nbsp;
                      {
                        lable ? <span className="badge badge-danger ms-0">disabled</span> : <span className="badge badge-success ms-0"
                        >enabled</span>
                      }

                    </h6>
                    <p className='p-1'>
                      Secure your account with 2FA security.
                      When it is activated you will need to
                      enter not only your password, but also a
                      special code using app. You can receive
                      this code by in mobile app.
                    </p>
                  </div>
                  {
                    setIsTwoFactOn == true ?
                    ( <div className="nk-block-actions">
                    <button onClick={() => onAuth()} className="btn btn-primary">Disable</button>
                    </div>) :
                      ( <div className="nk-block-actions">
                        <button onClick={() => onAuth()} className="btn btn-primary">Enable</button>
                      </div>)
                  }


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default SecuritySettings;
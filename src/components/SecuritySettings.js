import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../Api_connection/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo, setSettingPage } from "../redux/reducer/user";
import toast from 'react-hot-toast';
import OtpInput from 'react-otp-input';
import './ss.css'
import SettingButton from './SettingButton';
import { useTranslation } from "react-i18next";

const SecuritySettings = () => {
  const { userInfo, user } = useSelector((state) => state.user.value)
  const [otp, setOtp] = useState("");
  const [otpD, setOtpD] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();


  const email = user.email

  const [security, setSecurityKey] = useState("")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);


  const [show1, setShow1] = useState(false);


  const handelLog = async (e) => {
    try {
      const state = e.target.checked
      const data = await axios.post(`${BASE_URL}/login_activity`, { email: email, login_activity: state })
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const conSetting = async () => {
      const data = await axios.post(`${BASE_URL}/configSettings`, { email: email })
      if (data) {
        dispatch(setUserInfo({ userInfo: data.data }))
      }
    }

    conSetting()

  }, [])

  return (
    <>
      <div className="card-inner card-inner-lg bg-light">
        <div className="nk-block-head nk-block-head-lg">
          <div className="nk-block-between">
            <div className="nk-block-head-content">
              <h4 className="nk-block-title">{t('security_settings')}</h4>
              <div className="nk-block-des">
                <p>{t('security_settings_tagline')}</p>
              </div>
            </div>
            <div
              className="nk-block-head-content align-self-start d-lg-none">
              <SettingButton></SettingButton>
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
                  <div>
                    <h5 className='text-teal'>{t('save_my_activity_log')}</h5>
                    <p>{t('unusual_activity_tagline')}</p>
                  </div>
                  <div className="nk-block-actions">
                    <ul className="align-center gx-3">
                      <li className="order-md-last">
                        <div className="custom-control custom-switch me-n2">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="log"
                            checked={userInfo?.login_activity}
                            onChange={(e) => {
                              const obj = { ...userInfo }
                              toast.success(e.target.checked === true ? `${t('activity_log_alert_message_activited')}` : `${t('activity_log_alert_message_deactivited')}`)
                              obj['login_activity'] = e.target.checked
                              dispatch(setUserInfo({ userInfo: obj }))
                              handelLog(e)
                            }}
                          />
                          <label className="custom-control-label" for="log" ></label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-inner">
                <div className="between-center flex-wrap g-3">
                  <div>
                    <h5 className='text-teal'>{t('change_password')}</h5>
                    <p>{t('change_password_tagline')}</p>
                  </div>
                  <div
                    className="nk-block-actions flex-shrink-sm-0"
                  >
                    <ul
                      className="align-center flex-wrap flex-sm-nowrap gx-3 gy-2"
                    >
                      <li className="order-md-last">
                        <Link to="#" className="btn btn-outline-success"
                          onClick={() => {
                            const obj = {
                              personalInfo: false,
                              activity: false,
                              securitySettings: false,
                              notification: false,
                              changePassword: true,
                              ipWhiteListing: false
                            }
                            dispatch(setSettingPage({ settingPages: obj }))
                          }}>{t('change_password')}</Link>
                      </li>
                      {
                        userInfo?.password_updated_at ?
                          <li>
                            <em className="text-soft text-date fs-12px"
                            >{t('last_changed')} :
                              <span> {new Date(userInfo?.password_updated_at).toDateString()}</span></em>
                          </li> : null
                      }
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-inner">
                <div
                  className="between-center flex-wrap flex-md-nowrap g-3"
                >
                  <div>
                    <h5 className='text-teal'>
                      2 {t('factoe_auth')} &nbsp;
                      {
                        Object?.values(userInfo)?.length > 0 ?
                          !userInfo.googleAuth ? <span className="badge badge-danger ms-0">{t('disabled')}</span>
                            : <span className="badge badge-success ms-0">{t('enable')}</span>
                          : null
                      }

                    </h5>
                    <p>{t('2fa_tagline_1')}</p>
                    <p> {t('2fa_tagline_2')}</p>
                  </div>
                  {Object?.values(userInfo)?.length > 0 ?
                    userInfo.googleAuth ?
                      (

                        <div className="nk-block-actions">
                          <button onClick={async () => {
                            handleShow1();
                            await axios.post(`${BASE_URL}/generateauthtoken`, { email: email })
                          }} className="btn btn-danger">{t('disable')}</button>
                        </div>

                      ) :
                      (
                        <div className="nk-block-actions">
                          <button onClick={() => {
                            handleShow();
                            axios.post(`${BASE_URL}/generateauthtoken`, { email: email, google_auth: true }).then((res) => { setSecurityKey(res.data); console.log(res.data, "datat"); })
                            const obj = { ...userInfo }
                            obj['googleAuth'] = !userInfo.googleAuth
                            dispatch(setUserInfo({ userInfo: obj }))
                          }} className="btn btn-outline-success">{t('enable')}</button>
                        </div>
                      ) : null
                  }
                  <Modal show={show} onHide={() => {
                    if (Object?.values(userInfo)?.length > 0) {
                      const obj = { ...userInfo }
                      obj['googleAuth'] = !userInfo.googleAuth
                      dispatch(setUserInfo({ userInfo: obj }))
                      handleClose()

                    }
                  }}>
                    <Modal.Header closeButton>
                      <Modal.Title>{t('google_authentication')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                      <div className='row d-flex justify-content-around flex-row align-items-center py-2'>

                        <div className='col-6'>
                          <div className='d-flex justify-content-center'>
                            <img
                              alt='qr'
                              src={security.qr_url}
                              style={{ height: "150px" }}
                            />
                          </div>
                        </div>
                        <div className='col-7'>

                          <form action="" style={{}}>
                            <div className="form-group">
                              <div className="form-group">
          
                                <OtpInput
                                  inputStyle="auth_style"
                                  value={otp}
                                  onChange={(e) => setOtp(e)}
                                  numInputs={6}
                                  isInputNum={true}
                                  separator={<span>&nbsp;</span>}
                                />
                              </div>
                              <button type="button" className="btn btn-outline-success btn-dim btn-block" onClick={() => {
                                axios.post(`${BASE_URL}/generateauthtoken`, { email: email, token: otp }).then((resp) => {
                                  if (resp.data.status == 1) {
                                    toast.success(`${t('2fa_alert_message_sussesfully')}`)
                                   
                                    navigate("/home")
                                  } else {
                                    toast.error(`${t('incorrect_otp')}`)
                                   
                                  }
                                })
                              }}>{t('verify')}</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      {/* <Button variant="success" onClick={() => {
                        if (Object?.values(userInfo)?.length > 0) {
                          handleClose()
                          const obj = {userInfo}
                          obj['googleAuth'] = !obj.userInfo.googleAuth
                          dispatch(setUserInfo({userInfo: obj }))
                        }
                      }}>
                        Close
                      </Button> */}
                    </Modal.Footer>

                  </Modal>

                  {/* Model for 2FA Disable */}

                  <Modal show={show1} onHide={() => {
                    handleClose1()
                  }}>
                    <Modal.Header closeButton>
                      <Modal.Title>{t('google_authentication')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className='row d-flex justify-content-around flex-row align-items-center py-2'>

                        <div className='col-12'>
                          <form action="" style={{}}>
                            <div className="form-group">
                              <div className="form-group">
                                <OtpInput
                                  inputStyle="auth_style"
                                  value={otpD}
                                  onChange={(e) => setOtpD(e)}
                                  numInputs={6}
                                  isInputNum={true}
                                  separator={<span>&nbsp;</span>}
                                />
                              </div>
                              <button type="button" className="btn btn-outline-danger btn-dim btn-block" onClick={() => {
                                axios.post(`${BASE_URL}/generateauthtoken`, { email: email, token2: otpD }).then((resp) => {
                                  if (resp.data.status == 1) {
                                    toast.success(`${t('2fa_disabled_successfully')}`)
                                    if (Object?.values(userInfo)?.length > 0) {
                                      handleClose1()
                                      const obj = { ...userInfo }
                                      obj['googleAuth'] = !userInfo.googleAuth
                                      dispatch(setUserInfo({ userInfo: obj }))
                                    }
                                  } else {
                                    toast.error(`${t('Incorrect_Credentials')}`)
                                  }
                                })
                              }}>{t('disable')}</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="success" onClick={() => {
                        handleClose1()
                      }}>
                        {t('close')}
                      </Button>
                    </Modal.Footer>

                  </Modal>
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
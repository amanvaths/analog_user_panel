import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../Api_connection/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux";
import { setActivity, setNotification, setChangePassword, setPersonalInfo, setSecuritySettings, setIpWhiteListing, setIsLoginActivityOn, setIsTwoFactOn } from "../redux/settings";
import swal from 'sweetalert'



const SecuritySettings = () => {
  console.log();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoginActivityOn, isTwoFactOn } = useSelector((state) => state.setting.value)
  console.log(isTwoFactOn, "state:::::::::");
  const email = localStorage.getItem("email")
  const [lable, setLable] = useState(false);
  const [security, setSecurityKey] = useState("")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onAuth = () => {
    // setLable(!lable)
    dispatch(setIsTwoFactOn({ isTwoFactOn: !isTwoFactOn }))

  }

  const handelLog = async (e) => {
    try {
      const state = e.target.checked
      dispatch(setIsLoginActivityOn({ isLoginActivityOn: state }))
      console.log(state ? 1 : 0, "::State");
      const data = await axios.post('http://localhost:3001/api/login_activity', { email: email, login_activity: state })
      console.log(data, "response from loginActivity api");
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
                        !isTwoFactOn ? <span className="badge badge-danger ms-0">disabled</span> : <span className="badge badge-success ms-0"
                        >enabled</span>
                      }

                    </h6>
                    <p className='p-1'>
                      Secure your account with 2FA security.
                      <p>When it is activated you will need to
                        enter not only your password, but also a
                        special code using app.
                        <p>You can receive
                          this code by in mobile app.</p>
                      </p>

                    </p>
                  </div>
                  {
                    isTwoFactOn ?
                      (

                        <div className="nk-block-actions">
                          <button onClick={() => {
                            onAuth()
                            axios.post(`${BASE_URL}/generateauthtoken`, { email: email})
                          }} className="btn btn-primary">Disable</button>
                        </div>

                      ) :
                      (
                        <div className="nk-block-actions">
                          <button onClick={() => {
                            onAuth();
                            handleShow();
                            axios.post('http://localhost:3001/api/generateauthtoken', { email: email, google_auth: true }).then((res) => { setSecurityKey(res.data); console.log(res.data, "datat"); })
                          }} className="btn btn-primary">Enable</button>
                        </div>
                      )
                  }
                  <Modal show={show} onHide={() => {
                    handleClose()
                    dispatch(setIsTwoFactOn({ isTwoFactOn: !isTwoFactOn }))
                  }}>
                    <Modal.Header closeButton>
                      <Modal.Title>Google Authentication</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className='row d-flex justify-content-around flex-row align-items-center py-2'>
                        <div className='col-6'>
                          <div className=''>
                            <img
                              src={security.qr_url}
                              style={{ height: "150px" }}
                            />
                          </div>
                        </div>
                        <div className='col-6'>
                          <form action="" style={{}}>
                            <div class="form-group">
                              <div class="form-group">
                                <label for="inputOtp">Enter OTP:</label>
                                <input type="text" class="form-control" id="inputOtp" placeholder="Enter Otp" onChange={(e) => setOtp(e.target.value)} />
                              </div>
                              <button type="button" class="btn btn-primary px-2" style={{ width: "150px" }} onClick={() => {
                                axios.post('http://localhost:3001/api/generateauthtoken', { email: email, token: otp }).then((resp) => {
                                  if (resp.data.status == 1) {

                                    swal(`Verified Succesfully.`, "Welcome", "success");
                                    navigate("/home")
                                  } else {
                                    swal(
                                      "Incorrect Credentials",
                                      "Please Enter Right Credentials",
                                      "error"
                                    );
                                  }
                                })
                              }}>Verify</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => {
                        handleClose()
                        dispatch(setIsTwoFactOn({ isTwoFactOn: !isTwoFactOn }))
                      }}>
                        Close
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
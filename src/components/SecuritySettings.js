import React, { useState } from 'react';
import axios from 'axios';

const SecuritySettings = () => {
  const email = localStorage.getItem("email")
  const [checked, setChecked] = useState(1)

const handelLog = async()=>{
   try {
    console.log(checked, "::Data befor API Call");
    const data = await axios.post('http://localhost:3001/api/login_activity',{email: email, login_activity: checked})
    console.log(data, "response from api");
  } catch (error) {
      console.log(error);
  } 
}

console.log(checked, "checked Data");
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
                            checked={checked}
                            onChange={()=>{
                              if(checked){
                                setChecked(1)
                              }else{
                                setChecked(0)
                              }
                              handelLog()
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
                        <a href="#" className="btn btn-primary"
                        >Change Password</a
                        >
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
                      <span className="badge badge-success ms-0"
                      >Enabled</span
                      >
                    </h6>
                    <p className='p-1'>
                      Secure your account with 2FA security.
                      When it is activated you will need to
                      enter not only your password, but also a
                      special code using app. You can receive
                      this code by in mobile app.
                    </p>
                  </div>
                  <div className="nk-block-actions">
                    <a href="#" className="btn btn-primary"
                    >Disable</a
                    >
                  </div>
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
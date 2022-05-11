import React, { useState } from "react";
import { BASE_URL } from "../Api_connection/config";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

const OtpTFA = (props) => {

  const email = localStorage.getItem("email");
  const [otp, setOtp] = useState('')

  const verifyOTP = async(e)=>{
      try {
        e.preventDefault();
        const data = await axios.post(`${BASE_URL}/verifyauthtoken`,{email: email, token: otp})
        console.log(data);
      } catch (error) {
        console.log(error);
      }
       
  }


  return (
    <div>
      <div className="nk-content">
        <div className="nk-split nk-split-page nk-split-md">
          <div className="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white">
            <div className="absolute-top-right d-lg-none p-3 p-sm-5">
              <a
                href="#"
                className="toggle btn-white btn btn-icon btn-light"
                data-target="athPromo"
              >
                <em className="icon ni ni-info"></em>
              </a>
            </div>
            <div className="nk-block nk-block-middle nk-auth-body">
              <div className="brand-logo pb-5">
                <a href="#" className="logo-link">
                  <img
                    className="logo-light logo-img logo-img-lg"
                    src="./images/logo.png"
                    srcSet="./images/logo2x.png 2x"
                    alt="logo"
                  />
                  <img
                    className="logo-dark logo-img logo-img-lg"
                    src="./images/logo.png"
                    srcSet="./images/logo-dark2x.png 2x"
                    alt="logo-dark"
                  />
                </a>
              </div>
              <div className="nk-block-head">
                <div className="nk-block-head-content">
                  <h5 className="nk-block-title">2FA OTP Verification </h5>
                  <div className="nk-block-des">
                    <p>
                      Connect with <b>Analog Inceptive</b> of{" "}
                      <b>INRX Blockchain</b>.
                    </p>
                  </div>
                </div>
              </div>
              {/* {res.status == true ? (
                <h1 style={{ color: "green", fontSize: 20 }}>{res.messege}</h1>
              ) : (
                <h1 style={{ color: "red", fontSize: 20 }}>{res.messege}</h1>
              )} */}
              <form>
                <h6 className="nk-block-title alert alert-primary alert_box_messege">
                  Enter OTP from google Authenticator
                </h6>
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" for="default-01">
                      Enter OTP
                    </label>
                  </div>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="default-01"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <button
                    className="btn btn-lg btn-primary btn-block"
                    onClick={(e) => {
                        verifyOTP(e)
                    }}
                  >
                    Verify
                  </button>
                </div>
              </form>
              <div className="form-note-s2 pt-4">
                {" "}
                New on our platform? <a href="/signup">Create an account</a>
              </div>
              <div className="text-center pt-4 pb-3">
                <h6 className="overline-title overline-title-sap">
                  <span>OR</span>
                </h6>
              </div>
            </div>
            <div className="nk-block nk-auth-footer">
              <div className="nk-block-between">
                <ul className="nav nav-sm">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Terms & Condition
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Privacy Policy
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Help
                    </a>
                  </li>
                  <li className="nav-item dropup">
                    <a
                      className="dropdown-toggle dropdown-indicator has-indicator nav-link"
                      data-toggle="dropdown"
                      data-offset="0,10"
                    >
                      <small>English</small>
                    </a>
                    <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                      <ul className="language-list">
                        <li>
                          <a href="#" className="language-item">
                            <img
                              src="./images/flags/english.png"
                              alt=""
                              className="language-flag"
                            />
                            <span className="language-name">English</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="language-item">
                            <img
                              src="./images/flags/spanish.png"
                              alt=""
                              className="language-flag"
                            />
                            <span className="language-name">Español</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="language-item">
                            <img
                              src="./images/flags/french.png"
                              alt=""
                              className="language-flag"
                            />
                            <span className="language-name">Français</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="language-item">
                            <img
                              src="./images/flags/turkey.png"
                              alt=""
                              className="language-flag"
                            />
                            <span className="language-name">Türkçe</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mt-3">
                <p>&copy; 2021 INRX ECOSYSTEM. All Rights Reserved.</p>
              </div>
            </div>
          </div>
          <div
            className="nk-split-content nk-split-stretch bg-lighter d-flex toggle-break-lg toggle-slide toggle-slide-right"
            data-content="athPromo"
            data-toggle-screen="lg"
            data-toggle-overlay="true"
          >
            <div className="slider-wrap w-100 w-max-550px p-3 p-sm-5 m-auto">
              <div
                className="slider-init"
                data-slick='{"dots":true, "arrows":false}'
              >
                <div className="slider-item">
                  <div className="nk-feature nk-feature-center">
                    <div className="nk-feature-img">
                      <img
                        className="round"
                        src="./images/slides/slide-a.png"
                        srcSet="./images/slides/promo-a2x.png 2x"
                        alt=""
                      />
                    </div>
                    <div className="nk-feature-content py-4 p-sm-5">
                      <h4>INRX NETWORK</h4>
                      <p>INCEPTIVE ANALOG</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="slider-dots"></div>
              <div className="slider-arrows"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpTFA;

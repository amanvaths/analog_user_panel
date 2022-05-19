import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../Api_connection/config";
import { Signupn } from "../Api_connection/ApiFunction";
import { GoogleLogin } from "react-google-login";
import { useSelector, useDispatch } from "react-redux";
// import { setReferralCode } from "../redux/reducer/user";
// import { FacebookLogin } from "react-facebook-login";
import swal from "sweetalert";
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
import { sendOtp } from "../redux/reducer/user";

// import FacebookLogin from "react-facebook-login";
const Signup = (props) => {
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(window.location.search);
  const reff = queryParams.get('ref');

  const { userInfo } = useSelector((state) => state.user.value)
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ref, setRef] = useState(reff)

  const [emailerror, setEmailerror] = useState(false);
  const [passworderror, setPassworderror] = useState(false);
  const [confirmPassworderror, setConfirmPassworderror] = useState(false);

  const [passwordShone, setPasswordShone] = useState(false)
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false)

  // const [showOtp, setShowOtp] = useState(false);
  // const [otp, setOTP] = useState("");
  // const [otpErr, setOtpError] = useState(false);
  // const [valida, setValida] = useState(false);

  async function Signup() {
    await fetch(BASE_URL + "/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "allow-access-origin-control": "*",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        confirm_password: confirmPassword,
        referral_code: ref,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.status == 1) {
          swal("User Sign Up Successfully", "Please verify OTP", "success");
          dispatch(sendOtp(({ LoginDetails: resp })))
          setTimeout(() => {
            navigate("/EmailOtp");
          }, 3000);
        }
        if (resp.status == 0) {
          swal(
            "Password and Confirm Password do not match",
            "Enter Same Password",
            "error"
          );
        }
        if (resp.status == -1) {
          swal("Email Already Registerd", "Try with new Email ID", "error");
        } /* else {
          setResponse(resp);
          // swal(`${resp.message}`, "Try with new email ID", "error");
        } */
      });
  }

  const togglePassword1 = () => {
    setPasswordShone(!passwordShone)
  };

  const togglePassword2 = () => {
    setConfirmPasswordShown(!confirmPasswordShown)
  };

  //Login With Google

  const GoogleId =
    "28253347908-l3f5pge45v4avpv50ppksjlkvvap6t35.apps.googleusercontent.com";

  const onLoginSuccess = (res) => {
    console.log(res);
  };

  const onLoginFailure = (res) => {
    console.log(res);
  };

  //Validation Box

  var myInput = document.getElementById("password");
  var letter = document.getElementById("letter");
  var capital = document.getElementById("capital");
  var number = document.getElementById("number");
  var length = document.getElementById("length");

  // Show the Validation Box

  function _onfocus() {
    document.getElementById("validation-box").style.display = "block";
  }

  // hide the Validation Box

  // function _onblur() {
  //   document.getElementById("validation-box").style.display = "none";
  // }

  // when User Start To type letter Validation

  function _onkeyup() {
    var symble = /[#@$%&*]/g;
    if (myInput.value.match(symble)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }

    //UpperCase Letter Vali

    var UpperCaseLatter = /[A-Z]/g;
    if (myInput.value.match(UpperCaseLatter)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }

    //Number Vali..

    var Number = /[0-9]/g;
    if (myInput.value.match(Number)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }

    //length for Validation

    if (myInput.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  }

  const handelFormSubmit = (email, password, confirmPassword) => {
    if (email == "") {
      setEmailerror(true);
    }
    if (password == "") {
      setPassworderror(true);
    }
    if (confirmPassword == "") {
      setConfirmPassworderror(true);
    }

    if (email !== "" && password !== "" && confirmPassword !== "") {
      Signup();
    }
  };

  return (
    <div>
      <div className="nk-content ">
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
                    src="./images/logo-dark.png"
                    srcSet="./images/logo-dark2x.png 2x"
                    alt="logo-dark"
                  />
                </a>
              </div>
              <div className="nk-block-head">
                <div className="nk-block-head-content">
                  <h5 className="nk-block-title">Sign-Up</h5>
                  <div className="nk-block-des">
                    <p>
                      Connect with <b>Analog Inceptive</b> of{" "}
                      <b>INRX Blockchain</b>.
                    </p>
                  </div>
                </div>
              </div>
              <form
                action="#"
                onSubmit={(e) => {
                  e.preventDefault();

                  handelFormSubmit(email, password, confirmPassword);
                }}
              >
                <div className="form-group ">
                  <div className="form-label-group ">
                    <label className="form-label" for="default-01">
                      Email
                    </label>
                    <a className="link link-primary link-sm" tabindex="-1" href="#">
                      Need Help?
                    </a>
                  </div>

                  <input
                    id="user"
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value.toLowerCase());
                      setEmailerror(false);
                    }}
                    onBlur={() => {
                      if (email === "") {
                        setEmailerror(true);
                      }
                    }}
                    style={{ fontSize: "15px" }} />
                </div>
                {emailerror == true ? (
                  <p style={{ color: "red", marginTop: -20 }}>
                    Email Is Requierd *
                  </p>
                ) : null}

                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" for="password">
                      Password
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <a
                      tabIndex="-1"
                      href="#"
                      className="form-icon form-icon-right passcode-switch"
                      data-target="password"
                    >
                      {
                        passwordShone == false ? <AiOutlineEyeInvisible onClick={togglePassword1} /> : <AiOutlineEye onClick={togglePassword1} />
                      }
                    </a>
                    <input
                      type={passwordShone ? "text" : "password"}
                      className="form-control form-control-lg"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      minLength={8}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPassworderror(false);
                      }}
                      onFocus={() => _onfocus()}
                      // onBlur={() => {
                      //   _onblur();
                      // }}
                      onBlur={() => {
                        if (password === "") {
                          setPassworderror(true);
                        }
                      }}
                      onKeyUp={() => _onkeyup()}
                      style={{ fontSize: "15px" }} />
                  </div>

                  <div id="validation-box">
                    <h6 className="passvalid" id="capital">
                      1 Uppercase Character
                    </h6>
                    <h6 className="passvalid" id="number">
                      1 Numeric Value
                    </h6>
                    <h6 className="passvalid" id="letter">
                      1 Special Symbol eg:@#
                    </h6>
                    <h6 className="passvalid" id="length">
                      length should be greater than 8
                    </h6>
                  </div>
                </div>
                {passworderror == true ? (
                  <p style={{ color: "red", marginTop: -20 }}>
                    Password Is Requierd *
                  </p>
                ) : null}

                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" for="confirm-password">
                      Confirm Password
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <a
                      tabIndex="-1"
                      href="#"
                      className="form-icon form-icon-right passcode-switch"
                      data-target="confirm-password"
                    >
                      {
                        confirmPasswordShown == false ? <AiOutlineEyeInvisible onClick={togglePassword2} /> : <AiOutlineEye onClick={togglePassword2} />
                      }
                    </a>
                    <input
                      type={confirmPasswordShown ? "text" : "password"}
                      className="form-control form-control-lg"
                      id="confirm-password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setConfirmPassworderror(false);
                      }}
                      onBlur={() => {
                        if (confirmPassword === "") {
                          setConfirmPassworderror(true);
                        }
                      }}
                      style={{ fontSize: "15px" }} />
                  </div>
                </div>
                {confirmPassworderror == true ? (
                  <p style={{ color: "red", marginTop: -20 }}>
                    Password Is Requierd *
                  </p>
                ) : null}

                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" for="referal-code">
                      Referal Code (optional)
                    </label>
                  </div>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="referal-code"
                    placeholder="Enter Referal Code"
                    value={ref}
                    readOnly={reff ? true: false}
                    onChange={(e) => {
                     setRef(e.target.value)
                      // dispatch(setReferralCode({ referralCode: e.target.value }))
                    }}
                    style={{ fontSize: "15px" }} 
                    />
                </div>

                <div className="form-group">
                  <button
                    className="btn btn-lg btn-primary btn-block"
                  // onClick={Signup}
                  >
                    Sign up
                  </button>
                </div>
              </form>
              <div className="form-note-s2 pt-4">
                {" "}
                Already Interact <a href="/login">Sign in</a>
                {/* Otp Interact <a href="/EmailOtp">Resend Otp</a> */}
              </div>

              <div className="text-center pt-4 pb-3">
                <h6 className="overline-title overline-title-sap">
                  <span>OR</span>
                </h6>
              </div>
              <ul className="nav justify-center gx-4">
                <li className="nav-item ">
                  {/* <FacebookLogin
                      className="facebook-button"
                      appId="1088597931155576"
                      autoLoad={true}
                      //   cssclassName="my-facebook-button-class"
                      fields="name,email,picture"
                      scope="public_profile,user_friends,user_actions.books"
                      callback={this.responseFacebook}
                    /> */}
                  {/* <FacebookLogin
                    appId="1088597931155576"
                    autoLoad={true}
                    fields="name,email,picture"
                    callback={props.SocialSignUp}
                    cssclassName="btnFacebook"
                    icon={<i className="fa fa-facebook" className="logo-fb"></i>}
                    textButton="Sign up with Facebook"
                  /> */}
                </li>
                <li className="nav-item">
                  <GoogleLogin
                    clientId={GoogleId}
                    buttonText="Sign up with Google"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={"single_host_origin"}
                  />
                </li>
              </ul>
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
                <p>&copy; 2022 INRX ECOSYSTEM. All Rights Reserved.</p>
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
                        src="./images/slides/promo-a.png"
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

export default Signup;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Api_connection/config";
import { Signupn } from "../Api_connection/ApiFunction";
import { GoogleLogin } from "react-google-login";
import swal from "sweetalert";
// import queryString from "query-string";
import { useParams, useLocation } from "react-router-dom";

// import FacebookLogin from "react-facebook-login";
const ResetPassword = (props) => {
  const location = useLocation();
  const resetCode = location.search;
  const resetCode1 = resetCode.substring(10);
  console.log(resetCode1, "reset code");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [response, setResponse] = useState("");
  const [passworderror, setPassworderror] = useState(false);
  const [confirmPassworderror, setConfirmPassworderror] = useState(false);
  // const [otp, setOTP] = useState("");
  // const [otpErr, setOtpError] = useState(false);
  // const [valida, setValida] = useState(false);
  const clientId =
    "28253347908-l3f5pge45v4avpv50ppksjlkvvap6t35.apps.googleusercontent.com";

  const onLoginSuccess = (res) => {
    console.log(res.profileObj);
  };

  const onLoginFailure = (res) => {
    console.log(res);
  };

  async function ResetPasswordApi() {
    await fetch(BASE_URL + "/reset", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "allow-access-origin-control": "*",
      },
      body: JSON.stringify({
        resetCode: resetCode1,
        password: password,
        confirmPassword: confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        // localStorage.setItem("email", "");

        console.log(resp, "response..");
        if (resp.status == "true") {
          swal(resp.message);
          setTimeout(() => {
            navigate("/Login");
          }, 2000);

          // return <Navigate to="/dashboard" />;
        } else {
          setResponse(resp);
        }
      });
  }

  //Login With Google

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

  const handelFormSubmit = (password, confirmPassword) => {
    if (password == "") {
      setPassworderror(true);
    }
    if (confirmPassword == "") {
      setConfirmPassworderror(true);
    }
  };
  const params = useParams();
  console.log(params.restcode, "params");
  return (
    <div>
      <div class="nk-content ">
        <div class="nk-split nk-split-page nk-split-md">
          <div class="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white">
            <div class="absolute-top-right d-lg-none p-3 p-sm-5">
              <a
                href="#"
                class="toggle btn-white btn btn-icon btn-light"
                data-target="athPromo"
              >
                <em class="icon ni ni-info"></em>
              </a>
            </div>
            <div class="nk-block nk-block-middle nk-auth-body">
              <div class="brand-logo pb-5">
                <a href="#" class="logo-link">
                  <img
                    class="logo-light logo-img logo-img-lg"
                    src="./images/logo.png"
                    srcset="./images/logo2x.png 2x"
                    alt="logo"
                  />
                  <img
                    class="logo-dark logo-img logo-img-lg"
                    src="./images/logo-dark.png"
                    srcset="./images/logo-dark2x.png 2x"
                    alt="logo-dark"
                  />
                </a>
              </div>
              <div class="nk-block-head">
                <div class="nk-block-head-content">
                  <h5 class="nk-block-title">Choose a new password.</h5>
                  <div class="nk-block-des">
                    <p>
                      Connect with <b>Analog Inceptive</b> of{" "}
                      <b>INRX Blockchain</b>.
                    </p>
                  </div>
                </div>
              </div>

              {/* {res.status == true ? (
                <h1 style={{ color: "green", fontSize: 20 }}>{res.message}</h1>
              ) : res.status == false ? (
                <h1 style={{ color: "red", fontSize: 20 }}>{res.message}</h1>
              ) : null} */}

              {response.status == true ? (
                <h1 style={{ color: "green", fontSize: 20 }}>
                  {response.message}
                </h1>
              ) : (
                <h1 style={{ color: "red", fontSize: 20 }}>
                  {response.message}
                </h1>
              )}

              <form
                action="#"
                onSubmit={(e) => {
                  e.preventDefault();

                  handelFormSubmit(password, confirmPassword);
                }}
              >
                <div class="form-group">
                  <div class="form-label-group">
                    <label class="form-label" for="password">
                      Password
                    </label>
                  </div>
                  <div class="form-control-wrap">
                    <a
                      tabindex="-1"
                      href="#"
                      class="form-icon form-icon-right passcode-switch"
                      data-target="password"
                    >
                      <em class="passcode-icon icon-show icon ni ni-eye"></em>
                      <em class="passcode-icon icon-hide icon ni ni-eye-off"></em>
                    </a>
                    <input
                      type="password"
                      class="form-control form-control-lg"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      minLength={8}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPassworderror(false);
                      }}
                      // onBlur={() => {
                      //   if (password === "") {
                      //     setPassworderror(true);
                      //   }
                      // }}
                      onFocus={() => _onfocus()}
                      onKeyUp={() => _onkeyup()}
                    />
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

                <div class="form-group">
                  <div class="form-label-group">
                    <label class="form-label" for="confirm-password">
                      Confirm Password
                    </label>
                  </div>
                  <div class="form-control-wrap">
                    <a
                      tabindex="-1"
                      href="#"
                      class="form-icon form-icon-right passcode-switch"
                      data-target="confirm-password"
                    >
                      <em class="passcode-icon icon-show icon ni ni-eye"></em>
                      <em class="passcode-icon icon-hide icon ni ni-eye-off"></em>
                    </a>
                    <input
                      type="password"
                      class="form-control form-control-lg"
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
                    />
                  </div>
                </div>
                {confirmPassworderror == true ? (
                  <p style={{ color: "red", marginTop: -20 }}>
                    Password Is Requierd *
                  </p>
                ) : null}

                <div class="form-group">
                  <button
                    class="btn btn-lg btn-primary btn-block"
                    onClick={ResetPasswordApi}
                  >
                    Reset Password
                  </button>
                </div>
              </form>
              <div class="form-note-s2 pt-4">
                {" "}
                Already Interact <a href="/Login">Sign in</a>
                {/* Otp Interact <a href="/EmailOtp">Resend Otp</a> */}
              </div>

              <div class="text-center pt-4 pb-3">
                <h6 class="overline-title overline-title-sap">
                  <span>OR</span>
                </h6>
              </div>
              <ul class="nav justify-center gx-4">
                <li class="nav-item ">
                  {/* <FacebookLogin
                      className="facebook-button"
                      appId="1088597931155576"
                      autoLoad={true}
                      //   cssClass="my-facebook-button-class"
                      fields="name,email,picture"
                      scope="public_profile,user_friends,user_actions.books"
                      callback={this.responseFacebook}
                    /> */}
                  {/* <FacebookLogin
                    appId="1088597931155576"
                    autoLoad={true}
                    fields="name,email,picture"
                    callback={props.SocialSignUp}
                    cssClass="btnFacebook"
                    icon={<i className="fa fa-facebook" class="logo-fb"></i>}
                    textButton="Sign up with Facebook"
                  /> */}
                </li>
                <li class="nav-item">
                  <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign up with Google"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={"single_host_origin"}
                  />
                </li>
              </ul>
            </div>
            <div class="nk-block nk-auth-footer">
              <div class="nk-block-between">
                <ul class="nav nav-sm">
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      Terms & Condition
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      Privacy Policy
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      Help
                    </a>
                  </li>
                  <li class="nav-item dropup">
                    <a
                      class="dropdown-toggle dropdown-indicator has-indicator nav-link"
                      data-toggle="dropdown"
                      data-offset="0,10"
                    >
                      <small>English</small>
                    </a>
                    <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                      <ul class="language-list">
                        <li>
                          <a href="#" class="language-item">
                            <img
                              src="./images/flags/english.png"
                              alt=""
                              class="language-flag"
                            />
                            <span class="language-name">English</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" class="language-item">
                            <img
                              src="./images/flags/spanish.png"
                              alt=""
                              class="language-flag"
                            />
                            <span class="language-name">Español</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" class="language-item">
                            <img
                              src="./images/flags/french.png"
                              alt=""
                              class="language-flag"
                            />
                            <span class="language-name">Français</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" class="language-item">
                            <img
                              src="./images/flags/turkey.png"
                              alt=""
                              class="language-flag"
                            />
                            <span class="language-name">Türkçe</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="mt-3">
                <p>&copy; 2021 INRX ECOSYSTEM. All Rights Reserved.</p>
              </div>
            </div>
          </div>
          <div
            class="nk-split-content nk-split-stretch bg-lighter d-flex toggle-break-lg toggle-slide toggle-slide-right"
            data-content="athPromo"
            data-toggle-screen="lg"
            data-toggle-overlay="true"
          >
            <div class="slider-wrap w-100 w-max-550px p-3 p-sm-5 m-auto">
              <div
                class="slider-init"
                data-slick='{"dots":true, "arrows":false}'
              >
                <div class="slider-item">
                  <div class="nk-feature nk-feature-center">
                    <div class="nk-feature-img">
                      <img
                        class="round"
                        src="./images/slides/promo-a.png"
                        srcset="./images/slides/promo-a2x.png 2x"
                        alt=""
                      />
                    </div>
                    <div class="nk-feature-content py-4 p-sm-5">
                      <h4>INRX NETWORK</h4>
                      <p>INCEPTIVE ANALOG</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="slider-dots"></div>
              <div class="slider-arrows"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

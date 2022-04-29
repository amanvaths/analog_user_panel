import React, { useState } from "react";
import { BASE_URL } from "../Api_connection/config";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import swal from "sweetalert";

const ForgetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [emailerror, setEmailerror] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const navigate = useNavigate();

  // console.log(otp, "otpp");

  //   var LocalEmail = localStorage.setItem("email", email);
  //   console.log(LocalEmail, "LocalEmal");
  //   if (LocalEmail == "t") {
  //     navigate("/");
  //   }
  async function forgetPass(e) {
    e.preventDefault();
    await fetch("http://localhost:3001/api/forget", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "allow-access-origin-control": "*",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())

      .then((resp) => {
        // console.log(email);

        console.log(resp, "resp");
        if (resp.status == 1) {
          //   navigate("/Login");
          swal(
            "Reset link is shared on your registerd email id",
            "Click on Reset button to reset password",
            "info"
          );
        }
        if (resp.status == 4) {
          swal("Email is not registerd", "", "error");
        }
      });
  }

  const handelEmailValidation = (email) => {
    if (email == "") {
      setEmailerror(true);
      // showMessage(false);
    }
  };

  // Login With Google

  const clientId =
    "28253347908-l3f5pge45v4avpv50ppksjlkvvap6t35.apps.googleusercontent.com";

  const onLoginSuccess = (res) => {
    console.log(res.profileObj);
  };

  const onLoginFailure = (res) => {
    console.log(res);
  };

  return (
    <div>
      <div class="nk-content">
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
                    src="./images/logo.png"
                    srcset="./images/logo-dark2x.png 2x"
                    alt="logo-dark"
                  />
                </a>
              </div>
              <div class="nk-block-head">
                <div class="nk-block-head-content">
                  <h5 class="nk-block-title">Reset Password </h5>
                  <div class="nk-block-des">
                    <p>
                      Connect with <b>Analog Inceptive</b> of{" "}
                      <b>INRX Blockchain</b>.
                    </p>
                  </div>
                </div>
              </div>
              {/*  {showNewMessage ? (
                <div>
                  {showMessage == true ? (
                    <div class="alert alert-success" role="alert">
                      Reset Link shared on Registered email id
                    </div>
                  ) : (
                    <div class="alert alert-danger" role="alert">
                      Email ID is not Registered
                    </div>
                  )}
                </div>
              ) : null} */}

              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  //   forgetPass();
                }}
              >
                {/* <h6 class="nk-block-title alert alert-primary alert_box_messege">
                  OTP Is Sended on your Registered Email Id
                </h6> */}
                <div class="form-group ">
                  <div class="form-label-group ">
                    <label class="form-label" for="default-01">
                      Email
                    </label>
                  </div>

                  <input
                    id="user"
                    type="email"
                    class="form-control form-control-lg"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value.toLowerCase());
                      setEmailerror(false);
                    }}
                  />
                </div>
                {emailerror == true ? (
                  <p style={{ color: "red", marginTop: -20 }}>
                    Email Is Requierd *
                  </p>
                ) : null}

                <div class="form-group">
                  <button
                    class="btn btn-lg btn-primary btn-block"
                    // // onClick={() => (window.location.href = "/faq")}
                    onClick={(e) => {
                      forgetPass(e);
                      handelEmailValidation(email);
                      setShowNewMessage(true);
                    }}
                  >
                    Reset Password
                  </button>
                </div>
              </form>
              <div class="form-note-s2 pt-4">
                {" "}
                New on our platform? <a href="/signup">Create an account</a>
                {/* New on our platform? <a href="/ResetPassword">Reset Password</a> */}
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
                        src="./images/slides/slide-a.png"
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

export default ForgetPassword;

import React, { useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const ResendOtp = (props) => {
  const [email, setEmail] = useState("");
  const [emailerror, setEmailerror] = useState(false);
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  // console.log(email, "otpp");

  // var email = localStorage.getItem("email");
  // if (email == "") {
  //   navigate("/");
  // }
  async function ResendOtpApi(e) {
    // e.preventDefault();
    await fetch("http://localhost:3001/api/sendotp", {
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
        console.log(resp);
        console.log(response, "resp");
        if (resp.status == 1) {
          swal(
            "OTP sended successfully",
            "OTP Sended On Registerd Email ",
            "success"
          );

          navigate("/EmailOtp");

          console.log(resp, "resp");
        } else {
          setResponse(resp);
        }
      });
  }

  const handelFormSubmit = (email) => {
    if (email == "") {
      setEmailerror(true);
    }
    if (email !== "") {
      ResendOtpApi();
    }
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
                  <h5 class="nk-block-title">Resend OTP</h5>
                  <div class="nk-block-des">
                    <p>
                      Connect with <b>Analog Inceptive</b> of{" "}
                      <b>INRX Blockchain</b>.
                    </p>
                  </div>
                </div>
              </div>
              {response.status == true ? (
                <h1 style={{ color: "green", fontSize: 20 }}>
                  {response.messege}
                </h1>
              ) : (
                <h1 style={{ color: "red", fontSize: 20 }}>
                  {response.messege}
                </h1>
              )}
              <form
                action="#"
                onSubmit={(e) => {
                  e.preventDefault();

                  handelFormSubmit(email);
                }}
              >
                {/* <h6 class="nk-block-title alert alert-primary alert_box_messege">
                  OTP Is Sended on your Registered Email Id
                </h6> */}
                <div class="form-group">
                  <div class="form-label-group">
                    <label class="form-label" for="default-01">
                      Enter Email
                    </label>
                  </div>
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    id="default-01"
                    placeholder="Enter Email"
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
                    // onClick={(e) => {
                    //   ResendOtpApi(e);
                    // }}
                  >
                    Send OTP
                  </button>
                </div>
              </form>
              <div class="form-note-s2 pt-4">
                {" "}
                New on our platform? <a href="/signup">Create an account</a>
              </div>
              <div class="text-center pt-4 pb-3">
                <h6 class="overline-title overline-title-sap">
                  <span>OR</span>
                </h6>
              </div>
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

export default ResendOtp;

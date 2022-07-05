import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../Api_connection/config";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
// import { setReferralCode } from "../redux/reducer/user";
// import { FacebookLogin } from "react-facebook-login";
import swal from "sweetalert";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { sendOtp } from "../redux/reducer/user";

// import FacebookLogin from "react-facebook-login";
const Signup = (props) => {
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(window.location.search);
  const reff = queryParams.get('ref');
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


  async function Signup() {
    await fetch(`${BASE_URL}/signup`, {
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
            "Something went wrong",
            "Try again",
            "error"
          );
        }
        if (resp.status == 3) {
          swal(
            "Invalid Refferal Code",
            "Try again",
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
    console.log(res, "P");
  };

  const onLoginFailure = (res) => {
    console.log(res, "F");
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
    if (password !== confirmPassword) {
      return swal(
        "Password and Confirm password not matched",
        "Enter correct password",
        "error"
      );
    }
    if (email !== "" && password !== "" && confirmPassword !== "") {
      Signup();
    }
  };

  return (
    <div class="bg-login">
      <div className="nk-apps-root">
        <div className="nk-content container mt-lg-5 pt-lg-5 align-items-center">
          <div className="row justify-content-md-center">
            <div class="col-md-4 bg-teal shadow  d-flex align-items-center">
              <div class="card-inner text-white"> 
                <div className="nk-block-head-content">
                  <h2 className="nk-block-title">SIGN UP</h2>
                  <div className="lead">
                    <p>
                    Create an account with <b>Analog Inceptive</b> of{" "}
                      <b>INRX Blockchain</b> and discover a great amount of opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 bg-light border shadow">
              <div className="card-inner">
                <div className="brand-logo pb-3">
                  <Link to="" className="logo-link">                    
                    <img
                      className="logo-dark logo-img logo-img-lg"
                      src="./images/logo-dark.png"
                      srcSet="./images/logo-dark2x.png 2x"
                      alt="logo-dark"
                    />
                  </Link>
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
                      {/* <Link to="" className="link link-primary link-sm" tabindex="-1">
                      Need Help?
                    </Link>*/}
                    </div>

                    <input
                      id="user"
                      type="email"
                      className="form-control"
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
                    <p className="text-danger mt-n3">
                      Email is requierd !
                    </p>
                  ) : null}

                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" for="password">
                        Password
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <Link
                        tabIndex="-1"
                        to=""
                        className="form-icon form-icon-right passcode-switch text-dark"
                        data-target="password"
                      >
                        {
                          passwordShone == false ? <AiOutlineEyeInvisible onClick={togglePassword1} /> : <AiOutlineEye onClick={togglePassword1} />
                        }
                      </Link>
                      <input
                        type={passwordShone ? "text" : "password"}
                        className="form-control"
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
                        // onKeyUp={() => _onkeyup()}
                        style={{ fontSize: "15px" }} />
                    </div>

                    <div id="validation-box">
                    <p class="text-soft small">We suggest having at least one capital and one lower-case letter (Aa-Zz), 
                    one special symbol (#, &amp;, % etc) and one number (0-9) in your password for the best strength</p>
                    </div>
                  </div>
                  {passworderror == true ? (
                    <p className="text-danger mt-n3">
                      Password is requierd !
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
                        className="form-icon form-icon-right passcode-switch text-dark"
                        data-target="confirm-password"
                      >
                        {
                          confirmPasswordShown == false ? <AiOutlineEyeInvisible onClick={togglePassword2} /> : <AiOutlineEye onClick={togglePassword2} />
                        }
                      </a>
                      <input
                        type={confirmPasswordShown ? "text" : "password"}
                        className="form-control"
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
                    <p className="text-danger mt-n3">
                      Password is requierd !
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
                      className="form-control"
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
                      className="btn btn-dim bg-teal text-white btn-block"
                    // onClick={Signup}
                    >
                      Sign up
                    </button>
                  </div>
                </form>
                <div className="form-note-s2 pt-2 text-right">
                  {" "}
                  Already have an account ? <a class="text-teal" href="/login">Sign in</a>
                  {/* Otp Interact <a href="/EmailOtp">Resend Otp</a> */}
                </div>

                <div className="text-center pt-4 pb-3">
                  <span className="overline-title overline-title-sap">
                    <span>OR</span>
                  </span>
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
           
          </div>
          </div>
          <div className="nk-content text-center mt-lg-2">
              <div className="container container justify-content-center d-flex">
               {/*<ul className="nav nav-sm">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Terms &amp; Condition
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
                    </Link>
                    <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                      <ul className="language-list">
                        <li>
                          <Link to="" className="language-item">
                            <img
                              src="./images/flags/english.png"
                              alt=""
                              className="language-flag"
                            />
                            <span className="language-name">English</span>
                          </a>
                        </li>
                        <li>
                          <Link to="" className="language-item">
                            <img
                              src="./images/flags/spanish.png"
                              alt=""
                              className="language-flag"
                            />
                            <span className="language-name">Español</span>
                          </a>
                        </li>
                        <li>
                          <Link to=""" className="language-item">
                            <img
                              src="./images/flags/french.png"
                              alt=""
                              className="language-flag"
                            />
                            <span className="language-name">Français</span>
                          </a>
                        </li>
                        <li>
                          <Link to="" className="language-item">
                            <img
                              src="./images/flags/turkey.png"
                              alt=""
                              className="language-flag"
                            />
                            <span className="language-name">Türkçe</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  </ul>*/}
              </div>
              <div className="mt-3">
                <p>&copy; 2022 INRX ECOSYSTEM. All Rights Reserved.</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

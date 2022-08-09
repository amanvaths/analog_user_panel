/* global google */
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../Api_connection/config";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { Vertify } from '@alex_xu/react-slider-vertify';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, sendOtp } from "../redux/reducer/user";
import jwt_decode from 'jwt-decode'
import axios from "axios";
import toast from 'react-hot-toast';
import $ from 'jquery'
const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailerror, setEmailerror] = useState(false);
  const [passworderror, setPassworderror] = useState(false);
  const [shown, setShown] = useState(false)
  const [ii, setII] = useState('')
  const [captcha, setCaptcha] = useState(false)

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "879223788790-mhj4ntd15ashepqn5h4ec4hu4fncmr8t.apps.googleusercontent.com",
        callback: handleCallback
      });

      window.google.accounts.id.renderButton(
        document.getElementById('googleLogin'),
        { theme: "outline", size: "large" }
      );

      window.google.accounts.id.prompt()
    }
  }, [window.google])

  const handleCallback = async (response) => {
    let obj = jwt_decode(response.credential)
    // console.log(obj)
    // setII(obj.picture)
    // console.log(email,"email");
    const data = await axios.post(`${BASE_URL}/signInWithGoogle`, { email: obj.email, password: obj.sub })
    if (data) {
      // console.log(data, "API RESPONSE");
      if (data.data.status === 1) {
        // console.log(data.data.status, "status");
        if (data.data.googleAuth === 0) {
          // console.log(data.data.googleAuth, "GoogleAuth");
          dispatch(setIsLoggedIn({ LoginDetails: data.data }))
          toast.success("Login Successful")
          navigate('/home')
        } else {
          navigate('/2faAuthentication', { state: { email: data.data.email, token: data.data.token } })
        }
      }
    } else {
      toast.error("Something went wrong")
      // swal("Something Went Wrong",
      // "He he hehehe",
      // "error")
    }
  }

  const togglePassword1 = () => {
    setShown(!shown)

  };
  let abortController = new AbortController();

  async function Login() {
    abortController.abort();
    abortController = new AbortController();
    await fetch(BASE_URL + "/signin", {
      method: "POST",
      signal: abortController.signal,
      headers: {
        "content-type": "application/json",
        "allow-access-origin-control": "*",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(async (resp) => {
        console.log(resp, "rerere");
        if (resp.status == 0) {
          toast.error("Incorrect Credentials")

        }
        if (resp.status == 1) {
          if (resp.googleAuth == 1) {
            navigate('/2faAuthentication', { state: { email: email, token: resp.token } })
          } else {

            toast.success("Login Successful")
            dispatch(setIsLoggedIn({ LoginDetails: resp }))
            navigate('/home')
          }
        }
        if (resp.status == 3) {
          toast.error("Email is not varified")

          dispatch(sendOtp(({ LoginDetails: resp })))
          navigate("/ResendOtp");
        }
        if (resp.status == 4) {
          toast.error("Email not Registered")

        }
      });
  }
  const handelFormSubmit = (email, password) => {
    console.log('Click0');
    if (email == "") {
      setEmailerror(true);
    }

    if (password == "") {
      setPassworderror(true);
    }
    // if (captcha === false) {
    //   toast.error("Validate Captcha")
    // }

    if (email !== "" && password !== "") {
      // console.log('Click1');
      const vbtn = document.getElementById("verify-captcha");
      vbtn.click();
      // console.log("kkkk");
      // Login();
    }
    const captchaInterval = setInterval(() => {
      // console.log('Click2');
      const ver = localStorage.getItem('captcha')
      // console.log(ver, 'login status');
      if (ver === 'success') {
        clearInterval(captchaInterval);
        Login();
        localStorage.removeItem('captcha');
      }
    },500);

  };

  return (
    <div>
      <div className="bg-login">
        <div className="nk-apps-root">
          <div className="nk-content container mt-lg-5 pt-lg-5 align-items-center">
            <div className="row justify-content-md-center">
              <div className="col-md-4 bg-teal shadow  d-flex align-items-center">
                <div className="card-inner text-white">
                  <div className="nk-block-head-content">
                    <h2 className="nk-block-title">SIGN IN</h2>
                    <div className="lead">
                      <p>
                        Connect with <strong>Analog Inceptive</strong> of{" "}
                        <strong>INRX Blockchain.</strong></p>
                    </div>
                  </div>
                </div>
              </div>
              {ii == "" ? null : <img src={ii} alt="" />}
              <div className="col-md-6 bg-light border shadow">
                <div className="card-inner">
                  <div className="brand-logo pb-3">
                    <Link to="" className="logo-link">
                      <img
                        className="logo-light logo-img logo-img-lg"
                        src="images/logo-dark.png"
                        alt="logo"
                      />
                      <img
                        className="logo-dark logo-img logo-img-lg"
                        src="images/logo.png"
                        alt="logo-dark"
                      />
                    </Link>
                  </div>
                  {/* {res.status == true ? (
                <h1 style={{ color: "green", fontSize: 20 }}>{res.message}</h1>
              ) : (
                <h1 style={{ color: "red", fontSize: 20 }}>{res.message}</h1>
              )} */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handelFormSubmit(email, password);
                    }}
                  >
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" for="default-01">
                          Email
                        </label>
                        {/* <Link className="link link-teal link-sm" tabindex="-1" to="">
                      Need Help?
                    </Link> */}
                      </div>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        id="default-01"
                        placeholder="Enter email "
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value.toLowerCase());
                          setEmailerror(false);
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
                        <Link className="text-teal" to="/ForgetPassword">Forget Password</Link>
                        {/* <Link to={ForgetPassword}>Forget Password</Link> */}
                      </div>
                      <div className="form-control-wrap">
                        <Link
                          tabIndex="-1"
                          to=""
                          className="form-icon form-icon-right passcode-switch text-dark"
                          data-target="password"
                        >
                          {
                            shown == false ? <AiOutlineEyeInvisible onClick={togglePassword1} /> : <AiOutlineEye onClick={togglePassword1} />
                          }
                        </Link>
                        <input
                          type={shown ? "text" : 'password'}
                          className="form-control form-control-lg"
                          id="password"
                          placeholder="Enter password"
                          minLength={8}
                          autoComplete="on"
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setPassworderror(false);
                          }}
                          style={{ fontSize: "15px" }} />
                      </div>
                    </div>
                    {passworderror == true ? (
                      <p className="text-danger mt-n3">
                        Password is requierd !
                      </p>
                    ) : null}
                    {/* <div style={{width: "320px", height: "160px"}}> */}
                    {/* <div className="abc">
                      <Vertify

                        width={320}
                        height={160}
                        visible={true}
                        onSuccess={() => setCaptcha(true)}
                        onFail={() => toast.error("Invalid Captcha")}
                        onRefresh={() => console.log("")}
                      />
                    </div> */}

                    {/* </div> */}

                    <div className="form-group">

                      <button
                        className="btn text-white bg-teal btn-dim btn-block"
                      // onClick={() => toast.success("HIII")}
                      // onClick={Login}
                      >
                        Sign in
                      </button>
                      <button style={{ display: "none" }} id="verify-captcha" type="button"></button>
                    </div>
                  </form>
                  <div className="form-note-s2 pt-2 text-right small">
                    {" "}
                    Don't have an account yet? <Link className="text-teal" to="/Signup">Create an account</Link>
                  </div>
                  <div className="text-center pt-4 pb-3">
                    <span className="overline-title overline-title-sap">
                      <span>OR</span>
                    </span>
                  </div>
                  <ul className="nav justify-center gx-4">
                    <li className="nav-item">
                    </li>
                    <li className="nav-item">
                      <div id="googleLogin"></div>

                      {" "}

                      {/* </a> */}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="nk-content text-center">
            <div className="container container justify-content-center d-flex">
              {/*}  <ul className="nav nav-sm">
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
                </ul>*/}
            </div>
            <div className="mt-3">
              <p>&copy;{` ${new Date().getFullYear()}  INRX ECOSYSTEM. All Rights Reserved.`}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;

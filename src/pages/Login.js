/* global google */
import React, { useEffect, useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { BASE_URL, GOOGLE_ID } from "../Api_connection/config";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {setIsLoggedIn,sendOtp } from "../redux/reducer/user";
import jwt_decode from 'jwt-decode'
import axios from "axios";

// import FacebookLogin from "react-facebook-login";

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailerror, setEmailerror] = useState(false);
  const [passworderror, setPassworderror] = useState(false);
  const [shown, setShown] = useState(false)
  const [ii, setII] = useState('')



  useEffect(()=>{
    google.accounts.id.initialize({
      client_id: "879223788790-mhj4ntd15ashepqn5h4ec4hu4fncmr8t.apps.googleusercontent.com",
      callback: handleCallback
    });

    google.accounts.id.renderButton(
      document.getElementById('googleLogin'),
      {theme: "outline", size: "large"}
    );

    google.accounts.id.prompt()
  },[google])

  const handleCallback = async(response)=>{
    let obj = jwt_decode(response.credential)
    console.log(obj)
    // setII(obj.picture)
    console.log(email,"email");
    const data  = await axios.post(`${BASE_URL}/signInWithGoogle`, { email: obj.email, password: obj.sub})
    if(data){
      console.log(data, "API RESPONSE");
      if(data.data.status === 1)
      {
        console.log(data.data.status, "status");
        if(data.data.googleAuth === 0){
          console.log(data.data.googleAuth, "GoogleAuth");
          dispatch(setIsLoggedIn({ LoginDetails: data.data }))
            navigate('/home')
        }else{
          navigate('/2faAuthentication', { state: { email: data.data.email, token: data.data.token } })
        }
      }
    }else{
      swal("Something Went Wrong",
      "He he hehehe",
      "error")
    }
  }

  const onLoginSuccess = (res) => {
    console.log(res.profileObj);
  };
  const onLoginFailure = (res) => {
    console.log(res);
  };

  const togglePassword1 = () => {
    setShown(!shown)

  };
  async function Login() {

    await fetch(BASE_URL + "/signin", {
      method: "POST",
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
          swal(
            "Incorrect Credentials",
            "Please Enter Right Credentials",
            "error"
          );
        }
        if (resp.status == 1) {
          if (resp.googleAuth == 1) {
            navigate('/2faAuthentication', { state: { email: email, token: resp.token } })
          } else {
            // localStorage.setItem("email", email);
            // localStorage.setItem("token", resp.token);
            // localStorage.setItem("theme", "0")
            dispatch(setIsLoggedIn({ LoginDetails: resp }))
            navigate('/home')
            // const data = await axios.post(`${BASE_URL}/configSettings`, { email: email })
            // if (data) {
            //   swal(`${resp.message}`, "Welcome", "success");
            //   dispatch(setUserInfo({ userInfo: data.data }))
            //   navigate('/home')
            // }
          }
        }
        if (resp.status == 3) {
          swal("Email is not varified", "Verify Email before Login", "error");
          dispatch(sendOtp(({ LoginDetails: resp })))
          setTimeout(() => {
            navigate("/EmailOtp");
          }, 3000);
          navigate("/ResendOtp");
        }
        if (resp.status == 4) {
          swal("Email not Registered", "Please signup", "error");
        }
      });
  }
  const handelFormSubmit = (email, password) => {
    // setValida(false);
    if (email == "") {
      setEmailerror(true);
    }

    if (password == "") {
      setPassworderror(true);
    }

    if (email !== "" && password !== "") {
      Login();
    }
  };

  

  return (
    <div>
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
                    Connect with <strong>Analog Inceptive</strong> of{" "}
                      <strong>INRX Blockchain.</strong></p>
                  </div>
                </div>
              </div>
            </div>
              
            {ii == ""? null : <img src={ii} alt="" />}
            
            <div className="col-md-6 bg-light border shadow">
              <div className="card-inner">
                <Link to="" className="logo-link">
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
                </Link>
              
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
                <div className="form-group">
                  <button
                    className="btn text-white bg-teal btn-dim btn-block"
                  // onClick={() => (window.location.href = "/faq")}
                  // onClick={Login}
                  >
                    Sign in
                  </button>
                </div>
              </form>
                <div className="form-note-s2 pt-2 text-right small">
                  {" "}
                  Don't have an account yet? <a className="text-teal" href="/signup">Create an account</a>
                </div>
              <div className="text-center pt-4 pb-3">
                <span className="overline-title overline-title-sap">
                  <span>OR</span>
                </span>
              </div>
              <ul className="nav justify-center gx-4">
                <li className="nav-item">
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
                  <div id="googleLogin"></div>
                  {/* {google.accounts.id.renderButton()} */}
                  {/* <GoogleLogin
                    clientId={GOOGLE_ID}
                    buttonText="Sign in with Google"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={"single_host_origin"}
                  /> */}
                  {/* <Link className="nav-link" to=""> */}{" "}
                  {/* <GoogleLogin
                    clientId={clientId}
                    buttonText="Login"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={"single_host_origin"}
                    render={() => (
                      <a className="nav-link" onClick={onLoginSuccess}>
                        Google
                      </a>
                    )}
                  /> */}
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
                <p>&copy; 2022  INRX ECOSYSTEM. All Rights Reserved.</p>
              </div>
            </div>
        </div>
         
      </div>
      </div>
  );
};

export default Login;

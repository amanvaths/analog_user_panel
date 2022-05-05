import React, { useState} from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { BASE_URL } from "../Api_connection/config";
import { useNavigate } from "react-router-dom";
// import ForgetPassword from "./ForgetPassword";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { login } from "../redux/User";

// import FacebookLogin from "react-facebook-login";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailerror, setEmailerror] = useState(false);
  const [passworderror, setPassworderror] = useState(false);
  const [response, setResponse] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const googleId =
    "28253347908-l3f5pge45v4avpv50ppksjlkvvap6t35.apps.googleusercontent.com";
  const onLoginSuccess = (res) => {
    console.log(res.profileObj);
    // window.location.replace('/')
  };
  const onLoginFailure = (res) => {
    console.log(res);
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
      .then((resp) => {
        console.log(resp);
       

        if (resp.status == 0) {
          swal(
            "Incorrect Credentials",
            "Please Enter Right Credentials",
            "error"
          );
        }
        if (resp.status == 1) {
          swal(`${resp.message}`, "Welcome", "success");
          localStorage.setItem("email", email);
          localStorage.setItem("token", resp.token);
          dispatch(login({isLoggedIn: true, userInfo:{email:email, token: resp.token}}));
          navigate("/home");
        }
        if (resp.status == 3) {
          swal("Email is not varified", "Verify Email before Login", "error");
          navigate("/ResendOtp");
        }
        if (resp.status == 4) {
          swal("Email not Registered", "Please signup", "error");
          // localStorage.setItem("token", resp.token);
        }
        /*  else {
          setResponse(resp);
          swal(`${resp.message}`, "Try with new email ID", "error");
        } */
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
                  <h5 className="nk-block-title">Sign-In</h5>
                  <div className="nk-block-des">
                    <p>
                      Connect with <b>Analog Inceptive</b> of{" "}
                      <b>INRX Blockchain</b>.
                    </p>
                  </div>
                </div>
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
                    <a className="link link-primary link-sm" tabindex="-1" href="#">
                      Need Help?
                    </a>
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
                  style={{fontSize: "15px"}}/>
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
                    <a href="/ForgetPassword">Forget Password</a>
                    {/* <Link to={ForgetPassword}>Forget Password</Link> */}
                  </div>
                  <div className="form-control-wrap">
                    <a
                      tabindex="-1"
                      href="#"
                      className="form-icon form-icon-right passcode-switch"
                      data-target="password"
                    >
                      <em className="passcode-icon icon-show icon ni ni-eye"></em>
                      <em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
                    </a>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      placeholder="Enter password"
                      minLength={8}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPassworderror(false);
                      }}
                      style={{fontSize: "15px"}}/>
                  </div>
                </div>
                {passworderror == true ? (
                  <p style={{ color: "red", marginTop: -20 }}>
                    Password Is Requierd *
                  </p>
                ) : null}
                <div className="form-group">
                  <button
                    className="btn btn-lg btn-primary btn-block"
                    // onClick={() => (window.location.href = "/faq")}
                    // onClick={Login}
                  >
                    Sign in
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
                  <GoogleLogin
                    clientId={googleId}
                    buttonText="Sign in with Google"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={"single_host_origin"}
                  />
                  {/* <a className="nav-link" href="#"> */}{" "}
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

export default Login;

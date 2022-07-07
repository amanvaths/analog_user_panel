import React, { useState } from "react";
import { BASE_URL } from "../Api_connection/config";
import { Link} from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import swal from "sweetalert";


const ForgetPassword = (props) => {
 

  const [email, setEmail] = useState("");
  const [emailerror, setEmailerror] = useState(false);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [linkSent, setLinkSent] = useState(true)
  

  async function forgetPass(e) {
    e.preventDefault();
    await fetch(`${BASE_URL}/forget`, {
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
          setLinkSent(false)
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
    <div class="bg-login">
      <div className="nk-apps-root">
        <div className="nk-content container mt-lg-5 pt-lg-5 align-items-center">
          <div className="row justify-content-md-center">
            <div class="col-md-4 bg-teal shadow  d-flex align-items-center">
              <div class="card-inner text-white"> 
                <div className="nk-block-head-content">
                  <h2 className="nk-block-title">Forgot Password ?</h2>
                  <div className="lead">
                    <p>
                    No worries ! Enter your <b>Email Address</b> and we will send you a{" "}
                      <b>Reset</b>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 bg-light border shadow">
              {
                  linkSent === true ?  <div className="card-inner">
                  <div className="brand-logo pb-5">
                    <Link to="/home" className="logo-link">
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
                  </div>
                
                  {/*  {showNewMessage ? (
                    <div>
                      {showMessage == true ? (
                        <div className="alert alert-success" role="alert">
                          Reset Link shared on Registered email id
                        </div>
                      ) : (
                        <div className="alert alert-danger" role="alert">
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
                    {/* <h6 className="nk-block-title alert alert-primary alert_box_messege">
                      OTP Is Sended on your Registered Email Id
                    </h6> */}
                    <div className="form-group ">
                      <div className="form-label-group ">
                        <label className="form-label" for="default-01">
                          Email
                        </label>
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
                      />
                    </div>
                    {emailerror == true ? (
                      <p className="text-danger mt-n3">
                        Email is requierd !
                      </p>
                    ) : null}
    
                    <div className="form-group">
                      <button
                        className="btn btn-dim  text-white bg-teal btn-block"
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
                  <div className="form-note-s2 pt-2 text-right">
                    {" "}
                    {/* New on our platform? <Link to="/Signup">Create an account</Link> */}
                    New on our platform? <Link to="/ResetPassword">Reset Password</Link>
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
                        clientId={clientId}
                        buttonText="Sign up with Google"
                        onSuccess={onLoginSuccess}
                        onFailure={onLoginFailure}
                        cookiePolicy={"single_host_origin"}
                      />
                    </li>
                  </ul>
                  </div> : 
                  <div className="card-inner">
              <div className="brand-logo pb-5">
                <Link to="/home" className="logo-link">
                  <img
                    className="logo-light logo-img logo-img-lg"
                    src="./images/logo-dark.png"
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
              </div>

              <div className="lead">
                    <p>
                    Reset link is shared on your registered Email id
                    </p>
                  </div>
              
              </div>
              }
             

              
            </div>

            <div className="nk-content text-center mt-lg-2">
              <div className="container container justify-content-center d-flex">
                {/* <ul className="nav nav-sm">
                <li className="nav-item">
                    <Link className="nav-link" to="">
                      Terms &amp; Condition
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="" className="nav-link" >
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="" className="nav-link" >
                      Help
                    </Link>
                  </li>
                  <li className="nav-item dropup">
                    <Link
                      to=""
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
                          </Link>
                        </li>
                        <li>
                          <Link to="" className="language-item">
                            <img
                              src="./images/flags/spanish.png"
                              alt=""
                              className="language-flag"
                            />
                            <span className="language-name">Español</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="" className="language-item">
                            <img
                              src="./images/flags/french.png"
                              alt=""
                              className="language-flag"
                            />
                            <span className="language-name">Français</span>
                          </Link>
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
                </ul> */}
              </div>
              <div className="mt-3">
                <p>&copy; 2022 INRX ECOSYSTEM. All Rights Reserved.</p>
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

/* global google */
import React, { useState, useEffect} from "react";
import { useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../Api_connection/config";
import { Link} from "react-router-dom";
import toast from 'react-hot-toast';
import jwt_decode from 'jwt-decode'
import axios from "axios";
import { setIsLoggedIn } from "../redux/reducer/user";




const ForgetPassword = (props) => {
 

  const [email, setEmail] = useState("");
  const [emailerror, setEmailerror] = useState(false);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [linkSent, setLinkSent] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch();

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
          // swal(
          //   "Reset link is shared on your registerd email id",
          //   "Click on Reset button to reset password",
          //   "info"
          // );
          toast.success("Reset link is shared on your registerd email id")
          setLinkSent(false)
        }
        if (resp.status == 4) {
          toast.error("Email is not registered")
          // swal("Email is not registerd", "", "error");
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
      // console.log(obj)
      // setII(obj.picture)
      // console.log(email,"email");
      const data  = await axios.post(`${BASE_URL}/signInWithGoogle`, { email: obj.email, password: obj.sub})
      if(data){
        // console.log(data, "API RESPONSE");
        if(data.data.status === 1)
        {
          console.log(data.data.status, "status");
          if(data.data.googleAuth === 0){
            // console.log(data.data.googleAuth, "GoogleAuth");
            dispatch(setIsLoggedIn({ LoginDetails: data.data }))
              navigate('/home')
          }else{
            navigate('/2faAuthentication', { state: { email: data.data.email, token: data.data.token } })
          }
        }
      }else{
        toast.error("Something Went Wrong")
        // swal("Something Went Wrong",
        // "He he hehehe",
        // "error")
      }
    }

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
                        src="images/logo.png"
                        srcSet="images/logo2x.png 2x"
                        alt="logo"
                      />
                      <img
                        className="logo-dark logo-img logo-img-lg"
                        src="images/logo.png"
                        srcSet="images/logo-dark2x.png 2x"
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
                    New on our platform? <Link to="/Signup" className="text-teal">Create an account</Link>
                    {/* New on our platform? <Link to="/Si">Reset Password</Link> */}
                  </div>
                  <div className="text-center pt-4 pb-3">
                    <span className="overline-title overline-title-sap">
                      <span>OR</span>
                    </span>
                  </div>
                  <ul className="nav justify-center gx-4">
                    <li className="nav-item ">
                      
                    </li>
                    <li className="nav-item">
                    <div id="googleLogin"></div>
                    </li>
                  </ul>
                  </div> : 
                  <div className="card-inner">
              <div className="brand-logo pb-5">
                <Link to="/home" className="logo-link">
                  <img
                    className="logo-light logo-img logo-img-lg"
                    src="images/logo-dark.png"
                    srcSet="images/logo2x.png 2x"
                    alt="logo"
                  />
                  <img
                    className="logo-dark logo-img logo-img-lg"
                    src="images/logo.png"
                    srcSet="images/logo-dark2x.png 2x"
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

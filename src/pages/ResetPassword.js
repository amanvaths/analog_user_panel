import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../Api_connection/config";
import { GoogleLogin } from "react-google-login";
import toast from 'react-hot-toast';
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
import { useParams, useLocation } from "react-router-dom";

const ResetPassword = (props) => {
  const location = useLocation();
  const resetCode = location.search;
  const resetCode1 = resetCode.substring(11);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [response, setResponse] = useState("");
  const [passworderror, setPassworderror] = useState(false);
  const [confirmPassworderror, setConfirmPassworderror] = useState(false);


  const [oldPasswordShown, setOldPasswordShone] = useState(false);
  const [newPasswordShown, setNewPasswordShone] = useState(false);

  const togglePassword1 = () => {
    setOldPasswordShone(!oldPasswordShown)
  };
  const togglePassword2 = () => {
    setNewPasswordShone(!newPasswordShown)
  };

  const clientId =
    "28253347908-l3f5pge45v4avpv50ppksjlkvvap6t35.apps.googleusercontent.com";

  const onLoginSuccess = (res) => {
    console.log(res.profileObj);
  };

  const onLoginFailure = (res) => {
    // console.log(res);
  };

 const ResetPasswordApi = async()=>  {
    // console.log("Called", "d");
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
        // console.log(resp, "response..");
        if (resp.status === 1) {
          toast.success(resp.msg)
          // swal(resp.msg);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else if(resp.status === 0){
          toast.error(resp.msg, "Click on Forget Password again")
          // swal(resp.msg, "Click on Forget Password again")
        }
      }).catch((error)=>{
        console.log(error);
      })
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
  // console.log(params.restcode, "params");
  return (
    <div>
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
              {/* <Link
                to=""
                className="toggle btn-white btn btn-icon btn-light"
                data-target="athPromo"
              >
                <em className="icon ni ni-info"></em>
              </Link> */}
            <div className="col-md-6 bg-light border shadow">
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
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" for="password">
                      Password
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <b
                      tabIndex="-1"
                      
                      className="form-icon form-icon-right passcode-switch text-gray"
                      data-target="password"
                    >
                      {
                        oldPasswordShown == false ? <AiOutlineEyeInvisible onClick={togglePassword1} /> : <AiOutlineEye onClick={togglePassword1} />
                      }
                    </b>
                    <input
                      type={oldPasswordShown ? "text" : "password"}
                      className="form-control"
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
                      // onKeyUp={() => _onkeyup()}
                    />
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
                    <b
                      tabIndex="-1"
                      
                      className="form-icon form-icon-right passcode-switch text-gray"
                      data-target="confirm-password"
                    >
                      {
                        newPasswordShown == false ? <AiOutlineEyeInvisible onClick={togglePassword2} /> : <AiOutlineEye onClick={togglePassword2} />
                      }
                    </b>
                    <input
                      type={newPasswordShown ? "text" : "password"}
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
                    />
                  </div>
                </div>
                {confirmPassworderror == true ? (
                  <p className="text-danger mt-n3">
                    Password is requierd !
                  </p>
                ) : null}

                <div className="form-group">
                  <button
                    className="btn bg-teal text-white btn-block"
                    onClick={()=>ResetPasswordApi()}
                  >
                    Reset Password
                  </button>
                </div>
              </form>
              {/* <div className="form-note-s2 pt-4 text-right">
                {" "}
                Already Interact <Link href="/login">Sign in</Link>
                Otp Interact <Link to="/EmailOtp" className="text-teal">Resend Otp</Link>
              </div> */}

              <div className="text-center pt-4 pb-3">
                <span className="overline-title overline-title-sap">
                  <span>OR</span>
                </span>
              </div>
              <ul className="nav justify-center gx-4">
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
              </div>
            </div>            
            </div>
            <div className="nk-content text-center mt-lg-2">
              <div className="container container justify-content-center d-flex">
                
              </div>
              <div className="mt-3">
                <p>&copy; {new Date().getFullYear()} INRX ECOSYSTEM. All Rights Reserved.</p>
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

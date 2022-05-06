import React from 'react'
const ChangePassword = () => {
    return (
        <>

            <div class="card-inner card-inner-lg">
                <div class="nk-block-head nk-block-head-lg">
                    <div class="nk-block-between">
                        <div class="nk-block-head-content">
                            <h4 class="nk-block-title">Change Password</h4>
                            <div class="nk-block-des">
                                <p></p>
                            </div>
                        </div>
                        <div class="nk-block-head-content align-self-start d-lg-none"><a
                            href="#" class="toggle btn btn-icon btn-trigger mt-n1"
                            data-target="userAside"><em
                                class="icon ni ni-menu-alt-r"></em></a></div>
                    </div>
                </div>
                <div className='container w-80'>
                    <form action="#"
                        onSubmit={(e) => {
                            e.preventDefault();
                            //   handelFormSubmit(email, password, confirmPassword);
                        }}>
                        <div className="form-group w-50">
                            <div className="form-label-group">
                                <label className="form-label" for="password">
                                    Enter Old Password
                                </label>
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
                                    placeholder="Enter your password"
                                    //   value={password}
                                    minLength={8}
                                    onChange={(e) => {
                                        // setPassword(e.target.value);
                                        // setPassworderror(false);
                                    }}
                                    //   onFocus={() => _onfocus()}
                                    // onBlur={() => {
                                    //   _onblur();
                                    // }}
                                    //   onBlur={() => {
                                    //     if (password === "") 
                                    //     {
                                    //     //   setPassworderror(true);
                                    //     }
                                    //   }}
                                    //   onKeyUp={() => _onkeyup()}
                                    style={{ fontSize: "15px" }} />
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
                        <div className="form-group w-50">
                            <div className="form-label-group">
                                <label className="form-label" for="password">
                                    Enter New Password
                                </label>
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
                                    placeholder="Enter your password"
                                    //   value={password}
                                    minLength={8}
                                    onChange={(e) => {
                                        // setPassword(e.target.value);
                                        // setPassworderror(false);
                                    }}
                                    //   onFocus={() => _onfocus()}
                                    // onBlur={() => {
                                    //   _onblur();
                                    // }}
                                    //   onBlur={() => {
                                    //     if (password === "") 
                                    //     {
                                    //     //   setPassworderror(true);
                                    //     }
                                    //   }}
                                    //   onKeyUp={() => _onkeyup()}
                                    style={{ fontSize: "15px" }} />
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
                        {/* {passworderror == true ? (
                  <p style={{ color: "red", marginTop: -20 }}>
                    Password Is Requierd *
                  </p>
                ) : null} */}

                        <div className="form-group w-50">
                            <div className="form-label-group">
                                <label className="form-label" for="confirm-password">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="form-control-wrap">
                                <a
                                    tabindex="-1"
                                    href="#"
                                    className="form-icon form-icon-right passcode-switch"
                                    data-target="confirm-password"
                                >
                                    <em className="passcode-icon icon-show icon ni ni-eye"></em>
                                    <em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
                                </a>
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    id="confirm-password"
                                    placeholder="Confirm your password"
                                    //   value={confirmPassword}
                                    //   onChange={(e) => {
                                    //     setConfirmPassword(e.target.value);
                                    //     setConfirmPassworderror(false);
                                    //   }}
                                    //   onBlur={() => {
                                    //     if (confirmPassword === "") {
                                    //       setConfirmPassworderror(true);
                                    //     }
                                    //   }}
                                    style={{ fontSize: "15px" }} />
                            </div>
                        </div>
                        {/* {confirmPassworderror == true ? (
                  <p style={{ color: "red", marginTop: -20 }}>
                    Password Is Requierd *
                  </p>
                ) : null} */}



                        <div className="form-group">
                            <button
                                className="btn btn-lg btn-primary btn-block w-50"
                            // onClick={Signup}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>


                {/* <div class="nk-block-head nk-block-head-sm">
                    <div class="nk-block-head-content">
                        <h6 className="p-2">Security Alerts</h6>
                        <p className="p-2">You will get only those email notification what you want.</p>
                    </div>
                </div> */}
                {/* <div class="nk-block-content">
                    <div class="gy-3">
                        <div class="g-item">
                            <div class="custom-control custom-switch">
                                <input type="checkbox"
                                    class="custom-control-input"
                                    id="unusual-activity" />
                                <label
                                    class="custom-control-label"
                                    for="unusual-activity">
                                    Email me whenever encounterunusual activity</label>
                            </div>
                        </div>
                        <div class="g-item">
                            <div class="custom-control custom-switch">
                                <input type="checkbox"
                                    class="custom-control-input" id="new-browser" /><label
                                        class="custom-control-label" for="new-browser">Email me
                                    if new browser is used to sign in</label></div>
                        </div>
                    </div>
                </div> */}
                {/*    <div class="nk-block-head nk-block-head-sm">
                    <div class="nk-block-head-content">
                        <h6 className="p-2">News</h6>
                        <p className="p-2">You will get only those email notification what you want.</p>
                    </div>
                </div> */}
                {/* <div class="nk-block-content">
                    <div class="gy-3">
                        <div class="g-item">
                            <div class="custom-control custom-switch">
                                <input type="checkbox"
                                    class="custom-control-input"
                                    id="latest-sale" />
                                <label class="custom-control-label"
                                    for="latest-sale">
                                    Notify me by email about sales and latest news</label></div>
                        </div>
                        <div class="g-item">
                            <div class="custom-control custom-switch">
                                <input type="checkbox"
                                    class="custom-control-input" id="feature-update" /><label
                                        class="custom-control-label" for="feature-update">Email
                                    me about new features and updates</label></div>
                        </div>
                        <div class="g-item">
                            <div class="custom-control custom-switch">
                                <input type="checkbox"
                                    class="custom-control-input"
                                    id="account-tips" /><label class="custom-control-label"
                                        for="account-tips">Email me about tips on using
                                    account</label></div>
                        </div>
                    </div>
                </div> */}
            </div>


        </>
    )
}

export default ChangePassword;
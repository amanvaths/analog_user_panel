import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Menu from '../components/Menu';
import Header from '../components/Header';
import Footer from '../components/Footer';
class Psecurity extends React.Component{
   render(){
       return (
           <div>

<div className="nk-app-root">
       
       <div className="nk-main ">
 
 
 <Menu/>
 
 
 
           <div className="nk-wrap ">
 


<Header/>

<div className="nk-content nk-content-fluid">
<div className="container-xl wide-lg">
    <div className="nk-content-body">
        <div className="nk-block-head">
            <div className="nk-block-head-content">
                <div className="nk-block-head-sub"><span>Account Setting</span></div>
                <h2 className="nk-block-title fw-normal">My Profile</h2>
                <div className="nk-block-des">
                    <p>You have full control to manage your own account setting. <span className="text-primary"><em className="icon ni ni-info"></em></span></p>
                </div>
            </div>
        </div>
        <ul className="nk-nav nav nav-tabs">
            <li className="nav-item">
                <a className="nav-link" href="html/crypto/profile.html">Personal</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="html/crypto/profile-security.html">Security</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="html/crypto/profile-notification.html">Notifications</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="html/crypto/profile-connected.html">Connect Social</a>
            </li>
        </ul>
        <div className="nk-block">
            <div className="nk-block-head">
                <div className="nk-block-head-content">
                    <h5 className="nk-block-title">Security Settings</h5>
                    <div className="nk-block-des">
                        <p>These settings are helps you keep your account secure.</p>
                    </div>
                </div>
            </div>
            <div className="card card-bordered">
                <div className="card-inner-group">
                    <div className="card-inner">
                        <div className="between-center flex-wrap flex-md-nowrap g-3">
                            <div className="nk-block-text">
                                <h6>Save my Activity Logs</h6>
                                <p>You can save your all activity logs including unusual activity detected.</p>
                            </div>
                            <div className="nk-block-actions">
                                <ul className="align-center gx-3">
                                    <li className="order-md-last d-inline-flex">
                                        <div className="custom-control custom-switch mr-n2">
                                            <input type="checkbox" className="custom-control-input" id="activity-log" />
                                            <label className="custom-control-label" for="activity-log"></label>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="#recent-activity" className="link link-sm link-primary">See Recent Activity</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="card-inner">
                        <div className="between-center flex-wrap flex-md-nowrap g-3">
                            <div className="nk-block-text">
                                <h6>Security Pin Code</h6>
                                <p>You can set your pin code, we will ask you on your withdraw and transfer funds.</p>
                            </div>
                            <div className="nk-block-actions">
                                <div className="custom-control custom-switch mr-n2">
                                    <input type="checkbox" className="custom-control-input" id="security-pin" />
                                    <label className="custom-control-label" for="security-pin"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-inner">
                        <div className="between-center flex-wrap flex-md-nowrap g-3">
                            <div className="nk-block-text">
                                <h6>Change Password</h6>
                                <p>Set a unique password to protect your account.</p>
                            </div>
                            <div className="nk-block-actions flex-shrink-sm-0">
                                <ul className="align-center flex-wrap flex-sm-nowrap gx-3 gy-2">
                                    <li className="order-md-last">
                                        <a href="#" className="btn btn-outline-success">Change Password</a>
                                    </li>
                                    <li>
                                        <em className="text-soft text-date fs-12px">Last changed : <span> Oct 2, 2019</span></em>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="card-inner">
                        <div className="between-center flex-wrap flex-md-nowrap g-3">
                            <div className="nk-block-text">
                                <h6>2FA Authentication <span className="badge badge-success">Enabled</span></h6>
                                <p>Secure your account with 2FA security. When it is activated you will need to enter not only your password, but also a special code using app. You can receive this code by in mobile app. </p>
                            </div>
                            <div className="nk-block-actions">
                                <a href="#" className="btn btn-danger">Disable</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nk-block-head nk-block-head-sm">
                <div className="nk-block-head-content">
                    <div className="nk-block-title-group">
                        <h6 className="nk-block-title title">Recent Activity</h6>
                        <a href="html/invest/profile-activity.html" className="link">See full log</a>
                    </div>
                    <div className="nk-block-des">
                        <p>This information about the last login activity on your account.</p>
                    </div>
                </div>
            </div>
            <div className="card card-bordered">
                <div className="table-responsive">
                    <table className="table table-hover table-ulogs">
                        <thead className="bg-teal-dim text-teal">
                            <tr>
                                <th className="tb-col-os"><span>Browser <span className="d-sm-none">/ IP</span></span></th>
                                <th className="tb-col-ip"><span>IP</span></th>
                                <th className="tb-col-time"><span>Time</span></th>
                                <th className="tb-col-action"><span>&nbsp;</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="tb-col-os">Chrome on Window</td>
                                <td className="tb-col-ip"><span>192.149.122.128</span></td>
                                <td className="tb-col-time"><span>11:34 PM</span></td>
                                <td className="tb-col-action"></td>
                            </tr>
                            <tr>
                                <td className="tb-col-os">Mozilla on Window</td>
                                <td className="tb-col-ip"><span>86.188.154.225</span></td>
                                <td className="tb-col-time"><span>Nov 20, 2019 <span className="d-none d-sm-inline-block">10:34 PM</span></span></td>
                                <td className="tb-col-action"><a href="#" className="link-cross mr-sm-n1"><em className="icon ni ni-cross"></em></a></td>
                            </tr>
                            <tr>
                                <td className="tb-col-os">Chrome on iMac</td>
                                <td className="tb-col-ip"><span>192.149.122.128</span></td>
                                <td className="tb-col-time"><span>Nov 12, 2019 <span className="d-none d-sm-inline-block">08:56 PM</span></span></td>
                                <td className="tb-col-action"><a href="#" className="link-cross mr-sm-n1"><em className="icon ni ni-cross"></em></a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>    
            </div>
        </div>
    </div>
</div>
</div>


<Footer/>




            </div>
           
        </div>
       
    </div>


</div>
       )
   }
}
export default Psecurity
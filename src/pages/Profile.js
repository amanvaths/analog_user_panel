import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Menu from '../components/Menu';
import Header from '../components/Header';
import Footer from '../components/Footer';
class Profile extends React.Component{
   render(){
       return (
           <div>

<div class="nk-app-root">
       
       <div class="nk-main ">
 
 
 <Menu/>
 
 
 
           <div class="nk-wrap ">
 


<Header/>

<div class="nk-content nk-content-fluid">
                    <div class="container-xl wide-lg">
                        <div class="nk-content-body">
                            <div class="nk-block-head">
                                <div class="nk-block-head-content">
                                    <div class="nk-block-head-sub"><span>Account Setting</span></div>
                                    <h2 class="nk-block-title fw-normal">My Profile</h2>
                                    <div class="nk-block-des">
                                        <p>You have full control to manage your own account setting. <span class="text-primary"><em class="icon ni ni-info" data-toggle="tooltip" data-placement="right" title="Tooltip on right"></em></span></p>
                                    </div>
                                </div>
                            </div>
                            <ul class="nk-nav nav nav-tabs">
                                <li class="nav-item">
                                    <a class="nav-link" href="html/crypto/profile.html">Personal</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="">Security</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="">Notifications</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="">Connect Social</a>
                                </li>
                            </ul>
                           
                            <div class="nk-block">
                                <div class="alert alert-warning">
                                    <div class="alert-cta flex-wrap flex-md-nowrap">
                                        <div class="alert-text">
                                            <p>Upgrade your account to unlock full feature and increase your limit of transaction amount.</p>
                                        </div>
                                        <ul class="alert-actions gx-3 mt-3 mb-1 my-md-0">
                                            <li class="order-md-last">
                                                <a href="#" class="btn btn-sm btn-warning">Upgrade</a>
                                            </li>
                                            <li>
                                                <a href="#" class="link link-primary">Learn More</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="nk-block-head">
                                    <div class="nk-block-head-content">
                                        <h5 class="nk-block-title">Personal Information</h5>
                                        <div class="nk-block-des">
                                            <p>Basic info, like your name and address, that you use on Nio Platform.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nk-data data-list">
                                    <div class="data-head">
                                        <h6 class="overline-title">Basics</h6>
                                    </div>
                                    <div class="data-item" data-toggle="modal" data-target="#profile-edit">
                                        <div class="data-col">
                                            <span class="data-label">Full Name</span>
                                            <span class="data-value">Abu Bin Ishtiyak</span>
                                        </div>
                                        <div class="data-col data-col-end"><span class="data-more"><em class="icon ni ni-forward-ios"></em></span></div>
                                    </div>
                                    <div class="data-item" data-toggle="modal" data-target="#profile-edit">
                                        <div class="data-col">
                                            <span class="data-label">Display Name</span>
                                            <span class="data-value">Ishtiyak</span>
                                        </div>
                                        <div class="data-col data-col-end"><span class="data-more"><em class="icon ni ni-forward-ios"></em></span></div>
                                    </div>
                                    <div class="data-item">
                                        <div class="data-col">
                                            <span class="data-label">Email</span>
                                            <span class="data-value">info@softnio.com</span>
                                        </div>
                                        <div class="data-col data-col-end"><span class="data-more disable"><em class="icon ni ni-lock-alt"></em></span></div>
                                    </div>
                                    <div class="data-item" data-toggle="modal" data-target="#profile-edit">
                                        <div class="data-col">
                                            <span class="data-label">Phone Number</span>
                                            <span class="data-value text-soft">Not add yet</span>
                                        </div>
                                        <div class="data-col data-col-end"><span class="data-more"><em class="icon ni ni-forward-ios"></em></span></div>
                                    </div>
                                    <div class="data-item" data-toggle="modal" data-target="#profile-edit">
                                        <div class="data-col">
                                            <span class="data-label">Date of Birth</span>
                                            <span class="data-value">29 Feb, 1986</span>
                                        </div>
                                        <div class="data-col data-col-end"><span class="data-more"><em class="icon ni ni-forward-ios"></em></span></div>
                                    </div>
                                    <div class="data-item" data-toggle="modal" data-target="#profile-edit" data-tab-target="#address">
                                        <div class="data-col">
                                            <span class="data-label">Address</span>
                                            <span class="data-value">2337 Kildeer Drive,<br/>Kentucky, Canada</span>
                                        </div>
                                        <div class="data-col data-col-end"><span class="data-more"><em class="icon ni ni-forward-ios"></em></span></div>
                                    </div>
                                </div>
                                <div class="nk-data data-list">
                                    <div class="data-head">
                                        <h6 class="overline-title">Preferences</h6>
                                    </div>
                                    <div class="data-item">
                                        <div class="data-col">
                                            <span class="data-label">Language</span>
                                            <span class="data-value">English (United State)</span>
                                        </div>
                                        <div class="data-col data-col-end"><a href="#" data-toggle="modal" data-target="#profile-language" class="link link-primary">Change Language</a></div>
                                    </div>
                                    <div class="data-item">
                                        <div class="data-col">
                                            <span class="data-label">Date Format</span>
                                            <span class="data-value">M d, YYYY</span>
                                        </div>
                                        <div class="data-col data-col-end"><a href="#" data-toggle="modal" data-target="#profile-language" class="link link-primary">Change</a></div>
                                    </div>
                                    <div class="data-item">
                                        <div class="data-col">
                                            <span class="data-label">Timezone</span>
                                            <span class="data-value">Bangladesh (GMT +6)</span>
                                        </div>
                                        <div class="data-col data-col-end"><a href="#" data-toggle="modal" data-target="#profile-language" class="link link-primary">Change</a></div>
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
export default Profile
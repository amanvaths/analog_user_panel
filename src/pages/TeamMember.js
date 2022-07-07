import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

const TeamMember = () => {
 

  return (
    <div className="nk-app-root">
      <div className="nk-main ">
        <Menu />
        <div className="nk-wrap">
          <Header />
          <div className="nk-content nk-content-fluid bg-light min-height">
            <div className="container-xl">
              <div className="nk-content-body">
                <div className="nk-block-head nk-block-head-sm">
                  <div className="row">
                    <div class="col-sm-6 col-lg-4 mb-4">
                      <div class="card card-bordered shadow-sm">
                        <div class="card-inner card-inner-sm">
                          <div class="team">
                            <div class="user-card user-card-s2">
                              <div class="user-avatar md bg-teal">
                                <span>SW</span>
                                <div class="status dot dot-lg dot-success"></div>
                              </div>
                              <div class="user-info">
                                <h5>Swati Yadav</h5>
                                <span class="sub-text">UI/UX Designer</span>
                              </div>
                            </div>
                            <ul class="team-info">
                              <li><span>Join Date</span><span>27 Jun 2022</span></li>
                              <li><span>Contact</span><span>+88 01713-123656</span></li>
                              <li><span>Email</span><span>swati.nadcabtechnology@gmail.com</span></li>
                            </ul>
                            <div class="team-view">
                              <Link to="" class="btn btn-block btn-dim btn-success"><span>View Profile</span></Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6 col-lg-4 mb-4">
                      <div class="card card-bordered shadow-sm">
                        <div class="card-inner card-inner-sm">
                          <div class="team">
                            <div class="user-card user-card-s2">
                              <div class="user-avatar md bg-teal">
                                <span>SW</span>
                                <div class="status dot dot-lg dot-success"></div>
                              </div>
                              <div class="user-info">
                                <h5>Swati Yadav</h5>
                                <span class="sub-text">UI/UX Designer</span>
                              </div>
                            </div>
                            <ul class="team-info">
                              <li><span>Join Date</span><span>27 Jun 2022</span></li>
                              <li><span>Contact</span><span>+88 01713-123656</span></li>
                              <li><span>Email</span><span>swati.nadcabtechnology@gmail.com</span></li>
                            </ul>
                            <div class="team-view">
                              <Link to="" class="btn btn-block btn-dim btn-success"><span>View Profile</span></Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6 col-lg-4 mb-4">
                      <div class="card card-bordered shadow-sm">
                        <div class="card-inner card-inner-sm">
                          <div class="team">
                            <div class="user-card user-card-s2">
                              <div class="user-avatar md bg-teal">
                                <span>SW</span>
                                <div class="status dot dot-lg dot-success"></div>
                              </div>
                              <div class="user-info">
                                <h5>Swati Yadav</h5>
                                <span class="sub-text">UI/UX Designer</span>
                              </div>
                            </div>
                            <ul class="team-info">
                              <li><span>Join Date</span><span>27 Jun 2022</span></li>
                              <li><span>Contact</span><span>+88 01713-123656</span></li>
                              <li><span>Email</span><span>swati.nadcabtechnology@gmail.com</span></li>
                            </ul>
                            <div class="team-view">
                              <Link to="" class="btn btn-block btn-dim btn-success"><span>View Profile</span></Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6 col-lg-4 mb-4">
                      <div class="card card-bordered shadow-sm">
                        <div class="card-inner card-inner-sm">
                          <div class="team">
                            <div class="user-card user-card-s2">
                              <div class="user-avatar md bg-teal">
                                <span>SW</span>
                                <div class="status dot dot-lg dot-success"></div>
                              </div>
                              <div class="user-info">
                                <h5>Swati Yadav</h5>
                                <span class="sub-text">UI/UX Designer</span>
                              </div>
                            </div>
                            <ul class="team-info">
                              <li><span>Join Date</span><span>27 Jun 2022</span></li>
                              <li><span>Contact</span><span>+88 01713-123656</span></li>
                              <li><span>Email</span><span>swati.nadcabtechnology@gmail.com</span></li>
                            </ul>
                            <div class="team-view">
                              <Link to="" class="btn btn-block btn-dim btn-success"><span>View Profile</span></Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6 col-lg-4 mb-4">
                      <div class="card card-bordered shadow-sm">
                        <div class="card-inner card-inner-sm">
                          <div class="team">
                            <div class="user-card user-card-s2">
                              <div class="user-avatar md bg-teal">
                                <span>SW</span>
                                <div class="status dot dot-lg dot-success"></div>
                              </div>
                              <div class="user-info">
                                <h5>Swati Yadav</h5>
                                <span class="sub-text">UI/UX Designer</span>
                              </div>
                            </div>
                            <ul class="team-info">
                              <li><span>Join Date</span><span>27 Jun 2022</span></li>
                              <li><span>Contact</span><span>+88 01713-123656</span></li>
                              <li><span>Email</span><span>swati.nadcabtechnology@gmail.com</span></li>
                            </ul>
                            <div class="team-view">
                              <Link to="" class="btn btn-block btn-dim btn-success"><span>View Profile</span></Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6 col-lg-4 mb-4">
                      <div class="card card-bordered shadow-sm">
                        <div class="card-inner card-inner-sm">
                          <div class="team">
                            <div class="user-card user-card-s2">
                              <div class="user-avatar md bg-teal">
                                <span>SW</span>
                                <div class="status dot dot-lg dot-success"></div>
                              </div>
                              <div class="user-info">
                                <h5>Swati Yadav</h5>
                                <span class="sub-text">UI/UX Designer</span>
                              </div>
                            </div>
                            <ul class="team-info">
                              <li><span>Join Date</span><span>27 Jun 2022</span></li>
                              <li><span>Contact</span><span>+88 01713-123656</span></li>
                              <li><span>Email</span><span>swati.nadcabtechnology@gmail.com</span></li>
                            </ul>
                            <div class="team-view">
                              <Link to="" class="btn btn-block btn-dim btn-success"><span>View Profile</span></Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    
               
                
                
                  
                 
                 </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );

}
export default TeamMember;

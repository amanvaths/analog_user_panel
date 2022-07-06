import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

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
                 <div className="">
                  <div class="col-sm-6 col-lg-4">
                      <div class="card card-bordered">
                        <div class="card-inner">
                          <div class="team">
                            <div class="user-card user-card-s2">
                              <div class="user-avatar lg bg-primary">
                                <span>AB</span>
                                <div class="status dot dot-lg dot-success"></div>
                              </div>
                              <div class="user-info">
                                <h6>Abu Bin Ishtiyak</h6>
                                <span class="sub-text">UI/UX Designer</span>
                              </div>
                            </div>
                            <ul class="team-info">
                              <li><span>Join Date</span><span>24 Jun 2015</span></li>
                              <li><span>Contact</span><span>+88 01713-123656</span></li>
                              <li><span>Email</span><span>info@softnio.com</span></li>
                            </ul>
                            <div class="team-view">
                              <a href="/demo5/user-details-regular.html" class="btn btn-block btn-dim btn-primary"><span>View Profile</span></a>
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

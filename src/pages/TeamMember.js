import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../Api_connection/config";

const TeamMember = () => {

  const [team, setTeam] = useState([])
  const getTeamMember = async () => {
    try {
      const data = await axios.post(`${BASE_URL}/teamMember`)
      console.log(data.data);
      setTeam(data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTeamMember()
  }, [])

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
                    {
                      team.map((element, index) => {
                        return (
                          <div class="col-sm-6 col-lg-4 mb-4">
                            <div class="card card-bordered shadow-sm">
                              <div class="card-inner card-inner-sm">
                                <div class="team">
                                  <div class="user-card user-card-s2">
                                    <div class="user-avatar md bg-teal">
                                      {/* <img src="https://www.nadcab.com/public/uploads/team-member-37.jpeg" alt="" srcset="" /> */}
                                      <span>{element.name.charAt(0)}</span>
                                      <div class="status dot dot-lg dot-success"></div>
                                    </div>
                                    <div class="user-info">
                                      <h5>{element.name}</h5>
                                      <span class="sub-text">{element.degination}</span>
                                    </div>
                                  </div>
                                  {/* <ul class="team-info">
                                  <li><span>Join Date</span><span>27 Jun 2022</span></li>
                                  <li><span>Contact</span><span>+88 01713-123656</span></li>
                                  <li><span>Email</span><span>swati.nadcabtechnology@gmail.com</span></li>
                                </ul>
                                <div class="team-view">
                                  <Link to="" class="btn btn-block btn-dim btn-success"><span>View Profile</span></Link>
                                </div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    } </div>
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

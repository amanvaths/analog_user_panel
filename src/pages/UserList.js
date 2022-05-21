import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../Api_connection/config";

const UserList = () => {  
  const {user} = useSelector((state)=> state.user.value)
  const email = user.email
  const [affiliates, setAffiliates] = useState([]);
  const [affiliateCount, setAffiliatesCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);

  const getAffiliate = async () => {
    try{
      console.log(email , " user email asjljasf")
        const data = await axios.post(`${BASE_URL}/getAffiliates`, { email : email })       
        setAffiliates(data.data);
        setAffiliatesCount(data.data)
    }catch(error){
      console.log("Error in getting data Affililate :" +error);
    }
  }

  // function goToPreviousPage() {
  //   setCurrentPage((page) => page - 1);
  // }

  // function goToNextPage() {
  //   setCurrentPage((page) => page + 1);
  // }

  useEffect(()=>{
    getAffiliate();
  },[])

  return (
    <div>
      <div class="nk-app-root">
        <div class="nk-main ">
          <Menu />

          <div class="nk-wrap ">
            <Header />
           
            {/* Add This Line  */}

            <div class="container-xl tableContainer">
              <div
                class="nk-content-body"
                style={{ marginTop: 50, width: "100%", padding: "10px -70%" }}
              >
                <div class="nk-block-head nk-block-head-sm">
                  <div class="nk-block-between position-relative">
                    <div class="nk-block-head-content ">
                      <h3 class="nk-block-title page-title">
                        Affiliates 
                      </h3>
                      <div class="nk-block-des text-soft">
                       
                        <p>{`Your affiliatese.`}</p>
                      </div>
                    </div>
                    <div class="nk-block-head-content affiliates">
                      <div class="toggle-wrap nk-block-tools-toggle">
                        <a
                          href="#"
                          class="btn btn-icon btn-trigger toggle-expand me-n1"
                          data-target="pageMenu"
                        >
                          <em class="icon ni ni-menu-alt-r"></em>
                        </a>
                        <div
                          class="toggle-expand-content"
                          data-content="pageMenu"
                        >
                          {/* <ul class="nk-block-tools g-3">
                            <li
                            >
                              <span class="d-none d-md-block">
                                <button
                                  class="btn btn-dim btn-outline-light"
                                  style={{ padding: "8px 35px" }}
                                >
                                  <em class="icon ni ni-download-cloud"></em>
                                  <span>Export</span>
                                </button>
                              </span>
                            </li>
                          </ul> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="nk-block">
                  <div class="card card-bordered card-stretch">
                    
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
};

export default UserList;

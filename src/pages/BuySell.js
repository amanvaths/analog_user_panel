import React, { useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CandleGraph from "../components/CandleGraph";
import Orders from "../components/Orders";

const UserList = () => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <div>
      <div class="nk-app-root">
        <div class="nk-main ">
          <Menu />

          <div class="nk-wrap ">
            <Header />
            <div className="row"  >
              <div className="col-lg-9" style={{top:"10px"}}>
                <CandleGraph />
              </div>
              <div className="col-lg-3">
                <Orders/>
              </div>
              <div className="column">
              
              <div className="col-lg-3 "
               style={{marginTop:"360px"}}
              >
                Buy Sell Section
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

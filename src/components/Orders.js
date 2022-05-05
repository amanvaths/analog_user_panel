import React, { useState } from "react";
// import "./order.css";

export default function Orders() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {/* <div>
        <div className="coinsfather-theme-color">
          <nav style="border: 0.2px solid rgba(255, 255, 255, 0.067);">
            <div className="nav nav-tabs d-flex">
              <div
                className=" nav-item nav-link  p-0  active"
              
                data-toggle="tab"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
                style="flex: 0.5 1 0%; height: 30px; line-height: 30px;"
              >
                <div></div>Open Orders
              </div>
              <div
                className=" nav-item nav-link  p-0  "
               
                data-toggle="tab"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
                style="flex: 0.5 1 0%; height: 30px; line-height: 30px;"
              >
                Completed Orders
              </div>
            </div>
          </nav>
          <div
            className=" tab-content orders"
            style="border-color: rgba(25, 32, 87, 0.2);"
          >
            <div className="d-flex justify-content-center align-items-center">
              <div
                className="sing-up-button"
                style="text-align: center; height: 350px; justify-content: center; align-items: center; display: flex; flex-direction: column;"
              >
                <a href="/login">Login</a>
                <div style="height: 25px; width: 25px; background: rgba(255, 255, 255, 0.3); color: rgb(255, 255, 255); font-size: 11px; border-radius: 13px; padding: 5px; margin: 15px;">
                  {" "}
                  OR
                </div>
                <a className="btn-theme-color " href="/create">
                  Create a new Account
                </a>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <nav style={{ border: "0.2px solid #ffffff11" }}>
        <div className="nav nav-tabs d-flex" id="nav-tab" role="tablist">
          <div
            className={` nav-item nav-link  p-0  ${
              activeTab === 0 ? "active" : ""
            }`}
            id="nav-home-tab"
            data-toggle="tab"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
            onClick={() => setActiveTab(0)}
            style={{ flex: 0.5, height: "30px", lineHeight: "30px" }}
          >
            <div> </div>
            Open Orders
          </div>
          <div>
            
          </div>
          <div
            className={` nav-item nav-link  p-0  ${
              activeTab === 1 ? "active" : ""
            }`}
            id="nav-profile-tab"
            data-toggle="tab"
            onClick={() => setActiveTab(1)}
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
            style={{ flex: 0.5, height: "30px", lineHeight: "30px" }}
          >
            Completed Orders
          </div>
        </div>
      </nav> 
    </div>
  );
}

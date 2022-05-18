import React, { useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import CandleGraph from "../components/CandleGraph";
import Orders from "../components/Orders";
import TradeHistory from "../components/TradeHistory";

function BuySell(props) {
  
  return (
    <>
    <div>
      <div class="nk-app-root">
        <div class="nk-main ">
          <Menu />

          <div class="nk-wrap ">
            <Header />
            <div className="row" style={{ margin: "20px 10px 0px" }}>
              <div className="col-lg-8" style={{  height: "100%" }}>
                {/* <CandleGraph /> */}
                <div className="">
                  <TradeHistory />
                </div>
              </div>

              <div
                className="col-lg-4 order"
                style={{ background: "rgb(241, 241, 241)" }}
              >
                <Orders />
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
    </>
  );
};

export default BuySell;

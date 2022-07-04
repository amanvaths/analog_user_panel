import React from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CandleGraph from "../components/CandleGraph";
import Orders from "../components/Orders";
import TradeHistory from "../components/TradeHistory";
import { useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";

function BuySell(props) {
  const { buyloader } = useSelector((state) => state.user.value);
  return (
    <>  
      <LoadingOverlay className="Loading" active={buyloader} spinner text="Loading...." >

        <div style={{ maxWidth: "100%" }}>
          <div className="nk-app-root">
            <div className="nk-main " style={{zIndex:"1"}}>
              <Menu />
              <div className="nk-wrap ">
                <Header />  
                <div className="row" style={{ margin: "20px 10px 0px" }}>
                  <div className="col-lg-8" style={{ height: "100%" }}>
                    <CandleGraph />
                    <div className="">
                      <TradeHistory />
                    </div>
                  </div>

                  <div
                    className="col-lg-4 order"
                    // style={{ background: "rgb(241, 241, 241)" }}
                  >
                    <Orders />
                  </div>
                </div>
              </div>

              <Footer />
            </div>
          </div>
        </div>
        
      </LoadingOverlay>
    </>
  );
}

export default BuySell;

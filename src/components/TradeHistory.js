import React from "react";

export default function TradeHistory() {
  return (
    <div>
      <div class="overflow-hidden">
        <div
          class="coinsfather-theme-color mt-2 mt-md-0 mt-lg-0"
        //   style={{overflow: "hidden"}}
        >
          <div style={{height: "58px" ,width:"100%"}}>
            <div
              class="tab-header  d-flex align-items-center h-50 p-0 px-2"
              style={{background: "rgba(0, 0, 0, 0.1)"}}
            >
              TRADE HISTORY
            </div>
            <div class="row m-0 py-1 pair-border mt-1">
              <div class="col-3 text-center" style={{fontSize:"10px"}}>
                USER
              </div>
              <div class="col-3 text-center" style={{fontSize:"10px"}}>
                ANALOG
              </div>
              <div class="col-3 text-center" style={{fontSize:"10px"}}>
                Buying Currency
              </div>
              <div class="col-3 text-center" style={{fontSize:"10px"}}>
                POOL
              </div>
            </div>
          </div>
          <div style={{height: "300px", overflow: "hidden"}}>
            <div
              class="row  m-0"
              style={{background: "rgba(241, 67, 47, 0.1)", color: "rgb(240, 0, 0)", padding:" 7.79px 0px", fontSize: "14px"}}
            >
              <div class="col-3 text-center" style={{fontSize: "10px;"}}>
                {/* <i class="fas fa-arrow-down"></i> */}
                3099836.233828
              </div>
              <div class="col-3 text-center text-dark" style={{fontSize: "10px"}}>
                ANA
              </div>
              <div
                class="col-3 text-center text-secondary"
                style={{fontSize: "10px"}}
              >
            BTC
              </div>
              <div
                class="col-3 text-center text-secondary"
                style={{fontSize: "10px"}}
              >
                14:54:12
              </div>
             
            </div>
           

          
          </div>
        </div>
      </div>
      ;
    </div>
  );
}

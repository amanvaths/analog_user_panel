import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Api_connection/config";
import "./tradehistory.css";
import { Triangle } from "react-loader-spinner";
import { useSelector} from "react-redux";

export default function TradeHistory() {
  // const dispatch = useDispatch();
  const [history, setHistory] = useState([]);
  const [loader, setLoader] = useState(true);
  
  

  const { userInfo, theme } = useSelector(
    (state) => state.user.value
  );
 

  

  useEffect(() => {
    console.log(userInfo?.currency_preference,"userInfo?");    
    axios
      .get(`${BASE_URL}/getAllOrder?type=Buy&compair_currency=${userInfo?.currency_preference}`)
      .then((res) => {
        setHistory(res.data.order);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error.message);
      });

  }, [userInfo]);
  return (
    <div class="card mt-2">
      <div class="card-header justify-content-between align-items-center">
        <h6 class="card-title font-weight-bold"> TRADE HISTORY</h6>
      </div>
      <div class="card-body table-responsive  p-0">
        <table class="table  mb-0">
          <div style={{ display: "contents" }}>
            <thead >
              <tr className="historyorder">
                <th style={{ width: "20%" }}>Total Analog</th>
                <th style={{ width: "20%" }}>Total Amount Pay</th>
                <th style={{ width: "20%" }}>Buying Price</th>
                <th style={{ width: "20%" }}>Pool</th>
                <th style={{ width: "20%" }}>Time</th>
              </tr>
            </thead>
            <div style={{ height: "450px", overflowX:"hidden", display: "table-caption" }}>
              <tbody>
              {loader && (<>
          <div style={{ position: "absolute", zIndex: "99", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <Triangle ariaLabel="loading-indicator" color="green" />
          </div>
        </>) 
            }
                {history.map((h) => {
                  let a= new Date(h.date).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})
                  return (
                    <>
                      <tr class="zoom  historyorder" style={{fontSize:"16.6px",cursor:"pointer"}}>
                        <td className="TradeHistorySize" style={{ width: "16.6%" }}>

                           {h.cVolume.toFixed(2)}
                          <img
                            alt="analog"
                            src="./images/Analog.png"
                            style={{ width: "24px" }}
                            className="tradeAnaIcon"/>

                            </td>
                        <td class="text-danger TradeHistorySize" style={{ width: "16.6%" }}>

                          {h.preferred_currency_amount?.toFixed(2)}{" "}
                          {h.compair_currency == "usd" ? (
                           <img
                           src="./images/usdt_icon.png"
                           style={{ width: "15px" }}
                           alt="usdt"
                           className="tradeUsdIcon"
                         />
                       ) : theme == 0 ? (
                         <img
                           src="./images/Inrx_black.png"
                           style={{ width: "17px" }}
                           alt="inrx"
                           className="img"
                         />
                       ) : (
                         <img
                           src="./images/Inrx_white.png"
                           style={{ width: "17px" }}
                           alt="inrx"
                           className="img"
                         />
                          )} 

                          <i class="ion ion-arrow-graph-up-right"></i>
                        </td>
                        <td class=" TradeHistorySize" style={{ width: "16.6%" }}>

                          {h.compair_currency == "usd"
                            ? h.pref_raw_price.toFixed(8)
                            : h.pref_raw_price.toFixed(8)}
                            {" "}
                            {h.compair_currency == "usd" ? (
                           <img
                           src="./images/usdt_icon.png"
                           style={{ width: "15px" }}
                           alt="usdt"
                           className="tradeUsdIcon"
                         />
                       ) : theme == 0 ? (
                         <img
                           src="./images/Inrx_black.png"
                           style={{ width: "17px" }}
                           alt="inrx"
                           className="img"
                         />
                       ) : (
                         <img
                           src="./images/Inrx_white.png"
                           style={{ width: "17px" }}
                           alt="inrx"
                           className="img"
                         />
                          )}

                          <i class="ion ion-arrow-graph-down-right"></i>
                        </td>
                        <td className="TradeHistorySize" style={{ width: "16.6%" }}>

                          {h.presalelevel}

                          </td>
                        <td className="TradeHistorySize" style={{ width: "16.6%" }}>
                          
                          {a}
                          
                          </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </div>
          </div>
        </table>
      </div>
    </div>

    // <div>
    //   <div class="overflow-hidden" style={{marginTop:"5px"}}>
    //     <div
    //       class="coinsfather-theme-color mt-2 mt-md-0 mt-lg-0"
    //       //   style={{overflow: "hidden"}}
    //     >
    //       <div style={{ height: "58px", width: "100%" }}>
    //         <div
    //           class="tab-header  d-flex align-items-center h-50 p-0 px-2"
    //           style={{ background: "rgba(0, 0, 0, 0.1)",color:"black" }}
    //         >
    //           TRADE HISTORY
    //         </div>
    //         <div class="row m-0 py-1 pair-border mt-1"
    //         style={{color:"black"}}
    //         >

    //           <div class="col-3 text-center" style={{ fontSize: "12px", color:"black",fontWeight:"bold" }}>
    //            Total Anolog
    //           </div>
    //           <div class="col-2 text-center" style={{ fontSize: "12px", color:"black",fontWeight:"bold" }}>
    //            Total Amount Pay
    //           </div>
    //           <div class="col-3 text-center" style={{ fontSize: "12px", color:"black",fontWeight:"bold" }}>
    //             Buying Price
    //           </div>
    //           <div class="col-2 text-center" style={{ fontSize: "12px", color:"black",fontWeight:"bold" }}>
    //              Pool
    //           </div>
    //           <div class="col-2 text-center" style={{ fontSize: "12px", color:"black",fontWeight:"bold" }}>
    //             Time
    //           </div>
    //         </div>
    //       </div>
    //   <div  style={{ height: "400px", overflow: "scroll" }}>
    //   {history.map((h) => (
    //     <div className="zoom">
    //       <div
    //         class="row  m-0"
    //         style={{
    //           // background: "rgba(241, 67, 47, 0.1)",
    //           color: "rgb(240, 0, 0)",
    //           padding: " 7.79px 0px",
    //           fontSize: "14px",
    //           border:"1px solid gray"
    //         }}
    //       >
    //         <div
    //           class="col-3 text-center text-dark"
    //           style={{ fontSize: "13px",color:"black" }}
    //         >
    //           {h.cVolume}
    //         </div>
    //         <div
    //           class="col-2 text-center text-secondary"
    //           style={{ fontSize: "13px",color:"black" }}
    //         >
    //           {h.currency_type}
    //         </div>
    //         <div
    //           class="col-3 text-center text-secondary timeZone"
    //           style={{ fontSize: "13px",color:"black" }}
    //         >
    //           14:54:12
    //         </div>
    //         <div
    //           class="col-2 text-center text-secondary timeZone"
    //           style={{ fontSize: "13px",color:"black" }}
    //         >
    //           14:54:12
    //         </div>
    //         <div
    //           class="col-2 text-center text-secondary timeZone"
    //           style={{ fontSize: "13px",color:"black" }}
    //         >
    //           14:54:12
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </div>
    // </div>
    //   </div>
    // </div>
  );
}

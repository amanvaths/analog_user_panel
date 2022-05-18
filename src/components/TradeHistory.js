import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Api_connection/config";
import "./tradehistory.css";

export default function TradeHistory() {
  const email = localStorage.getItem("email");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (email) {
      axios
        .get(`${BASE_URL}/getAllOrder`)
        .then((res) => {
          console.log(res.data, "All Order trandHistory");
          setHistory(res.data.order);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, []);
  return (
    <div class="card mt-2" style={{ height: "450px" }}>
      <div class="card-header justify-content-between align-items-center">
        <h6 class="card-title"> TRADE HISTORY</h6>
      </div>

      <div class="card-body table-responsive p-0">
        <table class="table font-w-600 mb-0">
          <div>
            <thead>
              <tr>
                <th>Total Anolog</th>
                <th>Total Amount Pay</th>
                <th>Buying Price</th>
                <th>Pool</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => {
                return (
                  <>
                    <tr class="zoom">
                      <td> {h.cVolume}</td>
                      <td class="text-danger">
                        {h.currency_type}{" "}
                        <i class="ion ion-arrow-graph-up-right"></i>
                      </td>
                      <td class="text-success">
                        3,23,55,479{" "}
                        <i class="ion ion-arrow-graph-down-right"></i>
                      </td>
                      <td>{h.presalelevel}</td>
                      <td>{h.date}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
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

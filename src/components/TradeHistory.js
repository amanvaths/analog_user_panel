import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Api_connection/config";

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
    <div>
      <div class="overflow-hidden">
        <div
          class="coinsfather-theme-color mt-2 mt-md-0 mt-lg-0"
          //   style={{overflow: "hidden"}}
        >
          <div style={{ height: "58px", width: "100%" }}>
            <div
              class="tab-header  d-flex align-items-center h-50 p-0 px-2"
              style={{ background: "rgba(0, 0, 0, 0.1)",color:"black" }}
            >
              TRADE HISTORY
            </div>
            <div class="row m-0 py-1 pair-border mt-1"
            style={{color:"black"}}
            >
             
              <div class="col-4 text-center" style={{ fontSize: "10px" }}>
                ANALOG
              </div>
              <div class="col-4 text-center" style={{ fontSize: "10px" }}>
                Buying Currency
              </div>
              <div class="col-4 text-center" style={{ fontSize: "10px" }}>
                POOL
              </div>
            </div>
          </div>
          <div  style={{ height: "400px", overflow: "scroll" }}>
          {history.map((h) => (
            <div>
              <div
                class="row  m-0"
                style={{
                  background: "rgba(241, 67, 47, 0.1)",
                  color: "rgb(240, 0, 0)",
                  padding: " 7.79px 0px",
                  fontSize: "14px",
                }}
              >
                <div
                  class="col-4 text-center text-dark"
                  style={{ fontSize: "10px" }}
                >
                  {h.cVolume}
                </div>
                <div
                  class="col-4 text-center text-secondary"
                  style={{ fontSize: "10px" }}
                >
                  {h.currency_type}
                </div>
                <div
                  class="col-4 text-center text-secondary"
                  style={{ fontSize: "10px" }}
                >
                  14:54:12
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}

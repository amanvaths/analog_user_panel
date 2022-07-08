import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Api_connection/config";
import "./tradehistory.css";
import { Triangle } from "react-loader-spinner";
import { useSelector } from "react-redux";

export default function TradeHistory() {
  const [history, setHistory] = useState([]);
  const [loader, setLoader] = useState(true);
  const { userInfo, theme } = useSelector((state) => state.user.value);
  useEffect(() => {
      
    axios
      .get(
        `${BASE_URL}/getAllOrder?type=Buy&compair_currency=${userInfo?.currency_preference}`
      )
      .then((res) => {
        setHistory(res.data.order);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [userInfo]);
  return (
    <div className="card mt-1">
      <div className="card-header bg-teal-dim font-weight-bold">
        TRADE HISTORY
      </div>
      <div className="card-body table-responsive  p-0">
        <table className="table  mb-0">
          <div style={{ display: "contents" }}>
            <thead>
              <tr className="historyorder">
                <th style={{ width: "20%" }}>Total Analog</th>
                <th style={{ width: "20%" }}>Total Amount Pay</th>
                <th style={{ width: "20%" }}>Buying Price</th>
                <th style={{ width: "20%" }}>Pool</th>
                <th style={{ width: "20%" }}>Time</th>
              </tr>
            </thead>
            <div
              style={{
                height: "450px",
                overflowX: "hidden",
                display: "table-caption",
              }}
            >
              <tbody>
                {loader && (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        zIndex: "99",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <Triangle ariaLabel="loading-indicator" color="green" />
                    </div>
                  </>
                )}
                {history.map((h) => {
                  let a = new Date(h.date).toLocaleString([], {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <>
                      <tr
                        className="zoom  historyorder"
                        style={{ fontSize: "16.6px", cursor: "pointer" }}
                      >
                        <td
                          className="TradeHistorySize"
                          style={{ width: "16.6%" }}
                        >
                          {h.cVolume.toFixed(2)}
                          <img
                            alt="analog"
                            src="./images/Analog.png"
                            style={{ width: "24px" }}
                            className="tradeAnaIcon"
                          />
                        </td>
                        <td
                          className="text-danger TradeHistorySize"
                          style={{ width: "16.6%" }}
                        >
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
                          <i className="ion ion-arrow-graph-up-right"></i>
                        </td>
                        <td
                          className=" TradeHistorySize"
                          style={{ width: "16.6%" }}
                        >
                          {h.compair_currency == "usd"
                            ? h.pref_raw_price.toFixed(8)
                            : h.pref_raw_price.toFixed(8)}{" "}
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
                          <i className="ion ion-arrow-graph-down-right"></i>
                        </td>
                        <td
                          className="TradeHistorySize"
                          style={{ width: "16.6%" }}
                        >
                          {h.presalelevel}
                        </td>
                        <td
                          className="TradeHistorySize"
                          style={{ width: "16.6%" }}
                        >
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
  );
}

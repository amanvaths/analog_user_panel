import React, { useEffect, useState } from "react";
import "./order.css";
import axios from "axios";

export default function Orders() {
  const email = localStorage.getItem("email")
  const [activeTab, setActiveTab] = useState(0);
  const [buy, setBuy] = useState(true);
  const [sell, setSell] = useState(false);
  const [coinData, setCoinData] = useState([]);

  const[atprice ,setAtprice]=useState(10);
  const[ammount ,setAmmount]=useState("");

  const getData = async () => {
    try {
      const res = await axios.post("http://localhost:3001/api/getCoinData",{currency: "inr"});
      const cd = [];
      for (let coin of Object.entries(res.data)) {
        //console.log(coin);
        cd.push(coin[1]);
      }
      //console.log(cd, "coin data");
      setCoinData([...cd]);
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(()=>{
    getData()
  },[])
  console.log(coinData[7]?.quote?.INR?.price,":: Coin Data");
  const trxInAna = atprice/coinData[7]?.quote?.INR?.price

  console.log(trxInAna, "1trx in 1 ana");

  const inTrx = ammount * trxInAna

  console.log(inTrx, "Total Trx");


  function TotalAmt(){
     var Total=atprice*ammount
     console.log(atprice)
     console.log(ammount)
     let params = {
      amount: atprice, 
      raw_price: ammount,  
      currencyType: 'btc', 
      compairCurrency: 'trx', 
      email: email 
     }
     axios.post('http://localhost:3001/api/order',params).then((res)=>{
       console.log(res.data)
     }).catch((error)=>{
       console.log(error.message);
     })
  }
  
  return (
    <div className="order">
      <div style={{ background: "white" }}>
        <div className="nav nav-tabs d-flex"></div>
        <div
          style={{
            textAlign: "center",
            fontWeight: "bold",
            background: "rgb(241, 241, 241)",
          }}
        >
          ORDER
        </div>
        <div>
          <div
            class="  row m-0 p-0 py-1"
            style={{ borderTop: "0.1px solid rgba(0, 0, 0, 0.1)" }}
          ></div>

          <div className="nav nav-tabs d-flex"></div>

          <div
            class="row m-0 p-0 py-1 theme-color pair-border"
            style={{ width: "100%" }}
          >
            <div class="col-3 text-center" style={{ fontSize: "10px" }}>
              PAIR
            </div>
            <div class="col-3 text-center" style={{ fontSize: "10px" }}>
              AMOUNT
            </div>
            <div class="col-3 text-center" style={{ fontSize: "10px" }}>
              PRICE
            </div>
            <div class="col-3 text-center" style={{ fontSize: "10px" }}>
              TOTAL
            </div>
          </div>

          <div className="nav nav-tabs d-flex"></div>

          <div
            className=" tab-content orders"
            style={{ borderColor: "rgba(25, 32, 87, 0.2)" }}
          >
            <div className="d-flex justify-content-center align-items-center">
              <div
                className="sing-up-button"
                style={{
                  textAlign: "center",
                  height: "350px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: " flex",
                  flexDirection: "column",
                }}
              >
                <a className="btn-theme-color " href="#">
                  No Open Order
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buy Sell */}
      <div>
        <nav
          class="coinsfather-theme-color"
          style={{
            border: "0.3px solid rgba(255, 255, 255, 0.2)",
            marginTop: "6px",
          }}
        >
          <div class="nav nav-tabs d-flex" id="nav-tab" role="tablist">
            <a
              class="nav-item nav-link p-0  active"
              id="nav-home-tab"
              data-toggle="tab"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
              onClick={() => {
                setBuy(true);
                setSell(false);
              }}
              style={{
                flex: "0.5 1 0%",
                height: " 30px",
                lineHeight: "30px",
                cursor: "pointer",
              }}
            >
              Buy
            </a>
            <a
              class="nav-item nav-link buy p-0 "
              id="nav-profile-tab"
              data-toggle="tab"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
              onClick={() => {
                setBuy(false);
                setSell(true);
              }}
              style={{
                flex: "0.5 1 0%",
                height: "30px",
                lineHeight: "30px",
                cursor: "pointer",
              }}
            >
              Sell
            </a>
          </div>
        </nav>
        {buy && (
          <div
            className=" tab-content orders"
            style={{ borderColor: "rgba(25, 32, 87, 0.2)" }}
          >
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ background: "white" }}
            >
              <div
                className="sing-up-button"
                style={{
                  textAlign: "center",
                  height: "350px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: " flex",
                  flexDirection: "column",
                }}>


                   {/* Buy Sell Option  */}


                <div class="p-3">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text buy-sell-form-bg buy-sell-theme"
                        style={{
                          fontSize: "10px",
                          backgroundColor: " white",
                          color: "rgb(162, 162, 162)",
                        }}
                      >
                        ANA PRICE
                        <br />
                        INR
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control buy-sell-form-bg"
                      value={atprice}
                      style={{ borderRight: "none" ,height:"54px"}}
                      onChange={(e)=>{setAtprice(e.target.value)}}
                    readOnly/>
                    <div class="">
                      <button
                        class="bg-white text-success p-3"
                        type="button"
                        style={{
                          borderLeft: "none",
                          borderBlock: "1px solid rgb(206, 212, 218)",
                          fontSize: " 13px",
                          outline: "none",
                        }}
                      >
                        LOWEST PRICE
                      </button>
                    </div>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text buy-sell-form-bg buy-sell-theme"
                        style={{
                          fontSize: " 10px",
                          borderColor: " rgb(202, 202, 204)",
                        }}
                      >
                        AMOUNT
                        <br />
                        Qty
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control buy-sell-form-bg buy-sell-theme"
                      // value="10"
                      style={{ borderColor: "rgb(202, 202, 204)",height:"54px" }}
                      onChange={(e)=>{setAmmount(e.target.value)}}

                    />
                  </div>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text buy-sell-form-bg buy-sell-theme"
                        style={{
                          fontSize: " 10px",
                          paddingLeft: " 20px",
                          borderColor: "rgb(202, 202, 204)",
                        }}
                      >
                        TOTAL
                        <br />
                        TRX
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control buy-sell-form-bg buy-sell-theme"
                      value={inTrx}
                      style={{ borderColor: "rgb(202, 202, 204)",height:"54px" }}
                    />
                  </div>
                  {/* <div class="row mb-4 px-3">
                    <div
                      class="col-6 pl-1"
                      style={{
                        display: "flex",
                        flexDirection: " row",
                        alignItems: " center",
                        borderInline: "1px solid rgb(206, 212, 218)",
                        borderBottom: " 1px solid rgb(206, 212, 218)",
                        borderRadius: "5px",
                      }}
                    >
                      <span class="mx-2" title="wallet">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 512 512"
                          class="text-secondary"
                          height="24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M200.4 27.39L180.9 183h42.8l49.1-146.57-72.4-9.04zm91.7 8L242.7 183l149.7.1 34.3-102.61-134.6-45.1zM180 46.03l-71.9 7.84L122.2 183h40.7L180 46.03zM64 153c-11.5 0-19.18 8.8-21.27 17.2-1.04 4.2-.45 7.6.73 9.5 1.17 1.8 2.79 3.3 8.54 3.3h52.1l-3.3-30H64zm357.4 0l-10 30h47.5c-2.6-5-3.7-10.3-3-15.6.7-5.2 2.7-9.9 5.3-14.4h-39.8zM41 201v246.9c0 5.1 2.79 11.1 7.37 15.7C52.96 468.2 59 471 64 471l384 .1c5 0 11-2.8 15.6-7.4 4.6-4.6 7.4-10.6 7.4-15.7v-71h-87c-44 0-44-82 0-82h87v-93.9L41 201zm343 112c-20 0-20 46 0 46h22.3c-9-3.8-15.3-12.7-15.3-23s6.3-19.2 15.3-23H384zm41.7 0c9 3.8 15.3 12.7 15.3 23s-6.3 19.2-15.3 23H487v-46h-61.3zm-9.7 16c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7z"></path>
                        </svg>
                      </span>
                      454520832.6465 INR
                    </div>
                  <div
                      class="col-6 p-2 d-flex justify-content-between"
                      style={{
                        borderRight: "1px solid rgb(206, 212, 218)",
                        borderBottom: "1px solid rgb(206, 212, 218)",
                      }}
                    >
                      <div class="cursor">25%</div>
                      <div class="px-1 cursor">50%</div>
                      <div class="px-1 cursor">75%</div>
                      <div class="cursor">100%</div>
                    </div> 
                  </div> */}
                  <button
                    class="btn text-light btn-block my-2"
                    style={{ background: "rgb(108, 183, 125)" }}
                   onClick={TotalAmt}
                  >
                    BUY BTEX
                  </button>
                  <div class="px-3 m-0">
                    Fee: Maker fee: 0.1%| Taker fee: 0.1%
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {sell && (
          <div
            className=" tab-content orders"
            style={{ borderColor: "rgba(25, 32, 87, 0.2)" }}
          >
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ background: "white" }}
            >
              <div
                className="sing-up-button"
                style={{
                  textAlign: "center",
                  height: "350px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: " flex",
                  flexDirection: "column",
                }}
              >
                <div class="offset-7 col-5 py-5">
                  <select
                    class="custom-select bg-light text-secondary border buy-sell-form-bg buy-sell-theme d-none"
                    style={{ borderColor: "rgb(202, 202, 204)" }}
                  >
                    <option value="0">Limit</option>
                    <option value="1">Stop Limit</option>
                  </select>
                </div>

               

                <button
                  class="btn btn-block text-light my-2"
                  style={{ background: "rgb(251, 110, 123)" }}
                >
                  SELL BTC
                </button>

               
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

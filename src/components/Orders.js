import React, { useEffect, useState } from "react";
import "./order.css";
import axios from "axios";
import { BASE_URL } from "../Api_connection/config";
import { useSelector, useDispatch } from "react-redux";
import { setCurrency_type } from "../redux/buySell";
import { setCurrencyPrefrence } from "../redux/buySell";

export default function Orders() {
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");
  const [buy, setBuy] = useState(true);
  const [coinData, setCoinData] = useState({});
  const [atprice, setAtprice] = useState(0);
  const [ammount, setAmmount] = useState(0);
  const [total, setTotal] = useState(0);

  const [history, setHistory] = useState("");
  const [wallets, setWallets] = useState([]);
  const [walletbalance, setWalletBalance] = useState("");
  const [walletsymbol, setWalletsymbol] = useState("");
 const [quantity ,setQuantity]=useState(0);
  // dispatch

  const { currency_prefrence } = useSelector((state) => state.currency.value);
  const symbolState = useSelector((store) => store);
  console.log(currency_prefrence, "vipin currency_prefrence");

  // function toFixed(x) {
  //   if (Math.abs(x) < 1.0) {
  //     var e = parseInt(x.toString().split('e-')[1]);
  //     if (e) {
  //         x *= Math.pow(10,e-1);
  //         x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
  //     }
  //   } else {
  //     var e = parseInt(x.toString().split('+')[1]);
  //     if (e > 20) {
  //         e -= 20;
  //         x /= Math.pow(10,e);
  //         x += (new Array(e+1)).join('0');
  //     }
  //   }
  //   return x;
  // }

  const getData = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/getCoinData`, {
        currency: "inr",
      });
      setCoinData({ ...res.data });

      /*  const cd = [];
      for (let coin of Object.entries(res.data)) {
        //console.log(coin);
        cd.push(coin[1]);
      }
      //console.log(cd, "coin data");
      setCoinData([...cd]); */
    } catch (error) {
      console.log(error);
    }
  };

  const getWalletData = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/getWalletData`, {
        email: email,
      });
      let walletData = res.data;
      walletData = walletData.filter((wallet) => wallet.balance > 0);
      setWallets([...walletData]);
      const cd = [];
      /* for (let coin of Object.entries(res.data)) {
        //console.log(coin);
        cd.push(coin[1]);
      }
      //console.log(cd, "coin data");
      setCoinData([...cd]); */
    } catch (error) {
      console.log(error);
    }
  };

  // Ana price

  const AnaPrice = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/anaPrice`, {});
      let Anadata = res.data;
      console.log(res.data._data.price, "ana Price erefrf fgfhg gbghgfhnf");
      // setAnaprice(res.data.price)
      setAtprice(res.data._data.price);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getWalletData();
    AnaPrice();
    selectedCoin();
  }, []);
  const trxInAna = atprice / coinData[walletsymbol]?.quote?.INR?.price;
  console.log(trxInAna, "1trx in 1 ana");
  console.log(atprice, "AtPrice");
  const inTrx = ammount * trxInAna;
  console.log(inTrx, "Total Trx");

  function calculatePrice(coinPrice) {
    console.log(coinPrice, ":::::::: Coin Data");
    const trxInAna = atprice / coinPrice;
    console.log(trxInAna, "1trx value");
    const inTrx = ammount * trxInAna;
    console.log(inTrx, "Total Trx value");
    setTotal(inTrx);
    setAtprice(inTrx);
  }

  function selectedCoin() {
    if (walletsymbol == "BUSD") {
      return atprice;
    }
  }
  console.log(wallets, ":: All Data In Wallets ");

  function TotalAmt() {
    let params = {
      amount: ammount,
      raw_price: trxInAna,
      currencyType: walletsymbol,
      compairCurrency: currency_prefrence,
      TotalTrx: inTrx,
      email: email,
    };

    axios
      .post(`${BASE_URL}/order`, params)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  useEffect(() => {
    if (email) {
      axios
        .get(`${BASE_URL}/getAllOrder`, {email: email})
        .then((res) => {
          console.log(res.data, "All Order");
          setHistory(res.data.order);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, []);

  // const hist =
  //   history &&
  //   history.map((data, index) => {
  //     return (
  //       <>
  //         <div class="order_cont" style={{margin:"1px 0px"}}>
  //           <div
  //             class="row m-0 p-0 py-1 align-items-center order"
  //             style={{
  //               borderLeft: "5px solid green",
  //               height: "40px",
  //             }}
  //           >
  //             <div
  //               style={{
  //                 width: "100%",
  //                 height: " 100%",
  //                 background: " rgba(35, 172, 80, 0.4)",
  //                 position: "absolute",
  //                 left: " 0px",
  //                 top: "0px",
  //                 zIndex: "-1",
  //               }}
  //             ></div>

  //             <div class="col-3 text-center" style={{ fontSize: "10px" }}>
  //               <div class="font-weight-bold">

  //                 {data.currency_type} /{data.compair_currency}
  //               </div>
  //             </div>
  //             <div class="col-3 text-center" style={{ fontSize: "10px" }}>
  //               <div class="font-weight-bold"></div>
  //               <div>{data.raw_price}</div>
  //             </div>
  //             <div class="col-3 text-center" style={{ fontSize: "10px" }}>
  //               {data.raw_price}
  //             </div>
  //             <div class="col-3 text-center" style={{ fontSize: "10px" }}>
  //               {data.cVolume}
  //             </div>

  //           </div>
  //         </div>
  //       </>
  //     );
  //   });

  return (
    <div className="order">
      <div class="card mt-2" style={{ height: "450px" }}>
        <div class="card-header justify-content-between align-items-center">
          <h6 class="card-title align-items-center text-dark"> ORDER</h6>
        </div>
        <div class="card-body table-responsive p-0">
          <table class="table font-w-600 mb-0">
            <thead>
              <tr style={{fontSize:"10px"}}>
                <th>Total Anolog</th>
                <th>Total Amount Pay</th>
                <th>Buying Price</th>
                <th>Pool</th>
                {/* <th>Time</th> */}
              </tr>
            </thead>
            <tbody>
              {history &&
                history.map((h) => {
                  return (
                    <>
                      <tr class="zoom" style={{fontSize:"10px"}}>
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
                        {/* <td>{h.date}</td> */}
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* <div style={{ background: "white" }}>
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
            <div class="col-3 text-center" style={{ fontSize: "11px",fontWeight:"bold" }}>
              PAIR
            </div>
            <div class="col-3 text-center" style={{ fontSize: "11px",fontWeight:"bold" }}>
              AMOUNT
            </div>
            <div class="col-3 text-center" style={{ fontSize: "11px",fontWeight:"bold" }}>
              PRICE
            </div>
            <div class="col-3 text-center" style={{ fontSize: "11px",fontWeight:"bold" }}>
              TOTAL
            </div>
          </div>
          <div className="nav nav-tabs d-flex"></div>

         

          <div style={{ height: "400px", overflowY: "scroll" }}>{hist}</div>
        </div>
      </div> */}

      {/* Buy Sell */}
      <div>
        <nav
          class="coinsfather-theme-color"
          style={{
            border: "0.3px solid rgba(255, 255, 255, 0.2)",
            marginTop: "6px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              background: "rgb(241, 241, 241)",
            }}
          >
            BUY
          </div>
        </nav>

        {/* Buy */}

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
                  height: "400px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: " flex",
                  flexDirection: "column",
                }}
              >
                {/* Buy Btex Option  */}

                <div class="p-3" style={{ width: "465px" }}>
                  {/* <div class="input-group mb-3">
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
                        {walletsymbol}
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control buy-sell-form-bg"
                      maxLength="6"
                      value={atprice}
                      style={{ borderRight: "none", height: "54px" }}
                      onChange={(e) => {
                        setAtprice(
                          e.target.value
                            .replace(/[^0-9.]/g, "")
                            .replace(/(\..?)\../g, "$1")
                        );
                        setTotal(
                          e.target.value
                            .replace(/[^0-9.]/g, "")
                            .replace(/(\..?)\../g, "$1") * ammount
                        );
                      }}
                      readOnly
                    />
                  </div> */}
                   <div><h6>ANA PRICE <div>{ atprice}</div></h6></div>
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
                      type="number"
                      class="form-control buy-sell-form-bg buy-sell-theme"
                      value={ammount}
                      style={{
                        borderColor: "rgb(202, 202, 204)",
                        height: "54px",
                      }}
                      onChange={(e) => {
                        // if (walletsymbol != "") {
                        setAmmount(
                          e.target.value
                            .replace(/[^0-9.]/g, "")
                            .replace(/(\..?)\../g, "$1")
                        );
                        setTotal(
                          e.target.value
                            .replace(/[^0-9.]/g, "")
                            .replace(/(\..?)\../g, "$1") * atprice
                        );
                        // } else {
                        //   alert("Please select any wallet");
                        // }
                      }}
                    />
                  </div>

                  {/* WalletCoins */}
                  {/* <div
                    style={{
                      overflowX: "scroll",
                      maxWidth: "450PX",
                      padding: "5px 0px",
                    }}
                  > */}
                   {/* <div style={{ width: "450px" }}> 
                      {wallets.map((wallet) => (
                        console.log(wallets,"walleta"),
                        <div class="form-check form-check-inline">
                          <input
                            style={{ display: "inline-block" }}
                            class="form-check-input"
                            type="radio"
                            name="sCurrency"
                            value={coinData[wallet.symbol]?.quote?.INR?.price}
                            id={wallet.symbol}
                            onChange={(e) => {
                              setAtprice(
                              atprice /
                                  coinData[wallet.symbol]?.quote?.INR?.price
                              );
                              setTotal(
                                (st) =>
                                  coinData[wallet.symbol]?.quote?.INR?.price *
                                  quantity
                              );
                              setAmmount(
                                (st) =>
                                  coinData[wallet.symbol]?.quote?.INR?.price *
                                  quantity
                              );
                              setWalletBalance(wallet.balance);
                              setWalletsymbol(wallet.symbol);
                              dispatch(
                                setCurrency_type({
                                  currency_type: wallet.symbol,
                                })
                              );
                            }}
                          />

                          <label class="form-check-label" for={wallet.symbol}>
                            {wallet.symbol}
                          </label>
                        </div>
                      ))}
                  </div>  */}
                  <div style={{ margin: "35px 0px" }}>
                    <h4>{currency_prefrence}</h4>
                  </div>

                  {/* <div class="input-group">
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
                        {walletsymbol}
                      </span>
                    </div>
                    <input
                      type="number"
                      class="form-control buy-sell-form-bg buy-sell-theme"
                      value={total}
                      onChange={(e) => {
                        // if (walletsymbol != "") {
                          setAmmount(
                            e.target.value
                              .replace(/[^0-9.]/g, "")
                              .replace(/(\..?)\../g, "$1") / atprice
                          );
                          setTotal(
                            e.target.value
                              .replace(/[^0-9.]/g, "")
                              .replace(/(\..?)\../g, "$1")
                          );
                        // }else {
                        //   alert("Please select any wallet.")
                        // }

                        
                      }}
                      // onChange={(e) => {
                      //   console.log("Quantity",(e.target.value/anaPriceForWallet));
                      //   setQuantity(e.target.value / anaPriceForWallet);

                      // }}

                      style={{
                        borderColor: "rgb(202, 202, 204)",
                        height: "54px",
                      }}
                    />
                  </div> */}

                  <div class="row  px-3" style={{ margin: "0px -16px" }}>
                    <div
                      class="col-6 pl-1"
                      style={{
                        display: "flex",
                        flexDirection: " row",
                        alignItems: " center",
                        borderInline: "1px solid rgb(206, 212, 218)",
                        border: " 1px solid rgb(206, 212, 218)",
                        borderRadius: "5px",
                      }}
                    >
                      <span class="mx-2" title="wallet">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 512 512"
                          class="text-secondary"
                          height="24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M200.4 27.39L180.9 183h42.8l49.1-146.57-72.4-9.04zm91.7 8L242.7 183l149.7.1 34.3-102.61-134.6-45.1zM180 46.03l-71.9 7.84L122.2 183h40.7L180 46.03zM64 153c-11.5 0-19.18 8.8-21.27 17.2-1.04 4.2-.45 7.6.73 9.5 1.17 1.8 2.79 3.3 8.54 3.3h52.1l-3.3-30H64zm357.4 0l-10 30h47.5c-2.6-5-3.7-10.3-3-15.6.7-5.2 2.7-9.9 5.3-14.4h-39.8zM41 201v246.9c0 5.1 2.79 11.1 7.37 15.7C52.96 468.2 59 471 64 471l384 .1c5 0 11-2.8 15.6-7.4 4.6-4.6 7.4-10.6 7.4-15.7v-71h-87c-44 0-44-82 0-82h87v-93.9L41 201zm343 112c-20 0-20 46 0 46h22.3c-9-3.8-15.3-12.7-15.3-23s6.3-19.2 15.3-23H384zm41.7 0c9 3.8 15.3 12.7 15.3 23s-6.3 19.2-15.3 23H487v-46h-61.3zm-9.7 16c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7z"></path>
                        </svg>
                      </span>
                      {walletbalance} {"   "}
                      {walletsymbol}
                    </div>
                    <div
                      class="col-6 p-2 d-flex justify-content-between"
                      style={{
                        borderRight: "1px solid rgb(206, 212, 218)",
                        border: "1px solid rgb(206, 212, 218)",
                        borderRadius: "5px",
                      }}
                    >
                      <div
                        class="cursor"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setTotal(
                            Number(walletbalance ? walletbalance * 0.25 : 0)
                          );
                          setAmmount(
                            Number(
                              (walletbalance ? walletbalance * 0.25 : 0) /
                                atprice
                            )
                          );
                        }}
                      >
                        25%
                      </div>
                      <div
                        class="px-1 cursor"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setTotal(walletbalance ? walletbalance * 0.5 : 0);
                          setAmmount(
                            walletbalance ? (walletbalance * 0.5) / atprice : 0
                          );
                        }}
                      >
                        50%
                      </div>
                      <div
                        class="px-1 cursor"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setTotal(walletbalance ? walletbalance * 0.75 : 0);
                          setAmmount(
                            walletbalance ? (walletbalance * 0.75) / atprice : 0
                          );
                        }}
                      >
                        75%
                      </div>
                      <div
                        class="cursor"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setTotal(walletbalance ? walletbalance : 0);
                          setAmmount(
                            walletbalance ? walletbalance / atprice : 0
                          );
                        }}
                      >
                        100%
                      </div>
                    </div>
                  </div>

                  <button
                    class="btn text-light btn-block my-2"
                    style={{ background: "rgb(108, 183, 125)", top: "40px" }}
                    onClick={TotalAmt}
                  >
                    BUY ANA
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "./order.css";
import axios from "axios";
import { BASE_URL } from "../Api_connection/config";
import { useSelector, useDispatch } from "react-redux";
import { setCurrency_type } from "../redux/buySell";
import { data } from "jquery";
import swal from "sweetalert";

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
  const [quantity, setQuantity] = useState(0);
  const [quantityerror, setQuantityError] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  // dispatch

  const { userInfo, oneUsdPrice } = useSelector((state) => state.user.value);
  const symbolState = useSelector((store) => store);
  console.log(userInfo?.currency_preference, "vipin currency_prefrence");
  console.log(oneUsdPrice, "One Usd Price ");

  const getData = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/getCoinData`, {
        currency: userInfo?.currency_preference,
      });
      setCoinData({ ...res.data });
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
      const data = {
        // symbol: walletData[4]?.symbol,
        balance: walletData[4]?.usdt_balance,
        // inrxsymbol: walletData[5]?.symbol,
      };
      console.log(data.balance, "::BALANCE AMIT");

      console.log(
        ":::::::::::::::::::::-------",
        typeof data?.balance,
        typeof oneUsdPrice
      );
      setWalletBalance(
        userInfo?.currency_preference == "usd"
          ? data?.balance
          : Number(data?.balance * oneUsdPrice)
      );

      walletData = walletData.filter((wallet) => wallet?.balance > 0);
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
    getWalletData();
    getData();
    AnaPrice();
    selectedCoin();
  }, [oneUsdPrice, userInfo, data.balance]);

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
    if (ammount == 0) {
      swal("Please Enter A Valid ammount", "Enter Ammount", "error");
    } else {
      let params = {
        amount: ammount,
        raw_price: trxInAna,
        currencyType: walletsymbol,
        compairCurrency: userInfo?.currency_preference,
        TotalTrx: inTrx,
        email: email,
      };
      axios
        .post(`${BASE_URL}/order`, params)
        .then((res) => {
          console.log(res.data, "ffdddf");
          if (res.data.status == true) {
            swal(`${res.data.message}`, "Welcome", "success");
          }
        })
        .catch((error) => {
          console.log(error);
          swal(`${error.response.data.message}`, "Sorry", "error");
        });
    }
  }

  useEffect(() => {
    if (email) {
      axios
        .get(`${BASE_URL}/getAllOrder`, { email: email })
        .then((res) => {
          console.log(res.data, "All Order");
          setHistory(res.data.order);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, []);

  return (
    <div className="order">
      <div class="card mt-2" style={{ height: "450px" }}>
        <div class="card-header justify-content-between align-items-center">
          <h6 class="card-title align-items-center text-dark"> ORDER</h6>
        </div>
        <div class="card-body p-0">
          <table class="table font-w-600 mb-0">
          <div style={{ display: "contents" }}>
            <thead>
              <tr style={{ fontSize: "10px" }}>

                <th  style={{width:"22%"}}>Total Analog</th>
                <th  style={{width:"22%"}}>Total Amount Pay</th>
                <th  style={{width:"29%"}}>Buying Price</th>
                <th style={{width:"27%"}}>Pool</th>
                {/* <th>Time</th> */}
              </tr>
            </thead>
            <div style={{ height: "373px",overflow:"auto",display: "table-caption"}}>
            <tbody>
              {history &&
                history.map((h) => {
                  return (
                    <>
                      <tr class="zoom" style={{ fontSize: "10px" }}>
                        <td style={{width:"23%"}}> {h.cVolume?.toFixed(2)}<img
                            src="./images/Analog.png"
                            style={{ width: "20px" }}
                           
                          /></td>
                        <td class="text-danger" style={{width:"23%"}}>
                          {h.preferred_currency_amount?.toFixed(2)}{" "}
                          {h.compair_currency == "usd" ? (
                            <img
                              src="./images/Usdt.png"
                              style={{ width: "17px" }}
                              alt="usdt"
                            />
                          ) : (
                            <img
                              src="./images/Inrx_black.png"
                              style={{ width: "17px" }}
                              alt="inrx"
                            />
                          )}
                          <i class="ion ion-arrow-graph-up-right"></i>
                        </td>
                        <td class="text-success" style={{width:"22%"}}>
                          {h.compair_currency == "usd"
                            ? h.pref_raw_price.toFixed(8)
                            : h.pref_raw_price}
                          <i class="ion ion-arrow-graph-down-right"></i>
                        </td>
                        <td style={{width:"32%"}}>{h.presalelevel}</td>
                        {/* <td>{h.date}</td> */}
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
                  <div>
                    <h6>
                      ANA PRICE{" "}
                      <div className="column">
                        {userInfo?.currency_preference == "usd"
                          ? (atprice / oneUsdPrice).toFixed(8)
                          : atprice}{" "}
                        {userInfo?.currency_preference == "usd" ? (
                          <img
                            src="./images/Usdt.png"
                            style={{ width: "17px" }}
                            alt="usdt"
                          />
                        ) : (
                          <img
                            src="./images/Inrx_black.png"
                            style={{ width: "17px" }}
                            alt="inrx"
                          />
                        )}
                      </div>
                    </h6>
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
                      type="number"
                      class="form-control buy-sell-form-bg buy-sell-theme"
                      value={ammount}
                      style={{
                        borderColor: "rgb(202, 202, 204)",
                        height: "54px",
                      }}
                      onChange={(e) => {
                        const amt = e.target.value
                          .replace(/[^0-9.]/g, "")
                          .replace(/(\..?)\../g, "$1");
                        setAmmount(amt);
                        const tAmt =
                          userInfo?.currency_preference == "usd"
                            ? (amt * atprice) / oneUsdPrice
                            : atprice * amt;
                        setTotal(tAmt);
                        setQuantityError(false);
                      }}
                    />

                    {/* {quantityerror == true ? (
                    alert("Please Enter A Valid ammount *")

                ) : null} */}
                  </div>
                  <div style={{ marginRight: "23pc", marginTop: "-15px" }}>
                    {total.toFixed(6)}
                  </div>

                  <div style={{ margin: "10px 0px" }}>
                    {/* <h4>{walletdata}</h4> */}
                    <h4 style={{ fontSize: "15px" }}>
                      {userInfo?.currency_preference == "usd" ? "USDT" : "INRX"}
                    </h4>
                  </div>

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
                      {Number(walletbalance).toFixed(4)}
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
                          console.log(
                            (walletbalance * 0.25 * oneUsdPrice) / atprice,
                            "PriceCal"
                          );
                          setTotal(
                            Number(walletbalance ? walletbalance * 0.25 : 0)
                          );
                          if (userInfo?.currency_preference == "usd") {
                            const amt = Number(
                              (walletbalance ? walletbalance * 0.25 : 0) /
                                (atprice / oneUsdPrice)
                            );
                            setAmmount(amt);
                          } else {
                            const amt = Number(
                              (walletbalance ? walletbalance * 0.25 : 0) /
                                atprice
                            );
                            setAmmount(amt);
                          }
                        }}
                      >
                        25%
                      </div>
                      <div
                        class="px-1 cursor"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setTotal(walletbalance ? walletbalance * 0.5 : 0);
                          if (userInfo?.currency_preference == "usd") {
                            const amt = Number(
                              (walletbalance ? walletbalance * 0.5 : 0) /
                                (atprice / oneUsdPrice)
                            );
                            setAmmount(amt);
                          } else {
                            const amt = Number(
                              (walletbalance ? walletbalance * 0.5 : 0) /
                                atprice
                            );
                            setAmmount(amt);
                          }
                        }}
                      >
                        50%
                      </div>
                      <div
                        class="px-1 cursor"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setTotal(walletbalance ? walletbalance * 0.75 : 0);
                          if (userInfo?.currency_preference == "usd") {
                            const amt = Number(
                              (walletbalance ? walletbalance * 0.75 : 0) /
                                (atprice / oneUsdPrice)
                            );
                            setAmmount(amt);
                          } else {
                            const amt = Number(
                              (walletbalance ? walletbalance * 0.75 : 0) /
                                atprice
                            );
                            setAmmount(amt);
                          }
                        }}
                      >
                        75%
                      </div>
                      <div
                        class="cursor"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setTotal(walletbalance ? walletbalance : 0);
                          if (userInfo?.currency_preference == "usd") {
                            const amt = Number(
                              (walletbalance ? walletbalance : 0) /
                                (atprice / oneUsdPrice)
                            );
                            setAmmount(amt);
                          } else {
                            const amt = Number(
                              (walletbalance ? walletbalance : 0) / atprice
                            );
                            setAmmount(amt);
                          }
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

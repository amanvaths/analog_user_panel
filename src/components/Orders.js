import React, { useEffect, useState, useLayoutEffect } from "react";
import "./order.css";
import axios from "axios";
import { BASE_URL } from "../Api_connection/config";
import { useSelector, useDispatch } from "react-redux";
import { setCurrency_type } from "../redux/buySell";
import { data } from "jquery";
import swal from "sweetalert";
import "../App.css";
import MultiRangeSlider from "./multiRangeSlider/MultiRangeSlider";
import { Triangle } from "react-loader-spinner";

export default function Orders() {
  const dispatch = useDispatch();
  // const email = localStorage.getItem("email");
  const [buy, setBuy] = useState(true);
  const [coinData, setCoinData] = useState({});
  const [atprice, setAtprice] = useState(0);
  const [ammount, setAmmount] = useState(0);
  const [total, setTotal] = useState(0);

  const [history, setHistory] = useState("");
  const [wallets, setWallets] = useState([]);
  const [walletbalance, setWalletBalance] = useState("");
  const [walletsymbol, setWalletsymbol] = useState("");
  const [minimumvalue, setMinimumValue] = useState("");
  const [loader, setLoader] = useState(true);

  // const [CurrencyType, setCurrencyType] = useState("");
  // const [quantity, setQuantity] = useState(0);
  // const [quantityerror, setQuantityError] = useState(false);
  // const [message, setMessage] = useState("");
  // const [status, setStatus] = useState("");

  // dispatch

  const { user, userInfo, oneUsdPrice, totalAna } = useSelector(
    (state) => state.user.value
  );
  const email = user?.email;
  // const symbolState = useSelector((store) => store);


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

  console.log(userInfo?.currency_preference,"userInfo?.currency_preference");

  const getWalletData = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/getWalletData`, {
        email: email,
      });
      let walletData = res.data;
      const data = {
        balance: walletData[8]?.usdt_balance,
        // inrxsymbol: walletData[5]?.symbol,
      };

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

  const inTrx = ammount * trxInAna;

  function calculatePrice(coinPrice) {
    const trxInAna = atprice / coinPrice;
    const inTrx = ammount * trxInAna;
    setTotal(inTrx);
    setAtprice(inTrx);
    console.log(coinPrice,"coin Price Coin Price ");
  }

  function selectedCoin() {
    if (walletsymbol == "BUSD") {
      return atprice;
    }
  }

  function TotalAmt() {
    if (ammount == 0) {
      swal("Please Enter A Valid ammount", "Enter Ammount", "error");
    } else {
      let params = {
        amount: userInfo?.currency_preference == "usd"?total/(atprice / oneUsdPrice):
        total/atprice,
        raw_price: trxInAna,
        currencyType: walletsymbol,
        compairCurrency: userInfo?.currency_preference,
        TotalTrx: inTrx,
        email: email,
      };
      axios
        .post(`${BASE_URL}/order`, params)
        .then((res) => {
          if (res.data.status == true) {
            swal(`${res.data.message}`, "Welcome", "success");
            ammount = 0;
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
        .get(
          `${BASE_URL}/getAllOrder?email=${email}&& compair_currency=${userInfo?.currency_preference}`
        )
        .then((res) => {
          const orderrespons = res.data;
          setHistory(orderrespons.order);
          setLoader(false);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [userInfo]);

  // progress Bar

  return (
    <div className="order">
      <div class="card mt-2">
        <div class="card-header justify-content-between align-items-center">
          <h6 class="card-title "> ORDER</h6>
        </div>
        <div class="card-body table-responsive  p-0">
          <table class="table  mb-0">
            <div style={{ display: "contents" }}>
              <thead>
                <tr style={{ fontSize: "10px" }}>
                  <th
                    className="OrderHistoryHedding"
                    style={{ width: "20%", padding: "7px 7px" }}
                  >
                    Total Analog
                  </th>
                  <th
                    className="OrderHistoryHedding"
                    style={{ width: "23%", padding: "7px 7px" }}
                  >
                    Total Amount Pay
                  </th>
                  <th
                    className="OrderHistoryHedding"
                    style={{ width: "30%", padding: "7px 7px" }}
                  >
                    Buying Price
                  </th>
                  <th
                    className="OrderHistoryHedding"
                    style={{ width: "27%", padding: "7px 7px" }}
                  >
                    Pool
                  </th>
                  {/* <th>Time</th> */}
                </tr>
              </thead>
              <div
                style={{
                  height: "373px",
                  overflow: "auto",
                  display: "table-caption",
                }}
                className="OrderHistoryContainer"
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
                  {history &&
                    history.map((h) => {
                      return (
                        <>
                          <tr class="zoom" style={{ fontSize: "9.5px" }}>
                            <td
                              className="OrderhistorySize"
                              style={{ width: "20%" }}
                            >
                              {" "}
                              {h.cVolume?.toFixed(2)}
                              <img
                                src="./images/Analog.png"
                                style={{ width: "20px" }}
                                className="img"
                              />
                            </td>
                            <td
                              className="OrderhistorySize"
                              class="text-danger"
                              style={{ width: "22%" }}
                            >
                              {h.preferred_currency_amount?.toFixed(2)}{" "}
                              {h.compair_currency == "usd" ? (
                                <img
                                  src="./images/Usdt.png"
                                  style={{ width: "17px" }}
                                  alt="usdt"
                                  className="img"
                                />
                              ) : (
                                <img
                                  src="./images/Inrx_black.png"
                                  style={{ width: "17px" }}
                                  alt="inrx"
                                  className="img"
                                />
                              )}
                              <i class="ion ion-arrow-graph-up-right"></i>
                            </td>
                            <td
                              className="OrderhistorySize"
                              class="text-success"
                              style={{ width: "23%" }}
                            >
                              {h.compair_currency == "usd"
                                ? h.pref_raw_price.toFixed(8)
                                : h.pref_raw_price}
                              <i class="ion ion-arrow-graph-down-right"></i>
                            </td>
                            <td
                              className="OrderhistorySize"
                              style={{ width: "32%" }}
                            >
                              {h.presalelevel}
                            </td>
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
              margin: "4px 0px",
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
                  height: "460px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: " flex",
                  flexDirection: "column",
                }}
              >
                {/* Buy Btex Option  */}

                <div class="p-3 screenfix" style={{ width: "450px" }}>
                  <div class="input-group mb-3" style={{ margin: "0px" }}>
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
                      value={userInfo?.currency_preference == "usd"?total/(atprice / oneUsdPrice):
                           total/atprice
                    }
                      style={{
                        borderColor: "rgb(202, 202, 204)",
                        height: "54px",
                        color: "#008000",
                        fontWeight: "bold",
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
                        // setQuantityError(false);
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "13px",
                      marginBottom: "70px",
                    }}
                  >
                    <div style={{ marginTop: "-15px" }}>
                      <div style={{ fontWeight: "bold" }}>
                        Buying Amount{" "}
                        <span style={{ color: "#008000", fontWeight: "bold" }}>
                          {total && total?.toFixed(2)}
                        </span>{" "}
                        {userInfo?.currency_preference && userInfo?.currency_preference == "usd" ? (
                          <img
                            src="./images/Usdt.png"
                            style={{ width: "15px" }}
                            alt="usdt"
                          />
                        ) : (
                          <img
                            src="./images/Inrx_black.png"
                            style={{ width: "15px" }}
                            alt="inrx"
                          />
                        )}
                      </div>
                    </div>
                    <div
                      style={{
                        // fontSize: "10px",
                        marginTop: "-15px",
                        // marginLeft: "23pc",
                      }}
                    >
                      <div style={{ fontWeight: "bold" }}>
                        ANA PRICE{"  "}
                        <span style={{ color: "#008000", fontWeight: "bold" }}>
                          {userInfo?.currency_preference && userInfo?.currency_preference == "usd"
                            ? (atprice / oneUsdPrice)?.toFixed(8)
                            : atprice?.toFixed(8)}{" "}
                         
                            <img
                              src={(userInfo?.currency_preference && userInfo?.currency_preference == "usd") && ((userInfo?.currency_preference && userInfo?.currency_preference != null)) ? "./images/Usdt.png" : "./images/Inrx_black.png"}
                              style={{ width: "15px" }}
                              alt="usdt"
                            />
                          
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{ margin: "30px 0px" }}>
                    {/* <h4 style={{ fontSize: "15px" }}>
                      {userInfo?.currency_preference == "usd" ? "USDT" : "INRX"}
                    </h4> */}
                  </div>
                  {/* Progress Bar  */}

                  <div>
                    {
                    // totalAna &&
                    userInfo &&
                    oneUsdPrice &&
                    userInfo?.currency_preference ? (
                      <MultiRangeSlider
                        min={
                          userInfo?.currency_preference == "inr"
                            ? 5000
                            : 5000 / oneUsdPrice
                        }
                        // min={200}
                        symbol={
                          userInfo?.currency_preference == "usd"
                            ? "USDT"
                            : "INRX"
                        }
                        max={walletbalance}
                        // max={
                        //   userInfo?.currency_preference == "inr"
                        //     ? totalAna * userInfo?.anaPrice
                        //     : (totalAna * userInfo?.anaPrice) / oneUsdPrice
                        // }
                        fixedmax={walletbalance}
                        // fixedmax={
                        //   userInfo?.currency_preference == "inr"
                        //     ? totalAna * userInfo?.anaPrice
                        //     : (totalAna * userInfo?.anaPrice) / oneUsdPrice
                        // }
                        onChange={({ min, max, symbol }) => {
                          // console.log(`min = ${min}, max = ${max}`);
                          if (userInfo?.currency_preference == "inr") {
                            const maxvalue = max / atprice;
                            setAmmount(maxvalue);
                            setTotal(max);
                          } else {
                            const minvalue = max * atprice;
                            setAmmount(minvalue);
                            setTotal(max);
                          }
                        }}
                      />
                    ) : null}
                  </div>
                  <button
                    class="btn text-light btn-block my-2"
                    style={{ background: "rgb(108, 183, 125)", top: "60px" }}
                    onClick={TotalAmt}
                    disabled={
                      userInfo?.currency_preference == "usd"
                        ? totalAna * userInfo?.anaPrice == 0
                        : (totalAna * userInfo?.anaPrice) / oneUsdPrice == 0
                    }
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

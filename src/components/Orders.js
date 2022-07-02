import React, { useEffect, useState, useRef } from "react";
import "./order.css";
import axios from "axios";
import { BASE_URL } from "../Api_connection/config";
import { useSelector, useDispatch } from "react-redux";
import { data } from "jquery";
import swal from "sweetalert";
import "../App.css";
// import MultiRangeSlider from "./multiRangeSlider/MultiRangeSlider";
import { Triangle } from "react-loader-spinner";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { setBuyLoader } from "../redux/reducer/user";

export default function Orders() {
  const dispatch = useDispatch();
  const refValue = useRef();
  const [atprice, setAtprice] = useState(0);
  const [ammount, setAmmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState("");
  const [walletbalance, setWalletBalance] = useState("");
  const [loader, setLoader] = useState(true);
  const [balance, setBalance] = useState("");
  const [rangeValue, setRangeValue] = useState(0);

  useEffect(() => {
    const sliserVal = document.querySelector("#slider").value;
  });
  const { user, userInfo, oneUsdPrice, totalAna, theme } = useSelector(
    (state) => state.user.value
  );
  const email = user?.email;
  //  GetCoinData
  const getData = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/getCoinData`, {
        currency: userInfo?.currency_preference,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //  GetWalletData

  const getWalletData = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/getWalletData`, {
        email: email,
      });
      if (res) {
        let walletData = res.data;
        const d = walletData.find((data, i) => data.symbol == "USDT");
        setBalance(d.usdt_balance);
        setWalletBalance(
          userInfo?.currency_preference == "usd"
            ? Number(d.usdt_balance)
            : Number(d.usdt_balance * oneUsdPrice)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Ana price

  const AnaPrice = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/anaPrice`, {});
      setAtprice(res.data._data.price);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWalletData();
    getData();
    AnaPrice();

    // setAmmount(
    //   userInfo?.currency_preference == "inr"
    //     ? total / atprice
    //     : total / (atprice / oneUsdPrice)
    // );
  }, []);
  useEffect(() => {
    setTotal(
      userInfo?.currency_preference == "inr" ? 5000 : (5000 / oneUsdPrice).toFixed(2)
    );
  }, [userInfo?.currency_preference, oneUsdPrice]);

  // Order

  function TotalAmt() {
    let params = {
      amount:
        userInfo?.currency_preference == "usd"
          ? total / (atprice / oneUsdPrice)
          : total / atprice,
      raw_price: "",
      currencyType: userInfo?.currency_preference == "usd" ? "USDT" : "INRX",
      compairCurrency: userInfo?.currency_preference,
      TotalTrx: "",
      email: email,
    };
    axios
      .post(`${BASE_URL}/order`, params)
      .then((res) => {
        if (res.data.status == true) {
          swal(`${res.data.message}`, "", "success");
          getWalletData();
          dispatch(setBuyLoader({ buyloader: false }));
        }
      })
      .catch((error) => {
        console.log(error);
        swal(`${error?.response?.data?.message}`, "", "error");
        dispatch(setBuyLoader({ buyloader: false }));
      });
  }

  // GetAllOrder

  useEffect(() => {
    if (email) {
      axios
        .get(
          `${BASE_URL}/getAllOrder?email=${email}&type=Buy&compair_currency=${userInfo?.currency_preference}`
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
  }, [totalAna, oneUsdPrice, userInfo, data.balance]);

  // sweetAlert

  function ConfirmBox() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger outline",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: `Buying Amount : ${Number(total)?.toFixed(2)} , Quantity : ${
          userInfo?.currency_preference == "usd"
            ? Number(total / (atprice / oneUsdPrice)?.toFixed(2))
            : Number(total / atprice)?.toFixed(2)
        }`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, confirm it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(setBuyLoader({ buyloader: true }));
          TotalAmt();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire("Cancelled", "", "error");
        }
      });
  }

  return (
    <div className="order">
      <div class="card mt-2">
        <div class="card-header justify-content-between align-items-center">
          <h6 class="card-title font-weight-bold "> ORDER</h6>
        </div>
        <div class="card-body table-responsive  p-0">
          <table class="table  mb-0">
            <div style={{ display: "contents" }}>
              <thead>
                <tr style={{ fontSize: "10px" }}>
                  <th
                    className="OrderHistoryHedding"
                    style={{ width: "25%", padding: "7px 7px" }}
                  >
                    Total Analog
                  </th>
                  <th
                    className="OrderHistoryHedding"
                    style={{ width: "25%", padding: "7px 7px" }}
                  >
                    Total Amount Pay
                  </th>
                  <th
                    className="OrderHistoryHedding"
                    style={{ width: "25%", padding: "7px 7px" }}
                  >
                    Buying Price
                  </th>
                  <th
                    className="OrderHistoryHedding"
                    style={{ width: "25%", padding: "7px 7px" }}
                  >
                    Pool
                  </th>
                </tr>
              </thead>
              <div
                style={{
                  height: "373px",
                  overflowX: "hidden",
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
                          <tr
                            class="zoom UserOrderHistory"
                            style={{ fontSize: "10px", cursor: "pointer" }}
                          >
                            <td
                              className="OrderhistorySize"
                              style={{ width: "25%" }}
                            >
                              {" "}
                              {h.cVolume?.toFixed(2)}
                              <img
                                alt="analog"
                                src="./images/Analog.png"
                                style={{ width: "17px" }}
                                className="img"
                              />
                            </td>
                            <td
                              className="OrderhistorySize text-danger"
                              
                              style={{ width: "25%" }}
                            >
                              {h.preferred_currency_amount?.toFixed(2)}{" "}
                              {h.compair_currency == "usd" ? (
                                <img
                                  src="./images/usdt_icon.png"
                                  style={{ width: "12px" }}
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
                            <td
                              className="OrderhistorySize"
                              class="text-success"
                              style={{ width: "24%" }}
                            >
                              {h.compair_currency == "usd"
                                ? h.pref_raw_price.toFixed(8)
                                : h.pref_raw_price.toFixed(8)}{" "}
                              {h.compair_currency == "usd" ? (
                                <img
                                  src="./images/usdt_icon.png"
                                  style={{ width: "12px" }}
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
                            <td
                              className="OrderhistorySize"
                              style={{ width: "26%", padding: "8px 6.5px" }}
                            >
                              {h.presalelevel}
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

      {/* Buy */}
      <div>
        <nav
          class="coinsfather-theme-color"
          style={{
            border: "0.3px solid rgba(255, 255, 255, 0.2)",
            marginTop: "6px",
          }}
        >
          <div
            className="card-header"
            style={{
              textAlign: "center",
              fontWeight: "bold",
              // background: "rgb(241, 241, 241)",
              margin: "4px 0px",
            }}
          >
            BUY
          </div>
        </nav>
        <div
          className=" tab-content orders"
          style={{ borderColor: "rgba(25, 32, 87, 0.2)" }}
        >
          <div
          // className="d-flex justify-content-center align-items-center"
          // style={{ background: "white" }}
          >
            <div
              className="card sing-up-button"
              style={{
                textAlign: "center",
                height: "460px",
                justifyContent: "center",
                alignItems: "center",
                display: " flex",
                flexDirection: "column",
              }}
            >
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
                    disabled
                    type="number"
                    class="form-control buy-sell-form-bg buy-sell-theme"
                    value={
                      oneUsdPrice && ammount
                        ? ammount?.toFixed(2)
                        : userInfo?.currency_preference == "inr"
                        ? (5000 / atprice)?.toFixed(2)
                        : (5000 / oneUsdPrice / (atprice / oneUsdPrice))?.toFixed(2)
                    }
                    style={{
                      borderColor: "rgb(202, 202, 204)",
                      height: "54px",
                      color: "#008000",
                      fontWeight: "bold",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    fontSize: "13px",
                    marginBottom: "35px",
                  }}
                >
                  <div
                    style={{
                      marginTop: "-15px",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>
                      ANA PRICE{"  "}
                      <span style={{ color: "#008000", fontWeight: "bold" }}>
                        {oneUsdPrice == ""
                          ? 0
                          : userInfo?.currency_preference == "usd"
                          ? Number(atprice / oneUsdPrice)?.toFixed(8)
                          : Number(atprice)?.toFixed(8)}
                        {}{" "}
                        {userInfo?.currency_preference &&
                        userInfo?.currency_preference == "usd" ? (
                          <img
                            src="./images/Usdt.png"
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
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    display: "flex",
                  }}
                >
                  Minimum Buying Amount {" "}
                  <span style={{ color: "green",marginLeft:"5px"}}>
                    {oneUsdPrice == ""
                      ? 0
                      :userInfo?.currency_preference == "inr"
                      ? 5000
                      : (5000 / oneUsdPrice)?.toFixed(2)}{" "}
                  </span> 
                  <div style={{marginLeft:"5px"}}>
                    {userInfo?.currency_preference &&
                    userInfo?.currency_preference == "usd" ? (
                      <img
                        src="./images/Usdt.png"
                        style={{ width: "15px"}}
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
                  </div>
                </div>
                <div class="input-group mb-3" style={{ margin: "0px" }}>
                  <div class="input-group-prepend">
                    <span
                      class="input-group-text buy-sell-form-bg buy-sell-theme"
                      style={{
                        fontSize: " 10px",
                        borderColor: " rgb(202, 202, 204)",
                      }}
                    >
                      BUYING
                      <br />
                      AMOUNT
                    </span>
                  </div>
                  <input
                    type="number"
                    id="total"
                    class="form-control buy-sell-form-bg buy-sell-theme"
                    value={total}
                    // defaultValue={total?total: userInfo?.currency_preference == "inr"?5000:5000/oneUsdPrice}
                    style={{
                      borderColor: "rgb(202, 202, 204)",
                      height: "54px",
                      color: "#008000",
                      fontWeight: "bold",
                    }}
                    onChange={(e) => {
                      if (e.target.value) {
                        let val;

                        if (e.target.value.startsWith(0))
                          val = e.target.value.substring(1, e.target.length);
                        else val = e.target.value;
                        setRangeValue(val);
                        setTotal(val);
                        setAmmount(
                          userInfo?.currency_preference == "inr"
                            ? val / atprice
                            : val / (atprice / oneUsdPrice)
                        );
                        console.log(ammount, "Ammount ");
                        console.log(val, "val aval");
                      } else {
                        setRangeValue(0);
                        setTotal(0);
                        setAmmount(0);
                      }
                    }}
                  />
                </div>
                <div style={{ margin: "30px 0px" }}></div>
                {/* 
                 <div>
                  {walletbalance && userInfo?.currency_preference ? (
                    <MultiRangeSlider
                   
                      min={
                        oneUsdPrice == ""
                          ? 0
                          : userInfo?.currency_preference == "inr"
                          ? 5000
                          : 5000 / oneUsdPrice
                      }
                      symbol={
                        userInfo?.currency_preference == "usd" ? "USDT" : "INRX"
                      }
                      fixedmax={
                        oneUsdPrice == ""
                          ? 0
                          : userInfo?.currency_preference == "usd"
                          ? Number(balance)
                          : Number(balance * oneUsdPrice)
                      }
                  
                      max={
                        oneUsdPrice == ""
                          ? 0
                          : userInfo?.currency_preference == "usd"
                          ? Number(balance)
                          : Number(balance * oneUsdPrice)
                      }
                      
                      onChange={({ min, max, symbol }) => {
                        console.log(`min = ${min}, max = ${max}`);
                        if (userInfo?.currency_preference == "inr") {
                          setAmmount(atprice && max / atprice);
                          setTotal(max);
                        } else if (userInfo?.currency_preference == "usd") {
                          setAmmount(
                            atprice &&
                              oneUsdPrice &&
                              max / (atprice / oneUsdPrice)
                          );
                          setTotal(max);
                        }
                      }}
                    />
                  ) : null}
                </div>  */}

                <input
                  type="range"
                  id="slider"
                  value={rangeValue}
                  min={
                    oneUsdPrice == ""
                      ? 0
                      : userInfo?.currency_preference == "inr"
                      ? 5000
                      : 5000 / oneUsdPrice
                  }
                  max={
                    oneUsdPrice == ""
                      ? 0
                      : userInfo?.currency_preference == "usd"
                      ? Number(balance)
                      : Number(balance * oneUsdPrice)
                  }
                  // value={"6000"}
                  onChange={(e) => {
                    setRangeValue(e.target.value);
                    console.log(rangeValue, "range value");
                    if (userInfo?.currency_preference == "inr") {
                      setAmmount(
                        document.querySelector("#slider").value / atprice
                      );
                      setTotal(Number(document.querySelector("#slider").value).toFixed(2));
                    } else if (userInfo?.currency_preference == "usd") {
                      setAmmount(
                        atprice &&
                          oneUsdPrice &&
                          document.querySelector("#slider").value /
                            (atprice / oneUsdPrice)
                      );
                      console.log(
                        document.querySelector("#slider").value,
                        "value"
                      );
                      setTotal(Number(document.querySelector("#slider").value).toFixed(2));
                    }
                  }}
                />
                <div
                  className="details"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>
                    {oneUsdPrice == ""
                      ? 0
                      : userInfo?.currency_preference == "inr"
                      ? 5000
                      : (5000 / oneUsdPrice)?.toFixed(2)}{" "}
                    <span>
                      {userInfo?.currency_preference &&
                      userInfo?.currency_preference == "usd" ? (
                        <img
                          src="./images/Usdt.png"
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
                    </span>
                  </span>

                  <span>
                    {oneUsdPrice == ""
                      ? 0
                      : userInfo?.currency_preference == "usd"
                      ? Number(balance)?.toFixed(2)
                      : Number(balance * oneUsdPrice)?.toFixed(2)}{" "}
                    <span>
                      {userInfo?.currency_preference &&
                      userInfo?.currency_preference == "usd" ? (
                        <img
                          src="./images/Usdt.png"
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
                    </span>
                  </span>
                </div>

                <button
                  class="btn btn-block my-2"
                  style={{
                    background: "rgb(108, 183, 125)",
                    top: "40px",
                    color: "white",
                  }}
                  onClick={ConfirmBox}
                  disabled={
                    walletbalance &&
                    walletbalance <=
                      (userInfo?.currency_preference == "inr"
                        ? 5000
                        : 5000 / oneUsdPrice)
                  }
                >
                  BUY ANA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

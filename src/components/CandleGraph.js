import React, { useEffect } from "react";
import { createChart, CrosshairMode, isBusinessDay } from "lightweight-charts";
//import { useSelector, useDispatch } from "react-redux";
import "./chart.css";
// import {  toggleFav } from "../redux/actions/coinDBAction";
// import { getChartData } from "../redux/helpers/api_functions";
export default function CandleGraph(props) {
  //const dispatch = useDispatch();
  // const url = "https://kingvrx.com/api";
  const url = "https://bullsiex.io/api";
  const [fullexe, setFUllexw] = React.useState(false);
  /* const { coins, currency_graph, user_fav_pairing } = useSelector(
    (state) => state.coinDBReducer
  ); */
  const [isFav, setIsFav] = React.useState(false);
  //const { token } = useSelector((state) => state.AuthReducer.user);
  //const { isLoggedIn,switch_theme } = useSelector((state) => state.AuthReducer);
  const [filter, setfilter] = React.useState("1m");
  //const coin = props.match.params.id.split("-");
  //const { webData } = useSelector((state) => state.websiteDBReducer);
  /* const data = Object.values(coins).find((d) => {
    if (
      d.symbol === coin[0].toUpperCase() &&
      d.pairing_currency === coin[1].toUpperCase()
    ) {
      return d;
    }
  }); */
  // console.log("data", data);
  let interval = 1;
  /* useEffect(() => {
    let match = user_fav_pairing.find(
      (d) =>
        d == data.symbol.toUpperCase() + data.pairing_currency.toUpperCase()
    );
    setIsFav(match ? true : false);
  }, [...user_fav_pairing, ...coin]);*/
  //let interval = 1;
  /* switch (filter) {
    case "1m":
      interval = 1;
      break;
    case "5m":
      interval = 5;
      break;
    case "15m":
      interval = 15;
      break;
    case "30m":
      interval = 30;
      break;
    case "1h":
      interval = 60;
      break;
    case "2h":
      interval = 120;
      break;
    case "4h":
      interval = 240;
      break;
    case "6h":
      interval = 360;
      break;
    case "12h":
      interval = 720;
      break;
    case "1d":
      interval = 1440;
      break;
    case "1w":
      interval = 1440;
      break;
  } */

  let isFirstTime = 1;
  let candleSeries;
  let chart;
  useEffect(() => {
    let cont = document.getElementById("candleCart");
    chart = createChart(cont, {
      height: 350,
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      layout: {

        // Grapf Thema Changes

        textColor: "#d1d4dc",
        // textColor:"black"
        backgroundColor: "light-theme-color",
      },
      grid: {
        vertLines: {
          color: "#cccccc11",
        },
        horzLines: {
          color: "#cccccc11",
        },
      },
      timeScale: {
        rightOffset: 12,
        barSpacing: 3,
        lockVisibleTimeRangeOnResize: true,
        rightBarStaysOnScroll: true,
        borderVisible: false,
        visible: true,
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: (time, tickMarkType, locale) => {
          const year = isBusinessDay(time)
            ? time.year
            : new Date(time * 1000).getUTCHours() +
              ":" +
              new Date(time * 1000).getUTCMinutes() +
              ":" +
              new Date(time * 1000).getUTCSeconds();
          return String(year);
        },
      },
    });
    chart.timeScale().scrollPosition();
    chart.subscribeClick((e) => {
      console.log("e", e);
    });
    window.candleSeries = chart.addCandlestickSeries();
    if (candleSeries) setFUllexw(true);
    else {
      window.candleSeries = chart.addCandlestickSeries();
      setFUllexw(true);
    }
  }, []);

  // useEffect(() => {
  //   // console.log(fullexe, window.candleSeries);
  //   if (time == 0) {
  //     window.candleSeries.setData(currency_graph);
  //     time = 1;
  //   } else {
  //     if (filter == "1m")
  //       window.candleSeries.update(currency_graph[currency_graph.length - 1]);
  //     else if (filter == "1h") {
  //       window.candleSeries.update(currency_graph[currency_graph.length - 1]);
  //     }
  //   }
  // }, [currency_graph, fullexe, ...coin]);

  useEffect(() => {
    fetch(url + "/graph", {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        pairing: "btcinr", //props.match.params.id.replace("-", ""),
        period: interval,
        currency_type: "btc", //data.symbol,
        compare_currency: "inr", //data.pairing_currency,
        limit: 1000,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.candleSeries.setData([...data]);
      })
      .catch((err) => {
        /* getChartData(coin[0], coin[1], 1)
          .then((d) => {
            window.candleSeries.setData(d);
          })
          .catch((e) => e); */
      });
  }, []);

  //Dynamic Chart
  // const socket = io.connect('https://127.0.0.1:4000/');

  // socket.on('KLINE',(pl)=>{
  //   //log(pl);
  //   candleSeries.update(pl);
  // });
  /* let current_price;
  switch (data?.pairing_currency) {
    case "INR":
      current_price = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 8,
        maximumSignificantDigits: 8,
      }).format(data?.current_price);
      break;
    case "USDT":
      current_price = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 8,
        maximumSignificantDigits: 8,
      }).format(data?.current_price);
      break;
    case "BTC":
      current_price = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "BTC",
        maximumFractionDigits: 8,
        maximumSignificantDigits: 8,
      }).format(data?.current_price);
      break;
    case "VRX":
      current_price = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "VRX",
        maximumFractionDigits: 8,
        maximumSignificantDigits: 8,
      }).format(data?.current_price);
  } */
  return (
    <> 
    <div  style={{background: "#f1f1f1" ,marginTop:"-10px"}}>
      <div class="sc-bdVaJa lmEScu p-0" 
      >
        <div class="sc-bdVaJa dveUWY p-0"
         >
          <h1 color="#1C1B21" class="sc-bwzfXH iHECUo p-0" 
          >
            BTC/INR
            </h1>
          <span color="#9b9b9b" class="sc-bwzfXH ksDqJJ p-0 px-2">
            Bitcoin
          </span>
         
        </div>
        <div class="sc-bdVaJa sc-dliRfk iUXzPH p-0">
          <span color="#929292" class="sc-bwzfXH kgoTtc p-0">
            Last Price
          </span>
          <span cursor="pointer" color="#1C1B21" class="sc-bwzfXH jaArUU">
            ₹29,53,832.1
          </span>
          <span>
            <i class="fas fa-star-o text-warning"></i>
          </span>
          <div class="sc-bdVaJa sc-jVODtj jZzDMB p-0">
            <i class="mdi mdi-star-outline mdi-18px"></i>
          </div>
        </div>
      </div>

      <div className="sc-bdVaJa sc-kUaPvJ kZeBBS row coinsfather-theme-color "
      // style={{fontSize:"12px", height:"30px" , alignContent:"center"}}
      >
        <div
          className="sc-bdVaJa sc-giadOv iIMfMq col-12 col-md-7 col-lg-7"
          // style={{ display: "flex", left: "200px" }}
        >
          <div className="sc-bdVaJa bmTiOt">
            <span color="#929292" class="sc-bwzfXH yjNnZ font-weight-bold">
              Volume
            </span>
            <span color="#1C1B21" class="sc-bwzfXH izvMda">
              2247459400190.22
            </span>
          </div>
          <div className="sc-bdVaJa bmTiOt">
            <span color="#929292" class="sc-bwzfXH yjNnZ font-weight-bold">
              High
            </span>
            <span color="#1C1B21" class="text-success sc-bwzfXH izvMda">
              0<i className="fa fa-caret-up align-top"></i>
            </span>
          </div>
          <div className="sc-bdVaJa bmTiOt">
            <span color="#929292" class="sc-bwzfXH yjNnZ font-weight-bold">
              Low
            </span>
            <span color="#1C1B21" class="text-danger sc-bwzfXH izvMda">
              0<i className="fa fa-caret-down align-top"></i>
            </span>
          </div>
          <div className="sc-bdVaJa bmTiOt">
            <span color="#929292" class="sc-bwzfXH yjNnZ font-weight-bold">
              AVG
            </span>
            <span color="#1C1B21" class=" sc-bwzfXH izvMda">
              {" "}
              %
            </span>
          </div>
        </div>
        <div
          className="sc-fONwsr coBrE  col-12 col-md-5 col-lg-5"
          // style={{ display: "flow-root" }}
        >
          <span color="rgb(177, 177, 178)" class="sc-bwzfXH sc-VJcYb doxpwL">
            1M
          </span>
          <span color="rgb(177, 177, 178)" class="sc-bwzfXH sc-VJcYb BNliK">
            5M
          </span>
          <span color="rgb(177, 177, 178)" class="sc-bwzfXH sc-VJcYb BNliK">
            15M
          </span>
          <span color="rgb(177, 177, 178)" class="sc-bwzfXH sc-VJcYb BNliK">
            30M
          </span>
          <span color="rgb(64, 63, 67)" class="sc-bwzfXH sc-VJcYb BNliK">
            1H
          </span>
          <span color="rgb(177, 177, 178)" class="sc-bwzfXH sc-VJcYb BNliK">
            2H
          </span>
          <span color="rgb(177, 177, 178)" class="sc-bwzfXH sc-VJcYb BNliK">
            4H
          </span>
          <span color="rgb(177, 177, 178)" class="sc-bwzfXH sc-VJcYb BNliK">
            6H
          </span>
          <span color="rgb(17, 177, 178)" class="sc-bwzfXH sc-VJcYb BNliK">
            12H
          </span>
          <span color="rgb(177, 177, 178)" class="sc-bwzfXH sc-VJcYb BNliK">
            1D
          </span>
          <span color="rgb(177, 177, 178)" class="sc-bwzfXH sc-VJcYb BNliK">
            1W
          </span>
        </div>
      </div>
      {/* <div className="sc-dTdPqK coinsfather-theme-color p-0" style={{ backgroundColor: webData.bg_color_code}}>
        <div className="sc-bdVaJa rSmgz py-0 px-0 graph-head">
          <div height="24px" width="12px" className="sc-bdVaJa gSxurx"></div>
          <div className="sc-bdVaJa lmEScu p-0">
            <div className="sc-bdVaJa dveUWY p-0">
              <h1 color="#1C1B21" className="sc-bwzfXH iHECUo p-0">
                {props.match.params.id.toUpperCase().replace("-", "/")}
              </h1>
              <span color="#9b9b9b" className="sc-bwzfXH ksDqJJ p-0 px-2">
                {data?.name} 
              </span>
            </div>
            <div className="sc-bdVaJa sc-dliRfk iUXzPH p-0">
              <span color="#929292" className="sc-bwzfXH kgoTtc p-0">
                Last Price
              </span>
              <span
                cursor="pointer"
                color="#1C1B21"
                className="sc-bwzfXH jaArUU"
              >
                {current_price}
              </span>
              <span
                onClick={() => {
                  dispatch(
                    toggleFav(
                      token,
                      (data?.symbol + data?.pairing_currency).toUpperCase()
                    )
                  );
                  if (isLoggedIn) setIsFav(!isFav);
                }}
              >
                <i
                  className={`fas ${
                    isFav ? "fa-star" : "fa-star-o"
                  } text-warning`}
                ></i>
              </span>
              <div className="sc-bdVaJa sc-jVODtj jZzDMB p-0">
                <i className="mdi mdi-star-outline mdi-18px"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sc-bdVaJa sc-kUaPvJ kZeBBS row coinsfather-theme-color " style={{ backgroundColor: webData.bg_color_code }}>
        <div className="sc-bdVaJa sc-giadOv iIMfMq col-12 col-md-7 col-lg-7">
          <div className="sc-bdVaJa bmTiOt">
            <span color="#929292" className="sc-bwzfXH yjNnZ font-weight-bold">
              Volume
            </span>
            <span color="#1C1B21" className="sc-bwzfXH izvMda">
              {data?.volume_24h}
            </span>
          </div>
          <div className="sc-bdVaJa bmTiOt">
            <span color="#929292" className="sc-bwzfXH yjNnZ font-weight-bold">
              High
            </span>
            <span color="#1C1B21" className="text-success sc-bwzfXH izvMda">
              {data?.high}
              <i class="fa fa-caret-up align-top"></i>
            </span>
            
          </div>
          <div className="sc-bdVaJa bmTiOt">
            <span color="#929292" className="sc-bwzfXH yjNnZ font-weight-bold">
              Low
            </span>
            <span color="#1C1B21" className="text-danger sc-bwzfXH izvMda">
              {data?.low}
              <i class="fa fa-caret-down align-top"></i>
            </span>
          </div>
          <div className="sc-bdVaJa bmTiOt">
            <span color="#929292" className="sc-bwzfXH yjNnZ font-weight-bold">
              AVG 
            </span>
            <span color="#1C1B21" className=" sc-bwzfXH izvMda">
              {data?.avg_perc} %
            </span>
          </div>
        </div>
        <div className="sc-fONwsr coBrE row col-12 col-md-5 col-lg-5">
          <span
            color="rgb(177, 177, 178)"
            className={
              filter === "1m"
                ? "sc-bwzfXH sc-VJcYb doxpwL"
                : "sc-bwzfXH sc-VJcYb BNliK"
            }
            onClick={() => setfilter("1m")}
          >
            1M
          </span>
          <span
            color="rgb(177, 177, 178)"
            className={
              filter === "5m"
                ? "sc-bwzfXH sc-VJcYb doxpwL"
                : "sc-bwzfXH sc-VJcYb BNliK"
            }
            onClick={() => setfilter("5m")}
          >
            5M
          </span>
          <span
            color="rgb(177, 177, 178)"
            className={
              filter === "15m"
                ? "sc-bwzfXH sc-VJcYb doxpwL"
                : "sc-bwzfXH sc-VJcYb BNliK"
            }
            onClick={() => setfilter("15m")}
          >
            15M
          </span>
          <span
            color="rgb(177, 177, 178)"
            className={
              filter === "30m"
                ? "sc-bwzfXH sc-VJcYb doxpwL"
                : "sc-bwzfXH sc-VJcYb BNliK"
            }
            onClick={() => setfilter("30m")}
          >
            30M
          </span>
          <span
            color="rgb(64, 63, 67)"
            className={
              filter === "1h"
                ? "sc-bwzfXH sc-VJcYb doxpwL"
                : "sc-bwzfXH sc-VJcYb BNliK"
            }
            onClick={() => setfilter("1h")}
          >
            1H
          </span>
          <span
            color="rgb(177, 177, 178)"
            className={
              filter === "2h"
                ? "sc-bwzfXH sc-VJcYb doxpwL"
                : "sc-bwzfXH sc-VJcYb BNliK"
            }
            onClick={() => setfilter("2h")}
          >
            2H
          </span>
          <span
            color="rgb(177, 177, 178)"
            className={
              filter === "4h"
                ? "sc-bwzfXH sc-VJcYb doxpwL"
                : "sc-bwzfXH sc-VJcYb BNliK"
            }
            onClick={() => setfilter("4h")}
          >
            4H
          </span>
          <span
            color="rgb(177, 177, 178)"
            className={
              filter === "6h"
                ? "sc-bwzfXH sc-VJcYb doxpwL"
                : "sc-bwzfXH sc-VJcYb BNliK"
            }
            onClick={() => setfilter("6h")}
          >
            6H
          </span>
          <span
            color="rgb(17, 177, 178)"
            className={
              filter === "12h"
                ? "sc-bwzfXH sc-VJcYb doxpwL"
                : "sc-bwzfXH sc-VJcYb BNliK"
            }
            onClick={() => setfilter("12h")}
          >
            12H
          </span>
          <span
            color="rgb(177, 177, 178)"
            className={
              filter === "1d"
                ? "sc-bwzfXH sc-VJcYb doxpwL"
                : "sc-bwzfXH sc-VJcYb BNliK"
            }
            onClick={() => setfilter("1d")}
          >
            1D
          </span>
          <span
            color="rgb(177, 177, 178)"
            className={
              filter === "1w"
                ? "sc-bwzfXH sc-VJcYb doxpwL"
                : "sc-bwzfXH sc-VJcYb BNliK"
            }
            onClick={() => setfilter("1w")}
          >
            1W
          </span>
        </div>
      </div> */}
      <div id="candleCart"></div>
      </div>
    </>
  );
}

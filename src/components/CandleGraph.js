import React, { useEffect, useState } from "react";
import { createChart, CrosshairMode, isBusinessDay } from "lightweight-charts";
import { useSelector, useDispatch } from "react-redux";
import "./chart.css";

import { setCurrency_type } from "../redux/buySell";


export default function CandleGraph(props) {

  const {currency_type} = useSelector((state)=> state.buySell.value)
  console.log(currency_type,"CTYPE");
  const dispatch = useDispatch();
  // dispatch(setCurrency_type({currency_type: "amit"}));
  const symbolState = useSelector((store)=>store);
  console.log(symbolState,"symbolState");

  console.log(currency_type, "vipin");
  

  const url = "https://bullsiex.io/api";
  const [fullexe, setFUllexw] = React.useState(false);
  const [isFav, setIsFav] = React.useState(false);
 const [filter, setfilter] = React.useState("1m");
// const [hedcurrency, setHedCurrency] = useState("")

  let interval = 1;
 let isFirstTime = 1;
  let candleSeries;
  let chart;
  useEffect(() => {
    // setHedCurrency(currency_type)
    let cont = document.getElementById("candleCart");
    chart = createChart(cont, {
      height: 350,
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      layout: {
        textColor: "black",     
        //backgroundColor: "light-theme-color",
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
  useEffect(() => {
    fetch(url + "/graph", {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        pairing: "trxinr", //props.match.params.id.replace("-", ""),
        period: interval,
        currency_type: currency_type, //data.symbol,
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

  return (
    <> 
    <div  style={{background: "#f1f1f1" ,marginTop:"-10px"}}>
      <div class="sc-bdVaJa lmEScu p-0" 
      >
        <div class="sc-bdVaJa dveUWY p-0"
         >
          <h1 color="#1C1B21" class="sc-bwzfXH iHECUo p-0" 
          >
            {currency_type}
            /INR
            </h1>
          <span color="#9b9b9b" class="sc-bwzfXH ksDqJJ p-0 px-2">
          {/* Bitcoin   */}
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
      >
        <div
          className="sc-bdVaJa sc-giadOv iIMfMq col-12 col-md-7 col-lg-7"
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
      <div id="candleCart"></div>
      </div>
    </>
  );
}

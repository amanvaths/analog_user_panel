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


      {/* Add Line  */}


<div
  class="layout__area--top"
  style={{position: "absolute", top: "0px", left: "56px" ,width: "1416px", height: "38px"}}>
  <div class="toolbar-LZaMRgb9">
    <div class="overflowWrap-LZaMRgb9">
      <div class="inner-pzOKvpP8">
        <div class="wrapOverflow-3obNZqvj">
          <div class="wrap-3obNZqvj">
            <div class="scrollWrap-3obNZqvj noScrollBar-3obNZqvj">
              <div class="content-pzOKvpP8">
                <div class="wrap-1ETeWwz2">
                  <div class="group-3uonVBsm">
                    <div
                      id="header-toolbar-symbol-search"
                      data-role="button"
                      class="uppercase-1n0tF4SR button-2Vpz_LXc button-1n0tF4SR apply-common-tooltip isInteractive-2Vpz_LXc"
                    >
                      <div class="js-button-text text-2Vpz_LXc text-1n0tF4SR">
                        BITFLASH
                      </div>
                    </div>
                  </div>
                  <div class="group-3uonVBsm">
                    <div class="wrap-3jbioG5e" id="header-toolbar-intervals">
                      <div
                        data-value="60"
                        data-role="button"
                        class="button-2R6OKuTS first-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isActive-2Vpz_LXc isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">1h</div>
                        </div>
                      </div>
                      <div
                        data-value="120"
                        data-role="button"
                        class="button-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">2h</div>
                        </div>
                      </div>
                      <div
                        data-value="240"
                        data-role="button"
                        class="button-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">4h</div>
                        </div>
                      </div>
                      <div
                        data-value="360"
                        data-role="button"
                        class="button-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">6h</div>
                        </div>
                      </div>
                      <div
                        data-value="720"
                        data-role="button"
                        class="button-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">12h</div>
                        </div>
                      </div>
                      <div
                        data-value="1D"
                        data-role="button"
                        class="button-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">D</div>
                        </div>
                      </div>
                      <div
                        data-value="2D"
                        data-role="button"
                        class="button-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">2D</div>
                        </div>
                      </div>
                      <div
                        data-value="3D"
                        data-role="button"
                        class="button-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">3D</div>
                        </div>
                      </div>
                      <div
                        data-value="1W"
                        data-role="button"
                        class="button-2R6OKuTS last-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                        title="1 week"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">W</div>
                        </div>
                      </div>
                      <div
                        class="menu-2R6OKuTS button-1SoiPS-f apply-common-tooltip"
                        data-tooltip-hotkey="{&amp;quot;keys&amp;quot;:[&amp;quot;,&amp;quot;],&amp;quot;text&amp;quot;:&amp;quot;Number or {0}&amp;quot;}"
                        data-role="button"
                      >
                        <div class="arrow-1SoiPS-f">
                          <div class="arrowWrap-1SoiPS-f">
                            <span class="icon-19OjtB6A"
                              ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 8"
                                width="16"
                                height="8"
                              >
                                <path
                                  fill="currentColor"
                                  d="M0 1.475l7.396 6.04.596.485.593-.49L16 1.39 14.807 0 7.393 6.122 8.58 6.12 1.186.08z"
                                ></path></svg
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="group-3uonVBsm">
                    <div class="wrap-3jbioG5e" id="header-toolbar-chart-styles">
                      <div
                        data-role="button"
                        class="button-3HNCAKoZ button-2eVMAgh- first-2eVMAgh- button-2Vpz_LXc isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                      ></div>
                      <div
                        data-value="candle"
                        data-role="button"
                        class="button-3HNCAKoZ button-2eVMAgh- last-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isActive-2Vpz_LXc isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                        title="Candles"
                      >
                        <span class="icon-2Vpz_LXc"
                          ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 28 28"
                            width="28"
                            height="28"
                            fill="currentColor"
                          >
                            <path
                              d="M17 11v6h3v-6h-3zm-.5-1h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5z"
                            ></path>
                            <path d="M18 7h1v3.5h-1zm0 10.5h1V21h-1z"></path>
                            <path
                              d="M9 8v12h3V8H9zm-.5-1h4a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5z"
                            ></path>
                            <path
                              d="M10 4h1v3.5h-1zm0 16.5h1V24h-1z"
                            ></path></svg
                        ></span>
                      </div>
                      <div
                        class="menu-3HNCAKoZ button-1SoiPS-f apply-common-tooltip"
                        data-role="button"
                      >
                        <div class="arrow-1SoiPS-f">
                          <div class="arrowWrap-1SoiPS-f">
                            <span class="icon-19OjtB6A"
                              ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 8"
                                width="16"
                                height="8"
                              >
                                <path
                                  fill="currentColor"
                                  d="M0 1.475l7.396 6.04.596.485.593-.49L16 1.39 14.807 0 7.393 6.122 8.58 6.12 1.186.08z"
                                ></path></svg
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="group-3uonVBsm">
                    <div class="wrap-3jbioG5e" id="header-toolbar-indicators">
                      <div
                        data-role="button"
                        data-tooltip-hotkey="{&amp;quot;keys&amp;quot;:[&amp;quot;/&amp;quot;],&amp;quot;text&amp;quot;:&amp;quot;{0}&amp;quot;}"
                        class="button-pzOKvpP8 button-mPM2q3lb withText-mPM2q3lb button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc"
                        data-name="open-indicators-dialog"
                      >
                        <span class="icon-2Vpz_LXc"
                          ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 28 28"
                            width="28"
                            height="28"
                            fill="none"
                          >
                            <path
                              stroke="currentColor"
                              d="M20 17l-5 5M15 17l5 5M9 11.5h7M17.5 8a2.5 2.5 0 0 0-5 0v11a2.5 2.5 0 0 1-5 0"
                            ></path></svg
                        ></span>
                        <div class="js-button-text text-2Vpz_LXc">
                          Indicators
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="fill-pzOKvpP8 group-3uonVBsm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="inner-pzOKvpP8 fake-pzOKvpP8">
        <div class="wrapOverflow-3obNZqvj">
          <div class="wrap-3obNZqvj">
            <div class="scrollWrap-3obNZqvj noScrollBar-3obNZqvj">
              <div class="content-pzOKvpP8">
                <div class="wrap-1ETeWwz2">
                  <div class="group-3uonVBsm">
                    <div
                      data-role="button"
                      class="uppercase-1n0tF4SR button-2Vpz_LXc button-1n0tF4SR apply-common-tooltip isInteractive-2Vpz_LXc"
                      title="Symbol Search"
                    >
                      <div class="js-button-text text-2Vpz_LXc text-1n0tF4SR">
                        BITFLASH
                      </div>
                    </div>
                  </div>
                  <div class="group-3uonVBsm">
                    <div class="wrap-3jbioG5e">
                      <div
                        data-value="60"
                        data-role="button"
                        class="button-2R6OKuTS first-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isActive-2Vpz_LXc isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                        title="1 hour"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">1h</div>
                        </div>
                      </div>
                      <div
                        data-value="120"
                        data-role="button"
                        class="button-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                        title="2 hours"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">2h</div>
                        </div>
                      </div>
                      <div
                        data-value="240"
                        data-role="button"
                        class="button-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                        title="4 hours"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">4h</div>
                        </div>
                      </div>
                      <div
                        data-value="360"
                        data-role="button"
                        class="button-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                        title="6 hours"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">6h</div>
                        </div>
                      </div>
                      <div
                        data-value="720"
                        data-role="button"
                        class="button-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                        title="12 hours"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">12h</div>
                        </div>
                      </div>
                      <div
                        data-value="1D"
                        data-role="button"
                        class="button-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                        title="1 day"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">D</div>
                        </div>
                      </div>
                      <div
                        data-value="2D"
                        data-role="button"
                        class="button-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                        title="2 days"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">2D</div>
                        </div>
                      </div>
                      <div
                        data-value="3D"
                        data-role="button"
                        class="button-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                        title="3 days"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">3D</div>
                        </div>
                      </div>
                      <div
                        data-value="1W"
                        data-role="button"
                        class="button-2R6OKuTS last-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                        title="1 week"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">W</div>
                        </div>
                      </div>
                      <div
                        class="menu-2R6OKuTS button-1SoiPS-f apply-common-tooltip"
                        title="Time Interval"
                        data-tooltip-hotkey="{&amp;quot;keys&amp;quot;:[&amp;quot;,&amp;quot;],&amp;quot;text&amp;quot;:&amp;quot;Number or {0}&amp;quot;}"
                        data-role="button"
                      >
                        <div class="arrow-1SoiPS-f">
                          <div class="arrowWrap-1SoiPS-f">
                            <span class="icon-19OjtB6A"
                              ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 8"
                                width="16"
                                height="8"
                              >
                                <path
                                  fill="currentColor"
                                  d="M0 1.475l7.396 6.04.596.485.593-.49L16 1.39 14.807 0 7.393 6.122 8.58 6.12 1.186.08z"
                                ></path></svg
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="group-3uonVBsm">
                    <div class="wrap-3jbioG5e">
                      <div
                        data-role="button"
                        class="button-3HNCAKoZ button-2eVMAgh- first-2eVMAgh- button-2Vpz_LXc isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                      ></div>
                      <div
                        data-value="candle"
                        data-role="button"
                        class="button-3HNCAKoZ button-2eVMAgh- last-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isActive-2Vpz_LXc isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                        title="Candles"
                      >
                        <span class="icon-2Vpz_LXc"
                          ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 28 28"
                            width="28"
                            height="28"
                            fill="currentColor"
                          >
                            <path
                              d="M17 11v6h3v-6h-3zm-.5-1h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5z"
                            ></path>
                            <path d="M18 7h1v3.5h-1zm0 10.5h1V21h-1z"></path>
                            <path
                              d="M9 8v12h3V8H9zm-.5-1h4a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5z"
                            ></path>
                            <path
                              d="M10 4h1v3.5h-1zm0 16.5h1V24h-1z"
                            ></path></svg
                        ></span>
                      </div>
                      <div
                        class="menu-3HNCAKoZ button-1SoiPS-f apply-common-tooltip"
                        title="Bar's Style"
                        data-role="button"
                      >
                        <div class="arrow-1SoiPS-f">
                          <div class="arrowWrap-1SoiPS-f">
                            <span class="icon-19OjtB6A"
                              ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 8"
                                width="16"
                                height="8"
                              >
                                <path
                                  fill="currentColor"
                                  d="M0 1.475l7.396 6.04.596.485.593-.49L16 1.39 14.807 0 7.393 6.122 8.58 6.12 1.186.08z"
                                ></path></svg
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="group-3uonVBsm">
                    <div class="wrap-3jbioG5e">
                      <div
                        data-role="button"
                        data-tooltip-hotkey="{&amp;quot;keys&amp;quot;:[&amp;quot;/&amp;quot;],&amp;quot;text&amp;quot;:&amp;quot;{0}&amp;quot;}"
                        class="button-pzOKvpP8 button-mPM2q3lb withText-mPM2q3lb button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc"
                        title="Indicators"
                        data-name="open-indicators-dialog"
                      >
                        <span class="icon-2Vpz_LXc"
                          ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 28 28"
                            width="28"
                            height="28"
                            fill="none"
                          >
                            <path
                              stroke="currentColor"
                              d="M20 17l-5 5M15 17l5 5M9 11.5h7M17.5 8a2.5 2.5 0 0 0-5 0v11a2.5 2.5 0 0 1-5 0"
                            ></path></svg
                        ></span>
                        <div class="js-button-text text-2Vpz_LXc">
                          Indicators
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="fill-pzOKvpP8 collapse-pzOKvpP8 group-3uonVBsm"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="inner-pzOKvpP8 fake-pzOKvpP8">
        <div class="wrapOverflow-3obNZqvj">
          <div class="wrap-3obNZqvj">
            <div class="scrollWrap-3obNZqvj noScrollBar-3obNZqvj">
              <div class="content-pzOKvpP8">
                <div class="wrap-1ETeWwz2">
                  <div class="group-3uonVBsm">
                    <div
                      data-role="button"
                      class="uppercase-1n0tF4SR button-2Vpz_LXc button-1n0tF4SR apply-common-tooltip isInteractive-2Vpz_LXc"
                      title="Symbol Search"
                    >
                      <div class="js-button-text text-2Vpz_LXc text-1n0tF4SR">
                        BITFLASH
                      </div>
                    </div>
                  </div>
                  <div class="group-3uonVBsm">
                    <div class="wrap-3jbioG5e">
                      <div
                        data-value="60"
                        data-role="button"
                        class="button-2R6OKuTS first-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isActive-2Vpz_LXc isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                        title="1 hour"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">1h</div>
                        </div>
                      </div>
                      <div
                        data-value="120"
                        data-role="button"
                        class="button-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                        title="2 hours"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">2h</div>
                        </div>
                      </div>
                      <div
                        data-value="240"
                        data-role="button"
                        class="button-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                        title="4 hours"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">4h</div>
                        </div>
                      </div>
                      <div
                        data-value="360"
                        data-role="button"
                        class="button-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                        title="6 hours"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">6h</div>
                        </div>
                      </div>
                      <div
                        data-value="720"
                        data-role="button"
                        class="button-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                        title="12 hours"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">12h</div>
                        </div>
                      </div>
                      <div
                        data-value="1D"
                        data-role="button"
                        class="button-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                        title="1 day"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">D</div>
                        </div>
                      </div>
                      <div
                        data-value="2D"
                        data-role="button"
                        class="button-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                        title="2 days"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">2D</div>
                        </div>
                      </div>
                      <div
                        data-value="3D"
                        data-role="button"
                        class="button-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                        title="3 days"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">3D</div>
                        </div>
                      </div>
                      <div
                        data-value="1W"
                        data-role="button"
                        class="button-2R6OKuTS last-2R6OKuTS button-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                        title="1 week"
                      >
                        <div class="js-button-text text-2Vpz_LXc">
                          <div class="value-2y-wa9jT">W</div>
                        </div>
                      </div>
                      <div
                        class="menu-2R6OKuTS button-1SoiPS-f apply-common-tooltip"
                        title="Time Interval"
                        data-tooltip-hotkey="{&amp;quot;keys&amp;quot;:[&amp;quot;,&amp;quot;],&amp;quot;text&amp;quot;:&amp;quot;Number or {0}&amp;quot;}"
                        data-role="button"
                      >
                        <div class="arrow-1SoiPS-f">
                          <div class="arrowWrap-1SoiPS-f">
                            <span class="icon-19OjtB6A"
                              ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 8"
                                width="16"
                                height="8"
                              >
                                <path
                                  fill="currentColor"
                                  d="M0 1.475l7.396 6.04.596.485.593-.49L16 1.39 14.807 0 7.393 6.122 8.58 6.12 1.186.08z"
                                ></path></svg
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="group-3uonVBsm">
                    <div class="wrap-3jbioG5e">
                      <div
                        data-role="button"
                        class="button-3HNCAKoZ button-2eVMAgh- first-2eVMAgh- button-2Vpz_LXc isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                      ></div>
                      <div
                        data-value="candle"
                        data-role="button"
                        class="button-3HNCAKoZ button-2eVMAgh- last-2eVMAgh- button-2Vpz_LXc apply-common-tooltip isActive-2Vpz_LXc isInteractive-2Vpz_LXc isGrouped-2Vpz_LXc"
                        title="Candles"
                      >
                        <span class="icon-2Vpz_LXc"
                          ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 28 28"
                            width="28"
                            height="28"
                            fill="currentColor"
                          >
                            <path
                              d="M17 11v6h3v-6h-3zm-.5-1h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5z"
                            ></path>
                            <path d="M18 7h1v3.5h-1zm0 10.5h1V21h-1z"></path>
                            <path
                              d="M9 8v12h3V8H9zm-.5-1h4a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5z"
                            ></path>
                            <path
                              d="M10 4h1v3.5h-1zm0 16.5h1V24h-1z"
                            ></path></svg
                        ></span>
                      </div>
                      <div
                        class="menu-3HNCAKoZ button-1SoiPS-f apply-common-tooltip"
                        title="Bar's Style"
                        data-role="button"
                      >
                        <div class="arrow-1SoiPS-f">
                          <div class="arrowWrap-1SoiPS-f">
                            <span class="icon-19OjtB6A"
                              ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 8"
                                width="16"
                                height="8"
                              >
                                <path
                                  fill="currentColor"
                                  d="M0 1.475l7.396 6.04.596.485.593-.49L16 1.39 14.807 0 7.393 6.122 8.58 6.12 1.186.08z"
                                ></path></svg
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="group-3uonVBsm">
                    <div class="wrap-3jbioG5e">
                      <div
                        data-role="button"
                        data-tooltip-hotkey="{&amp;quot;keys&amp;quot;:[&amp;quot;/&amp;quot;],&amp;quot;text&amp;quot;:&amp;quot;{0}&amp;quot;}"
                        class="button-pzOKvpP8 button-mPM2q3lb withoutText-mPM2q3lb button-2Vpz_LXc apply-common-tooltip isInteractive-2Vpz_LXc"
                        title="Indicators"
                        data-name="open-indicators-dialog"
                      >
                        <span class="icon-2Vpz_LXc"
                          ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 28 28"
                            width="28"
                            height="28"
                            fill="none"
                          >
                            <path
                              stroke="currentColor"
                              d="M20 17l-5 5M15 17l5 5M9 11.5h7M17.5 8a2.5 2.5 0 0 0-5 0v11a2.5 2.5 0 0 1-5 0"
                            ></path></svg
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div
                    class="fill-pzOKvpP8 collapse-pzOKvpP8 group-3uonVBsm"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


      

      </div>
      <div id="candleCart"></div>
      </div>
    </>
  );
}



import React, { useEffect, useState } from "react";
import { createChart, CrosshairMode, isBusinessDay } from "lightweight-charts";
import { useSelector, useDispatch } from "react-redux";
import "./chart.css";

import { setCurrency_type } from "../redux/reducer/buySell";


export default function CandleGraph(props) {

  const {currency_type} = useSelector((state)=> state.buySell.value)
  console.log(currency_type,"CTYPE Anurag ");
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



       {/* <div
       class="layout__area--left"
        style={{position: "absolute", top: "0px", left: "0px", height: "385px", width: "52px"}}>
  <div id="drawing-toolbar" class="drawingToolbar-2_so5thS">
    <div class="wrap-379NmUSU">
      <div class="scrollWrap-379NmUSU noScrollBar-379NmUSU">
        <div class="content-379NmUSU">
          <div class="inner-2_so5thS">
            <div class="group-2_so5thS">
              <span
                ><div class="dropdown-191zO2Od">
                  <div
                    data-name="linetool-group-cursors"
                    class="control-191zO2Od"
                  >
                    <div
                      class="buttonWrap-191zO2Od apply-common-tooltip common-tooltip-vertical"
                      data-tooltip-delay="1500"
                      data-role="button"
                    >
                      <div
                        class="button-5-QHyx-s isTransparent-5-QHyx-s"
                        data-role="button"
                      >
                        <div class="bg-5-QHyx-s">
                          <span class="icon-5-QHyx-s"
                            ><svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 28 28"
                             style={{height:"28",width:"28"}}
                            >
                              <g fill="currentColor">
                                <path d="M18 15h8v-1h-8z"></path>
                                <path
                                  d="M14 18v8h1v-8zM14 3v8h1v-8zM3 15h8v-1h-8z"
                                ></path>
                              </g></svg
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div
                      class="arrow-191zO2Od apply-common-tooltip common-tooltip-vertical"
                      title="Cursors"
                      data-role="menu-handle"
                    >
                      <span class="arrowIcon-191zO2Od"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 10 16"
                          width="10"
                          height="16"
                        >
                          <path
                            d="M.6 1.4l1.4-1.4 8 8-8 8-1.4-1.4 6.389-6.532-6.389-6.668z"
                          ></path></svg
                      ></span>
                    </div>
                  </div></div></span
              ><span
                ><div class="dropdown-191zO2Od">
                  <div
                    data-name="linetool-group-trend-line"
                    class="control-191zO2Od"
                  >
                    <div
                      class="buttonWrap-191zO2Od apply-common-tooltip common-tooltip-vertical"
                      data-tooltip-hotkey="{&amp;quot;keys&amp;quot;:[&amp;quot;Shift&amp;quot;],&amp;quot;text&amp;quot;:&amp;quot;{0} — drawing a straight line at angles of 45&amp;quot;}"
                      data-tooltip-delay="1500"
                      data-role="button"
                      title="Trend Line"
                    >
                      <div
                        class="button-5-QHyx-s isTransparent-5-QHyx-s"
                        data-role="button"
                      >
                        <div class="bg-5-QHyx-s">
                          <span class="icon-5-QHyx-s"
                            ><svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 28 28"
                             style={{height:"28",width:"28"}}
                            >
                              <g fill="currentColor" fill-rule="nonzero">
                                <path
                                  d="M7.354 21.354l14-14-.707-.707-14 14z"
                                ></path>
                                <path
                                  d="M22.5 7c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM5.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"
                                ></path>
                              </g></svg
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div
                      class="arrow-191zO2Od apply-common-tooltip common-tooltip-vertical"
                      title="Trend Line Tools"
                      data-role="menu-handle"
                    >
                      <span class="arrowIcon-191zO2Od"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 10 16"
                          width="10"
                          height="16"
                        >
                          <path
                            d="M.6 1.4l1.4-1.4 8 8-8 8-1.4-1.4 6.389-6.532-6.389-6.668z"
                          ></path></svg
                      ></span>
                    </div>
                  </div></div></span
              ><span
                ><div class="dropdown-191zO2Od undefined">
                  <div
                    data-name="linetool-group-gann-and-fibonacci"
                    class="control-191zO2Od"
                  >
                    <div
                      class="buttonWrap-191zO2Od apply-common-tooltip common-tooltip-vertical"
                      data-tooltip-delay="1500"
                      data-role="button"
                    >
                      <div
                        class="button-5-QHyx-s isActive-5-QHyx-s isTransparent-5-QHyx-s"
                        data-role="button"
                      >
                        <div class="bg-5-QHyx-s">
                          <span class="icon-5-QHyx-s"
                            ><svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 28 28"
                             style={{height:"28",width:"28"}}
                            >
                              <g fill="currentColor" fill-rule="nonzero">
                                <path
                                  d="M7.275 21.432l12.579-12.579-.707-.707-12.579 12.579z"
                                ></path>
                                <path
                                  d="M6.69 13.397l7.913 7.913.707-.707-7.913-7.913zM7.149 10.558l7.058-7.058-.707-.707-7.058 7.058z"
                                ></path>
                                <path
                                  d="M18.149 21.558l7.058-7.058-.707-.707-7.058 7.058z"
                                ></path>
                                <path
                                  d="M5.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM5.5 13c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM16.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"
                                ></path>
                              </g></svg
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div
                      class="arrow-191zO2Od apply-common-tooltip common-tooltip-vertical"
                      data-role="menu-handle"
                    >
                      <span class="arrowIcon-191zO2Od"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 10 16"
                          width="10"
                          height="16"
                        >
                          <path
                            d="M.6 1.4l1.4-1.4 8 8-8 8-1.4-1.4 6.389-6.532-6.389-6.668z"
                          ></path></svg
                      ></span>
                    </div>
                  </div></div></span
              ><span
                ><div class="dropdown-191zO2Od">
                  <div
                    data-name="linetool-group-geometric-shapes"
                    class="control-191zO2Od"
                  >
                    <div
                      class="buttonWrap-191zO2Od apply-common-tooltip common-tooltip-vertical"
                      data-tooltip-delay="1500"
                      data-role="button"
                    >
                      <div
                        class="button-5-QHyx-s isTransparent-5-QHyx-s"
                        data-role="button"
                      >
                        <div class="bg-5-QHyx-s">
                          <span class="icon-5-QHyx-s"
                            ><svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 28 28"
                             style={{height:"28",width:"28"}}
                            >
                              <g fill="currentColor" fill-rule="nonzero">
                                <path
                                  d="M1.789 23l.859-.854.221-.228c.18-.19.38-.409.597-.655.619-.704 1.238-1.478 1.815-2.298.982-1.396 1.738-2.776 2.177-4.081 1.234-3.667 5.957-4.716 8.923-1.263 3.251 3.785-.037 9.38-5.379 9.38h-9.211zm9.211-1c4.544 0 7.272-4.642 4.621-7.728-2.45-2.853-6.225-2.015-7.216.931-.474 1.408-1.273 2.869-2.307 4.337-.599.852-1.241 1.653-1.882 2.383l-.068.078h6.853z"
                                ></path>
                                <path
                                  d="M18.182 6.002l-1.419 1.286c-1.031.935-1.075 2.501-.096 3.48l1.877 1.877c.976.976 2.553.954 3.513-.045l5.65-5.874-.721-.693-5.65 5.874c-.574.596-1.507.609-2.086.031l-1.877-1.877c-.574-.574-.548-1.48.061-2.032l1.419-1.286-.672-.741z"
                                ></path>
                              </g></svg
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div
                      class="arrow-191zO2Od apply-common-tooltip common-tooltip-vertical"
                      title="Geometric Shapes"
                      data-role="menu-handle"
                    >
                      <span class="arrowIcon-191zO2Od"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 10 16"
                          width="10"
                          height="16"
                        >
                          <path
                            d="M.6 1.4l1.4-1.4 8 8-8 8-1.4-1.4 6.389-6.532-6.389-6.668z"
                          ></path></svg
                      ></span>
                    </div>
                  </div></div></span
              ><span
                ><div class="dropdown-191zO2Od">
                  <div
                    data-name="linetool-group-annotation"
                    class="control-191zO2Od"
                  >
                    <div
                      class="buttonWrap-191zO2Od apply-common-tooltip common-tooltip-vertical"
                      data-tooltip-delay="1500"
                      data-role="button"
                    >
                      <div
                        class="button-5-QHyx-s isTransparent-5-QHyx-s"
                        data-role="button"
                      >
                        <div class="bg-5-QHyx-s">
                          <span class="icon-5-QHyx-s"
                            ><svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 28 28"
                             style={{height:"28",width:"28"}}
                            >
                              <path
                                fill="currentColor"
                                d="m9.5 5C8.68 5 8 5.67 8 6.5v2h1v-2c0-.27.23-.5.5-.5H14v16h-2v1h5v-1h-2V6h4.5c.28 0 .5.22.5.5v2h1v-2c0-.83-.67-1.5-1.5-1.5h-10z"
                              ></path></svg
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div
                      class="arrow-191zO2Od apply-common-tooltip common-tooltip-vertical"
                      data-role="menu-handle"
                    >
                      <span class="arrowIcon-191zO2Od"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 10 16"
                          width="10"
                          height="16"
                        >
                          <path
                            d="M.6 1.4l1.4-1.4 8 8-8 8-1.4-1.4 6.389-6.532-6.389-6.668z"
                          ></path></svg
                      ></span>
                    </div>
                  </div></div></span
              ><span
                ><div class="dropdown-191zO2Od">
                  <div
                    data-name="linetool-group-patterns"
                    class="control-191zO2Od"
                  >
                    <div
                      class="buttonWrap-191zO2Od apply-common-tooltip common-tooltip-vertical"
                      data-tooltip-delay="1500"
                      data-role="button"
                    >
                      <div
                        class="button-5-QHyx-s isTransparent-5-QHyx-s"
                        data-role="button"
                      >
                        <div class="bg-5-QHyx-s">
                          <span class="icon-5-QHyx-s"
                            ><svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 28 28"
                             style={{height:"28",width:"28"}}
                            >
                              <g fill="currentColor" fill-rule="nonzero">
                                <path
                                  d="M20.449 8.505l2.103 9.112.974-.225-2.103-9.112zM13.943 14.011l7.631 4.856.537-.844-7.631-4.856zM14.379 11.716l4.812-3.609-.6-.8-4.812 3.609zM10.96 13.828l-4.721 6.744.819.573 4.721-6.744zM6.331 20.67l2.31-13.088-.985-.174-2.31 13.088zM9.041 7.454l1.995 3.492.868-.496-1.995-3.492z"
                                ></path>
                                <path
                                  d="M8.5 7c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM5.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM12.5 14c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM20.5 8c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM23.5 21c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"
                                ></path>
                              </g></svg
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div
                      class="arrow-191zO2Od apply-common-tooltip common-tooltip-vertical"
                      data-role="menu-handle"
                    >
                      <span class="arrowIcon-191zO2Od"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 10 16"
                          width="10"
                          height="16"
                        >
                          <path
                            d="M.6 1.4l1.4-1.4 8 8-8 8-1.4-1.4 6.389-6.532-6.389-6.668z"
                          ></path></svg
                      ></span>
                    </div>
                  </div></div></span
              ><span
                ><div class="dropdown-191zO2Od">
                  <div
                    data-name="linetool-group-prediction-and-measurement"
                    class="control-191zO2Od"
                  >
                    <div
                      class="buttonWrap-191zO2Od apply-common-tooltip common-tooltip-vertical"
                      data-tooltip-delay="1500"
                      data-role="button"
                      title="Long Position"
                    >
                      <div
                        class="button-5-QHyx-s isTransparent-5-QHyx-s"
                        data-role="button"
                      >
                        <div class="bg-5-QHyx-s">
                          <span class="icon-5-QHyx-s"
                            ><svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 28 28"
                             style={{height:"28",width:"28"}}
                              fill="none"
                            >
                              <path
                                fill="currentColor"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M4.5 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2 6.5A2.5 2.5 0 0 1 6.95 6H24v1H6.95A2.5 2.5 0 0 1 2 6.5zM4.5 15a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2 16.5a2.5 2.5 0 0 1 4.95-.5h13.1a2.5 2.5 0 1 1 0 1H6.95A2.5 2.5 0 0 1 2 16.5zM22.5 15a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-18 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2 22.5a2.5 2.5 0 0 1 4.95-.5H24v1H6.95A2.5 2.5 0 0 1 2 22.5z"
                              ></path>
                              <path
                                fill="currentColor"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M22.4 8.94l-1.39.63-.41-.91 1.39-.63.41.91zm-4 1.8l-1.39.63-.41-.91 1.39-.63.41.91zm-4 1.8l-1.4.63-.4-.91 1.39-.63.41.91zm-4 1.8l-1.4.63-.4-.91 1.39-.63.41.91z"
                              ></path></svg
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div
                      class="arrow-191zO2Od apply-common-tooltip common-tooltip-vertical"
                      title="Prediction and Measurement Tools"
                      data-role="menu-handle"
                    >
                      <span class="arrowIcon-191zO2Od"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 10 16"
                          width="10"
                          height="16"
                        >
                          <path
                            d="M.6 1.4l1.4-1.4 8 8-8 8-1.4-1.4 6.389-6.532-6.389-6.668z"
                          ></path></svg
                      ></span>
                    </div>
                  </div></div
              ></span>
              <div class="dropdown-191zO2Od">
                <div
                  data-name="linetool-group-font-icons"
                  class="control-191zO2Od"
                >
                  <div
                    class="buttonWrap-191zO2Od apply-common-tooltip common-tooltip-vertical"
                    data-tooltip-delay="1500"
                    data-role="button"
                    title="Icon"
                  >
                    <div
                      class="button-5-QHyx-s button-2qy9YC6D isTransparent-5-QHyx-s"
                      data-role="button"
                    >
                      <div class="bg-5-QHyx-s">
                        <span class="icon-5-QHyx-s"
                          ><div class="buttonIcon-2qy9YC6D"></div></span
                        >
                      </div>
                    </div>
                  </div>
                  <div
                    class="arrow-191zO2Od apply-common-tooltip common-tooltip-vertical"
                    title="Icons"
                    data-role="menu-handle"
                  >
                    <span class="arrowIcon-191zO2Od"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 10 16"
                        width="10"
                        height="16"
                      >
                        <path
                          d="M.6 1.4l1.4-1.4 8 8-8 8-1.4-1.4 6.389-6.532-6.389-6.668z"
                        ></path></svg
                    ></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="group-2_so5thS">
              <div
                class="button-5-QHyx-s apply-common-tooltip common-tooltip-vertical isTransparent-5-QHyx-s"
                title="Measure"
                data-role="button"
                data-tooltip-hotkey="{&amp;quot;keys&amp;quot;:[&amp;quot;Shift&amp;quot;],&amp;quot;text&amp;quot;:&amp;quot;{0} + Click on the chart&amp;quot;}"
                data-name="measure"
              >
                <div class="bg-5-QHyx-s">
                  <span class="icon-5-QHyx-s"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                    >
                      <path
                        fill="currentColor"
                        d="M2 9.75a1.5 1.5 0 0 0-1.5 1.5v5.5a1.5 1.5 0 0 0 1.5 1.5h24a1.5 1.5 0 0 0 1.5-1.5v-5.5a1.5 1.5 0 0 0-1.5-1.5zm0 1h3v2.5h1v-2.5h3.25v3.9h1v-3.9h3.25v2.5h1v-2.5h3.25v3.9h1v-3.9H22v2.5h1v-2.5h3a.5.5 0 0 1 .5.5v5.5a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-5.5a.5.5 0 0 1 .5-.5z"
                        transform="rotate(-45 14 14)"
                      ></path></svg
                  ></span>
                </div>
              </div>
              <div
                class="button-5-QHyx-s apply-common-tooltip common-tooltip-vertical isTransparent-5-QHyx-s"
                title="Zoom In"
                data-role="button"
                data-name="zoom"
              >
                <div class="bg-5-QHyx-s">
                  <span class="icon-5-QHyx-s"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 28 28"
                      width="28"
                      height="28"
                      fill="currentColor"
                    >
                      <path d="M17.646 18.354l4 4 .708-.708-4-4z"></path>
                      <path
                        d="M12.5 21a8.5 8.5 0 1 1 0-17 8.5 8.5 0 0 1 0 17zm0-1a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z"
                      ></path>
                      <path d="M9 13h7v-1H9z"></path>
                      <path d="M13 16V9h-1v7z"></path></svg
                  ></span>
                </div>
              </div>
              <div></div>
            </div>
            <div class="group-2_so5thS">
              <div class="dropdown-191zO2Od">
                <div data-name="magnet-button" class="control-191zO2Od">
                  <div
                    class="buttonWrap-191zO2Od apply-common-tooltip common-tooltip-vertical"
                    data-tooltip-hotkey="{&amp;quot;keys&amp;quot;:[&amp;quot;Ctrl&amp;quot;],&amp;quot;text&amp;quot;:&amp;quot;{0}&amp;quot;}"
                    data-tooltip-delay="1500"
                    data-role="button"
                    title="Magnet Mode snaps drawings placed near price bars to the closest OHLC value"
                  >
                    <div class="button-5-QHyx-s" data-role="button">
                      <div class="bg-5-QHyx-s">
                        <span class="icon-5-QHyx-s"
                          ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 28 28"
                            width="28"
                            height="28"
                          >
                            <g fill="currentColor" fill-rule="evenodd">
                              <path
                                fill-rule="nonzero"
                                d="M14 10a2 2 0 0 0-2 2v11H6V12c0-4.416 3.584-8 8-8s8 3.584 8 8v11h-6V12a2 2 0 0 0-2-2zm-3 2a3 3 0 0 1 6 0v10h4V12c0-3.864-3.136-7-7-7s-7 3.136-7 7v10h4V12z"
                              ></path>
                              <path d="M6.5 18h5v1h-5zm10 0h5v1h-5z"></path>
                            </g></svg
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div class="arrow-191zO2Od" data-role="menu-handle">
                    <span class="arrowIcon-191zO2Od"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 10 16"
                        width="10"
                        height="16"
                      >
                        <path
                          d="M.6 1.4l1.4-1.4 8 8-8 8-1.4-1.4 6.389-6.532-6.389-6.668z"
                        ></path></svg
                    ></span>
                  </div>
                </div>
              </div>
              <div
                class="button-5-QHyx-s apply-common-tooltip common-tooltip-vertical"
                title="Stay in Drawing Mode"
                data-role="button"
                data-name="drawginmode"
              >
                <div class="bg-5-QHyx-s">
                  <span class="icon-5-QHyx-s"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 28 28"
                      width="28"
                      height="28"
                    >
                      <g fill="currentColor" fill-rule="evenodd">
                        <path
                          fill-rule="nonzero"
                          d="M23.002 23C23 23 23 18.003 23 18.003L15.998 18C16 18 16 22.997 16 22.997l7.002.003zM15 18.003A1 1 0 0 1 15.998 17h7.004c.551 0 .998.438.998 1.003v4.994A1 1 0 0 1 23.002 24h-7.004A.993.993 0 0 1 15 22.997v-4.994z"
                        ></path>
                        <path d="M19 20h1v2h-1z"></path>
                        <path
                          fill-rule="nonzero"
                          d="M22 14.5a2.5 2.5 0 0 0-5 0v3h1v-3a1.5 1.5 0 0 1 3 0v.5h1v-.5z"
                        ></path>
                        <g fill-rule="nonzero">
                          <path
                            d="M3 14.707A1 1 0 0 1 3.293 14L14.439 2.854a1.5 1.5 0 0 1 2.122 0l2.585 2.585a1.5 1.5 0 0 1 0 2.122L8 18.707a1 1 0 0 1-.707.293H4a1 1 0 0 1-1-1v-3.293zm1 0V18h3.293L18.439 6.854a.5.5 0 0 0 0-.708l-2.585-2.585a.5.5 0 0 0-.708 0L4 14.707z"
                          ></path>
                          <path
                            d="M13.146 4.854l4 4 .708-.708-4-4zm-9 9l4 4 .708-.708-4-4z"
                          ></path>
                          <path d="M15.146 6.146l-9 9 .708.708 9-9z"></path>
                        </g>
                      </g></svg
                  ></span>
                </div>
              </div>
              <div
                class="button-5-QHyx-s apply-common-tooltip common-tooltip-vertical"
                title="Lock All Drawing Tools"
                data-role="button"
                data-name="lockAllDrawings"
              >
                <div class="bg-5-QHyx-s">
                  <span class="icon-5-QHyx-s"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 28 28"
                      width="28"
                      height="28"
                    >
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M14 6a3 3 0 0 0-3 3v3h8.5a2.5 2.5 0 0 1 2.5 2.5v7a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 6 21.5v-7A2.5 2.5 0 0 1 8.5 12H10V9a4 4 0 0 1 8 0h-1a3 3 0 0 0-3-3zm-1 11a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0v-2zm-6-2.5c0-.83.67-1.5 1.5-1.5h11c.83 0 1.5.67 1.5 1.5v7c0 .83-.67 1.5-1.5 1.5h-11A1.5 1.5 0 0 1 7 21.5v-7z"
                      ></path></svg
                  ></span>
                </div>
              </div>
              <div class="dropdown-191zO2Od">
                <div
                  data-name="hide-all"
                  data-type="hide-drawing-tools"
                  class="control-191zO2Od"
                >
                  <div
                    class="buttonWrap-191zO2Od apply-common-tooltip common-tooltip-vertical"
                    data-tooltip-hotkey="{&amp;quot;keys&amp;quot;:[&amp;quot;Ctrl&amp;quot;,&amp;quot;Alt&amp;quot;,&amp;quot;H&amp;quot;],&amp;quot;text&amp;quot;:&amp;quot;{0} + {1} + {2}&amp;quot;}"
                    data-tooltip-delay="1500"
                    data-role="button"
                    title="Hide all drawings"
                  >
                    <div class="button-5-QHyx-s" data-role="button">
                      <div class="bg-5-QHyx-s">
                        <span class="icon-5-QHyx-s"
                          ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                          >
                            <path
                              fill="currentColor"
                              fill-rule="evenodd"
                              d="M5 10.76l-.41-.72-.03-.04.03-.04a15 15 0 012.09-2.9c1.47-1.6 3.6-3.12 6.32-3.12 2.73 0 4.85 1.53 6.33 3.12a15.01 15.01 0 012.08 2.9l.03.04-.03.04a15 15 0 01-2.09 2.9c-1.47 1.6-3.6 3.12-6.32 3.12-2.73 0-4.85-1.53-6.33-3.12a15 15 0 01-1.66-2.18zm17.45-.98L22 10l.45.22-.01.02a5.04 5.04 0 01-.15.28 16.01 16.01 0 01-2.23 3.1c-1.56 1.69-3.94 3.44-7.06 3.44-3.12 0-5.5-1.75-7.06-3.44a16 16 0 01-2.38-3.38v-.02h-.01L4 10l-.45-.22.01-.02a5.4 5.4 0 01.15-.28 16 16 0 012.23-3.1C7.5 4.69 9.88 2.94 13 2.94c3.12 0 5.5 1.75 7.06 3.44a16.01 16.01 0 012.38 3.38v.02h.01zM22 10l.45-.22.1.22-.1.22L22 10zM3.55 9.78L4 10l-.45.22-.1-.22.1-.22zm6.8.22A2.6 2.6 0 0113 7.44 2.6 2.6 0 0115.65 10 2.6 2.6 0 0113 12.56 2.6 2.6 0 0110.35 10zM13 6.44A3.6 3.6 0 009.35 10 3.6 3.6 0 0013 13.56c2 0 3.65-1.58 3.65-3.56A3.6 3.6 0 0013 6.44zm7.85 12l.8-.8.7.71-.79.8a.5.5 0 000 .7l.59.59c.2.2.5.2.7 0l1.8-1.8.7.71-1.79 1.8a1.5 1.5 0 01-2.12 0l-.59-.59a1.5 1.5 0 010-2.12zM16.5 21.5l-.35-.35a.5.5 0 00-.07.07l-1 1.5-1 1.5a.5.5 0 00.42.78h4a2.5 2.5 0 001.73-.77A2.5 2.5 0 0021 22.5a2.5 2.5 0 00-.77-1.73A2.5 2.5 0 0018.5 20a3.1 3.1 0 00-1.65.58 5.28 5.28 0 00-.69.55v.01h-.01l.35.36zm.39.32l-.97 1.46-.49.72h3.07c.34 0 .72-.17 1.02-.48.3-.3.48-.68.48-1.02 0-.34-.17-.72-.48-1.02-.3-.3-.68-.48-1.02-.48-.35 0-.75.18-1.1.42a4.27 4.27 0 00-.51.4z"
                            ></path></svg
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div class="arrow-191zO2Od" data-role="menu-handle">
                    <span class="arrowIcon-191zO2Od"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 10 16"
                        width="10"
                        height="16"
                      >
                        <path
                          d="M.6 1.4l1.4-1.4 8 8-8 8-1.4-1.4 6.389-6.532-6.389-6.668z"
                        ></path></svg
                    ></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="group-2_so5thS">
              <div class="dropdown-191zO2Od">
                <div data-name="removeAllDrawingTools" class="control-191zO2Od">
                  <div
                    class="buttonWrap-191zO2Od apply-common-tooltip common-tooltip-vertical"
                    data-tooltip-delay="1500"
                    data-role="button"
                    title="Remove Drawings"
                  >
                    <div
                      class="button-5-QHyx-s isTransparent-5-QHyx-s"
                      data-role="button"
                    >
                      <div class="bg-5-QHyx-s">
                        <span class="icon-5-QHyx-s"
                          ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 28 28"
                            width="28"
                            height="28"
                          >
                            <path
                              fill="currentColor"
                              fill-rule="evenodd"
                              d="M11.5 6a.5.5 0 0 0-.5.5V8h6V6.5a.5.5 0 0 0-.5-.5h-5zM18 8V6.5c0-.83-.67-1.5-1.5-1.5h-5c-.83 0-1.5.67-1.5 1.5V8H5.5a.5.5 0 0 0 0 1H7v12.5A2.5 2.5 0 0 0 9.5 24h9a2.5 2.5 0 0 0 2.5-2.5V9h1.5a.5.5 0 0 0 0-1H18zm2 1H8v12.5c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5V9zm-8.5 3c.28 0 .5.22.5.5v7a.5.5 0 0 1-1 0v-7c0-.28.22-.5.5-.5zm5.5.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
                            ></path></svg
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div class="arrow-191zO2Od" data-role="menu-handle">
                    <span class="arrowIcon-191zO2Od"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 10 16"
                        width="10"
                        height="16"
                      >
                        <path
                          d="M.6 1.4l1.4-1.4 8 8-8 8-1.4-1.4 6.389-6.532-6.389-6.668z"
                        ></path></svg
                    ></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="fill-2_so5thS"></div>
            <div class="group-2_so5thS lastGroup-2_so5thS">
              <div
                id="drawing-toolbar-object-tree"
                class="button-5-QHyx-s apply-common-tooltip common-tooltip-vertical"
                title="Show Object Tree"
                data-role="button"
                data-name="showObjectsTree"
              >
                <div class="bg-5-QHyx-s">
                  <span class="icon-5-QHyx-s"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 28 28"
                      width="28"
                      height="28"
                    >
                      <g fill="currentColor">
                        <path
                          fill-rule="nonzero"
                          d="M14 18.634l-.307-.239-7.37-5.73-2.137-1.665 9.814-7.633 9.816 7.634-.509.394-1.639 1.269-7.667 5.969zm7.054-6.759l1.131-.876-8.184-6.366-8.186 6.367 1.123.875 7.063 5.491 7.054-5.492z"
                        ></path>
                        <path
                          d="M7 14.5l-1 .57 8 6.43 8-6.5-1-.5-7 5.5z"
                        ></path>
                        <path
                          d="M7 17.5l-1 .57 8 6.43 8-6.5-1-.5-7 5.5z"
                        ></path>
                      </g></svg
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="toggleButton-3zv4iS2j apply-common-tooltip common-tooltip-vertical"
      title="Hide Drawings Toolbar"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        height="27"
        viewBox="0 0 9 27"
        class="container-3CL4Geq2"
      >
        <g fill="none" fill-rule="evenodd">
          <path
            class="background-3CL4Geq2"
            d="M4.5.5a4 4 0 0 1 4 4v18a4 4 0 1 1-8 0v-18a4 4 0 0 1 4-4z"
          ></path>
          <path class="arrow-3CL4Geq2" d="M5.5 10l-2 3.5 2 3.5"></path>
        </g>
      </svg>
    </div>
  </div>
     </div>  */}


      </div>
      <div id="candleCart"></div>
      </div>
    </>
  );
}



{/* // import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import "./chart.css";
// // import { toggleFav } from "../redux/actions/coinDBAction";
// import TVChartContainer  from "./CandleChart";

// export default function CandleGraph(props) {
//   const dispatch = useDispatch();
//   // const url = "https://api.bitflash.io/api";
//   // const [fullexe, setFUllexw] = React.useState(false);
//   const { coins, currency_graph, user_fav_pairing,paired_curency_price } = useSelector(
//     (state) => state.coinDBReducer
//   );
//   const [isFav, setIsFav] = React.useState(false);
//   const [current_price, currentPrice] = React.useState(0);
//   const [newgetchart, NewGetChart] = React.useState(false);
//   const { user } = useSelector((state) => state.AuthReducer);
//   const { isLoggedIn } = useSelector(
//     (state) => state.AuthReducer
//   );
//   const filter = "1h"
//   const [prev_symbol, prevSymbol] = React.useState("");

//   const coin = props.match.params.id.split("-");
//   const SelCurency = coin && coin[1] ? coin[1].toUpperCase() : '';
//   const { webData } = useSelector((state) => state.websiteDBReducer);
//   const data = Object.values(coins).find((d) => {
//     if (d.symbol === coin[0].toUpperCase()) {
//       return d;
//     }
//   });
//   // console.log("paired_currency_price: ",data)
//   useEffect(() => {
//     let match = user_fav_pairing.find(
//       (d) =>
//         d === data.symbol.toUpperCase()
//     );
//     setIsFav(match ? true : false);
//   }, [...user_fav_pairing, ...coin]);

  
//   function getChart(symbol, symbol2) {
//     prevSymbol(symbol);
//     // console.log("getChart1: ", symbol, symbol2);
//     return (
//       <>
//         <TVChartContainer symbols={symbol} pre_symbols={symbol2} />
//       </>
//     );
//   }
//   useEffect(() => {
//     let coinsym = coin[0] + "-" + coin[1];
//     if(paired_curency_price && data && SelCurency){
//       let inrPrice = data.current_price_inr ? data.current_price_inr : 1; 
//       let selPrice = (SelCurency == 'INR') ? 1 : paired_curency_price[SelCurency] ? paired_curency_price[SelCurency] : 1; 
//       let fPrice = inrPrice*selPrice ? inrPrice/selPrice : 1;
//       currentPrice(fPrice)
//     }
//     NewGetChart(getChart(coinsym, prev_symbol));
//   }, [...coin, filter,currency_graph]);
//   return (
//     <>
//       <div
//         className="sc-dTdPqK coinsfather-theme-color p-0"
//         style={{ backgroundColor: webData.bg_color_code }}
//       >
//         <div className="sc-bdVaJa rSmgz py-0 px-0 graph-head">
//           <div height="24px" width="12px" className="sc-bdVaJa gSxurx"></div>
//           <div className="sc-bdVaJa lmEScu p-0">
//             <div className="sc-bdVaJa dveUWY p-0">
//               <h1 color="#1C1B21" className="sc-bwzfXH iHECUo p-0">
//                 {props.match.params.id.toUpperCase().replace("-", "/")}
//               </h1>
//               <span color="#9b9b9b" className="sc-bwzfXH ksDqJJ p-0 px-2">
//                 {data?.name}
//               </span>
//             </div>
//             <div className="sc-bdVaJa sc-dliRfk iUXzPH p-0">
//               <span color="#929292" className="sc-bwzfXH kgoTtc p-0">
//                 Last Price
//               </span>
//               <span
//                 cursor="pointer"
//                 color="#1C1B21"
//                 className="sc-bwzfXH jaArUU"
//               >
//                 {current_price}
//               </span>
//               <span
//                 // onClick={() => {
//                 //   dispatch(toggleFav(user?.params ? user.params.user_id : user.user_id, (data?.symbol).toUpperCase()));
//                 //   if (isLoggedIn) setIsFav(!isFav);
//                 // }}
//               >
//                 <i
//                   className={`fas ${
//                     isFav ? "fa-star" : "fa-star-o"
//                   } text-warning`}
//                 ></i>
//               </span>
//               <div className="sc-bdVaJa sc-jVODtj jZzDMB p-0">
//                 <i className="mdi mdi-star-outline mdi-18px"></i>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div
//         className="sc-bdVaJa sc-kUaPvJ kZeBBS row coinsfather-theme-color "
//         style={{ backgroundColor: webData.bg_color_code }}
//       >
//         <div className="sc-bdVaJa sc-giadOv iIMfMq col-12 col-md-8 col-lg-8">
//           <div className="sc-bdVaJa bmTiOt">
//             <span color="#929292" className="sc-bwzfXH yjNnZ font-weight-bold">
//               Volume
//             </span>
//             <span color="#1C1B21" className="sc-bwzfXH izvMda">
//               {data?.volume_24h}
//             </span>
//           </div>
//           <div className="sc-bdVaJa bmTiOt">
//             <span color="#929292" className="sc-bwzfXH yjNnZ font-weight-bold">
//               High
//             </span>
//             <span color="#1C1B21" className="text-success sc-bwzfXH izvMda">
//             <span class="high_24h">{data?.high_24h}</span>
//               <i className="fa fa-caret-up align-top"></i>
//             </span>
//           </div>
//           <div className="sc-bdVaJa bmTiOt">
//             <span color="#929292" className="sc-bwzfXH yjNnZ font-weight-bold">
//               Low
//             </span>
//             <span color="#1C1B21" className="text-danger sc-bwzfXH izvMda">
//               <span class="low_24h">{data?.low_24h}</span>
//               <i className="fa fa-caret-down align-top"></i>
//             </span>
//           </div>
//           <div className="sc-bdVaJa bmTiOt">
//             <span color="#929292" className="sc-bwzfXH yjNnZ font-weight-bold">
//               AVG
//             </span>
//             <span color="#1C1B21" className=" sc-bwzfXH izvMda">
//               {data?.price_change_percentage_1h_inr} %
//             </span>
//           </div>
//         </div>
//       </div>
//       <div id="candleCart1">{newgetchart}</div>
//     </>
//   );
// } */}

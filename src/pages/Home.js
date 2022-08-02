import React, { useEffect, useState } from "react";

import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "react-slideshow-image/dist/styles.css";
import "react-multi-carousel/lib/styles.css";
import Getpresale from "../components/Getpresale";
import axios from "axios";
import { BASE_URL, FRONT_URL } from "../Api_connection/config";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';

import { RWebShare } from "react-web-share";
// import firebase from "../firebase";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from "react-i18next";
import Mobile_Footer_Menu from "../components/mobile_footer_menu";





const Home = () => {
  const { user, userInfo, oneUsdPrice } = useSelector((state) => state.user.value);
  const email = user?.email;

  const navigate = useNavigate();

  const [totalAnalogBuy, setTotalAnalogBuy] = useState(0);
  const [inceptive, setInceptive] = useState(0);
  const [airdrop, setAirDrop] = useState(0);
  const [affiliates, setaffiliates] = useState(0);
  const [inherited, setInherited] = useState(0);
  const [bounty, setBounty] = useState(0);
  const [handOut, setHandOut] = useState(0);
  const [totalWallet, setTotalwallet] = useState(0);
  const [totalTransaction, setTransaction] = useState(0);
  const [lastActivity, setLastActivity] = useState(0);
  const [copied, setCopied] = useState(false);
  const [data, setData] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [totalRef, setTotalRef] = useState(0);
  const [totalRefIncome, setTotalRefIncome] = useState(0);
  const [i, setI] = useState([]);
  const [recentLoad, setRecentLoad] = useState(true);
  const [chartAmt, setChartAmt] = useState([]);
  const [chartLabel, setChartLabel] = useState([])
  const [api, setApi] = useState(false)
  const { t } = useTranslation();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const summaryBalance = {
    labels: chartLabel,
    dataUnit: "BTC",
    datasets: [
      {
        label: `${t('buy')}`,
        fill: false,
        lineTension: 0.5,
        backgroundColor: "#10ad83",
        borderColor: "#10ad83",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#10ad83",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#10ad83",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
        data: chartAmt,
      },
    ],
  };

  var total = [];
  var year = [];
  // let abortController = new AbortController();
  const chartData = async () => {
    try {
      // console.log(abortController, "ABORT");
      // abortController.abort();
      // abortController = new AbortController();
      if(api == false){
      setApi(true);
      // console.log("called..........");
      const res = await axios.post(`${BASE_URL}/buyChart`, { email: email});
      const arr = res.data.data;
      setApi(false)
      arr.map((element, index) => {
        total.push(element.total)
        year.push(`${element.month}/${element.year}`)
        // console.log(`${element.month}/${element.year}`, "element");
      })
      setChartAmt(total)
      setChartLabel(year)
    }else{
      // console.log("cancelled..........");
    }
      // controller.abort()
    } catch (error) {
      console.log(error);
    }
   
  };
  // abortController.abort();
  const getPreSale = async () => {
    try {
      const res = axios.get(`${BASE_URL}/getpresale`);
      setData((await res).data.user_data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserWalletData = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/userWalletData`, {
        email: email,
      });
      setTotalAnalogBuy(res.data.token_balance);
      setTotalwallet(res.data.total_wallet);
      setTransaction(res.data.total_transaction);
      setLastActivity(res.data.last_activity);
      setInceptive(res?.data?.inceptive_wallet);
      setAirDrop(res?.data?.airdrop_wallet);
      setaffiliates(res?.data?.affilites_wallet);
      setInherited(res?.data?.inherited_wallet);
      setBounty(res?.data?.bounty_wallet);
      setHandOut(res?.data?.handout_wallet);
    } catch (error) {
      console.log(error);
    }
  };

  const recentActivity = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/recentActivities`, {
        email: email,
        limit: 4,
      });
      setRecentActivities(res.data);
      setRecentLoad(false);
      const img = await axios.post(`${BASE_URL}/bannerData`);
      setI(img?.data?.message);
    } catch (error) {
      console.log(" Error in recent Activity API " + error);
    }
  };

  const reffetalData = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/geRefferalData`, {
        email: email,
      });
      setTotalRef(res.data.totalRefferal);
      setTotalRefIncome(res?.data?.totalIncome);
    } catch (error) {
      console.log(error);
    }
  };

  // const a = new Date(lastActivity);
  // const date = a.toDateString();
  // const time = a.toLocaleTimeString();

  useEffect(() => {
    getUserWalletData();
    getPreSale();
    recentActivity();
    reffetalData();   
      chartData();  
    
  }, []);

//   useEffect(() => {
//     console.log(firebase, "::OBJ");
// // const initMessaging = firebase.messaging();

//     const messaging = firebase.messaging();
//     messaging.requestPermission().then(()=>{
//       return messaging.getToken()
//     }).then(token=>{
//       console.log(token, "::TOKEN FIREBASE");
//     }).catch(error=> {
//       console.log(error);
//     })
//   }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    smlap: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <div>
      <div className="nk-app-root">
        <div className="nk-main ">
          <Menu />
          <div className="nk-wrap bg-light">
            <Header />
            <div className="container">
              <div className="shadow mt-3">
                <div id="carouselExConInd" class="carousel slide carousel-fade" data-bs-ride="carousel">
                  <ol class="carousel-indicators">
                    <li data-bs-target="#carouselExConInd" data-bs-slide-to="0" class="active"></li>
                    <li data-bs-target="#carouselExConInd" data-bs-slide-to="1"></li>
                  </ol>
                  <div class="carousel-inner">
                    <div class="carousel-item active"> <img src="images/slides/2.gif" class="d-block w-100" alt="carousel" />
                    </div>
                    <div class="carousel-item"> <img src="images/slides/1.png" class="d-block w-100"
                      alt="carousel" /> 
                    </div>
                  </div> 
                  <Link class="carousel-control-prev" to="#carouselExConInd" role="button" data-bs-slide="prev"> <span
                    class="carousel-control-prev-icon" aria-hidden="true"></span> <span class="visually-hidden">Previous</span>
                  </Link> <Link class="carousel-control-next" to="#carouselExConInd" role="button" data-bs-slide="next"> <span
                    class="carousel-control-next-icon" aria-hidden="true"></span> <span class="visually-hidden">Next</span> </Link>
                </div>
              
              </div>
            </div>
            {/* Add Slide small card */}
            <div className="container">
              <div className="row g-3 mt-4">
                {data.map((data) => {
                  return (
                    <Getpresale
                      levelname={data.levelname}
                      coinPrice={data.price}
                      coinQty={data.coinquantity}
                      duration={data.duration}
                      persent={data.persentsold}
                    />
                  );
                })}
              </div>
            </div>
            <div className="nk-content nk-content-fluid pt-0">
              <div className="container">
                <div className="nk-content-body">
                  <div className="nk-block-between-md g-4">
                    <div className="nk-block-head-content"></div>
                  </div>
                </div>

                <div className="nk-block">
                  <div className="row gy-gs">
                    <div className="col-lg-5 col-xl-4">
                      <div className="nk-block">
                        <div className="nk-block-head-xs">
                          <div className="nk-block-head-content">
                            <h5 className="nk-block-title title text-uppercase">{t('statistics')}</h5>
                          </div>
                        </div>
                        <div className="nk-block">
                          <div className="card card-bordered dark-green text-light shadow-sm h-100">
                            <div className="card-inner">
                              <div className="nk-wg7">
                                <div className="nk-wg7-stats">
                                  <div className="nk-wg7-title">
                                   {t('total_analog_buy')}
                                  </div>
                                  <div className="number-lg amount text-white">
                                    {totalAnalogBuy.toFixed(3)}
                                  </div>
                                </div>
                                <div className="nk-wg7-stats-group">
                                  <div className="nk-wg7-stats w-50">
                                    <div className="nk-wg7-title">{t('wallets')}</div>
                                    <div className="number-lg text-white">
                                      {totalWallet}
                                    </div>
                                  </div>
                                  <div className="nk-wg7-stats w-50" >
                                    <div className="nk-wg7-title">
                                      {(t('transactions'))}
                                    </div>
                                    <div className="number text-white">
                                      {totalTransaction}
                                    </div>
                                  </div>
                                </div>
                                <div className="nk-wg7-foot">
                                  <span className="nk-wg7-note">
                                    {t('last_activity_at')}{" "}
                                    <span>
                                      {/* {date} {time} */}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7 col-xl-8">
                      <div className="nk-block">
                        <div className="nk-block-head-xs">
                          <div className="nk-block-between-md g-2">
                            <div className="nk-block-head-content">
                              <h5 className="nk-block-title title">
                                {t('inceptive_wallets')}
                              </h5>
                            </div>
                            <div className="nk-block-head-content"></div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-4">
                            <div className="card bg-white shadow-sm hover_on_card">
                              <div className="nk-wgw sm">
                                <Link className="nk-wgw-inner" to="">
                                  <div className="nk-wgw-name">
                                    <div className="nk-wgw-icon bg-teal">
                                      <em className="icon ni ni-sign-btc"></em>
                                    </div>
                                    <h5 className="nk-wgw-title title text-uppercase">
                                      {t('inceptive')}
                                    </h5>
                                  </div>
                                  <div className="nk-wgw-balance">
                                    <div className="amount">  
                                          {
                                            inceptive 
                                            ? <>
                                              {
                                                userInfo?.currency_preference == "inr"
                                                ? (inceptive * oneUsdPrice).toFixed(3)
                                                : inceptive.toFixed(3)
                                              }
                                              </>
                                            : 0
                                          }
                                       <span className="currency currency-nio">
                                        {userInfo?.currency_preference == "inr"
                                          ? "INRX"
                                          : "USDT"}
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div
                            className="col-sm-4"
                            onClick={() => navigate("/Airdrop")}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="card bg-white shadow-sm hover_on_card">
                              <div className="nk-wgw sm">
                                <Link to="" className="nk-wgw-inner">
                                  <div className="nk-wgw-name">
                                    <div className="nk-wgw-icon bg-teal">
                                      <em className="icon ni ni-sign-btc"></em>
                                    </div>
                                    <h5 className="nk-wgw-title title">
                                      {t('airdrop')}
                                    </h5>
                                  </div>
                                  <div className="nk-wgw-balance">
                                    <div className="amount">
                                   
                                       {
                                            airdrop 
                                            ? <>
                                              {
                                                userInfo?.currency_preference == "inr"
                                                ? (airdrop * oneUsdPrice).toFixed(3)
                                                : airdrop?.toFixed(3) 
                                              }
                                              </>
                                            : 0
                                          }                                      
                                      
                                      <span className="currency currency-btc">
                                        {userInfo?.currency_preference == "inr"
                                          ? "INRX"
                                          : "USDT"}
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div
                            className="col-sm-4"
                            onClick={() =>
                              navigate("/Affiliate", { replace: true })
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <div className="card bg-white shadow-sm hover_on_card">
                              <div className="nk-wgw sm">
                                <Link className="nk-wgw-inner" to="">
                                  <div className="nk-wgw-name">
                                    <div className="nk-wgw-icon bg-teal">
                                      <em className="icon ni ni-sign-eth"></em>
                                    </div>
                                    <h5 className="nk-wgw-title title">
                                      {t('affiliatesA')}{" "}
                                    </h5>
                                  </div>
                                  <div className="nk-wgw-balance">
                                    <div className="amount">
                                      {userInfo?.currency_preference == "inr"
                                        ? (affiliates * oneUsdPrice)?.toFixed(3)
                                        : affiliates?.toFixed(3)}
                                      <span className="currency currency-eth">
                                        {userInfo?.currency_preference == "inr"
                                          ? "INRX"
                                          : "USDT"}
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="nk-block nk-block-md">
                        <div className="nk-block-head-xs">
                          <div className="nk-block-between-md g-2">
                            <div className="nk-block-head-content">
                              <h5 className="nk-block-title title">{t('growth')}</h5>
                            </div>
                            <div className="nk-block-head-content"></div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-4">
                            <div className="card bg-white shadow-sm hover_on_card">
                              <div className="nk-wgw sm">
                                <Link className="nk-wgw-inner" to="">
                                  <div className="nk-wgw-name">
                                    <div className="nk-wgw-icon bg-teal">
                                      <em className="icon ni ni-sign-btc"></em>
                                    </div>
                                    <h5 className="nk-wgw-title title">
                                      {t('inherited')}
                                    </h5>
                                  </div>
                                  <div className="nk-wgw-balance">
                                    <div className="amount ">
                                      {userInfo?.currency_preference == "inr"
                                        ? (inherited * oneUsdPrice)?.toFixed(3)
                                        : inherited?.toFixed(3)}
                                      <span className="currency currency-nio">
                                        {userInfo?.currency_preference == "inr"
                                          ? "INRX"
                                          : "USDT"}
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div
                            className="col-sm-4"
                            onClick={() => navigate("/Bounty")}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="card bg-white shadow-sm hover_on_card">
                              <div className="nk-wgw sm">
                                <Link to="" className="nk-wgw-inner">
                                  <div className="nk-wgw-name">
                                    <div className="nk-wgw-icon bg-teal">
                                      <em className="icon ni ni-sign-btc"></em>
                                    </div>
                                    <h5 className="nk-wgw-title title">
                                      {t('bounty')}{" "}
                                    </h5>
                                  </div>
                                  <div className="nk-wgw-balance">
                                    <div
                                      className="amount "
                                    // style={{ fontSize: "10px" }}
                                    >
                                      {/* [L<sup>1</sup> / L<sup>2</sup> / L
                                        <sup>3</sup>][1% / 0.5% / 0.2% ] */}

                                      {userInfo?.currency_preference == "inr"
                                        ? (bounty * oneUsdPrice)?.toFixed(3)
                                        : bounty?.toFixed(3)}
                                      <span className="currency currency-btc">
                                        {userInfo?.currency_preference == "inr"
                                          ? "INRX"
                                          : "USDT"}
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="card bg-white shadow-sm hover_on_card">
                              <div className="nk-wgw sm">
                                <Link className="nk-wgw-inner" to="">
                                  <div className="nk-wgw-name">
                                    <div className="nk-wgw-icon bg-teal">
                                      <em className="icon ni ni-sign-eth"></em>
                                    </div>
                                    <h5 className="nk-wgw-title title">
                                      {t('handout')}{" "}
                                    </h5>
                                  </div>
                                  <div className="nk-wgw-balance">
                                    <div className="amount">
                                      {userInfo?.currency_preference == "inr"
                                        ? (handOut * oneUsdPrice)?.toFixed(3)
                                        : handOut?.toFixed(3)}

                                      <span className="currency currency-eth">
                                        {userInfo?.currency_preference == "inr"
                                          ? "INRX"
                                          : "USDT"}
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="nk-block nk-block-lg">
                  <div className="row gy-gs">
                    <div className="col-md-6">
                      <div className="card-head">
                        <div className="card-title mb-0">
                          <h5 className="title text-uppercase">{t('recent_activites')}</h5>
                        </div>
                      </div>

                      <div className="tranx-list card card-bordered">
                        {recentLoad ? (
                          <div
                            style={{
                              position: "absolute",
                              zIndex: "99",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                            }}
                          >
                            <ThreeDots
                              ariaLabel="loading-indicator"
                              color="green"
                            />
                          </div>
                        ) : recentActivities.length > 0 ? (
                          recentActivities.map((data) => {
                            const d = new Date(data.createdAt);
                            return (
                              <div className="tranx-item">
                                <div className="tranx-col">
                                  <div className="tranx-info">
                                    <div className="tranx-data">
                                      <div className="tranx-label">
                                        {data?.type}&nbsp;
                                        {data?.compair_currency == "usd"
                                          ? "USDT"
                                          : "INRX"}
                                        {data.compair_currency == "usd" ? (
                                          <div className="p-1">
                                            <img
                                              src="./images/Usdt.png"
                                              style={{ width: "17px" }}
                                              alt="usdt"
                                            />
                                          </div>
                                        ) : (
                                          <div className="p-1">
                                            <img
                                              src="./images/Inrx_black.png"
                                              style={{ width: "17px" }}
                                              alt="inrx"
                                            />
                                          </div>
                                        )}
                                      </div>
                                      <div className="tranx-date">
                                        {d.toLocaleDateString()}{" "}
                                        {d.toLocaleTimeString()}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {data?.type == "Buy" ? (
                                  <div className="tranx-col">
                                    <div className="tranx-amount">
                                      <div className="number">
                                        {data.cVolume}
                                        <span className="currency currency-btc">
                                          ANA
                                        </span>
                                      </div>
                                      <div className="number-sm">
                                        @ {data?.pref_raw_price?.toFixed(3)}
                                        <span className="currency currency-usd">
                                          {" "}
                                          {data?.compair_currency == "inr"
                                            ? "INRX"
                                            : "USDT"}{" "}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="tranx-amount">
                                    <div className="number">
                                      {data?.amount?.toFixed(3)}
                                      <span className="currency currency-btc">
                                        {data?.compair_currency == "inr"
                                          ? "INRX"
                                          : "USDT"}
                                      </span>
                                    </div>
                                    {/* <div className="number-sm">
                                          @ {data?.pref_raw_price?.toFixed(2)}
                                          <span className="currency currency-usd"> {data?.compair_currency == 'inr' ? "INRX" : 'USDT'} </span>
                                        </div> */}
                                  </div>
                                )}
                              </div>
                            );
                          })
                        ) : (
                          <>
                            <div
                              className="tranx-item"
                              style={{ justifyContent: "center" }}
                            >
                              <div className="tranx-col">
                                <h4>{"Record not Found"}</h4>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card-head">
                        <div className="card-title mb-0">
                          <h5 className="title text-uppercase">{t('balance_flow')}</h5>
                        </div>
                      </div>
                      <div className="card card-bordered">
                        <div className="card-inner">
                           
                          <div className="nk-ck3">
                            {/* <canvas
                              className="chart-account-summary"
                              data={ summaryBalance } id= "summaryBalance"
                            ></canvas> */}
                            <Line data={summaryBalance} />
                            {/* options={lineOptions} */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="nk-block">
                  <div className="card card-bordered">
                    <div className="nk-refwg">
                      <div className="nk-refwg-invite card-inner">
                        <div className="nk-refwg-head g-3">
                          <div className="nk-refwg-title">
                            <h5 className="title">{t('refer_us_&_earn')}</h5>
                            <div className="text-soft">
                              {t('invite_link')}
                            </div>
                          </div>
                          <div className="nk-refwg-action">
                            <div>
                              <RWebShare
                                data={{
                                  text: "To Join the Analog , Click this link",
                                  url: `${FRONT_URL}/signup?ref=${userInfo?.user_id}`,
                                  title: "Analog Inceptive",
                                }}
                                onClick={() => console.log("shared successfully!")}
                              >
                                <button className="btn btn-outline-success">{t('invite')}</button>
                              </RWebShare>
                            </div>
                            {/* <Link to="" className="btn btn-primary">
                              Invite
                            </Link> */}
                          </div>
                        </div>
                        <div className="nk-refwg-url">
                          <div className="form-control-wrap">
                            <div
                              className="form-clip clipboard-init"
                              data-clipboard-target="#refUrl"
                              data-success="Copied"
                              data-text="Copy Link"
                            >
                              {/* <em className="clipboard-icon icon ni ni-copy"></em>{" "}
                              <span className="clipboard-text">Copy Link</span> */}
                              <CopyToClipboard
                                text={`${FRONT_URL}/signup?ref=${userInfo?.user_id}`}
                                onCopy={() => {
                                  setCopied(true);
                                  setTimeout(() => {
                                    setCopied(false);
                                  }, 800);
                                }}
                              >
                                <div>
                                  <em className="clipboard-icon icon ni ni-copy"></em>

                                  {/* <MdOutlineContentCopy color="white" /> */}
                                  {copied ? (
                                    <p
                                      className=" position-absolute"
                                      style={{
                                        fontSize: "13px",
                                        top: "-21px",
                                        left: "15px",
                                        padding: "3px 3px",
                                        backgroundColor: "#20c997",
                                        borderRadius: "3px",
                                        color: "white",
                                      }}
                                    >
                                      {t('copied')}
                                    </p>
                                  ) : null}
                                </div>
                              </CopyToClipboard>
                            </div>
                            <div className="form-icon">
                              <em className="icon ni ni-link-alt"></em>
                            </div>
                            <input
                              type="text"
                              className="form-control copy-text"
                              id="refUrl"
                              value={`${FRONT_URL}/signup?ref=${userInfo?.user_id}`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="nk-refwg-stats card-inner bg-lighter">
                        <div className="nk-refwg-group g-3">
                          <div className="nk-refwg-name">
                            <h6 className="title">
                              {t('my_referral')}{" "}
                              <em
                                className="icon ni ni-info"
                                data-toggle="tooltip"
                                data-placement="right"
                                title="Referral Informations"
                              ></em>
                            </h6>
                          </div>
                          <div className="nk-refwg-info g-3">
                            <div className="nk-refwg-sub">
                              <div className="title">{totalRef}</div>
                              <div className="sub-text">{t('total_joined')}</div>
                            </div>
                            <div className="nk-refwg-sub">
                              {/* <div className="title">{userInfo?.currency_preference == 'inr' ? `${refData?.totalIncome?.toFixed(2)} INRX` : 
                                `${(refData?.totalIncome / oneUsdPrice)?.toFixed(2)} USDT`
                              }</div> */}
                              {totalRefIncome > 0
                                ? userInfo?.currency_preference == "inr"
                                  ? `${totalRefIncome?.toFixed(3)}`
                                  : `${(totalRefIncome / oneUsdPrice)?.toFixed(
                                    3
                                  )}`
                                : 0}{" "}
                              &nbsp;&nbsp;
                              {userInfo?.currency_preference == "inr"
                                ? "INRX"
                                : "USDT"}
                              <div className="sub-text">{t('referral_earn')}</div>
                            </div>
                          </div>
                          <div className="nk-refwg-more dropdown mt-n1 mr-n1">
                            {/* <a
                                to=""
                                className="btn btn-icon btn-trigger"
                                data-toggle="dropdown"
                              >
                                <em className="icon ni ni-more-h"></em>
                              </Link> */}
                            {/* <div className="dropdown-menu dropdown-menu-xs dropdown-menu-right">
                                <ul className="link-list-plain sm">
                                  <li>
                                    <Link to="">7 days</Link>
                                  </li>
                                  <li>
                                    <Link to="">15 Days</Link>
                                  </li>
                                  <li>
                                    <Link to="">30 Days</Link>
                                  </li>
                                </ul>
                              </div> */}
                          </div>
                        </div>
                        <div className="nk-refwg-ck">
                          <canvas
                            className="chart-refer-stats"
                            id="refBarChart"
                          ></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="nk-block">
                  <div className="card card-bordered">
                    <div className="card-inner card-inner-lg">
                      <div className="align-center flex-wrap flex-md-nowrap g-4">
                        <div className="nk-block-image flex-shrink-0 bg-teal border rounded">
                          <div class="text-white"><span className="ni ni-headphone-fill fs-1"></span></div>
                        </div>
                        <div className="nk-block-content">
                          <div className="nk-block-content-head px-lg-4">
                            <h5>{t('we_are_here_to_help_you')}</h5>
                            <p className="text-soft">
                             {t('ask_for_support_support')}
                            </p>
                          </div>
                        </div>
                        <div className="nk-block-content flex-shrink-0">
                          <Link
                            to=""
                            className="btn btn-outline-success"
                          >
                            {t('get_support_now')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>

          < Mobile_Footer_Menu></Mobile_Footer_Menu>     
        
        </div>
       
      </div>
      
      
        <Modal
        onHide={handleClose}
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          INRX
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Ana</h4>
          <p>
           {t('dash')}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=> handleClose()}>Close</Button>
        </Modal.Footer>
      </Modal>
      
      
    </div>
    
    // </div>
  );
};
export default Home;

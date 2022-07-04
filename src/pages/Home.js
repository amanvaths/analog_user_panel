import React, {useEffect, useState } from "react";

import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import "react-multi-carousel/lib/styles.css";
import Getpresale from "../components/Getpresale";
import axios from "axios";
import { BASE_URL } from "../Api_connection/config";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSelector} from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';

import { RWebShare } from "react-web-share";




const Home = () => {
  const { user, userInfo, oneUsdPrice } = useSelector(
    (state) => state.user.value
  );
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



  const summaryBalance = {
    labels: chartLabel,
    dataUnit: "BTC",
    datasets: [
      {
        label: "Buy",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "#6baafe",
        borderColor: "#6baafe",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#0d6efd",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#0d6efd",
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
  const chartData = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/buyChart`, { email: email });
      const arr = res.data.data;
      console.log(arr, 'orid');
      arr.map((element, index)=>{
        total.push(element.total)
        year.push(`${element.month}/${element.year}`)
        console.log(`${element.month}/${element.year}`, "element");     
      })
      setChartAmt(total)
      setChartLabel(year)
    } catch (error) {
      console.log(error);
    }
  };

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

  const a = new Date(lastActivity);
  const date = a.toDateString();
  const time = a.toLocaleTimeString();

  useEffect(() => {
    getUserWalletData();
    getPreSale();
    recentActivity();
    reffetalData();
    chartData();
  }, [oneUsdPrice, userInfo]);

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
            {/* Add this code  */}
           {/* <div className="slide-container ">
              <Slide>
                {i?.map((slideImage, index) => {
                  return (
                    <div className="each-slide border border-" key={index}>
                      <div
                        style={{
                          backgroundImage: `url(http://localhost:3001${slideImage.banner})`,
                          // height: "250px",
                          width: "100%",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundAttachment: "fixed",
                        }}
                      >
                        <span
                          style={{
                            height: "250px",
                            display: "inline-block",
                            marginTop: "60px",
                          }}
                        >
                          {slideImage.caption}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </Slide>
              </div>*/}
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
                            <h5 className="nk-block-title title text-uppercase">Overflow</h5>
                          </div>
                        </div>
                        <div className="nk-block">
                          <div className="card card-bordered dark-green text-light shadow-sm h-100">
                            <div className="card-inner">
                              <div className="nk-wg7">
                                <div className="nk-wg7-stats">
                                  <div className="nk-wg7-title text-teal">
                                    TOTAL ANOLOG BUY  
                                  </div>
                                  <div className="number-lg amount text-white">
                                    {totalAnalogBuy.toFixed(2)}
                                  </div>
                                </div>
                                <div className="nk-wg7-stats-group">
                                  <div className="nk-wg7-stats w-50">
                                    <div className="nk-wg7-title text-teal">Wallets</div>
                                    <div className="number-lg text-white">
                                      {totalWallet}
                                    </div>
                                  </div>
                                  <div   className="nk-wg7-stats w-50" >
                                    <div className="nk-wg7-title text-teal">
                                      Transactions
                                    </div>
                                    <div className="number text-white">
                                      {totalTransaction}
                                    </div>
                                  </div>
                                </div>
                                <div className="nk-wg7-foot">
                                  <span className="nk-wg7-note text-teal">
                                    Last activity at{" "}
                                    <span>
                                      {date} {time}
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
                                INCEPTIVE WALLETS
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
                                      Inceptive
                                    </h5>
                                  </div>
                                  <div className="nk-wgw-balance">
                                    <div className="amount">
                                      {userInfo?.currency_preference == "inr"
                                        ? inceptive
                                        : (inceptive / oneUsdPrice).toFixed(2)}
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
                                      AIRDROP
                                    </h5>
                                  </div>
                                  <div className="nk-wgw-balance">
                                    <div className="amount">
                                      {userInfo?.currency_preference == "inr"
                                        ? airdrop
                                        : (airdrop / oneUsdPrice).toFixed(2)}
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
                                      AFFILIATES{" "}
                                    </h5>
                                  </div>
                                  <div className="nk-wgw-balance">
                                    <div className="amount">
                                      {userInfo?.currency_preference == "inr"
                                        ? (affiliates * oneUsdPrice)?.toFixed(2)
                                        : affiliates?.toFixed(2)}
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
                              <h5 className="nk-block-title title">GROWTH</h5>
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
                                      INHERITED
                                    </h5>
                                  </div>
                                  <div className="nk-wgw-balance">
                                    <div className="amount ">
                                      {userInfo?.currency_preference == "inr"
                                        ? (inherited * oneUsdPrice)?.toFixed(2)
                                        : inherited?.toFixed(2)}
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
                              <Link  to="" className="nk-wgw-inner">
                                  <div className="nk-wgw-name">
                                    <div className="nk-wgw-icon bg-teal">
                                      <em className="icon ni ni-sign-btc"></em>
                                    </div>
                                    <h5 className="nk-wgw-title title">
                                      BOUNTY{" "}
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
                                        ? (bounty * oneUsdPrice)?.toFixed(2)
                                        : bounty?.toFixed(2)}
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
                                      HANDOUT{" "}
                                    </h5>
                                  </div>
                                  <div className="nk-wgw-balance">
                                    <div className="amount">
                                      {userInfo?.currency_preference == "inr"
                                        ? (handOut * oneUsdPrice)?.toFixed(2)
                                        : handOut?.toFixed(2)}

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
                          <h5 className="title text-uppercase">Recent Activities</h5>
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
                            <Triangle
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
                                        {data?.type}
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
                                        {/* <em className="tranx-icon sm icon ni ni-sign-btc"></em> */}
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
                                        @ {data?.pref_raw_price?.toFixed(2)}
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
                          <h5 className="title text-uppercase">Balance Flow</h5>
                        </div>
                        {/* <div className="card-tools">
                            <ul className="card-tools-nav">
                              <li>
                                <Link to="">This Month</Link>
                              </li>
                              <li className="active">
                                <Link to="">This Years</Link>
                              </li>
                            </ul>
                          </div> */}
                      </div>
                      <div className="card card-bordered">
                        <div className="card-inner">
                          {/* <div className="nk-wg4">
                            <div className="nk-wg4-group justify-center gy-3 gx-4">
                              <div className="nk-wg4-item">
                                <div className="sub-text">
                                  <div
                                    className="dot dot-lg sq"
                                    data-bg="#5ce0aa"
                                  ></div>{" "}
                                  <span>Received</span>
                                </div>
                              </div>
                              <div className="nk-wg4-item">
                                <div className="sub-text">
                                  <div
                                    className="dot dot-lg sq"
                                    data-bg="#798bff"
                                  ></div>{" "}
                                  <span>Send</span>
                                </div>
                              </div>
                              <div className="nk-wg4-item">
                                <div className="sub-text">
                                  <div
                                    className="dot dot-lg sq"
                                    data-bg="#f6ca3e"
                                  ></div>
                                  <span>Withdraw</span>
                                </div>
                              </div>
                            </div>
                          </div> */}
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
                          <h5 className="title">Refer Us &amp; Earn</h5>
                            <div className="text-soft">
                            Click on "Invite" Button &amp; share below  link to invite your friends
                            </div>
                          </div>
                          <div className="nk-refwg-action">
                             <div>
                              <RWebShare
                                data={{
                                  text: "Like humans, flamingos make friends for life",
                                  url: `http://localhost:3000/signup?ref=${userInfo?.user_id}`,
                                  title: "Flamingos",
                                }}
                                onClick={() => console.log("shared successfully!")}
                              >
                                <button className="btn btn-outline-success">Invite</button>
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
                                text={`http://localhost:3000/signup?ref=${userInfo?.user_id}`}
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
                                        borderRadius:"3px",
                                        color: "white",
                                      }}
                                    >
                                      Copied
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
                              value={`http://localhost:3000/signup?ref=${userInfo?.user_id}`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="nk-refwg-stats card-inner bg-lighter">
                        <div className="nk-refwg-group g-3">
                          <div className="nk-refwg-name">
                            <h6 className="title">
                              My Referral{" "}
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
                              <div className="sub-text">Total Joined</div>
                            </div>
                            <div className="nk-refwg-sub">
                              {/* <div className="title">{userInfo?.currency_preference == 'inr' ? `${refData?.totalIncome?.toFixed(2)} INRX` : 
                                `${(refData?.totalIncome / oneUsdPrice)?.toFixed(2)} USDT`
                              }</div> */}
                              {totalRefIncome > 0
                                ? userInfo?.currency_preference == "inr"
                                  ? `${totalRefIncome?.toFixed(2)}`
                                  : `${(totalRefIncome / oneUsdPrice)?.toFixed(
                                      2
                                    )}`
                                : 0}{" "}
                              &nbsp;&nbsp;
                              {userInfo?.currency_preference == "inr"
                                ? "INRX"
                                : "USDT"}
                              <div className="sub-text">Referral Earn</div>
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
                            <h5>We’re here to help you!</h5>
                            <p className="text-soft">
                              Ask a question or file a support ticket, manage
                              request, report an issues. Our support team
                              will get back to you by email.
                            </p>
                          </div>
                        </div>
                        <div className="nk-block-content flex-shrink-0">
                          <Link
                            to=""
                            className="btn btn-outline-success"
                          >
                            Get Support Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
    // </div>
  );
};
export default Home;

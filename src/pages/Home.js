import React, { Component } from "react";
import Particles from "react-particles-js";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Getpresale from "../components/Getpresale";
import axios from "axios";

// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

const slideImages = [
  {
    url: "https://wallpapercave.com/wp/wp2623839.jpg",
    caption: "",
  },
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKV5XdFI6TRWC8i70IfDJ4OqMG5s2JUonVvms3PQkmXcLMvd3RFHCWhyGqoRbfHESHhfc&usqp=CAU",
    caption: "",
  },
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREJ7DJ1_P2Cwa7MpAwaGx20UQ9acGTy3irShNRat3Wx01RxGDXXkZk9l-2aqLcL8BVmXo&usqp=CAU",
    caption: "",
  },
];

class Home extends React.Component {
  state = {
    res: [],
  };
  componentDidMount() {
    axios.get("http://localhost:3001/api/getpresale").then((res) => {
      console.log(res.data.user_data, "res frefdfd");
      this.setState({ res: res.data.user_data });
      console.log(this.state.res, 
        '::data')
    });
  }

  

  render() {
    console.log(this.state.res[0]?.levelname, "Respons ");
    const responsive = {
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    };
    return (
      <div>
        <div className="nk-app-root">
          <div className="nk-main ">
            <Menu />

            <div className="nk-wrap ">
              <Header />
              {/* Add this code  */}
              <div className="slide-container">
                <Slide>
                  {slideImages.map((slideImage, index) => (
                    <div className="each-slide" key={index}>
                      <div
                        style={{
                          backgroundImage: `url(${slideImage.url})`,
                          height: "250px",
                          width: "100%",
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
                  ))}
                </Slide>
              </div>
              {/* Add Slide small card */}
              <Carousel
                responsive={responsive}
                arrows={false}
                itemclassName="carousel-item-padding-80-px"
                containerclassName="carousel-container"
                // className="position-absolute top-50 start-50 translate-middle"
              >
                {
              

                this.state.res.map((data) => {
                  console.log(data.levelname, "level name");
                  return (
                    <Getpresale
                      levelname={data.levelname}
                      coinPrice={data.price}
                      coinQty={data.coinquantity}
                      duration={data.duration}
                    />
                  );
                })
                }
              </Carousel>

              <div className="nk-content nk-content-fluid">
                <div className="container-xl wide-lg">
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
                              <h5 className="nk-block-title title">Overview</h5>
                            </div>
                          </div>
                          <div className="nk-block">
                            <div className="card card-bordered text-light is-dark h-100">
                              <div className="card-inner">
                                <div className="nk-wg7">
                                  <div className="nk-wg7-stats">
                                    <div className="nk-wg7-title">
                                      TOTAL ANOLOG BUY
                                    </div>
                                    <div className="number-lg amount">
                                      179,850.950
                                    </div>
                                  </div>
                                  <div className="nk-wg7-stats-group">
                                    <div className="nk-wg7-stats w-50">
                                      <div className="nk-wg7-title">Wallets</div>
                                      <div className="number-lg">5</div>
                                    </div>
                                    <div className="nk-wg7-stats w-50">
                                      <div className="nk-wg7-title">
                                        Transactions
                                      </div>
                                      <div className="number">34,405</div>
                                    </div>
                                  </div>
                                  <div className="nk-wg7-foot">
                                    <span className="nk-wg7-note">
                                      Last activity at <span>19 Nov, 2019</span>
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
                          <div className="row g-2">
                            <div className="col-sm-4">
                              <div className="card bg-light">
                                <div className="nk-wgw sm">
                                  <a
                                    className="nk-wgw-inner"
                                    href="html/crypto/wallet-bitcoin.html"
                                  >
                                    <div className="nk-wgw-name">
                                      <div className="nk-wgw-icon">
                                        <em className="icon ni ni-sign-btc"></em>
                                      </div>
                                      <h5 className="nk-wgw-title title">
                                        INCEPTIVE
                                      </h5>
                                    </div>
                                    <div className="nk-wgw-balance">
                                      <div className="amount">
                                        4.434953
                                        <span className="currency currency-nio">
                                          INRX
                                        </span>
                                      </div>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="card bg-light">
                                <div className="nk-wgw sm">
                                  <a
                                    className="nk-wgw-inner"
                                    href="html/crypto/wallet-bitcoin.html"
                                  >
                                    <div className="nk-wgw-name">
                                      <div className="nk-wgw-icon">
                                        <em className="icon ni ni-sign-btc"></em>
                                      </div>
                                      <h5 className="nk-wgw-title title">
                                        AIRDROP
                                      </h5>
                                    </div>
                                    <div className="nk-wgw-balance">
                                      <div className="amount">
                                        4.434953
                                        <span className="currency currency-btc">
                                          INRX
                                        </span>
                                      </div>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="card bg-light">
                                <div className="nk-wgw sm">
                                  <a className="nk-wgw-inner" href="#">
                                    <div className="nk-wgw-name">
                                      <div className="nk-wgw-icon">
                                        <em className="icon ni ni-sign-eth"></em>
                                      </div>
                                      <h5 className="nk-wgw-title title">
                                        AFFILIATES{" "}
                                      </h5>
                                    </div>
                                    <div className="nk-wgw-balance">
                                      <div className="amount">
                                        0.000560
                                        <span className="currency currency-eth">
                                          INRX
                                        </span>
                                      </div>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="nk-block nk-block-md">
                          <div className="nk-block-head-xs">
                            <div className="nk-block-between-md g-2">
                              <div className="nk-block-head-content">
                                <h6 className="nk-block-title title">GROWTH</h6>
                              </div>
                              <div className="nk-block-head-content"></div>
                            </div>
                          </div>
                          <div className="row g-2">
                            <div className="col-sm-4">
                              <div className="card bg-light">
                                <div className="nk-wgw sm">
                                  <a className="nk-wgw-inner" href="#">
                                    <div className="nk-wgw-name">
                                      <div className="nk-wgw-icon">
                                        <em className="icon ni ni-sign-btc"></em>
                                      </div>
                                      <h5 className="nk-wgw-title title">
                                        INHERITED
                                      </h5>
                                    </div>
                                    <div className="nk-wgw-balance">
                                      <div className="amount">
                                        1.5%
                                        <span className="currency currency-nio">
                                          INRX
                                        </span>
                                      </div>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="card bg-light">
                                <div className="nk-wgw sm">
                                  <a
                                    className="nk-wgw-inner"
                                    href="html/crypto/wallet-bitcoin.html"
                                  >
                                    <div className="nk-wgw-name">
                                      <div className="nk-wgw-icon">
                                        <em className="icon ni ni-sign-btc"></em>
                                      </div>
                                      <h5 className="nk-wgw-title title">
                                        BOUNTY{" "}
                                      </h5>
                                    </div>
                                    <div className="nk-wgw-balance">
                                      <div
                                        className="amount"
                                        // style={{ fontSize: "10px" }}
                                      >
                                        {/* [L<sup>1</sup> / L<sup>2</sup> / L
                                        <sup>3</sup>][1% / 0.5% / 0.2% ] */}
                                        4.434953
                                        <span className="currency currency-btc">
                                          INRX
                                        </span>
                                      </div>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="card bg-light">
                                <div className="nk-wgw sm">
                                  <a
                                    className="nk-wgw-inner"
                                    href="html/crypto/wallet-bitcoin.html"
                                  >
                                    <div className="nk-wgw-name">
                                      <div className="nk-wgw-icon">
                                        <em className="icon ni ni-sign-eth"></em>
                                      </div>
                                      <h5 className="nk-wgw-title title">
                                        HANDOUT{" "}
                                      </h5>
                                    </div>
                                    <div className="nk-wgw-balance">
                                      <div className="amount">
                                        0.5%
                                        <span className="currency currency-eth">
                                          INRX
                                        </span>
                                      </div>
                                    </div>
                                  </a>
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
                          <div className="card-title  mb-0">
                            <h5 className="title">Recent Activities</h5>
                          </div>
                          <div className="card-tools">
                            <ul className="card-tools-nav">
                              <li>
                                <a href="#">Buy</a>
                              </li>
                              <li>
                                <a href="#">Sell</a>
                              </li>
                              <li className="active">
                                <a href="#">All</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="tranx-list card card-bordered">
                          <div className="tranx-item">
                            <div className="tranx-col">
                              <div className="tranx-info">
                                <div className="tranx-data">
                                  <div className="tranx-label">
                                    Buy ANA{" "}
                                    <em className="tranx-icon sm icon ni ni-sign-btc"></em>
                                  </div>
                                  <div className="tranx-date">
                                    Nov 12, 2019 11:34 PM
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="tranx-col">
                              <div className="tranx-amount">
                                <div className="number">
                                  5384{" "}
                                  <span className="currency currency-btc">ANA</span>
                                </div>
                                <div className="number-sm">
                                  3,980.93{" "}
                                  <span className="currency currency-usd">USD</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="tranx-item">
                            <div className="tranx-col">
                              <div className="tranx-info">
                                <div className="tranx-data">
                                  <div className="tranx-label">
                                    Buy Shield{" "}
                                    <span className="tranx-icon sm">
                                      <img src="images/coins/eth.svg" alt="" />
                                    </span>
                                  </div>
                                  <div className="tranx-date">
                                    Nov 12, 2019 11:34 PM
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="tranx-col">
                              <div className="tranx-amount">
                                <div className="number">
                                  17.6{" "}
                                  <span className="currency currency-btc">ANA</span>
                                </div>
                                <div className="number-sm">
                                  1,176.34{" "}
                                  <span className="currency currency-usd">USD</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="tranx-item">
                            <div className="tranx-col">
                              <div className="tranx-info">
                                <div className="tranx-data">
                                  <div className="tranx-label">
                                    Buy ET{" "}
                                    <em className="tranx-icon sm icon ni ni-sign-btc"></em>
                                  </div>
                                  <div className="tranx-date">
                                    Nov 12, 2019 11:34 PM
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="tranx-col">
                              <div className="tranx-amount">
                                <div className="number">
                                  1000{" "}
                                  <span className="currency currency-btc">ANA</span>
                                </div>
                                <div className="number-sm">
                                  3,980.93{" "}
                                  <span className="currency currency-usd">USD</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="tranx-item">
                            <div className="tranx-col">
                              <div className="tranx-info">
                                <div className="tranx-data">
                                  <div className="tranx-label">
                                    Sell ANA{" "}
                                    <span className="tranx-icon sm">
                                      <img src="images/coins/eth.svg" alt="" />
                                    </span>
                                  </div>
                                  <div className="tranx-date">
                                    Nov 12, 2019 11:34 PM
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="tranx-col">
                              <div className="tranx-amount">
                                <div className="number">
                                  1.538405{" "}
                                  <span className="currency currency-btc">ANA</span>
                                </div>
                                <div className="number-sm">
                                  1,176.34{" "}
                                  <span className="currency currency-usd">USD</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="card-head">
                          <div className="card-title mb-0">
                            <h5 className="title">Balance Flow</h5>
                          </div>
                          <div className="card-tools">
                            <ul className="card-tools-nav">
                              <li>
                                <a href="#">This Month</a>
                              </li>
                              <li className="active">
                                <a href="#">This Years</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="card card-bordered">
                          <div className="card-inner">
                            <div className="nk-wg4">
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
                            </div>
                            <div className="nk-ck3">
                              <canvas
                                className="chart-account-summary"
                                id="summaryBalance"
                              ></canvas>
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
                              <h5 className="title">Refer Us & Earn</h5>
                              <div className="title-sub">
                                Use the bellow link to invite your friends.
                              </div>
                            </div>
                            <div className="nk-refwg-action">
                              <a href="#" className="btn btn-primary">
                                Invite
                              </a>
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
                                <em className="clipboard-icon icon ni ni-copy"></em>{" "}
                                <span className="clipboard-text">Copy Link</span>
                              </div>
                              <div className="form-icon">
                                <em className="icon ni ni-link-alt"></em>
                              </div>
                              <input
                                type="text"
                                className="form-control copy-text"
                                id="refUrl"
                                value="https://inceptive.network/?ref=Ia5ghTL2paqchJTR65nBKvZ"
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
                                <div className="title">394</div>
                                <div className="sub-text">Total Joined</div>
                              </div>
                              <div className="nk-refwg-sub">
                                <div className="title">548.49</div>
                                <div className="sub-text">Referral Earn</div>
                              </div>
                            </div>
                            <div className="nk-refwg-more dropdown mt-n1 mr-n1">
                              <a
                                href="#"
                                className="btn btn-icon btn-trigger"
                                data-toggle="dropdown"
                              >
                                <em className="icon ni ni-more-h"></em>
                              </a>
                              <div className="dropdown-menu dropdown-menu-xs dropdown-menu-right">
                                <ul className="link-list-plain sm">
                                  <li>
                                    <a href="#">7 days</a>
                                  </li>
                                  <li>
                                    <a href="#">15 Days</a>
                                  </li>
                                  <li>
                                    <a href="#">30 Days</a>
                                  </li>
                                </ul>
                              </div>
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
                          <div className="nk-block-image w-120px flex-shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 120 118"
                            >
                              <path
                                d="M8.916,94.745C-.318,79.153-2.164,58.569,2.382,40.578,7.155,21.69,19.045,9.451,35.162,4.32,46.609.676,58.716.331,70.456,1.845,84.683,3.68,99.57,8.694,108.892,21.408c10.03,13.679,12.071,34.71,10.747,52.054-1.173,15.359-7.441,27.489-19.231,34.494-10.689,6.351-22.92,8.733-34.715,10.331-16.181,2.192-34.195-.336-47.6-12.281A47.243,47.243,0,0,1,8.916,94.745Z"
                                transform="translate(0 -1)"
                                fill="#f6faff"
                              />
                              <rect
                                x="18"
                                y="32"
                                width="84"
                                height="50"
                                rx="4"
                                ry="4"
                                fill="#fff"
                              />
                              <rect
                                x="26"
                                y="44"
                                width="20"
                                height="12"
                                rx="1"
                                ry="1"
                                fill="#e5effe"
                              />
                              <rect
                                x="50"
                                y="44"
                                width="20"
                                height="12"
                                rx="1"
                                ry="1"
                                fill="#e5effe"
                              />
                              <rect
                                x="74"
                                y="44"
                                width="20"
                                height="12"
                                rx="1"
                                ry="1"
                                fill="#e5effe"
                              />
                              <rect
                                x="38"
                                y="60"
                                width="20"
                                height="12"
                                rx="1"
                                ry="1"
                                fill="#e5effe"
                              />
                              <rect
                                x="62"
                                y="60"
                                width="20"
                                height="12"
                                rx="1"
                                ry="1"
                                fill="#e5effe"
                              />
                              <path
                                d="M98,32H22a5.006,5.006,0,0,0-5,5V79a5.006,5.006,0,0,0,5,5H52v8H45a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2H73a2,2,0,0,0,2-2V94a2,2,0,0,0-2-2H66V84H98a5.006,5.006,0,0,0,5-5V37A5.006,5.006,0,0,0,98,32ZM73,94v4H45V94Zm-9-2H54V84H64Zm37-13a3,3,0,0,1-3,3H22a3,3,0,0,1-3-3V37a3,3,0,0,1,3-3H98a3,3,0,0,1,3,3Z"
                                transform="translate(0 -1)"
                                fill="#798bff"
                              />
                              <path
                                d="M61.444,41H40.111L33,48.143V19.7A3.632,3.632,0,0,1,36.556,16H61.444A3.632,3.632,0,0,1,65,19.7V37.3A3.632,3.632,0,0,1,61.444,41Z"
                                transform="translate(0 -1)"
                                fill="#6576ff"
                              />
                              <path
                                d="M61.444,41H40.111L33,48.143V19.7A3.632,3.632,0,0,1,36.556,16H61.444A3.632,3.632,0,0,1,65,19.7V37.3A3.632,3.632,0,0,1,61.444,41Z"
                                transform="translate(0 -1)"
                                fill="none"
                                stroke="#6576ff"
                                stroke-miterlimit="10"
                                stroke-width="2"
                              />
                              <line
                                x1="40"
                                y1="22"
                                x2="57"
                                y2="22"
                                fill="none"
                                stroke="#fffffe"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                              <line
                                x1="40"
                                y1="27"
                                x2="57"
                                y2="27"
                                fill="none"
                                stroke="#fffffe"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                              <line
                                x1="40"
                                y1="32"
                                x2="50"
                                y2="32"
                                fill="none"
                                stroke="#fffffe"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                              <line
                                x1="30.5"
                                y1="87.5"
                                x2="30.5"
                                y2="91.5"
                                fill="none"
                                stroke="#9cabff"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <line
                                x1="28.5"
                                y1="89.5"
                                x2="32.5"
                                y2="89.5"
                                fill="none"
                                stroke="#9cabff"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <line
                                x1="79.5"
                                y1="22.5"
                                x2="79.5"
                                y2="26.5"
                                fill="none"
                                stroke="#9cabff"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <line
                                x1="77.5"
                                y1="24.5"
                                x2="81.5"
                                y2="24.5"
                                fill="none"
                                stroke="#9cabff"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <circle
                                cx="90.5"
                                cy="97.5"
                                r="3"
                                fill="none"
                                stroke="#9cabff"
                                stroke-miterlimit="10"
                              />
                              <circle
                                cx="24"
                                cy="23"
                                r="2.5"
                                fill="none"
                                stroke="#9cabff"
                                stroke-miterlimit="10"
                              />
                            </svg>
                          </div>
                          <div className="nk-block-content">
                            <div className="nk-block-content-head px-lg-4">
                              <h5>We’re here to help you!</h5>
                              <p className="text-soft">
                                Ask a question or file a support ticket, mANAge
                                request, report an issues. Our team support team
                                will get back to you by email.
                              </p>
                            </div>
                          </div>
                          <div className="nk-block-content flex-shrink-0">
                            <a href="#" className="btn btn-lg btn-outline-primary">
                              Get Support Now
                            </a>
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
  }
}
export default Home;

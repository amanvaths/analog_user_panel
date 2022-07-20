import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../Api_connection/config";
import AffiliatCard from "../components/AffiliateCard";
import {ThreeDots } from 'react-loader-spinner'
import { MdMoreHoriz } from 'react-icons/md'
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";


const Affiliate = (props) => {

  const { user, userInfo, oneUsdPrice } = useSelector((state) => state.user.value)
  const email = user?.email
  const [affiliates, setAffiliates] = useState([]);
  const [level, setLevel] = useState(1)

  const [level1, setLevel1] = useState(true)
  const [level2, setLevel2] = useState(false)
  const [level3, setLevel3] = useState(false)
  const [tab, setTab] = useState([]);
  // const [tab2, setTab2] = useState([]);
  // const [tab3, setTab3] = useState([]);
  const [loader, setLoader] = useState(false)
  const [status, setStatus] = useState()
  const [total, setTotal] = useState(0)
  const [currentPage1, setCurrentPage1] = useState(1)
  const [currentPage2, setCurrentPage2] = useState(1)
  const [currentPage3, setCurrentPage3] = useState(1)
  // const [tableData, setTableData] = useState(false)

  const [load, setLoad] = useState(false)

  const getAffiliate = async () => {
    try {
      // console.log(email, " user email asjljasf")
      const arr = [];
      const data = await axios.post(`${BASE_URL}/refferalLevelWiseData`, { email: email })
      arr.push(Object.keys(data.data.data))
      arr.push(data.data.data);
      setLoad(true)
      setAffiliates(arr);
    } catch (error) {
      // console.log("Error in getting data Affililate :" + error);
    }
  }
  const limit = 5
  const getAffiliateList = async (level, selelcted) => {
    const data = await axios.post(`${BASE_URL}/levelWiseList`, { email: email, level: level })
    
    if (data) {
      setTotal(data.data.data)
      setStatus(data.data.status)
      // setLoader(false)
      const startIndex = (selelcted + 1) * limit - limit;
      const endIndex = (startIndex + limit)
      setTab((data.data.data).slice(startIndex, endIndex));
      // setTab2((data.data.data).slice(startIndex, endIndex));
      // setTab3((data.data.data).slice(startIndex, endIndex));
      // setStatus(data.data.status)
      // setLoader(false)
      // setTableData(true)
    }
  }

  const handelPagination = (selelcted) => {
    // console.log(selelcted);
    let limit = 5
    const startIndex = (selelcted + 1) * limit - limit;
    const endIndex = (startIndex + limit)
    setTab((total).slice(startIndex, endIndex));
    // setTab2((total).slice(startIndex, endIndex));
    // setTab3((total).slice(startIndex, endIndex));


    // setTableData(true)
  }

  useEffect(() => {
    setLevel(1)
    getAffiliate(level);
    getAffiliateList(level, 0)
    // handelPagination()
  }, []);

  return (
    <div>
      <div className="nk-app-root">
        <div className="nk-main">
          <Menu />
          <div className="nk-wrap">
            <Header />
            {/* Add This Line  */}

            <div className="container-xl tableContainer">
              <div className="nk-content-body" style={{ marginTop: 50, width: "100%", padding: "10px -70%" }}>
                <div className="nk-block-head nk-block-head-sm">
                  <div className="nk-block-between position-relative">
                    <div className="nk-block-head-content ">
                      <h3 className="nk-block-title page-title">
                        Affiliates
                      </h3>
                      <div className="nk-block-des text-soft">
                        <p>{`Your Affiliates`}</p>
                      </div>
                    </div>
                    <div className="nk-block-head-content affiliates">
                      <div className="toggle-wrap nk-block-tools-toggle">
                        <Link
                          to=""
                          className="btn btn-icon btn-trigger toggle-expand me-n1"
                          data-target="pageMenu"
                        >
                          <em className="icon ni ni-menu-alt-r"></em>
                        </Link>
                        <div
                          className="toggle-expand-content"
                          data-content="pageMenu"
                        >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">{
                  load ?
                    affiliates.length > 0 ?
                      affiliates[0].map((item, index) => {
                        return (
                          <AffiliatCard
                            level={`Level ${index + 1}`}
                            totalUser={affiliates[1][item].totalUsers}
                            totalAnalogBuy={`${affiliates[1][item].totalAna.toFixed(2)} ANA`}
                            totalExpence={userInfo.currency_preference == 'usd' ? `${affiliates[1][item].totalExpense.toFixed(2)} USDT` : `${(affiliates[1][item].totalExpense * oneUsdPrice).toFixed(3)} INRX`}
                            totalAffiliates={userInfo.currency_preference == 'usd' ? `${affiliates[1][item].totalInc.toFixed(3)} USDT` : `${(affiliates[1][item].totalInc * oneUsdPrice).toFixed(3)} INRX`}
                            widthdrawl={0}
                            toalRemaining={0}
                          />
                        )
                      }) :
                      <div className="nk-tb-item">
                        <h3 className="text-center">No Record Found</h3>
                      </div>
                    :
                    <div style={{ position: "absolute", zIndex: "99", top: "29%", left: "108%", transform: "translate(-50%, -50%)" }}>
                      <ThreeDots heigth="100" width="100" color="#1ee0ac" ariaLabel="loading-indicator" />
                    </div>}
                </div>
                <div className="row my-4">
                  <div className="nk-content-wrap">
                    <div className="nk-block-head">
                      <div className="nk-block-between">
                        <div className="nk-block-head-content">
                          <h3 className="nk-block-title page-title">
                            Affiliate List
                          </h3>
                          <div className="nk-block-des text-soft">
                            <ul className="nk-block-tools g-3" style={{ paddingLeft: "0px" }}>
                              <li>
                                <Link to="" className={level1 ? 'btn btn-white btn-dim btn-outline-success active' :
                                  "btn btn-white btn-dim btn-outline-success"} onClick={() => {
                                    setLevel1(true)
                                    setLevel2(false)
                                    setLevel3(false)
                                    setTotal(0)
                                    setTab([])
                                    setCurrentPage1(1)
                                    getAffiliateList(1, 0)
                                  }}>
                                  <span>Level 1</span></Link>
                              </li>
                              <li>
                                <Link to="" className={level2 ? 'btn btn-white btn-dim btn-outline-success active' :
                                  "btn btn-white btn-dim btn-outline-success"} onClick={() => {
                                    setLevel1(false)
                                    setLevel2(true)
                                    setLevel3(false)
                                    setTab([])
                                    setTotal(0)
                                    setCurrentPage2(1)
                                    getAffiliateList(2, 0)
                                  }}>
                                  <span>Level 2</span></Link>
                              </li>
                              <li>
                                <Link to="" className={level3 ? 'btn btn-white btn-dim btn-outline-success active' :
                                  "btn btn-white btn-dim btn-outline-success"} onClick={() => {
                                    setLevel1(false)
                                    setLevel2(false)
                                    setLevel3(true)
                                    setTotal(0)
                                    setTab([])
                                    setCurrentPage3(1)
                                    getAffiliateList(3, 0)
                                  }}>
                                  <span>Level 3</span></Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="nk-block-head-content">
                          <div className="toggle-wrap nk-block-tools-toggle">
                            <Link
                              to=""
                              className="btn btn-icon btn-trigger toggle-expand mr-n1"
                              data-target="pageMenu"
                            >
                              <em className="icon ni ni-menu-alt-r"></em>
                            </Link>
                            <div
                              className="toggle-expand-content"
                              data-content="pageMenu">
                              <ul className="nk-block-tools g-3">
                                <li>
                                  <Link
                                    to={'/Withdrawal'}
                                    className="btn btn-outline-warning"
                                  > <span>Withdraw</span>
                                  </Link>
                                </li>

                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Level 1 */}
                    {level1 == true ?
                      <div className="nk-block">
                        <div className="card border-0 card-stretch">
                          <div className="card-inner-group bg-light border rounded p-4">
                            <div className="card bg-white shadow-sm">
                              <div className="card-inner py-3">
                                <div className="card-title-group">
                                  <div className="card-tools">
                                    <div className="form-inline flex-nowrap gx-3">
                                      <h5>Level 1</h5>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="nk-tb-list nk-tb-ulist is-compact">
                                <div className="nk-tb-item nk-tb-head">
                                  <div className="nk-tb-col tb-col-sm">
                                    {/* <span className="font-weight-bold">S. N.</span> */}
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">S. N.</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">Email</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">Total Purchased</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">Total Expense</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">Affiliate Rcvd (5%)</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">Handout</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">View</span>
                                  </div>
                                </div>
                                {
                                  status == 2 ? <h5>Record Not Found</h5> :
                                    tab.length > 0 ?

                                      tab.map((element, index) => {
                                        // console.log(index, "::INDEx");
                                        return (
                                          <div className="nk-tb-item ">

                                            <div className="nk-tb-col tb-col-sm">
                                            </div>
                                            <div className="nk-tb-col tb-col-sm">
                                              <span className="nk-activity-media user-avatar xs bg-teal">{(((currentPage1 - 1) * 5) + index + 1)}</span>
                                            </div>
                                            <div className="nk-tb-col tb-col-sm">
                                              <span className="text-dark">{element.email}</span>
                                            </div>
                                            <div className="nk-tb-col tb-col-sm">
                                              <span className="text-danger">{element?.totalBuy?.toFixed(2)} ANA</span>
                                              <img alt="analog" src="./images/Analog.png" style={{ width: "24px" }} />
                                            </div>
                                            <div className="nk-tb-col tb-col-sm">
                                              <span className="text-danger">
                                                {
                                                  userInfo?.currency_preference == 'usd' ? `${element?.totalExp?.toFixed(2)} USDT` : `${(element?.totalExp * oneUsdPrice)?.toFixed(2)} INRX`


                                                }
                                                {userInfo?.currency_preference == "usd" ? (
                                                  <img
                                                    src="./images/usdt_icon.png"
                                                    style={{ width: "17px", paddingLeft: "1px" }}
                                                    alt="usdt"

                                                  />) : (
                                                  <img
                                                    src="./images/Inrx_black.png"
                                                    style={{ width: "17px", marginLeft: "5px" }}
                                                    alt="inrx"
                                                  />)}
                                              </span>

                                            </div>
                                            <div className="nk-tb-col tb-col-sm">
                                              <span className="text-danger">
                                                {
                                                  userInfo?.currency_preference == 'usd' ? `${element?.totalAff?.toFixed(2)} USDT` : `${(element?.totalAff * oneUsdPrice).toFixed(2)} INRX`
                                                }
                                                {userInfo?.currency_preference == "usd" ? (
                                                  <img
                                                    src="./images/usdt_icon.png"
                                                    style={{ width: "17px", paddingLeft: "1px" }}
                                                    alt="usdt"

                                                  />) : (
                                                  <img
                                                    src="./images/Inrx_black.png"
                                                    style={{ width: "17px", marginLeft: "5px" }}
                                                    alt="inrx"
                                                  />)}
                                              </span>
                                            </div>
                                            <div className="nk-tb-col tb-col-sm">
                                              <span className="text-success">
                                                {
                                                  userInfo?.currency_preference == 'usd' ? `${element?.totalHandout?.toFixed(2)} USDT` : `${(element?.totalHandout * oneUsdPrice).toFixed(2)} INRX`
                                                }
                                                {userInfo?.currency_preference == "usd" ? (
                                                  <img
                                                    src="./images/usdt_icon.png"
                                                    style={{ width: "17px", paddingLeft: "1px" }}
                                                    alt="usdt"

                                                  />) : (
                                                  <img
                                                    src="./images/Inrx_black.png"
                                                    style={{ width: "17px", marginLeft: "5px" }}
                                                    alt="inrx"
                                                  />)}
                                              </span>
                                            </div>
                                            <div className="nk-tb-col tb-col-sm">
                                              <span className="text-dark">Action</span>
                                            </div>

                                          </div>
                                        )
                                      })
                                      :
                                      <div className="w-100">
                                        <ThreeDots heigth="20" width="40 " color="#1ee0ac" ariaLabel="loading-indicator" />
                                        </div>
                                      
                                } </div>
                            </div>
                          </div>
                          {
                            total.length > 5 ? <div className="card-inner">
                            <ReactPaginate
                              previousLabel={'Prev'}
                              nextLabel={'Next'}
                              breakLabel={"..."}
                              pageCount={Math.ceil(total.length / 5)}
                              marginPagesDisplayed={3}
                              pageRangeDisplayed={3}
                              onPageChange={(data) => {
                                handelPagination(data.selected)
                                setCurrentPage1(data.selected + 1)
                              }}
                              containerClassName={'pagination justify-content-center'}
                              pageClassName={'page-item'}
                              pageLinkClassName={'page-link'}
                              previousClassName={'page-item'}
                              previousLinkClassName={'page-link'}
                              nextClassName={'page-item'}
                              nextLinkClassName={'page-link'}
                              breakClassName={'page-item'}
                              breakLinkClassName={'page-link'}
                              activeClassName={"active"}
                            />
                          </div> : null
                          }
                          
                        </div>
                      </div>
                      : null}

                    {/* Level 2 */}
                    {level2 == true ?
                      <div className="nk-block">
                        <div className="card border-0 card-stretch">
                          <div className="card-inner-group bg-light border rounded p-4">
                            <div className="card bg-white shadow-sm">
                              <div className="card-inner py-3">
                                <div className="card-title-group">
                                  <div className="card-tools">
                                    <div className="form-inline flex-nowrap gx-3">
                                      <h5>Level 2</h5>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="nk-tb-list nk-tb-ulist is-compact">
                                <div className="nk-tb-item nk-tb-head">
                                  <div className="nk-tb-col tb-col-sm">
                                    {/* <span className="font-weight-bold text-dark">S. N.</span> */}
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">S. N.</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">Email</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">Total Purchased</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">Total Expense</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">Affiliate Rcvd (3%)</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">Handout</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">View</span>
                                  </div>
                                </div>

                                {
                                  status == 2 ? <h5>Record Not Found</h5> :
                                    tab.length > 0 ?
                                      tab.map((element, index) => {
                                        // console.log(index, "::INDEx");
                                        return (
                                          <div className="nk-tb-item ">

                                            <div className="nk-tb-col tb-col-sm">
                                            </div>
                                            <div className="nk-tb-col tb-col-sm">
                                              <span className="nk-activity-media user-avatar xs bg-teal">{(((currentPage2 - 1) * 5) + index + 1)}</span>
                                            </div>
                                            <div className="nk-tb-col tb-col-sm">
                                              <span className="text-dark">{element.email}</span>
                                            </div>
                                            <div className="nk-tb-col tb-col-sm text-success">
                                              <span className="tb-text">{element?.totalBuy?.toFixed(2)} ANA</span>
                                              <img alt="analog" src="./images/Analog.png" style={{ width: "24px" }} />
                                            </div>
                                            <div className="nk-tb-col tb-col-sm text-danger">
                                              <span className="tb-text">
                                                {
                                                  userInfo?.currency_preference == 'usd' ? `${element?.totalExp?.toFixed(2)} USDT` : `${(element?.totalExp * oneUsdPrice)?.toFixed(2)} INRX`
                                                }
                                                {userInfo?.currency_preference == "usd" ? (
                                                  <img
                                                    src="./images/usdt_icon.png"
                                                    style={{ width: "17px", paddingLeft: "1px" }}
                                                    alt="usdt"

                                                  />) : (
                                                  <img
                                                    src="./images/Inrx_black.png"
                                                    style={{ width: "17px", marginLeft: "5px" }}
                                                    alt="inrx"
                                                  />)}
                                              </span>
                                            </div>
                                            <div className="nk-tb-col tb-col-sm text-success">
                                              <span className="tb-text">
                                                {
                                                  userInfo?.currency_preference == 'usd' ? `${element?.totalAff?.toFixed(2)} USDT` : `${(element?.totalAff * oneUsdPrice).toFixed(2)} INRX`
                                                }
                                                {userInfo?.currency_preference == "usd" ? (
                                                  <img
                                                    src="./images/usdt_icon.png"
                                                    style={{ width: "17px", paddingLeft: "1px" }}
                                                    alt="usdt"

                                                  />) : (
                                                  <img
                                                    src="./images/Inrx_black.png"
                                                    style={{ width: "17px", marginLeft: "5px" }}
                                                    alt="inrx"
                                                  />)}
                                              </span>
                                            </div>
                                            <div className="nk-tb-col tb-col-sm text-success">
                                              <span style={{ color: "green" }}>
                                                {
                                                  userInfo?.currency_preference == 'usd' ? `${element?.totalHandout?.toFixed(2)} USDT` : `${(element?.totalHandout * oneUsdPrice).toFixed(2)} INRX`
                                                }
                                                {userInfo?.currency_preference == "usd" ? (
                                                  <img
                                                    src="./images/usdt_icon.png"
                                                    style={{ width: "17px", paddingLeft: "1px" }}
                                                    alt="usdt"

                                                  />) : (
                                                  <img
                                                    src="./images/Inrx_black.png"
                                                    style={{ width: "17px", marginLeft: "5px" }}
                                                    alt="inrx"
                                                  />)}
                                              </span>
                                            </div>
                                            <div className="nk-tb-col tb-col-sm">
                                              <span className="text-dark">Action</span>
                                            </div>

                                          </div>
                                        )
                                      }) :
                                      <ThreeDots heigth="20" width="40 " color="#1ee0ac" ariaLabel="loading-indicator" />
                                }
                              </div>
                            </div>

                          </div>
                          {
                            total.length > 5 ? <div className="card-inner">
                            <ReactPaginate
                              previousLabel={'Prev'}
                              nextLabel={'Next'}
                              breakLabel={"..."}
                              pageCount={Math.ceil(total.length / 5)}
                              marginPagesDisplayed={2}
                              pageRangeDisplayed={2}
                              onPageChange={(data) => {
                                handelPagination(data.selected)
                                setCurrentPage2(data.selected + 1)
                              }}
                              containerClassName={'pagination justify-content-center'}
                              pageClassName={'page-item'}
                              pageLinkClassName={'page-link'}
                              previousClassName={'page-item'}
                              previousLinkClassName={'page-link'}
                              nextClassName={'page-item'}
                              nextLinkClassName={'page-link'}
                              breakClassName={'page-item'}
                              breakLinkClassName={'page-link'}
                              activeClassName={"active"}
                            />
                          </div> : null
                          }
                          
                        </div>
                      </div>
                      : null}

                    {/* Level 3 */}
                    {level3 == true ?
                      <div className="nk-block">
                        <div className="card border-0 card-stretch">
                          <div className="card-inner-group bg-light border rounded p-4">
                            <div className="card bg-white shadow-sm">
                              <div className="card-inner py-3">
                                <div className="card-title-group">
                                  <div className="card-tools">
                                    <div className="form-inline flex-nowrap gx-3">
                                      <h5>Level 3</h5>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="nk-tb-list nk-tb-ulist is-compact">
                                <div className="nk-tb-item nk-tb-head">
                                  <div className="nk-tb-col tb-col-sm">
                                    {/* <span className="font-weight-bold text-dark">S. N.</span> */}
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">S. N.</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">Email</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">Sponsor</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">Total Purchased</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">Total Expense</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">Affiliate Rcvd (2%)</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">Handout</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">View</span>
                                  </div>
                                </div>

                                {
                                  status == 2 ? <h5>Record Not Found</h5> :
                                    tab.length > 0 ?
                                      tab.map((element, index) => {
                                        // console.log(index, "::INDEx");
                                        return (
                                          <>
                                            <div className="nk-tb-item ">

                                              <div className="nk-tb-col tb-col-sm">
                                              </div>
                                              <div className="nk-tb-col tb-col-sm">
                                                <span className="nk-activity-media user-avatar xs bg-teal">{(((currentPage3 - 1) * 5) + index + 1)}</span>
                                              </div>
                                              <div className="nk-tb-col tb-col-sm">
                                                <span className="text-dark">{element.email}</span>
                                              </div>
                                              <div className="nk-tb-col tb-col-sm">
                                                <span className="text-dark">{element.sponsor}</span>
                                              </div>
                                              <div className="nk-tb-col tb-col-sm text-success">
                                                <span className="tb-text">{element?.totalBuy?.toFixed(2)} ANA</span>
                                                <img alt="analog" src="./images/Analog.png" style={{ width: "24px" }} />
                                              </div>
                                              <div className="nk-tb-col tb-col-sm text-danger">
                                                <span className="tb-text">
                                                  {
                                                    userInfo?.currency_preference == 'usd' ? `${element?.totalExp?.toFixed(2)} USDT` : `${(element?.totalExp * oneUsdPrice)?.toFixed(2)} INRX`
                                                  }
                                                  {userInfo?.currency_preference == "usd" ? (
                                                    <img
                                                      src="./images/usdt_icon.png"
                                                      style={{ width: "17px", paddingLeft: "1px" }}
                                                      alt="usdt"

                                                    />) : (
                                                    <img
                                                      src="./images/Inrx_black.png"
                                                      style={{ width: "17px", marginLeft: "5px" }}
                                                      alt="inrx"
                                                    />)}
                                                </span>
                                              </div>
                                              <div className="nk-tb-col tb-col-sm text-danger">
                                                <span className="tb-text">
                                                  {
                                                    userInfo?.currency_preference == 'usd' ? `${element?.totalAff?.toFixed(2)} USDT` : `${(element?.totalAff * oneUsdPrice).toFixed(2)} INRX`
                                                  }
                                                  {userInfo?.currency_preference == "usd" ? (
                                                    <img
                                                      src="./images/usdt_icon.png"
                                                      style={{ width: "17px", paddingLeft: "1px" }}
                                                      alt="usdt"

                                                    />) : (
                                                    <img
                                                      src="./images/Inrx_black.png"
                                                      style={{ width: "17px", marginLeft: "5px" }}
                                                      alt="inrx"
                                                    />)}
                                                </span>
                                              </div>
                                              <div className="nk-tb-col tb-col-sm text-danger">
                                                <span className="tb-text">
                                                  <span className="tb-text">
                                                    {
                                                      userInfo?.currency_preference == 'usd' ? `${element?.totalHandout?.toFixed(2)} USDT` : `${(element?.totalHandout * oneUsdPrice).toFixed(2)} INRX`
                                                    }
                                                    {userInfo?.currency_preference == "usd" ? (
                                                      <img
                                                        src="./images/usdt_icon.png"
                                                        style={{ width: "17px", paddingLeft: "1px" }}
                                                        alt="usdt"

                                                      />) : (
                                                      <img
                                                        src="./images/Inrx_black.png"
                                                        style={{ width: "17px", marginLeft: "5px" }}
                                                        alt="inrx"
                                                      />)}
                                                  </span>
                                                </span>
                                              </div>
                                              <div className="nk-tb-col tb-col-sm">
                                                <span className="text-dark">
                                                  < MdMoreHoriz />
                                                </span>
                                              </div>

                                            </div>
                                          </>
                                        )
                                      }) :
                                      <ThreeDots heigth="20" width="40 " color="#1ee0ac" ariaLabel="loading-indicator" />
                                }
                              </div>
                            </div>

                          </div>
                        </div>
                        {
                          total.length > 5 ? <div className="card-inner">
                          <ReactPaginate
                            previousLabel={'Prev'}
                            nextLabel={'Next'}
                            breakLabel={"..."}
                            pageCount={Math.ceil(total.length / 5)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={2}
                            onPageChange={(data) => {
                              handelPagination(data.selected)
                              setCurrentPage3(data.selected + 1)
                            }}
                            containerClassName={'pagination justify-content-center'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextClassName={'page-item'}
                            nextLinkClassName={'page-link'}
                            breakClassName={'page-item'}
                            breakLinkClassName={'page-link'}
                            activeClassName={"active"}
                          />
                        </div> : null
                        }
                        
                      </div>
                      : null}

                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Affiliate;

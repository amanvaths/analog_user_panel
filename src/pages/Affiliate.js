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
import {BiExport} from 'react-icons/bi'
import { CSVLink} from "react-csv";
import { useTranslation } from "react-i18next";


const Affiliate = (props) => {

  const { user, userInfo, oneUsdPrice } = useSelector((state) => state.user.value)
  const email = user?.email
  const [affiliates, setAffiliates] = useState([]);
  const [level, setLevel] = useState(1)

  const [level1, setLevel1] = useState(true)
  const [level2, setLevel2] = useState(false)
  const [level3, setLevel3] = useState(false)
  const [tab, setTab] = useState([]);
 
  const [loader, setLoader] = useState(false)
  const [status, setStatus] = useState()
  const [total, setTotal] = useState([])
  const [currentPage1, setCurrentPage1] = useState(1)
  const [currentPage2, setCurrentPage2] = useState(1)
  const [currentPage3, setCurrentPage3] = useState(1)
  const { t } = useTranslation();
  
 

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
      const startIndex = (selelcted + 1) * limit - limit;
      const endIndex = (startIndex + limit)
      setTab((data.data.data).slice(startIndex, endIndex)); 
    }
  }

  const handelPagination = (selelcted) => {
    let limit = 5
    const startIndex = (selelcted + 1) * limit - limit;
    const endIndex = (startIndex + limit)
    setTab((total).slice(startIndex, endIndex));
  }


    const headers = [
      { label: "Email", key: "email"},
      { label: "Total Purchased (ANA)", key: "totalBuy"},
      { label: `Total Expense (${userInfo?.currency_preference === 'inr' ? "INRX" : "USDT"})`, key: "totalExp"},
      { label: `Affiliate Rcvd (5%) (${userInfo?.currency_preference === 'inr' ? "INRX" : "USDT"})`, key: "totalAff"},
      { label: `Handout(${userInfo?.currency_preference === 'inr' ? "INRX" : "USDT"})`, key: "totalHandout"}
    ];
  

  useEffect(() => {
    setLevel(1)
    getAffiliate(level);
    getAffiliateList(level, 0)
  
  }, []);
  console.log(level, "level");

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
                       {t('affiliate')}
                      </h3>
                      <div className="nk-block-des text-soft">
                        <p>{t('your_affiliates')}</p>
                      </div>
                    </div>
                    <div className="nk-block-head-content affiliates">
                      <div className="toggle-wrap nk-block-tools-toggle text-right">
                        <div
                          className="toggle-expand-content"
                          data-content="pageMenu">
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
                        <h3 className="text-center">{t('no_record_found')}</h3>
                      </div>
                    :
                    <div style={{ position: "absolute", zIndex: "99", top: "29%", left: "108%", transform: "translate(-50%, -50%)" }}>
                      <ThreeDots heigth="100" width="100" color="#1ee0ac" ariaLabel="loading-indicator" />
                    </div>}
                </div>
                <div className="row my-4">
                  <div className="nk-content-wrap">
                    <div className="nk-block-head">
                      <div className="row nk-block-between">
                        <div className="col-md-6">
                          <h3 className="nk-block-title page-title">
                            {t('affiliate_list')}
                          </h3>
                          <div className="nk-block-des text-soft">
                            <ul className="nk-block-tools g-1" style={{ paddingLeft: "0px" }}>
                              <li>
                                <Link to="" className={level1 ? 'btn btn-white btn-dim btn-outline-success active' :
                                  "btn btn-white btn-dim btn-outline-success"} onClick={() => {
                                    setLevel1(true)
                                    setLevel2(false)
                                    setLevel3(false)
                                    setLevel(1)
                                    setTotal([])
                                    setTab([])
                                    setCurrentPage1(1)
                                    getAffiliateList(1, 0)
                                  }}>
                                  <span>{t('level_1')}</span></Link>
                              </li>
                              <li>
                                <Link to="" className={level2 ? 'btn btn-white btn-dim btn-outline-success active' :
                                  "btn btn-white btn-dim btn-outline-success m-1"} onClick={() => {
                                    setLevel1(false)
                                    setLevel2(true)
                                    setLevel3(false)
                                    setLevel(2)
                                    setTab([])
                                    setTotal([])
                                    setCurrentPage2(1)
                                    getAffiliateList(2, 0)
                                  }}>
                                  <span>{t('level_2')}</span></Link>
                              </li>
                              <li>
                                <Link to="" className={level3 ? 'btn btn-white btn-dim btn-outline-success active' :
                                  "btn btn-white btn-dim btn-outline-success"} onClick={() => {
                                    setLevel1(false)
                                    setLevel2(false)
                                    setLevel3(true)
                                    setLevel(3)
                                    setTotal([])
                                    setTab([])
                                    setCurrentPage3(1)
                                    getAffiliateList(3, 0)
                                  }}>
                                  <span>{t('level_3')}</span></Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6 mt-lg-4 mt-sm-0 mt-md-4">
                          <div className="toggle-wrap nk-block-tools-toggle text-md-right text-sm-left text-lg-right mt-3 mt-lg-0">
                          <div
                              className=""
                              data-content="pageMenu">                               
                                  <Link
                                    to={'/Withdrawal'}
                                    className="btn btn-outline-warning mr-3"
                                  > <span>{t('withdraw')}</span>
                                  </Link>
                                      
                                  
                                <CSVLink
                                className="btn btn-outline-warning"
                                data={total}
                                filename={`Affiliate_List_Level_${level}.xls`}
                                headers={headers}
                                >   {t('export')} <BiExport/>
                                </CSVLink>                                                                
                              </div>
                          </div>

                        
                       
                        
                        </div>
                      </div>
                    </div>

                    {/* Level 1 */}
                    {level1 == true ?
                      <div className="nk-block">
                        <div className="card border-0">
                          <div className="card-inner-group bg-light border rounded p-4">
                            <div className="card bg-white shadow-sm">
                              <div className="card-inner py-3">
                                <div className="card-title-group">
                                  <div className="card-tools">
                                    <div className="form-inline flex-nowrap gx-3">
                                      <h5>{t('level_1')}</h5>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="nk-tb-list nk-tb-ulist is-compact hor_scroll">
                                <div className="nk-tb-item nk-tb-head">
                                  <div className="nk-tb-col tb-col-sm">
                                    {/* <span className="font-weight-bold">S. N.</span> */}
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">S. N.</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">{t('email')}</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">{t('total_purchased')}</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">{t('total_expense')}</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">{t('affiliate_recvd')} (5%)</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">{t('handoutS')}</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">{t('view')}</span>
                                  </div>
                                </div>
                                {
                                  status == 2 ? <h5>{t('no_record_found')}</h5> :
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
                                              <span className="text-dark">{t('action')}</span>
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
                        <div className="card border-0">
                          <div className="card-inner-group bg-light border rounded p-4">
                            <div className="card bg-white shadow-sm">
                              <div className="card-inner py-3">
                                <div className="card-title-group">
                                  <div className="card-tools">
                                    <div className="form-inline flex-nowrap gx-3">
                                      <h5>{t('level_2')}</h5>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="nk-tb-list nk-tb-ulist is-compact hor_scroll">
                                <div className="nk-tb-item nk-tb-head">
                                  <div className="nk-tb-col tb-col-sm">
                                    {/* <span className="font-weight-bold text-dark">S. N.</span> */}
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">S. N.</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">{t('email')}</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">{t('total_purchased')}</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">{t('total_expense')}</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">{t('affiliate_recvd')} (3%)</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">{t('handoutS')}</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">{t('view')}</span>
                                  </div>
                                </div>

                                {
                                  status == 2 ? <h5>{t('no_record_found')}</h5> :
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
                        <div className="card border-0">
                          <div className="card-inner-group bg-light border rounded p-4">
                            <div className="card bg-white shadow-sm">
                              <div className="card-inner py-3">
                                <div className="card-title-group">
                                  <div className="card-tools">
                                    <div className="form-inline flex-nowrap gx-3">
                                      <h5>{t('level_3')}</h5>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="nk-tb-list nk-tb-ulist is-compact hor_scroll">
                                <div className="nk-tb-item nk-tb-head">
                                  <div className="nk-tb-col tb-col-sm">
                                    {/* <span className="font-weight-bold text-dark">S. N.</span> */}
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">S. N.</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">{t('email')}</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">{t('sponsor')}</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">{t('total_purchased')}</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">{t('total_expense')}</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">{t('affiliate_recvd')} (2%)</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">{t('handoutS')}</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="font-weight-bold text-dark">{t('view')}</span>
                                  </div>
                                </div>

                                {
                                  status == 2 ? <h5>{t('no_record_found')}</h5> :
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

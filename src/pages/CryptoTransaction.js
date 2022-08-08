import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import { Link, useLocation} from "react-router-dom";
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducer/user";
import { BASE_URL } from "../Api_connection/config";
import { getSettings } from "../Api_connection/ApiFunction";
import ReactPaginate from 'react-paginate';

const CryptoTransaction = () => {

  const dispatch = useDispatch()
  const { userInfo, user } = useSelector((state) => state.user.value)
  const { state } = useLocation();
  const email = user?.email
  const [history, setHistory] = useState([]);
  const [totalOrder, setTotalOrder] = useState('')
  const [currentPage, setCurrentPage] = useState(1);

  
  const getTrnsaction = async (page) => {
    try {
      const data = await axios.post(`${BASE_URL}/transaction_history`, { email: email, symbol: state.lable, page: page })
      if (data) {
          getSettings(email).then((res) => {
          setUserInfo({ userInfo: res.data })
          // setTotalOrder(data.data.length)
          setHistory(data.data.data)
        setTotalOrder(data.data.count)
        })
      }
      // console.log(data.count, ":: response from tranction api");
      
    } catch (error) {
      console.log(error);
    }
  }

  const fun = (data)=>{
    setCurrentPage(data.selected + 1)
    getTrnsaction(data.selected + 1)
  }

  useEffect(() => {
    const conSetting = async()=>{
      const data = await axios.post(`${BASE_URL}/configSettings`, { email: email })
    if (data) {
      dispatch(setUserInfo({ userInfo: data.data }))
    getTrnsaction()
    }
    }

    conSetting()
    
  }, [])

  return (
    <>
        <div className="nk-app-root">
          <div className="nk-main ">
            <Menu />
            <div className="nk-wrap">
              <Header />
              <div className="nk-content nk-content-fluid">
                <div className="container-xl wide-lg">
                  <div className="nk-content-body">
                    <div className="nk-block-head nk-block-head-sm">
                      <div className="nk-block-between g-3">
                        <div className="nk-block-head-content">
                          <h3 className="nk-block-title page-title">
                            Crypto Transaction
                          </h3>
                          <div className="nk-block-des text-soft">
                            <p>{`You have total ${totalOrder} orders.`}</p>
                          </div>
                        </div>
                        <div className="nk-block-head-content">
                          <div className="toggle-wrap nk-block-tools-toggle text-right">
                            <Link
                              to=""
                              className="btn btn-icon btn-trigger toggle-expand me-n1"
                              data-target="pageMenu"
                            ><em className="icon ni ni-menu-alt-r"></em
                            ></Link>
                            <div
                              className="toggle-expand-content"
                              data-content="pageMenu"
                            >
                              {/* <ul className="nk-block-tools g-3">
                                <li>
                                  <a
                                    href="#"
                                    className="btn btn-white btn-dim btn-outline-light"
                                  ><em className="icon ni ni-download-cloud"></em
                                  ><span>Export</span></a
                                  >
                                </li>
                                <li className="nk-block-tools-opt">
                                  <div className="drodown">
                                    <a
                                      href="#"
                                      className="dropdown-toggle btn btn-icon btn-primary"
                                      data-bs-toggle="dropdown"
                                    ><em className="icon ni ni-plus"></em
                                    ></a>
                                    <div className="dropdown-menu dropdown-menu-end">
                                      <ul className="link-list-opt no-bdr">
                                        <li>
                                          <a href="#"><span>Add Tranx</span></a>
                                        </li>
                                        <li>
                                          <a href="#"><span>Add Deposit</span></a>
                                        </li>
                                        <li>
                                          <a href="#"><span>Add Withdraw</span></a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </li>
                              </ul> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="nk-block">
                      <div className="card card-bordered card-stretch">
                        <div className="card-inner-group">
                          <div className="card-inner">
                            <div className="card-title-group">
                              <div className="card-title">
                                <h5 className="title">All Orders</h5>
                              </div>
                              <div className="card-tools me-n1">
                                {/* <ul className="btn-toolbar gx-1">
                                  <li>
                                    <a
                                      href="#"
                                      className="search-toggle toggle-search btn btn-icon"
                                      data-target="search"
                                    ><em className="icon ni ni-search"></em
                                    ></a>
                                  </li>
                                  <li className="btn-toolbar-sep"></li>
                                   <li>
                                    <div className="dropdown">
                                      <a
                                        href="#"
                                        className="btn btn-trigger btn-icon dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                      ><div className="badge badge-circle bg-primary">
                                          4
                                        </div>
                                        <em className="icon ni ni-filter-alt"></em
                                        ></a>
                                      <div
                                        className="filter-wg dropdown-menu dropdown-menu-xl dropdown-menu-end"
                                      >
                                        <div className="dropdown-head">
                                          <span className="sub-title dropdown-title"
                                          >Advance Filter</span
                                          >
                                          <div className="dropdown">
                                            <a href="#" className="link link-light"
                                            ><em className="icon ni ni-more-h"></em
                                            ></a>
                                          </div>
                                        </div>
                                        <div className="dropdown-body dropdown-body-rg">
                                          <div className="row gx-6 gy-4">
                                            <div className="col-6">
                                              <div className="form-group">
                                                <label
                                                  className="overline-title overline-title-alt"
                                                >Type</label
                                                ><select
                                                  className="form-select js-select2"
                                                >
                                                  <option value="any">
                                                    Any Type
                                                  </option>
                                                  <option value="deposit">
                                                    Deposit
                                                  </option>
                                                  <option value="buy">
                                                    Buy Coin
                                                  </option>
                                                  <option value="sell">
                                                    Sell Coin
                                                  </option>
                                                  <option value="transfer">
                                                    Transfer
                                                  </option>
                                                  <option value="withdraw">
                                                    Withdraw
                                                  </option>
                                                </select>
                                              </div>
                                            </div>
                                            <div className="col-6">
                                              <div className="form-group">
                                                <label
                                                  className="overline-title overline-title-alt"
                                                >Status</label
                                                ><select
                                                  className="form-select js-select2"
                                                >
                                                  <option value="any">
                                                    Any Status
                                                  </option>
                                                  <option value="pending">
                                                    Pending
                                                  </option>
                                                  <option value="cancel">
                                                    Cancel
                                                  </option>
                                                  <option value="process">
                                                    Process
                                                  </option>
                                                  <option value="completed">
                                                    Completed
                                                  </option>
                                                </select>
                                              </div>
                                            </div>
                                            <div className="col-6">
                                              <div className="form-group">
                                                <label
                                                  className="overline-title overline-title-alt"
                                                >Pay Currency</label
                                                ><select
                                                  className="form-select js-select2"
                                                >
                                                  <option value="any">
                                                    Any Coin
                                                  </option>
                                                  <option value="bitcoin">
                                                    Bitcoin
                                                  </option>
                                                  <option value="ethereum">
                                                    Ethereum
                                                  </option>
                                                  <option value="litecoin">
                                                    Litecoin
                                                  </option>
                                                </select>
                                              </div>
                                            </div>
                                            <div className="col-6">
                                              <div className="form-group">
                                                <label
                                                  className="overline-title overline-title-alt"
                                                >Method</label
                                                ><select
                                                  className="form-select js-select2"
                                                >
                                                  <option value="any">
                                                    Any Method
                                                  </option>
                                                  <option value="paypal">
                                                    PayPal
                                                  </option>
                                                  <option value="bank">Bank</option>
                                                </select>
                                              </div>
                                            </div>
                                            <div className="col-6">
                                              <div className="form-group">
                                                <div
                                                  className="custom-control custom-control-sm custom-checkbox"
                                                >
                                                  <input
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    id="includeDel"
                                                  /><label
                                                    className="custom-control-label"
                                                    for="includeDel"
                                                  >
                                                    Including Deleted</label
                                                  >
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <button
                                                  type="button"
                                                  className="btn btn-secondary"
                                                >
                                                  Filter
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="dropdown-foot between">
                                          <a className="clickable" href="#"
                                          >Reset Filter</a
                                          ><a
                                            href="#savedFilter"
                                            data-bs-toggle="modal"
                                          >Save Filter</a
                                          >
                                        </div>
                                      </div>
                                    </div>
                                  </li> 
                                   <li>
                                    <div className="dropdown">
                                      <a
                                        href="#"
                                        className="btn btn-trigger btn-icon dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                      ><em className="icon ni ni-setting"></em
                                      ></a>
                                      <div
                                        className="dropdown-menu dropdown-menu-xs dropdown-menu-end"
                                      >
                                        <ul className="link-check">
                                          <li><span>Show</span></li>
                                          <li className="active"><a href="#">10</a></li>
                                          <li><a href="#">20</a></li>
                                          <li><a href="#">50</a></li>
                                        </ul>
                                        <ul className="link-check">
                                          <li><span>Order</span></li>
                                          <li className="active">
                                            <a href="#">DESC</a>
                                          </li>
                                          <li><a href="#">ASC</a></li>
                                        </ul>
                                      </div>
                                    </div>
                                  </li> 
                                </ul> */}
                              </div>
                              <div
                                className="card-search search-wrap"
                                data-search="search"
                              >
                                <div className="search-content">
                                  <Link
                                    to=""
                                    className="search-back btn btn-icon toggle-search"
                                    data-target="search"
                                  ><em className="icon ni ni-arrow-left"></em></Link><input
                                    type="text"
                                    className="form-control border-transparent form-focus-none"
                                    placeholder="Quick search by transaction"
                                  /><button className="search-submit btn btn-icon">
                                    <em className="icon ni ni-search"></em>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card-inner p-0">
                            <div className="nk-tb-list nk-tb-tnx">
                              <div className="nk-tb-item nk-tb-head">
                              <div className="nk-tb-col"><span>Sr. No</span></div>
                                <div className="nk-tb-col"><span>Details</span></div>

                                
                                <div className="nk-tb-col text-end">
                                  <span>Amount</span>
                                </div>
                                <div className="nk-tb-col text-end tb-col-sm">
                                  <span>Balance</span>
                                </div>
                                <div className="nk-tb-col nk-tb-col-status">
                                  <span className="sub-text d-none d-md-block"
                                  >Status</span
                                  >
                                </div>
                                <div className="nk-tb-col nk-tb-col-tools"></div>
                              </div>
                              {
                                history.map((element, index) => {
                                  const a = new Date(element.createdAt)
                                  return (

                                    <div className="nk-tb-item" key={index}>
                                      <div className="nk-tb-col">
                                        <div className="nk-tnx-type">
                                         
                                          <span>{(((currentPage - 1) * 10) + index + 1)}</span>
                                        </div>
                                      </div>
                                      <div className="nk-tb-col">
                                        <div className="nk-tnx-type">
                                          <div
                                            className="nk-tnx-type-icon bg-success-dim text-success"
                                          >
                                            <em className="icon ni ni-arrow-up-right"></em>
                                          </div>
                                          <div className="nk-tnx-type-text">
                                            <span className="tb-lead">{element?.type}</span>
                                            <span className="tb-date">
                                              {a.toLocaleDateString()} {a.toLocaleTimeString()}
                                            </span>
                                            
                                          </div>
                                        </div>
                                      </div>
                                      {/* <span> <img src={state.logo} alt="" style={{height: "40px", width: "40px"}}/> </span> */}

                                      <div className="nk-tb-col text-end">
                                        <span className="tb-amount"
                                        >
                                          {element.amount.toFixed(2)}&nbsp;
                                          <span>{element.symbol}</span>
                                          </span>
                                        
                                        <span className="tb-amount-sm">{(element?.amount * state?.price)?.toFixed(2)}&nbsp; 
                                        {userInfo?.currency_preference == 'inr' ? "INRX" : "USDT"}
                                         </span>
                                      </div>
                                      <div className="nk-tb-col text-end tb-col-sm">
                                        <span className="tb-amount">{element?.balance} <span>{element?.symbol}</span></span
                                        ><span className="tb-amount-sm">{(element?.balance * state?.price)?.toFixed(2)}&nbsp; 
                                        {userInfo?.currency_preference == 'inr' ? "INRX" : "USDT"}</span>
                                      </div>
                                      <div className="nk-tb-col nk-tb-col-status">
                                        <div className="dot dot-success d-md-none"></div>
                                        <span
                                    className="badge badge-sm badge-dim bg-outline-success d-none d-md-inline-flex">
                                     {element?.status ==1 ? "Completed" : "Failed"} 
                                      </span>
                                        
                                      </div>
                                      <div className="nk-tb-col nk-tb-col-tools">
                                        {/* <ul className="nk-tb-actions gx-2">
                                          <li className="nk-tb-action-hidden">
                                            <a
                                              href="#"
                                              className="bg-white btn btn-sm btn-outline-light btn-icon"
                                              data-bs-toggle="tooltip"
                                              data-bs-placement="top"
                                              title="Approve"
                                            ><em className="icon ni ni-done"></em
                                            ></a>
                                          </li>
                                          <li className="nk-tb-action-hidden">
                                            <a
                                              href="#tranxDetails"
                                              data-bs-toggle="modal"
                                              className="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip"
                                              title="Details"
                                            ><em className="icon ni ni-eye"></em
                                            ></a>
                                          </li>
                                          <li>
                                            <div className="dropdown">
                                              <a
                                                href="#"
                                                className="dropdown-toggle bg-white btn btn-sm btn-outline-light btn-icon"
                                                data-bs-toggle="dropdown"
                                              ><em className="icon ni ni-more-h"></em
                                              ></a>
                                              <div
                                                className="dropdown-menu dropdown-menu-end"
                                              >
                                                <ul className="link-list-opt">
                                                  <li>
                                                    <a href="#"
                                                    ><em className="icon ni ni-done"></em
                                                    ><span>Approve</span></a
                                                    >
                                                  </li>
                                                  <li>
                                                    <a href="#"
                                                    ><em
                                                      className="icon ni ni-cross-round"
                                                    ></em
                                                      ><span>Reject</span></a
                                                    >
                                                  </li>
                                                  <li>
                                                    <a href="#"
                                                    ><em className="icon ni ni-repeat"></em
                                                    ><span>Check</span></a
                                                    >
                                                  </li>
                                                  <li>
                                                    <a
                                                      href="#tranxDetails"
                                                      data-bs-toggle="modal"
                                                    ><em className="icon ni ni-eye"></em
                                                    ><span>View Details</span></a
                                                    >
                                                  </li>
                                                </ul>
                                              </div>
                                            </div>
                                          </li>
                                        </ul> */}
                                      </div>
                                    </div>
                                  )
                                })
                              }
                              
                               
                               
                            
                            
                          </div>
                         
                            </div>
                         
                           <div className="card-inner">
                           
                           <ReactPaginate
                          previousLabel={'Prev'}
                          nextLabel={'Next'}
                          breakLabel={"..."}
                          pageCount={totalOrder&&Math.ceil(totalOrder / 10)}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={2}
                          onPageChange={fun}
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
    </>
  )
}

export default CryptoTransaction;
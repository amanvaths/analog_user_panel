import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import axios from 'axios'
import { useSelector} from "react-redux";
import { BASE_URL } from "../Api_connection/config";
import { Link} from "react-router-dom";


const AirDrop = () => {
  const {user } = useSelector((state) => state.user.value)
  
  const email = user?.email
  const [tab, setTab] = useState([])

  const getAirDrop = async () => {
    const data = await axios.post(`${BASE_URL}/airdrop`, { email: email })
    if (data) {
      setTab(data.data.data)
    }
  }

  useEffect(() => {
    getAirDrop()
  }, [])

  return (
    <>
      <div className="nk-app-root">
        <div className="nk-main ">
          <Menu />
          <div className="nk-wrap">
            <Header />
            <div className="nk-content nk-content-fluid min-height bg-light">
              <div className="container-xl">
                <div className="nk-content-body">
                  <div className="nk-block-head nk-block-head-sm">
                    <div className="nk-block-between g-3">
                      <div className="nk-block-head-content">
                        <h3 className="nk-block-title page-title">
                          Airdrop
                        </h3>
                        <div className="nk-block-des text-soft">
                          {/* <p>{`You have total ${totalOrder} orders.`}</p> */}
                        </div>
                      </div>
                      <div className="nk-block-head-content">
                        <div className="toggle-wrap nk-block-tools-toggle text-right">
                         
                          <div
                            className=""
                            data-content="pageMenu"
                          >
                             <ul className="nk-block-tools g-3">
                                <li>
                                  <Link
                                   to={'/Withdrawal'}
                                    className="btn btn-outline-success">
                                    
                                    <span>Withdraw</span></Link>
                                </li>
                                {/* <li className="nk-block-tools-opt">
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
                                </li> */}
                              </ul> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="nk-block">
                    <div className="card card-bordered card-stretch hor_scroll">
                      <div className="card-inner-group">
                        <div className="card-inner">
                          <div className="card-title-group">
                            <div className="card-title">
                              <h5 className="title">Airdrop</h5>
                            </div>
                            <div className="card-tools me-n1">
                               
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
                        <div className="card-inner p-0 bg-white">
                          <div className="nk-tb-list nk-tb-tnx is-compact">
                            <div className="nk-tb-item nk-tb-head">
                              <div className="nk-tb-col"><span className="font-weight-bold">Sr. No</span></div>
                              <div className="nk-tb-col"><span className="font-weight-bold">Social Activity</span></div>
                              <div className="nk-tb-col nk-tb-col-status">
                                <span className="d-none d-md-block"><span className="font-weight-bold">Status</span></span>
                              </div>
                              <div className="nk-tb-col">
                                <span className="font-weight-bold">Airdrop</span>
                              </div>
                              <div className="nk-tb-col text-end tb-col-sm">
                                <span className="font-weight-bold">View</span>
                              </div>
                              <div className="nk-tb-col nk-tb-col-tools"></div>
                            </div>
                            {
                              tab.map((element, index) => {
                                // const a = new Date(element.createdAt)
                                return (

                                  <div className="nk-tb-item" key={index}>
                                    <div className="nk-tb-col">
                                      <div className="nk-tnx-type">
                                        <span className="nk-activity-media user-avatar xs bg-teal">{index + 1}</span>
                                      </div>
                                    </div>
                                    {/* <div className="nk-tb-col">
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
                                    </div> */}
                                    {/* <span> <img src={state.logo} alt="" style={{height: "40px", width: "40px"}}/> </span> */}

                                    <div className="nk-tb-col">
                                      <span className="tb-amount">
                                        {element.socialActivity}
                                      </span>
                                    </div>

                                    <div className="nk-tb-col nk-tb-col-status">
                                      <div className="dot dot-success d-md-none"></div>
                                      <span
                                        className="badge badge-sm badge-dim bg-outline-success d-none d-md-inline-flex">
                                        {element?.status == 1 ? "Completed" : "Failed"}
                                      </span>

                                    </div>

                                    <div className="nk-tb-col">
                                      <span className="tb-amount">
                                        {element.airdrop}
                                      </span>
                                    </div>

                                    <div className="nk-tb-col text-end">
                                      <span className="tb-amount">
                                        Click
                                      </span>
                                    </div>

                                    {/* <div className="nk-tb-col text-end tb-col-sm">
                                      <span className="tb-amount">{element?.balance} <span>{element?.symbol}</span></span
                                      ><span className="tb-amount-sm">{(element?.balance * state?.price)?.toFixed(2)}&nbsp;
                                        {userInfo?.currency_preference == 'inr' ? "INRX" : "USDT"}</span>
                                    </div> */}

                                    {/* <div className="nk-tb-col nk-tb-col-status">
                                      <div className="dot dot-success d-md-none"></div>
                                      <span
                                        className="badge badge-sm badge-dim bg-outline-success d-none d-md-inline-flex">
                                        {element?.status == 1 ? "Completed" : "Failed"}
                                      </span>

                                    </div> */}
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
                      </div>
                    </div>                    
                  </div>
                  <div className="card-inner">
                          <ul
                            className="pagination justify-content-center justify-content-md-center"
                          >
                            <li className="page-item">
                              <Link className="page-link" to="">Prev</Link>
                            </li>


                            {/* <li className="page-item">
                                <span className="page-link"
                                ><em className="icon ni ni-more-h"></em
                                ></span>
                              </li> */}
                            <li className="page-item">
                              {/* <a className="page-link" href="#">{currentPage}</a> */}
                            </li>

                            <li className="page-item">
                              <Link className="page-link" to="">Next</Link>
                            </li>
                          </ul>
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

export default AirDrop;
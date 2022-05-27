import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { BASE_URL } from "../Api_connection/config";
import { useSelector } from "react-redux";
import ReactPaginate from 'react-paginate';


const Bounty = () => {
  const { userInfo, user, oneUsdPrice } = useSelector((state) => state.user.value)
  const email = user?.email
  const [tab, setTab] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const getBounty = async () => {
    const data = await axios.post(`${BASE_URL}/bounty`, { email: email })
    if (data) {
      setTab(data.data.data)
    }
  }

  useEffect(() => {
    getBounty()
  }, [])

  return (
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
                        Bounty
                      </h3>
                      <div className="nk-block-des text-soft">
                        {/* <p>{`You have total ${totalOrder} orders.`}</p> */}
                      </div>
                    </div>
                    <div className="nk-block-head-content">
                      <div className="toggle-wrap nk-block-tools-toggle">
                        <a
                          href="#"
                          className="btn btn-icon btn-trigger toggle-expand me-n1"
                          data-target="pageMenu">
                          <em className="icon ni ni-menu-alt-r"></em></a>
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
                            <h5 className="title">Bounty</h5>
                          </div>
                          <div className="card-tools me-n1">
                            <ul className="btn-toolbar gx-1">
                              <li>
                                <div className="dropdown">
                                  <a
                                    href="#"
                                    className="btn btn-trigger btn-icon dropdown-toggle"
                                    data-bs-toggle="dropdown"><em className="icon ni ni-setting"></em></a>
                                  <div className="dropdown-menu dropdown-menu-xs dropdown-menu-end">
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
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="card-inner p-0">
                        <div className="nk-tb-list nk-tb-tnx">
                          <div className="nk-tb-item nk-tb-head">
                            <div className="nk-tb-col">
                              <span className="tb-lead">Sr. No</span>
                            </div>
                            <div className="nk-tb-col">
                              <span className="tb-lead">Price</span>
                            </div>
                            <div className="nk-tb-col">
                              <span className="tb-lead">Pool</span>
                            </div>
                            <div className="nk-tb-col tb-col-sm">
                              <span className="tb-lead">Purchased</span>
                            </div>
                            <div className="nk-tb-col">
                              <span className="tb-lead d-none d-md-block">
                                Expense
                              </span>
                            </div>
                            <div className="nk-tb-col ">
                              <span className="tb-lead d-none d-md-block">
                                Inherited 5 %
                              </span>
                            </div>
                            <div className="nk-tb-col ">
                              <span className="tb-lead d-none d-md-block">
                                Time
                              </span>
                            </div>
                          </div>
                          {
                            tab.map((element, index) => {
                              const a = new Date(element.createdAt)
                              return (
                                <div className="nk-tb-item">
                                  <div className="nk-tb-col">
                                    <div className="nk-tnx-type">
                                      <span>{index + 1}</span>
                                    </div>
                                  </div>
                                  <div className="nk-tb-col">
                                    <span className="tb-amount-sm">
                                      {
                                        userInfo?.currency_preference == 'usd' ? `${element?.token_price?.toFixed(2)} USDT` :
                                          `${(element?.token_price / oneUsdPrice)?.toFixed(2)} INRX`
                                      }
                                    </span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="tb-amount-sm">{element?.presalelevel == null ? 'no data found' : element?.presalelevel}</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="tb-amount-sm">
                                      {
                                        userInfo?.currency_preference == 'usd' ? `${element?.token_quantity?.toFixed(2)} USDT` :
                                          `${(element?.token_quantity / oneUsdPrice)?.toFixed(2)} INRX`
                                      }
                                    </span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="tb-amount-sm">
                                      {
                                        userInfo?.currency_preference == 'usd' ? `${element?.amount?.toFixed(2)} USDT` :
                                          `${(element?.amount / oneUsdPrice)?.toFixed(2)} INRX`
                                      }
                                    </span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="tb-amount-sm">{element?.bonus_percent}%</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="tb-amount-sm">{a.toLocaleTimeString()} {a.toLocaleDateString()} </span>
                                  </div>
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                      <div className="card-inner">
                        
                        <ul
                          className="pagination justify-content-center justify-content-md-center"
                        >
                          <li className="page-item"
                          //  onClick={()=> prevPage()}
                           >
                            <a className="page-link" href="#">Prev</a>
                          </li>

                          {/* <li className="page-item">
                            <span className="page-link"
                            ><em className="icon ni ni-more-h"></em
                            ></span>
                          </li> */}
                          <li className="page-item">
                            <a className="page-link" href="#">{currentPage}</a>
                          </li>

                          <li className="page-item">
                            <a className="page-link" href="#">Next</a>
                          </li>
                        </ul>
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
  );

}
export default Bounty;

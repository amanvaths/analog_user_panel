import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { BASE_URL } from "../Api_connection/config";
import { useSelector } from "react-redux";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner'
import { BiExport } from 'react-icons/bi'
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";
import {RiFileExcel2Line} from 'react-icons/ri'


const Bounty = () => {
  const { userInfo, user, oneUsdPrice } = useSelector((state) => state.user.value)
  const email = user?.email
  const [tab, setTab] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalBounty, setTotalBounty] = useState(0)
  const [status, setStatus] = useState()
  const [load, setLoad] = useState(true)
  const [bounty, setBounty] = useState([])
  const { t } = useTranslation();


  const getBounty = async (page) => {
    const data = await axios.post(`${BASE_URL}/bounty`, { email: email, page: page })
    if (data) {
      console.log(data.data, "BOUNTY TAB");
      setTab(data.data.data)
      setTotalBounty(data.data.count)
      setStatus(data.data.status)
      setLoad(true)
    }
  }

  console.log(tab, "BOUNTY TAB");


  const fun = (data) => {
    setCurrentPage(data.selected + 1)
    getBounty(data.selected + 1)

  }

  const exportBounty = async () => {
    const data = await axios.post(`${BASE_URL}/exportbounty`, { email: email })
    console.log(data.data, "data");
    setBounty(data.data)
  }

  useEffect(() => {
    setLoad(false)
    getBounty()
    exportBounty()
  }, [])

  return (
    <div className="nk-app-root">
      <div className="nk-main">
        <Menu />
        <div className="nk-wrap">
          <Header />
          <div className="nk-content nk-content-fluid bg-light min-height">
            <div className="container-xl">
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
                      <div className="toggle-wrap nk-block-tools-toggle text-right">
                        {/* <Link
                          to=""
                          className="btn btn-icon btn-trigger toggle-expand me-n1"
                          data-target="pageMenu">
                          <em className="icon ni ni-menu-alt-r"></em></Link> */}
                        <div
                          className=""
                          data-content="pageMenu"
                        >
                          <ul className="nk-block-tools g-3">
                          <li>
                              <Link
                                to={'/Withdrawal'}
                                 className="btn bg-teal text-white">
                                <span>{t('withdraw')}</span></Link>
                            </li>
                            <li>
                              
                                <CSVLink className="btn bg-teal text-white" data={bounty} filename={`Bounty.xls`}>{t('export_to_excel')} <RiFileExcel2Line/></CSVLink>
                               
                              </li>
                            <li className="nk-block-tools-opt">
                              {/* <div className="drodown">
                                <Link
                                  to=""
                                  className="dropdown-toggle btn btn-outline-warning"
                                  data-bs-toggle="dropdown"
                                >
                                  Export <BiExport />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <ul className="link-list-opt no-bdr">
                                    <li>
                                      <CSVLink data={bounty} filename={`Bounty.xls`}>Download in Excel</CSVLink>
                                    </li>
                                    <li>
                                      <Link to=""><span>Download in PDF</span></Link>
                                    </li>
                                  </ul>
                                </div>
                              </div> */}
                            </li>
                             </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="nk-block">
                  <div className="card card-bordered card-stretch hor_scroll">
                    <div className="card-inner-group">
                      <div className="card-inner py-1">
                        <div className="card-title-group">
                          <div className="card-title">
                            <h5 className="title">Bounty</h5>
                            {/* <h6 className="title">Total Bounty: 26.89 USDT</h6> */}
                          </div>
                          <div className="card-tools me-n1">
                            <ul className="btn-toolbar gx-1">
                              <li>
                                <div className="dropdown align-middle h-50">
                                  <Link
                                    to=""
                                    className="btn btn-trigger btn-icon dropdown-toggle"
                                    data-bs-toggle="dropdown"><em className="icon ni ni-setting text-teal"></em></Link>
                                  <div className="dropdown-menu dropdown-menu-xs dropdown-menu-end">
                                    <ul className="link-check">
                                      {/* <li><span>Show</span></li>
                                      <li className="active"><Link to="">10</Link></li>
                                      <li><Link to="">20</Link></li>
                                      <li><Link to="">50</Link></li> */}
                                    </ul>
                                    <ul className="link-check">
                                      {/* <li><span>Order</span></li>
                                      <li className="active">
                                        <Link to="">DESC</Link>
                                      </li>
                                      <li><Link to="">ASC</Link></li> */}
                                    </ul>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="card-inner p-0">
                        <div className="nk-tb-list nk-tb-tnx is-compact">
                          <div className="nk-tb-item nk-tb-head">
                            <div className="nk-tb-col">
                              <span className="font-weight-bold">Sr. No</span>
                            </div>
                            <div className="nk-tb-col">
                              <span className="font-weight-bold">Price</span>
                            </div>
                            <div className="nk-tb-col">
                              <span className="font-weight-bold">Pool</span>
                            </div>
                            <div className="nk-tb-col tb-col-sm">
                              <span className="font-weight-bold">Purchased</span>
                            </div>
                            <div className="nk-tb-col">
                              <span className="font-weight-bold d-none d-md-block">
                                Expense
                              </span>
                            </div>
                            <div className="nk-tb-col ">
                              <span className="font-weight-bold d-none d-md-block">
                                Inherited 5 %
                              </span>
                            </div>
                            <div className="nk-tb-col ">
                              <span className="font-weight-bold d-none d-md-block">
                                Time
                              </span>
                            </div>
                          </div>
                          {
                            status == 0 ? <h4>Record Not Found</h4> :
                              load ?
                                tab.map((element, index) => {
                                  const a = new Date(element.createdAt)
                                  return (
                                    <div className="nk-tb-item">
                                      <div className="nk-tb-col">
                                        <div className="nk-tnx-type">
                                          <span className="nk-activity-media user-avatar xs bg-teal">{(((currentPage - 1) * 10) + index + 1)}</span>
                                        </div>
                                      </div>
                                      <div className="nk-tb-col">
                                        <span className="tb-amount-sm">
                                          {
                                            oneUsdPrice ? userInfo?.currency_preference == 'inr' ? `${element?.token_price?.toFixed(6)} INRX` :
                                              `${(element?.token_price / oneUsdPrice)?.toFixed(6)}  USDT` : 0
                                          }
                                        </span>
                                      </div>
                                      <div className="nk-tb-col tb-col-sm">
                                        <span className="tb-amount-sm">{element?.presalelevel == null ? 'no data found' : element?.presalelevel}</span>
                                      </div>
                                      <div className="nk-tb-col tb-col-sm" style={{ color: "green" }}>
                                        <span className="tb-amount-sm" >
                                          {
                                            `${element.token_quantity} ANA`
                                          }
                                          <img alt="analog" src="./images/Analog.png" style={{ width: "24px" }} />
                                        </span>
                                      </div>
                                      <div className="nk-tb-col tb-col-sm">
                                        <span className="tb-amount-sm" style={{ color: "red" }}>
                                          {
                                            userInfo?.currency_preference == 'usd' ? `${element?.amount?.toFixed(2)} USDT` :
                                              `${(element?.amount * oneUsdPrice)?.toFixed(2)} INRX`
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
                                      <div className="nk-tb-col tb-col-sm" style={{ color: "green" }}>
                                        <span className="tb-amount-sm">
                                          {
                                            userInfo?.currency_preference == 'usd' ? `${element?.bonus?.toFixed(6)} USDT` :
                                              `${(element?.bonus * oneUsdPrice)?.toFixed(6)} INRX`
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
                                        <span className="tb-amount-sm">{a.toLocaleTimeString()} {a.toLocaleDateString()} </span>
                                      </div>
                                    </div>
                                  )
                                }) :
                                <div className="">
                                  <ThreeDots heigth="20" width="40" color="#1ee0ac" ariaLabel="loading-indicator" style={{ textAlign: 'center' }} />
                                </div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-inner">
                  <ReactPaginate
                    previousLabel={t('previous')}
                    nextLabel={t('next')}
                    breakLabel={"..."}
                    pageCount={Math.ceil(totalBounty / 10)}
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

                  {/* <PaginatedItems itemsPerPage={4}/> */}
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

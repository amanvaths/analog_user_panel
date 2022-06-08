import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { BASE_URL } from "../Api_connection/config";
import { useSelector } from "react-redux";
import ReactPaginate from 'react-paginate';
import PaginatedItems from "../components/Pagination"
import { Link, useNavigate } from "react-router-dom";




const Bounty = () => {
  const { userInfo, user, oneUsdPrice } = useSelector((state) => state.user.value)
  const email = user?.email
  const navigate = useNavigate()
  const [tab, setTab] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalBounty, setTotalBounty] = useState(0)


  const getBounty = async (page) => {
    const data = await axios.post(`${BASE_URL}/bounty`, { email: email, page: page })
    if (data) {
      setTab(data.data.data)
      setTotalBounty(data.data.count)

    }
  }




  const fun =(data)=>{
    setCurrentPage(data.selected + 1)
    getBounty(data.selected + 1)
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
                           <ul className="nk-block-tools g-3">
                            <li>
                              <Link
                              to={'/Withdrawal'}
                              // onClick={()=> navigate('/Withdrawal')}
                                className="btn btn-white btn-primary btn-outline-light">
                                  <span>Withdrawal</span></Link>
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
                  <div className="card card-bordered card-stretch">
                    <div className="card-inner-group">
                      <div className="card-inner">
                        <div className="card-title-group">
                          <div className="card-title">
                            <h5 className="title">Bounty</h5>
                            {/* <h6 className="title">Total Bounty: 26.89 USDT</h6> */}
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
                                      <span>{(((currentPage - 1) * 10) + index +1)}</span>
                                    </div>
                                  </div>
                                  <div className="nk-tb-col">
                                    <span className="tb-amount-sm">
                                      {
                                        userInfo?.currency_preference == 'inr' ? `${element?.token_price?.toFixed(6)} INRX` :
                                          `${(element?.token_price / oneUsdPrice)?.toFixed(6)} USDT`
                                      }
                                    </span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="tb-amount-sm">{element?.presalelevel == null ? 'no data found' : element?.presalelevel}</span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm" style={{color: "green"}}>
                                    <span className="tb-amount-sm" >
                                      {
                                       `${element.token_quantity} ANA`
                                      }
                                      <img src="./images/Analog.png" style={{ width: "24px" }} />
                                    </span>
                                  </div>
                                  <div className="nk-tb-col tb-col-sm">
                                    <span className="tb-amount-sm" style={{color: "red"}}>
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
                                  <div className="nk-tb-col tb-col-sm" style={{color: "green"}}>
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
                            })
                          }
                        </div>
                      </div>
                      <div className="card-inner">
                      <ReactPaginate
                              previousLabel={'Prev'}
                              nextLabel={'Next'}
                              breakLabel={"..."}
                              pageCount={Math.ceil(totalBounty/10)}
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

import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../Api_connection/config";
import AffiliatCard from "../components/AffiliateCard";
import { setUserInfo } from "../redux/reducer/user";
import { Triangle } from 'react-loader-spinner'
import { MdMoreHoriz } from 'react-icons/md'

const Affiliate = () => {
  const { user, userInfo, oneUsdPrice } = useSelector((state) => state.user.value)
  const email = user?.email
  const [affiliates, setAffiliates] = useState([]);
  const [affiliateCount, setAffiliatesCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);

  const [level, setLevel] = useState(1)
  const [level1, setLevel1] = useState(true)
  const [level2, setLevel2] = useState(false)
  const [level3, setLevel3] = useState(false)
  const [tab, setTab] = useState([])

  const [load, setLoad] = useState(false)

  const getAffiliate = async () => {
    try {
      console.log(email, " user email asjljasf")
      const arr = [];
      const data = await axios.post(`${BASE_URL}/refferalLevelWiseData`, { email: email })
      arr.push(Object.keys(data.data.data))
      arr.push(data.data.data);
      setLoad(true)
      setAffiliates(arr);
    } catch (error) {
      console.log("Error in getting data Affililate :" + error);
    }
  }


  const getAffiliateList = async (level) => {
    const data = await axios.post(`${BASE_URL}/levelWiseList`, { email: email, level: level })
    console.log(data.data, "::Response from AFFILIATE TABLE API");
    setTab(data.data.data)
  }

  console.log(tab, ":: DATA IN TAB");

  useEffect(() => {
    getAffiliate();
    getAffiliateList(level)
  }, [])

  return (
    <div>
      <div class="nk-app-root">
        <div class="nk-main ">
          <Menu />

          <div class="nk-wrap ">
            <Header />

            {/* Add This Line  */}

            <div class="container-xl tableContainer">
              <div class="nk-content-body" style={{ marginTop: 50, width: "100%", padding: "10px -70%" }}>
                <div class="nk-block-head nk-block-head-sm">
                  <div class="nk-block-between position-relative">
                    <div class="nk-block-head-content ">
                      <h3 class="nk-block-title page-title">
                        Affiliates
                      </h3>
                      <div class="nk-block-des text-soft">

                        <p>{`Your affiliatese.`}</p>
                      </div>
                    </div>
                    <div class="nk-block-head-content affiliates">
                      <div class="toggle-wrap nk-block-tools-toggle">
                        <a
                          href="#"
                          class="btn btn-icon btn-trigger toggle-expand me-n1"
                          data-target="pageMenu"
                        >
                          <em class="icon ni ni-menu-alt-r"></em>
                        </a>
                        <div
                          class="toggle-expand-content"
                          data-content="pageMenu"
                        >
                          {/* <ul class="nk-block-tools g-3">
                            <li
                            >
                              <span class="d-none d-md-block">
                                <button
                                  class="btn btn-dim btn-outline-light"
                                  style={{ padding: "8px 35px" }}
                                >
                                  <em class="icon ni ni-download-cloud"></em>
                                  <span>Export</span>
                                </button>
                              </span>
                            </li>
                          </ul> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">

                  {
                    load ? affiliates.length > 0 ?
                      affiliates[0].map((item, index) => {
                        return (
                          <AffiliatCard
                            level={`Level ${index + 1}`}
                            totalUser={affiliates[1][item].totalUsers}
                            totalAnalogBuy={affiliates[1][item].totalAna.toFixed(2)}
                            totalExpence={affiliates[1][item].totalExpense.toFixed(2)}
                            totalAffiliates={affiliates[1][item].totalInc.toFixed(2)}
                            widthdrawl={0}
                            toalRemaining={0}
                          />
                        )
                      }) : null :

                      <div style={{ position: "absolute", zIndex: "99", top: "29%", left: "108%", transform: "translate(-50%, -50%)" }}>
                        <Triangle ariaLabel="loading-indicator" color="blue" />
                      </div>


                  }
                </div>

                <div className="row my-1" >

                  <div className="nk-content-wrap">
                    <div className="nk-block-head">
                      <div className="nk-block-between">
                        <div className="nk-block-head-content">
                          <h3 className="nk-block-title page-title">
                            Affiliate List
                          </h3>
                          <div className="nk-block-des text-soft">
                            <ul class="nk-block-tools g-3" style={{ paddingLeft: "0px" }}>
                              <li>
                                <a class="btn btn-white btn-dim btn-outline-light" onClick={() => {
                                  setLevel1(true)
                                  setLevel2(false)
                                  setLevel3(false)
                                  getAffiliateList(1)
                                }}>
                                  <span>Level 1</span></a>
                              </li>
                              <li>
                                <a class="btn btn-white btn-dim btn-outline-light" onClick={() => {
                                  setLevel1(false)
                                  setLevel2(true)
                                  setLevel3(false)
                                  getAffiliateList(2)
                                }}>
                                  <span>Level 2</span></a>
                              </li>
                              <li>
                                <a class="btn btn-white btn-dim btn-outline-light" onClick={() => {
                                  setLevel1(false)
                                  setLevel2(false)
                                  setLevel3(true)
                                  getAffiliateList(3)
                                }}>
                                  <span>Level 3</span></a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="nk-block-head-content">
                          <div className="toggle-wrap nk-block-tools-toggle">
                            <a
                              href="#"
                              className="btn btn-icon btn-trigger toggle-expand mr-n1"
                              data-target="pageMenu"
                            >
                              <em className="icon ni ni-menu-alt-r"></em>
                            </a>
                            <div
                              className="toggle-expand-content"
                              data-content="pageMenu"
                            >
                              {/* <ul className="nk-block-tools g-3">
                                    <li>
                                      <a
                                        href="#"
                                        className="btn btn-white btn-outline-light"
                                      >
                                        <em className="icon ni ni-download-cloud"></em>
                                        <span>Export</span>
                                      </a>
                                    </li>
                                    <li className="nk-block-tools-opt">
                                      <div className="drodown">
                                        <a
                                          href="#"
                                          className="dropdown-toggle btn btn-icon btn-primary"
                                          data-toggle="dropdown"
                                        >
                                          <em className="icon ni ni-plus"></em>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <ul className="link-list-opt no-bdr">
                                            <li>
                                              <a href="#">
                                                <span>Add User</span>
                                              </a>
                                            </li>
                                            <li>
                                              <a href="#">
                                                <span>Add Team</span>
                                              </a>
                                            </li>
                                            <li>
                                              <a href="#">
                                                <span>Import User</span>
                                              </a>
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

                    {/* Level 1 */}
                    {level1 == true ?
                      <div class="table-responsive-md">
                        <h2>Level 1</h2>
                        <table class="table table-hover">
                          <thead>
                            <tr>
                              <th scope="col">S.N.</th>
                              <th scope="col">Email</th>
                              <th scope="col">Total Purchased</th>
                              <th scope="col">Total Expenase</th>
                              <th scope="col">Affiliate Recived (5%)</th>
                              <th scope="col">Handout</th>
                              <th scope="col">View</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              tab.map((element, index) => {
                                return (
                                  <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{element.email}</td>
                                    <td>{element?.totalBuy?.toFixed(2)} ANA</td>
                                    <td>
                                      {
                                        userInfo?.currency_preference == 'usd' ? `${element?.totalExp?.toFixed(2)} USDT` : `${(element?.totalExp * oneUsdPrice)?.toFixed(2)} INRX`
                                      }
                                    </td>
                                    <td>
                                      {
                                        userInfo?.currency_preference == 'usd' ? `${element?.totalAff?.toFixed(2)} USDT` : `${(element?.totalAff * oneUsdPrice).toFixed(2)} INRX`
                                      }
                                    </td>
                                    <td>
                                      {
                                        userInfo?.currency_preference == 'usd' ? `${element?.totalHandout?.toFixed(2)} USDT` : `${(element?.totalHandout * oneUsdPrice).toFixed(2)} INRX`
                                      }
                                    </td>
                                    <td>
                                      <MdMoreHoriz />
                                    </td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </table>
                      </div> : null}

                    {/* Level 2 */}
                    {level2 == true ? <div className="nk-block">
                      <div className="card card-bordered card-stretch">
                        <div className="card-inner-group">
                          <div className="card-inner position-relative card-tools-toggle">
                            <div className="card-title-group">
                              <div className="card-tools">
                                <div className="form-inline flex-nowrap gx-3">
                                  <h5>Level 2</h5>
                                  {/* <div className="form-wrap w-150px">
                                    <select
                                      className="form-select form-select-sm"
                                      data-search="off"
                                      data-placeholder="Bulk Action"
                                    >
                                      <option value="">Level 1</option>
                                      <option value="email">
                                        Level 2
                                      </option>
                                      <option value="group">
                                        Level 3
                                      </option>

                                    </select>
                                  </div> */}

                                </div>
                              </div>
                              <div className="card-tools mr-n1">
                                <ul className="btn-toolbar gx-1">
                                  <li>
                                    <a
                                      href="#"
                                      className="btn btn-icon search-toggle toggle-search"
                                      data-target="search"
                                    >
                                      <em className="icon ni ni-search"></em>
                                    </a>
                                  </li>
                                  <li className="btn-toolbar-sep"></li>
                                  <li>
                                    <div className="toggle-wrap">
                                      <a
                                        href="#"
                                        className="btn btn-icon btn-trigger toggle"
                                        data-target="cardTools"
                                      >
                                        <em className="icon ni ni-menu-right"></em>
                                      </a>
                                      <div
                                        className="toggle-content"
                                        data-content="cardTools"
                                      >
                                        <ul className="btn-toolbar gx-1">
                                          <li className="toggle-close">
                                            <a
                                              href="#"
                                              className="btn btn-icon btn-trigger toggle"
                                              data-target="cardTools"
                                            >
                                              <em className="icon ni ni-arrow-left"></em>
                                            </a>
                                          </li>
                                          <li>
                                            <div className="dropdown">
                                              <a
                                                href="#"
                                                className="btn btn-trigger btn-icon dropdown-toggle"
                                                data-toggle="dropdown"
                                              >
                                                <div className="dot dot-primary"></div>
                                                <em className="icon ni ni-filter-alt"></em>
                                              </a>
                                              <div className="filter-wg dropdown-menu dropdown-menu-xl dropdown-menu-right">
                                                <div className="dropdown-head">
                                                  <span className="sub-title dropdown-title">
                                                    Filter Users
                                                  </span>
                                                  <div className="dropdown">
                                                    <a
                                                      href="#"
                                                      className="btn btn-sm btn-icon"
                                                    >
                                                      <em className="icon ni ni-more-h"></em>
                                                    </a>
                                                  </div>
                                                </div>
                                                <div className="dropdown-body dropdown-body-rg">
                                                  <div className="row gx-6 gy-3">
                                                    <div className="col-6">
                                                      <div className="custom-control custom-control-sm custom-checkbox">
                                                        <input
                                                          type="checkbox"
                                                          className="custom-control-input"
                                                          id="hasBalance"
                                                        />
                                                        <label
                                                          className="custom-control-label"
                                                          for="hasBalance"
                                                        >
                                                          {" "}
                                                          Have Balance
                                                        </label>
                                                      </div>
                                                    </div>
                                                    <div className="col-6">
                                                      <div className="custom-control custom-control-sm custom-checkbox">
                                                        <input
                                                          type="checkbox"
                                                          className="custom-control-input"
                                                          id="hasKYC"
                                                        />
                                                        <label
                                                          className="custom-control-label"
                                                          for="hasKYC"
                                                        >
                                                          {" "}
                                                          KYC Verified
                                                        </label>
                                                      </div>
                                                    </div>
                                                    <div className="col-6">
                                                      <div className="form-group">
                                                        <label className="overline-title overline-title-alt">
                                                          Role
                                                        </label>
                                                        <select className="form-select form-select-sm">
                                                          <option value="any">
                                                            Any Role
                                                          </option>
                                                          <option value="investor">
                                                            Investor
                                                          </option>
                                                          <option value="seller">
                                                            Seller
                                                          </option>
                                                          <option value="buyer">
                                                            Buyer
                                                          </option>
                                                        </select>
                                                      </div>
                                                    </div>
                                                    <div className="col-6">
                                                      <div className="form-group">
                                                        <label className="overline-title overline-title-alt">
                                                          Status
                                                        </label>
                                                        <select className="form-select form-select-sm">
                                                          <option value="any">
                                                            Any Status
                                                          </option>
                                                          <option value="active">
                                                            Active
                                                          </option>
                                                          <option value="pending">
                                                            Pending
                                                          </option>
                                                          <option value="suspend">
                                                            Suspend
                                                          </option>
                                                          <option value="deleted">
                                                            Deleted
                                                          </option>
                                                        </select>
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
                                                  <a
                                                    className="clickable"
                                                    href="#"
                                                  >
                                                    Reset Filter
                                                  </a>
                                                  <a href="#">
                                                    Save Filter
                                                  </a>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="dropdown">
                                              <a
                                                href="#"
                                                className="btn btn-trigger btn-icon dropdown-toggle"
                                                data-toggle="dropdown"
                                              >
                                                <em className="icon ni ni-setting"></em>
                                              </a>
                                              <div className="dropdown-menu dropdown-menu-xs dropdown-menu-right">
                                                <ul className="link-check">
                                                  <li>
                                                    <span>Show</span>
                                                  </li>
                                                  <li className="active">
                                                    <a href="#">10</a>
                                                  </li>
                                                  <li>
                                                    <a href="#">20</a>
                                                  </li>
                                                  <li>
                                                    <a href="#">50</a>
                                                  </li>
                                                </ul>
                                                <ul className="link-check">
                                                  <li>
                                                    <span>Order</span>
                                                  </li>
                                                  <li className="active">
                                                    <a href="#">DESC</a>
                                                  </li>
                                                  <li>
                                                    <a href="#">ASC</a>
                                                  </li>
                                                </ul>
                                              </div>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div
                              className="card-search search-wrap"
                              data-search="search"
                            >
                              <div className="card-body">
                                <div className="search-content">
                                  <a
                                    href="#"
                                    className="search-back btn btn-icon toggle-search"
                                    data-target="search"
                                  >
                                    <em className="icon ni ni-arrow-left"></em>
                                  </a>
                                  <input
                                    type="text"
                                    className="form-control border-transparent form-focus-none"
                                    placeholder="Search by user or email"
                                  />
                                  <button className="search-submit btn btn-icon">
                                    <em className="icon ni ni-search"></em>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <table class="table table-hover">
                            <thead>
                              <tr>
                                <th scope="col">S.N.</th>
                                <th scope="col">Email</th>
                                <th scope="col">Sponsor</th>
                                <th scope="col">Total Purchased</th>
                                <th scope="col">Total Expenase</th>
                                <th scope="col">Affiliate Recived (5%)</th>
                                <th scope="col">Handout</th>
                                <th scope="col">view</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                tab.map((element, index) => {
                                  return (
                                    <tr>
                                      <th scope="row">{index + 1}</th>
                                      <td>{element.email}</td>
                                      <td>{element.sponsor}</td>
                                      <td>{element?.totalBuy?.toFixed(2)} ANA</td>
                                      <td>
                                        {
                                          userInfo?.currency_preference == 'usd' ? `${element?.totalExp?.toFixed(2)} USDT` : `${(element?.totalExp * oneUsdPrice)?.toFixed(2)} INRX`
                                        }
                                      </td>
                                      <td>
                                        {
                                          userInfo?.currency_preference == 'usd' ? `${element?.totalAff?.toFixed(2)} USDT` : `${(element?.totalAff * oneUsdPrice).toFixed(2)} INRX`
                                        }
                                      </td>
                                      <td>
                                        0 INRX
                                      </td>
                                      <td>
                                        <MdMoreHoriz />
                                      </td>
                                    </tr>
                                  )
                                })
                              }
                            </tbody>
                          </table>
                          <div className="card-inner">
                            <ul className="pagination justify-content-center justify-content-md-center">
                              <li className="page-item">
                                <a className="page-link" href="#">
                                  Prev
                                </a>
                              </li>
                              <li className="page-item">
                                <a className="page-link" href="#">
                                  1
                                </a>
                              </li>
                              <li className="page-item">
                                <a className="page-link" href="#">
                                  2
                                </a>
                              </li>
                              <li className="page-item">
                                <span className="page-link">
                                  <em className="icon ni ni-more-h"></em>
                                </span>
                              </li>
                              <li className="page-item">
                                <a className="page-link" href="#">
                                  6
                                </a>
                              </li>
                              <li className="page-item">
                                <a className="page-link" href="#">
                                  7
                                </a>
                              </li>
                              <li className="page-item">
                                <a className="page-link" href="#">
                                  Next
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div> : null}

                    {/* Level 3 */}
                    {level3 == true ?
                      <>
                        <h3>Level 3</h3>
                        <table class="table table-hover">
                          <thead>
                            <tr>
                              <th scope="col">S.N.</th>
                              <th scope="col">Email</th>
                              <th scope="col">Sponsor</th>
                              <th scope="col">Total Purchased</th>
                              <th scope="col">Total Expenase</th>
                              <th scope="col">Affiliate Recived (2%)</th>
                              <th scope="col">Handout</th>
                              <th scope="col">view</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              tab.map((element, index) => {
                                return (
                                  <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{element.email}</td>
                                    <td>{element.sponsor}</td>
                                    <td>{element?.totalBuy?.toFixed(2)} ANA</td>
                                    <td>
                                      {
                                        userInfo?.currency_preference == 'usd' ? `${element?.totalExp?.toFixed(2)} USDT` : `${(element?.totalExp * oneUsdPrice)?.toFixed(2)} INRX`
                                      }
                                    </td>
                                    <td>
                                      {
                                        userInfo?.currency_preference == 'usd' ? `${element?.totalAff?.toFixed(2)} USDT` : `${(element?.totalAff * oneUsdPrice).toFixed(2)} INRX`
                                      }
                                    </td>
                                    <td>
                                      {
                                        userInfo?.currency_preference == 'usd' ? `${element?.totalHandout?.toFixed(2)} USDT` : `${(element?.totalHandout * oneUsdPrice).toFixed(2)} INRX`
                                      }
                                    </td>
                                    <td>
                                      <MdMoreHoriz />
                                    </td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </table>
                      </> : null}

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

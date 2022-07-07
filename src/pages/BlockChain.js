import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";


const BlockChain = () => {



  return (
    <div className="nk-app-root">
      <div className="nk-main ">
        <Menu />
        <div className="nk-wrap">
          <Header />
          <div className="nk-content nk-content-fluid min-height">
            <div className="container-xl">
              <div className="nk-content-body">
              <div class="nk-block-head nk-block-head-lg">
                  <div class="nk-block-head-content">
                    <h4 class="nk-block-title fw-normal">BlockChain</h4>
                    <div class="nk-block-des">
                      <p>BlockChain details</p>
                    </div>
                  </div>
                </div>
                <div className="card card-bordered card-preview">
                  <div class="card-inner bg-light">
                    <div id="DataTables_Table_1_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                      <div class="row justify-between g-2 ">
                        <div class="col-7 col-sm-4 text-start  d-flex align-items-start">
                          <div id="DataTables_Table_1_filter" class="dataTables_filter"><label><input type="search"
                            class="form-control form-control-sm" placeholder="Type in to Search"
                            aria-controls="DataTables_Table_1" spellcheck="false" data-ms-editor="true" /></label></div>
                        </div>
                        <div class="col-5 col-sm-8 text-end">
                          <div class="datatable-filter">
                            <div class="d-flex justify-content-end g-2">
                              <div class="dataTables_length" id="DataTables_Table_1_length"><label><span
                                class="d-none d-sm-inline-block">Show</span>
                                <div class="form-control-select"> <select name="DataTables_Table_1_length"
                                  aria-controls="DataTables_Table_1"
                                  class="custom-select custom-select-sm form-control form-control-sm">
                                  <option value="10">10</option>
                                  <option value="25">25</option>
                                  <option value="50">50</option>
                                  <option value="100">100</option>
                                </select> </div>
                              </label></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="datatable-wrap my-3 bg-white">
                        <table class="datatable-init nk-tb-list nk-tb-ulist dataTable no-footer" data-auto-responsive="false"
                          id="DataTables_Table_1" aria-describedby="DataTables_Table_1_info">
                          <thead>
                            <tr class="nk-tb-item nk-tb-head">

                              <th class="nk-tb-col sorting" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1"
                                colspan="1" aria-label="User: activate to sort column ascending"><span
                                  class="sub-text">User</span></th>
                              <th class="nk-tb-col tb-col-mb sorting" tabindex="0" aria-controls="DataTables_Table_1"
                                rowspan="1" colspan="1" aria-label="Balance: activate to sort column ascending"><span
                                  class="sub-text">Balance</span></th>
                              <th class="nk-tb-col tb-col-md sorting" tabindex="0" aria-controls="DataTables_Table_1"
                                rowspan="1" colspan="1" aria-label="Phone: activate to sort column ascending"><span
                                  class="sub-text">Phone</span></th>
                              <th class="nk-tb-col tb-col-lg sorting" tabindex="0" aria-controls="DataTables_Table_1"
                                rowspan="1" colspan="1" aria-label="Verified: activate to sort column ascending"><span
                                  class="sub-text">Verified</span></th>
                              <th class="nk-tb-col tb-col-lg sorting" tabindex="0" aria-controls="DataTables_Table_1"
                                rowspan="1" colspan="1" aria-label="Last Login: activate to sort column ascending"><span
                                  class="sub-text">Last Login</span></th>
                              <th class="nk-tb-col tb-col-md sorting" tabindex="0" aria-controls="DataTables_Table_1"
                                rowspan="1" colspan="1" aria-label="Status: activate to sort column ascending"><span
                                  class="sub-text">Status</span></th>
                              <th class="nk-tb-col nk-tb-col-tools text-end sorting" tabindex="0"
                                aria-controls="DataTables_Table_1" rowspan="1" colspan="1"
                                aria-label=": activate to sort column ascending"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="nk-tb-item odd">

                              <td class="nk-tb-col">
                                <div class="user-card">
                                  <div class="user-avatar bg-success d-none d-sm-flex"><span>AB</span></div>
                                  <div class="user-info"><span class="tb-lead">Abu Bin Ishtiyak <span
                                    class="dot dot-success d-md-none ms-1"></span></span><span>info@softnio.com</span>
                                  </div>
                                </div>
                              </td>
                              <td class="nk-tb-col tb-col-mb" data-order="35040.34"><span class="tb-amount">35040.34 <span
                                class="currency">USD</span></span></td>
                              <td class="nk-tb-col tb-col-md"><span>+811 847-4958</span></td>
                              <td class="nk-tb-col tb-col-lg" data-order="Email Verified - Kyc Unverified">
                                <ul class="list-status pl-0">
                                  <li><em class="icon text-success ni ni-check-circle"></em> <span>Email</span></li>
                                  <li><em class="icon ni ni-alert-circle"></em> <span>KYC</span></li>
                                </ul>
                              </td>
                              <td class="nk-tb-col tb-col-lg"><span>05 Oct 2019</span></td>
                              <td class="nk-tb-col tb-col-md"><span class="tb-status text-success">Active</span></td>

                            </tr>
                            <tr class="nk-tb-item even">

                              <td class="nk-tb-col">
                                <div class="user-card">
                                  <div class="user-avatar bg-success d-none d-sm-flex"><span>AL</span></div>
                                  <div class="user-info"><span class="tb-lead">Ashley Lawson <span
                                    class="dot dot-warning d-md-none ms-1"></span></span><span>ashley@softnio.com</span>
                                  </div>
                                </div>
                              </td>
                              <td class="nk-tb-col tb-col-mb" data-order="580.00"><span class="tb-amount">580.00 <span
                                class="currency">USD</span></span></td>
                              <td class="nk-tb-col tb-col-md"><span>+124 394-1787</span></td>
                              <td class="nk-tb-col tb-col-lg" data-order="Email Verified - Kyc Submited">
                                <ul class="list-status pl-0">
                                  <li><em class="icon text-success ni ni-check-circle"></em> <span>Email</span></li>
                                  <li><em class="icon text-info ni ni-alert-circle"></em> <span>KYC</span></li>
                                </ul>
                              </td>
                              <td class="nk-tb-col tb-col-lg"><span>07 Feb 2020</span></td>
                              <td class="nk-tb-col tb-col-md"><span class="tb-status text-warning">Pending</span></td>
                            </tr>


                            <tr class="nk-tb-item even">
                              <td class="nk-tb-col">
                                <div class="user-card">
                                  <div class="user-avatar bg-success d-none d-sm-flex"><span>AL</span></div>
                                  <div class="user-info"><span class="tb-lead">Ashley Lawson <span
                                    class="dot dot-warning d-md-none ms-1"></span></span><span>ashley@softnio.com</span>
                                  </div>
                                </div>
                              </td>
                              <td class="nk-tb-col tb-col-mb" data-order="580.00"><span class="tb-amount">580.00 <span
                                class="currency">USD</span></span></td>
                              <td class="nk-tb-col tb-col-md"><span>+124 394-1787</span></td>
                              <td class="nk-tb-col tb-col-lg" data-order="Email Verified - Kyc Submited">
                                <ul class="list-status pl-0">
                                  <li><em class="icon text-success ni ni-check-circle"></em> <span>Email</span></li>
                                  <li><em class="icon text-info ni ni-alert-circle"></em> <span>KYC</span></li>
                                </ul>
                              </td>
                              <td class="nk-tb-col tb-col-lg"><span>07 Feb 2020</span></td>
                              <td class="nk-tb-col tb-col-md"><span class="tb-status text-warning">Pending</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                    </div>
                  </div>
                </div>
                <div class="row p-3">
                  <div class="col-12 col-sm-12 col-md-12">
                    <div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_1_paginate">
                      <ul class="pagination justify-content-center">
                        <li class="paginate_button page-item previous disabled" id="DataTables_Table_1_previous"><a
                          href="#" aria-controls="DataTables_Table_1" data-dt-idx="0" tabindex="0"
                          class="page-link">Prev</a></li>
                        <li class="paginate_button page-item active"><a href="#" aria-controls="DataTables_Table_1"
                          data-dt-idx="1" tabindex="0" class="page-link">1</a></li>

                        <li class="paginate_button page-item next" id="DataTables_Table_1_next"><a href="#"
                          aria-controls="DataTables_Table_1" data-dt-idx="3" tabindex="0"
                          class="page-link">Next</a></li>
                      </ul>
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
export default BlockChain;

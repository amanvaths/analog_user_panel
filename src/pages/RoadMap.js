import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/ClockStyle.css";
import axios from "axios";

const RoadMap = () => {


  
  return (
    <div className="nk-app-root">
      <div className="nk-main ">
        <Menu />
        <div className="nk-wrap">
          <Header />
          <div className="nk-content nk-content-fluid bg-light min-height">
            <div className="container-xl">
              <div className="nk-content-body">
                <div class="nk-block-head nk-block-head-lg">
                  <div class="nk-block-head-content">
                    <h4 class="nk-block-title fw-normal">Roadmap</h4>
                    <div class="nk-block-des">
                      <p>A Complete Roadmap to Blockchain Development</p>
                    </div>
                  </div>
                </div>
                <div class="card card-bordered card-preview">
                  <div class="card-inner">
                    <ul class="nav nav-tabs nav-tabs-s2 mt-n2">
                      <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tabItem9">15 July 2022</a></li>
                      <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tabItem10">Data one</a></li>
                      <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#tabItem11">Data two</a>
                      </li>
                      <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tabItem12">Data Three</a></li>
                    </ul>
                    <div class="tab-content">
                      <div class="tab-pane" id="tabItem9">
                        <p>Cillum ad ut irure tempor velit nostrud occaecat ullamco aliqua anim Lorem sint. Veniam sint duis
                          incididunt do esse magna mollit excepteur laborum qui. Id id reprehenderit sit est eu aliqua
                          occaecat quis et velit excepteur laborum mollit dolore eiusmod. Ipsum dolor in occaecat commodo et
                          voluptate minim reprehenderit mollit pariatur. Deserunt non laborum enim et cillum eu deserunt
                          excepteur ea incid.</p>
                      </div>
                      <div class="tab-pane" id="tabItem10">
                        <p>Culpa dolor voluptate do laboris laboris irure reprehenderit id incididunt duis pariatur mollit aute
                          magna pariatur consectetur. Eu veniam duis non ut dolor deserunt commodo et minim in quis laboris
                          ipsum velit id veniam. Quis ut consectetur adipisicing officia excepteur non sit. Ut et elit aliquip
                          labore Lorem enim eu. Ullamco mollit occaecat dolore ipsum id officia mollit qui esse anim eiusmod
                          do sint minim consectetur qui.</p>
                      </div>
                      <div class="tab-pane active" id="tabItem11">
                        <p>Fugiat id quis dolor culpa eiusmod anim velit excepteur proident dolor aute qui magna. Ad proident
                          laboris ullamco esse anim Lorem Lorem veniam quis Lorem irure occaecat velit nostrud magna nulla.
                          Velit et et proident Lorem do ea tempor officia dolor. Reprehenderit Lorem aliquip labore est magna
                          commodo est ea veniam consectetur.</p>
                      </div>
                      <div class="tab-pane" id="tabItem12">
                        <p>Eu dolore ea ullamco dolore Lorem id cupidatat excepteur reprehenderit consectetur elit id dolor
                          proident in cupidatat officia. Voluptate excepteur commodo labore nisi cillum duis aliqua do. Aliqua
                          amet qui mollit consectetur nulla mollit velit aliqua veniam nisi id do Lorem deserunt amet. Culpa
                          ullamco sit adipisicing labore officia magna elit nisi in aute tempor commodo eiusmod.</p>
                      </div>
                    </div>
                  </div>
                </div>
                            
                <div class='center-dial'>
                <h1 class='center-preview'>HELLO</h1>
                <div class='head'></div>
                <div class='torso'></div>
                <div class='hand-container' id='minutes'>
                <div class='minute-hand'></div>
                </div>
                <div class='hand-container' id='hours'>
                <div class='hour-hand'></div>
                </div>
                <div class='hand-container' id='seconds'>
                <div class='second-hand'></div>
                </div>
                </div>
                <div class='day-name-dial'>
                <div class='ring-back'></div>
                <div class='ring' id='r1'>
                <h1 class='day-name-preview'>DAY NAME</h1>
                <h2 class='day-name-text'>MON TUE WED THU FRI SAT SUN</h2>
                </div>
                </div>
                <div class='month-dial'>
                <div class='ring-back'></div>
                <div class='ring' id='r2'>
                <h1 class='month-preview'>MONTH</h1>
                <h2 class='month-text'>JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC</h2>
                </div>
                </div>
                <div class='day-dial'>
                <div class='ring-back'></div>
                <div class='ring' id='r3'>
                <h1 class='day-preview'>DAY</h1>
                <h2 class='day-text'>01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31</h2>
                </div>
                </div>
                {/* <div class='side-ring' id='weather'>
                <div class='fa fa-cloud'></div>
                <p class='temperature'>14&#176C</p>
                </div>`
                <div class='side-ring' id='steps'>
                <div class='bars'>
                <div class='bar'>
                  <div class='day-letter'>M</div>
                  <div class='x' id='x1'></div>
                </div>
                <div class='bar'>
                  <div class='day-letter'>T</div>
                  <div class='x' id='x2'></div>
                </div>
                <div class='bar'>
                  <div class='day-letter'>W</div>
                  <div class='x' id='x3'></div>
                </div>
                <div class='bar'>
                  <div class='day-letter'>T</div>
                  <div class='x' id='x4'></div>
                </div>
                <div class='bar'>
                  <div class='day-letter'>F</div>
                  <div class='x' id='x5'></div>
                </div>
                <div class='bar'>
                  <div class='day-letter'>S</div>
                  <div class='x' id='x6'></div>
                </div>
                <div class='bar'>
                  <div class='day-letter'>S</div>
                  <div class='x' id='x7'></div>
                </div>
                </div>
                </div> */}

              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );

}
export default RoadMap;

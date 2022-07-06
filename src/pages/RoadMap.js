import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
                <div className="nk-block-head nk-block-head-sm">
                  
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

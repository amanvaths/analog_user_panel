import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "react-multi-carousel/lib/styles.css";
import axios from "axios";

const Offer = () => {


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
                  <div class="nk-block-head-content text-center">
                    <h2 class="nk-block-title fw-normal">Latest Offers</h2>
                    <div class="nk-block-des">
                      <p class="lead">Digital PR focuses on different forms of social media, blogs, online news sites, influencer marketing, and more.</p>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="shadow mt-3">
                    <div id="carouselExFade" class="carousel slide carousel-fade" data-ride="carousel" data-interval="2000">
                    <ol class="carousel-indicators mb-n5">
                        <li data-bs-target="#carouselExFade" data-bs-slide-to="0" class="active"></li>
                        <li data-bs-target="#carouselExFade" data-bs-slide-to="1"></li>
                        <li data-bs-target="#carouselExFade" data-bs-slide-to="2"></li>
                    </ol>
                      <div class="carousel-inner">
                        <div class="carousel-item active">
                          <img class="d-block w-100" src="images/offer/offer1.jpg" alt="First Offer" />
                        </div>

                        <div class="carousel-item">
                          <img class="d-block w-100" src="images/offer/offer5.jpg" alt="Third Offer" />
                        </div>
                        <div class="carousel-item">
                          <img class="d-block w-100" src="images/offer/offer3.jpg" alt="Third Offer" />
                        </div>
                      </div>

                      <a class="carousel-control-prev" href="#carouselExFade" role="button" data-bs-slide="prev"> <span
                        class="carousel-control-prev-icon" aria-hidden="true"></span> <span class="visually-hidden">Previous</span>
                      </a> <a class="carousel-control-next" href="#carouselExFade" role="button" data-bs-slide="next"> <span
                        class="carousel-control-next-icon" aria-hidden="true"></span> <span class="visually-hidden">Next</span> </a>
                    </div>
                    {/* <Slide>
                  {i?.map((slideImage, index) => {
                    return (
                      <div className="each-slide border border-" key={index}>
                        <div
                          style={{
                            backgroundImage: `url(http://localhost:3001${slideImage.banner})`,
                            // height: "250px",
                            width: "100%",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundAttachment: "fixed",
                          }}
                        >
                          <span
                            style={{
                              height: "250px",
                              display: "inline-block",
                             // marginTop: "20px",
                            }}
                          >
                            {slideImage.caption}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </Slide> */}
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
export default Offer;

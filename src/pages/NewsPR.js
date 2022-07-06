import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

const NewsPR = () => {


  return (
    <div className="nk-app-root">
      <div className="nk-main ">
        <Menu />
        <div className="nk-wrap">
          <Header />
          <div className="nk-content nk-content-fluid bg-light min-height">
            <div className="container-xl wide-lg">
              <div className="nk-content-body">
                <div class="nk-block-head nk-block-head-lg">
                  <div class="nk-block-head-content">
                    <h2 class="nk-block-title fw-normal">Latest News &amp; PR</h2>
                    <div class="nk-block-des">
                      <p class="lead">Digital PR focuses on different forms of social media, blogs, online news sites, influencer marketing, and more.</p>
                    </div>
                  </div>
                </div>
                <div class="nk-block">
                  <div class="card card-bordered shadow-sm">
                    <div class="card-inner">
                      <div class="row g-gs">
                        <div class="col-lg-5">
                          <div class="video">
                            <img class="news_img_div" src="images/news/news-banner.jpg" alt="" />
                          </div>
                        </div>
                        <div class="col-lg-7">
                          <div class="product-details entry me-xxl-3">
                            <span className="sub-text mb-2">July 05 2022</span>
                            <h4 className="text-teal">Blockchain PR - Everything You Need to Know</h4>
                            <p>Learn all you need to know about Blockchain PR by reading this definitive guide..</p>
                            <a href="/NewsArticle" target="_blank" class="btn btn-sm btn-outline-success">Read More</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card card-bordered shadow-sm">
                    <div class="card-inner">
                      <div class="row g-gs">
                        <div class="col-lg-5">
                          <div class="video">
                            <img class="news_img_div" src="images/news/cryptocurrency.jpg" alt="" />
                          </div>
                        </div>
                        <div class="col-lg-7">
                          <div class="product-details entry me-xxl-3">
                            <span className="sub-text mb-2">July 06 2022</span>
                            <h4 className="text-teal">Blockchain PR - Everything You Need to Know</h4>
                            <p>Learn all you need to know about Blockchain PR by reading this definitive guide..</p>
                            <a href="/NewsArticle" target="_blank"  class="btn btn-sm btn-outline-success">Read More</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card card-bordered shadow-sm">
                    <div class="card-inner">
                      <div class="row g-gs">
                        <div class="col-lg-5">
                          <div class="video">
                            <img class="news_img_div" src="images/news/cryptocurrency3.jpg" alt="" />
                          </div>
                        </div>
                        <div class="col-lg-7">
                          <div class="product-details entry me-xxl-3">
                          <span className="sub-text mb-2">July 07 2022</span>
                            <h4 className="text-teal">Blockchain PR - Everything You Need to Know</h4>
                            <p>Learn all you need to know about Blockchain PR by reading this definitive guide..</p>
                            <a href="/NewsArticle" target="_blank" class="btn btn-sm btn-outline-success">Read More</a>
                          </div>
                        </div>
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
export default NewsPR;

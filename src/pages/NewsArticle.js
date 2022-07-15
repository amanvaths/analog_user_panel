import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useLocation } from "react-router-dom";


const NewsArticle = () => {
  const location = useLocation()
  console.log(location.state, "STATE");
  return (
    <div className="nk-app-root">
      <div className="nk-main ">
        <Menu />
        <div className="nk-wrap">
          <Header />
          <div className="nk-content nk-content-fluid bg-light min-height">
            <div className="container-xl">
              <div className="nk-content-body">
              {/* <div class="nk-block-head nk-block-head-lg">
                  <div class="nk-block-head-content">
                    <h2 class="nk-block-title fw-normal">Latest News &amp; PR</h2>
                    <div class="nk-block-des">
                      <p class="lead">Digital PR focuses on different forms of social media, blogs, online news sites, influencer marketing, and more.</p>
                    </div>
                  </div>
                </div> */}
                <div class="nk-block">
                    <div class="card card-bordered">
                        <div class="card-inner card-inner-xl">
                            <article class="entry">
                                <h3>{location.state.title}</h3>
                                <img src={location.state.image} alt="" srcset="" />
                                <p>{location.state.message}</p>
                                {/* <p>Learn all you need to know about Blockchain PR by reading this definitive guide. Fuga eius ipsam blanditiis
                                    voluptatem mollitia dolores asperiores ipsum rerum repellendus. Ullam et, quam eos
                                    blanditiis ipsum tempore minus quis laborum praesentium.</p>
                                <p>Popsam blanditiis voluptatem mollitia dolores asperiores ipsum rerum repellendus.
                                    Ullam et, quam eos blanditiis ipsum tempore.</p><img
                                    src="images/news/news-banner.jpg" alt=""/>
                                <h4>‘Bitcoin is really a risk asset,’ says Blockchain.com CEO</h4>
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam, eaque ipsa quae ab illoveritatis et quasi architecto
                                    beatae vitae dicta sunt explicabo. </p>
                                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                                    consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                                    quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
                                    sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam
                                    quaerat voluptatem. Ut enim ad minima veniam.</p>
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam, eaque ipsa quae ab illoveritatis et quasi architecto
                                    beatae vitae dicta sunt explicabo. </p>
                                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                                    consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                                    quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
                                    sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam
                                    quaerat voluptatem. Ut enim ad minima veniam.</p>
                                <h5>Perspiciatis unde omnis iste natus error sit voluptatem</h5>
                                <p>Mollitia dolores asperiores ipsum rerum repellendus Sed ut accusantium doloremque
                                    laudantium, totam rem aperiam, eaque ipsa quae ab illoveritatis et quasi architecto
                                    beatae vitae dicta sunt explicabo. </p> */}
                            </article>
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
export default NewsArticle;

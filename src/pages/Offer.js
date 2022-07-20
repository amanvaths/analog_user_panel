import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { BASE_URL, BASE_URL_2 } from "../Api_connection/config";
import Carousel from 'react-bootstrap/Carousel';

const Offer = () => {

  const [offers, setOffers] = useState([])

  const getOffers = async () => {
    try {
      const data = await axios.post(`${BASE_URL}/offers`)
      // console.log(data.data, "Offer API");
      setOffers(data.data)
    } catch (error) {
    }
  }

  useEffect(() => {
    getOffers()
  }, [])

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
                    <Carousel fade>
                      {
                        offers.map((element, index) => {
                          return (
                            <Carousel.Item key={index}>
                              <img
                                style={{ height: "471px", width: "1000px" }}
                                className="d-block w-100"
                                src={`${BASE_URL_2}${element.image}`}
                                alt={index+1}
                              />
                            </Carousel.Item>
                          )
                        })
                      }
                    </Carousel>
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

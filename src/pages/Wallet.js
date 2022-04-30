import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card1 from "../components/Card";
import { Button } from "react-bootstrap";
import axios from "axios";

const Wallet = (props) => {
  const [coinData, setCoinData] = useState([]);
  const [walletDetails, setWalletDetails] = useState([]);
  const [coinWW, setCoinWW] = useState([]);
  const userInfo = localStorage.getItem("email");

 
  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/getCoinData");
      const cd = [];
      for (let coin of Object.entries(res.data)) {
        //console.log(coin);
        cd.push(coin[1]);
      }

      //console.log(cd, "coin data");
      setCoinData([...cd]);
    } catch (error) {
      console.log(error);
    }
  };

  const email = localStorage.getItem("email")

    
  // useEffect(async()=>{
  //   window.location.reload(axios.get("http://localhost:3001/api/transaction_history"))
  // },[coinWW])

  async function getWalletDetails() {
    const walletAddress = await axios.post(
      "http://localhost:3001/api/getwalletdata",
      { email: email }
    );
    // console.log(walletAddress.data);
    setWalletDetails([...walletAddress.data]);
  }
  const a = localStorage.getItem("token");
  console.log(a, "fdjj");
  useEffect(() => {
    getData();
    getWalletDetails();
  }, []);

  useEffect(() => {
    // console.log("", coinData);
    if (coinData.length > 0 && walletDetails.length > 0) {
      const cd = [{
        
      }];
      for (let coind of coinData) {
        const w = walletDetails.filter((w) => w.symbol == coind.symbol);
        cd.push({ ...coind, wallet: w[0] });
      }
      console.log(cd);
      setCoinWW([...cd]);
    }
  }, [walletDetails, coinData]);

  const totalBalance = coinWW[0]?.wallet?.balance;
  var individualBalance = 0;
  var individualPriceInUsd = 0;
  var totalPriceInUsd = 0;
  var allFundValue = 0;
  // var tb = 0;
  for (let balance of coinWW) {
    individualBalance = balance?.wallet?.balance;
    individualPriceInUsd = balance?.quote?.USD?.price;
    totalPriceInUsd = individualBalance * individualPriceInUsd;
    allFundValue = parseFloat(totalPriceInUsd) + allFundValue;
  }
  console.log(allFundValue, ":: total balance");
  // console.log(tb, "::Total Balance");

  console.log(coinWW, "amitWW");

  return (
    <>
      <div>
        <div className="nk-app-root">
          <div className="nk-main ">
            <Menu />
            <div className="nk-wrap">
              <Header />
              <div className="contianer">
                <div className="row py-3">
                  <div className="col-6">
                    <h4 style={{ padding: "0 24px" }}>Wallet / Assets </h4>
                  </div>
                  <div className="col-6">
                    <label
                      className="float-right"
                      style={{ padding: "0 30px" }}
                    >
                      <h6>
                        {" "}
                        <b></b> Total Balance: &nbsp;&nbsp;&nbsp;$
                        {allFundValue}
                      </h6>
                    </label>
                  </div>
                </div>
                <div className="row" style={{marginBottom: "15vh"}}>
                  {coinWW.map((element, index) => {
                    return (
                      <div className="walletCard col-md-6 col-lg-4 col-12">
                        <Card1
                          title={element.name}
                          // price={element.quote.USD.price.toFixed(2)}
                          priceInUsd={element?.quote?.USD?.price.toFixed(2)}
                          price={element?.wallet?.balance}
                          lable={element?.symbol}
                          wallet={element?.wallet}
                          address={element?.wallet?.walletAddr}
                          logo={`https://s2.coinmarketcap.com/static/img/coins/64x64/${element.id}.png`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wallet;

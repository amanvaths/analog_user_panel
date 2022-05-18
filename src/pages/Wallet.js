import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card1 from "../components/Card";

import axios from "axios";
import { Triangle } from 'react-loader-spinner'
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from "../Api_connection/config";
import { setUserInfo } from "../redux/reducer/user";


const Wallet = (props) => {
  const { userInfo } = useSelector((state) => state.user.value)
  const dispatch = useDispatch();

  const [coinData, setCoinData] = useState([]);
  const [walletDetails, setWalletDetails] = useState([]);
  const [coinWW, setCoinWW] = useState([]);
  const [loader, setLoader] = useState(true)

  const email = localStorage.getItem("email");

  const getData = async () => {
    try {
      console.log(":: cp in ", userInfo.currency_preference);
      const cp  = userInfo?.currency_preference?.toUpperCase()
      const res = await axios.post(`${BASE_URL}/getCoinData`, { currency: cp });
      const cd = [];
      console.log(res.data, "::res.data");
      for (let coin of Object.entries(res.data)) {  
        cd.push(coin[1]);
      }
      setCoinData([...cd]);
    } catch (error) {
      console.log(error);
    }
  };

  async function getWalletDetails() {
    const walletAddress = await axios.post(
      `${BASE_URL}/getwalletdata`, { email: email });
    console.log(walletAddress, "wallet address")
    setWalletDetails([...walletAddress.data]);
  }

  const updateWallet = async () => {
    try {
      const data = await axios.post(`${BASE_URL}/transaction_update`, { email: email })
    } catch (error) {
      console.log(error);
    }
  }


  useEffect( async() => {
    const data = await axios.post(`${BASE_URL}/configSettings`, {email: email})
            if(data){
              dispatch(setUserInfo({userInfo: data.data}))
              updateWallet()
              getData();
              getWalletDetails();
            }
  }, [])

  useEffect(() => {
    if (coinData.length > 0 && walletDetails.length > 0) {
      const cd = [];
      for (let coind of coinData) {
        const w = walletDetails.filter((w) => w.symbol == coind.symbol);
        cd.push({ ...coind, wallet: w[0] });
      }
      console.log(cd, "cdcdddcdcdcdcdcdccddd");
      setCoinWW([...cd]);
      setLoader(false)
    }
  }, [walletDetails, coinData]);


  console.log(coinWW, ":: coin data in wallet *********#$#$#$#$#$#$#$#$#$#$#$#");

  return (
    <>
      <div>
        {loader ? (<>
          <div style={{ position: "absolute", zIndex: "99", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <Triangle ariaLabel="loading-indicator" color="blue" />
          </div>

        </>) :
          (<div className="nk-app-root">
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
                          Total Balance:
                          {/* {currency_prefrence === "usd" ? <span>&#36;</span>  : currency_prefrence === "inr" ? <span>&#8377;</span> : null} */}
                          &nbsp;&nbsp;
                          {/* {allFundValue} */}
                        </h6>
                      </label>
                    </div>
                  </div>
                  <div className="row" style={{ marginBottom: "15vh" }}>
                    {coinWW.map((element, index) => {
                      // console.log(element?.quote?.[userInfo.currency_preference.toUpperCase()].price, "::balance 7878787878787", userInfo.currency_preference.toUpperCase());
                      return (
                        <div className="walletCard col-md-6 col-lg-4 col-12">
                          <Card1
                            title={element.name}  
                            priceInUsd={element?.quote?.[userInfo?.currency_preference.toUpperCase()]?.price?.toFixed(2)}
                            price={element?.wallet?.balance.toFixed(2)}
                            lable={element?.symbol}
                            wallet={element?.wallet}
                            address={element?.wallet?.walletAddr}
                            logo={`https://s2.coinmarketcap.com/static/img/coins/64x64/${element.id}.png`}
                            cp={Object.values(userInfo).length > 0 ? userInfo.currency_preference.toUpperCase() : 'USD'}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <Footer />
              </div>
            </div>
          </div>)}
      </div>
    </>
  );
};

export default Wallet;

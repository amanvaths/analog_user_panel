import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card1 from "../components/Card";

import axios from "axios";
import { Triangle } from 'react-loader-spinner'
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from "../Api_connection/config";
import { setUserInfo, setOneCoinPrice, setTotalWalletBalance } from "../redux/reducer/user";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";


const Wallet = (props) => {
  const { userInfo, oneUsdPrice, totalAna, user,  } = useSelector((state) => state.user.value)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [coinData, setCoinData] = useState([]);
  const [walletDetails, setWalletDetails] = useState([]);
  const [coinWW, setCoinWW] = useState([]);
  const [loader, setLoader] = useState(true)
  const [usdPrice, setUsdPrice] = useState()
  const [inceptive, setInceptive] = useState(0)
  const [airdrop, setAirDrop] = useState(0)
  const [affiliates, setffiliates] = useState(0)
  const [inherited, setInherited] = useState(0)
  const [bounty, setBounty] = useState(0)
  const [handOut, setHandOut] = useState(0)

  const email = user.email;

  const getUserAllWallletData = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/userAllRecords?email=${email}&bonus_type=Level`)
        //console.warn(res.data +"Reff data ");
        setInceptive(res?.data?.income[0]?.inceptive_wallet)
        setAirDrop(res?.data?.income[0]?.airdrop_wallet)
        setffiliates(res?.data?.income[1]?.total_bonus?.toFixed(2))
        setInherited(res.data?.income[0].inherited_wallet)
        setBounty(res?.data?.income[0].total_bonus)
        setHandOut(res?.data?.income[0].handout_wallet)
    } catch (error) {
        console.log("Error in refferal Data API " + error);
    }
}
const totalBonus = Number(inceptive) + Number(airdrop)  + Number(affiliates)  + Number(inherited) + Number(bounty) + Number(handOut);
  const getData = async () => {
    try {
      console.log(":: cp in ", userInfo?.currency_preference);
      const cp = userInfo?.currency_preference?.toUpperCase()
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

  useEffect(async () => {
    const data = await axios.post(`${BASE_URL}/configSettings`, { email: email })
    if (data) {
      dispatch(setUserInfo({ userInfo: data.data }))
      getUserAllWallletData()
     
      getData();
      getWalletDetails();
    }
  }, [])

  useEffect(()=>{
    setTimeout(() => {
      updateWallet()
    }, 20000);
   
  },[])

  useEffect(() => {
    if (coinData.length > 0 && walletDetails.length > 0) {
      const cd = [];
      for (let coind of coinData) {
        const w = walletDetails.filter((w) => w.symbol == coind.symbol);
        cd.push({ ...coind, wallet: w[0] });
      }
      setCoinWW([...cd]);
      setLoader(false)
    }
  }, [walletDetails, coinData]);


  return (
    <>
      <div>
        {loader ? (<>
          <div style={{ position: "absolute", zIndex: "99", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <Triangle ariaLabel="loading-indicator" color="blue" />
          </div>

        </>) :
          (<div className="nk-app-root ms-5">
            <div className="nk-main text-center   " style={{ overflowWrap: "break-word" }}>
              <Menu />
              <div className="nk-wrap">
                <Header />
                <div className="contianer   ">
                  <div className="row py-3">
                    <div className="col-6">
                      {/* <h4 style={{ padding: "px-5" }}>Wallet / Assets </h4> */}
                    </div>
                    <div className="col-6">
                      <label
                        className="float-right"
                        style={{ padding: "" }}
                      >
                        <h6>
                          Total Balance:&nbsp;&nbsp;
                          {userInfo.currency_preference == "usd" ? `${coinWW[8]?.wallet?.usdt_balance?.toFixed(2)} USDT` : `${(oneUsdPrice * coinWW[8]?.wallet?.usdt_balance).toFixed(2)} INRX`}
                        </h6>
                      </label>
                    </div>
                  </div>
    

             
<div class="container my-5">
  <div class="row">
    <div class="col">
    <div className="card">
            
                                    <div className="w-50 text-dark" style={{fontSize: "1.1rem", fontWeight: "500px"}}>
                                    <p className="">
                                      <span>Total Fund: </span>
                                      <span >&nbsp;&nbsp;{totalAna? totalAna?.toFixed(2): ""} ANA </span>
                                    </p>
                                    <p className="" >
                                      <span>Total Spend: </span>
                                      <span>&nbsp;&nbsp;0</span>
                                    </p>
                                    <p className="">
                                      <span>Current Balance: </span>
                                      <span>&nbsp;&nbsp;{userInfo?.currency_preference == "usd" ? `${coinWW[8]?.wallet?.usdt_balance?.toFixed(2)} USDT` : `${(oneUsdPrice * coinWW[8]?.wallet?.usdt_balance).toFixed(2)} INRX`}</span>
                                    </p>
                                    </div>
                                  
            </div>
    </div>
    <div class="col-sm">
     
<div className="card">
<div className="row " style={{color: ""}}>
                                
                    
                                <div className="w-50 text-dark" style={{fontSize: "1.1rem", fontWeight: "500px"}}>
                                  <p className="">
                                    <span>Analog Value: </span>
                                    <span>&nbsp;&nbsp;{userInfo?.anaPrice} {userInfo?.currency_preference == 'inr' ? "INRX" : "USDT"}</span>
                                  </p>
                                  <p className="">
                                    <span>Bonus:</span>
                                    <span>&nbsp;&nbsp;
                                      {totalBonus?.toFixed(2)}&nbsp;&nbsp;{
                                                      userInfo?.currency_preference == 'inr' ? "INRX" : "USDT"
                                                  }
                                    </span>
                                  </p>
                                  <p className="">
                                    <span>Total API: </span>
                                    <span>&nbsp;&nbsp;0</span>
                                  </p>
                                  </div>
                              
                              </div>  
</div>
    </div>
   
  </div>
</div>

                  <div className="row text-center " style={{ marginBottom: "15vh" }}>
                    {coinWW.map((element, index) => {
                     
                      return (
                        <div className="  col-md-6 col-lg-4 col-12">
                          <Card1
                            title={element.name}
                            priceInUsd={(element?.quote?.[userInfo?.currency_preference.toUpperCase()]?.price)?.toFixed(2)}
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
          </div>) 
          }
      </div>
    </>
  );
};

export default Wallet;

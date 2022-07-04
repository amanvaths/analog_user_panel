import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card1 from "../components/Card";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import axios from "axios";
import { Triangle } from 'react-loader-spinner'
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from "../Api_connection/config";
import { setUserInfo } from "../redux/reducer/user";
import { Link, useNavigate } from "react-router-dom";
const { io } = require("socket.io-client");



const Wallet = (props) => {
  const { userInfo, oneUsdPrice, totalAna, user,  } = useSelector((state) => state.user.value)
  const dispatch = useDispatch();
  const [coinData, setCoinData] = useState([]);
  const [walletDetails, setWalletDetails] = useState([]);
  const [coinWW, setCoinWW] = useState([]);
  const [loader, setLoader] = useState(false)
  const [totalSpendINR, setTotalSpendINR] = useState(0)
  const [totalSpendUSDT, setTotalSpendUSDT] = useState(0)

  const [inceptive, setInceptive] = useState(0)
  const [airdrop, setAirDrop] = useState(0)
  const [affiliates, setffiliates] = useState(0)
  const [inherited, setInherited] = useState(0)
  const [bounty, setBounty] = useState(0)
  const [handOut, setHandOut] = useState(0)



  const email = user.email;
  const socket = io(`http://localhost:8080`)
  // var status = 0;
  useEffect(()=>{
  socket.on('connect',()=>{
    console.log("Socket Connected");
    socket.emit('join', {email: email });
    socket.on('balance',(data)=>{
      console.log("BALANCE EVENT", data)
      setWalletDetails([...data]);
    })

    socket.on("msg",(data)=>{
      console.log(data, "MESSAGE DATA");
      // if(status == 0){
      //   status = 1
     
        NotificationManager.success('Added',data)
      // }
     
    })

      socket.on('notification',(data)=>{
        console.log(data, "Notification data");
      })
  })
},[])


// setInterval(() => {
//   if(status == 0){
//     status = 1
//   }
  
// }, 5000);






  // const test = ()=>{
  //   try {
  //       axios.post(`http://localhost:3001/get`, {email:email})
  //       console.log("GET API DATA");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(()=>{
  //   test()
  // },[])

  const getUserAllWallletData = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/userAllRecords?email=${email}&bonus_type=Level`)
        setInceptive(res?.data?.income[0]?.inceptive_wallet)
        setAirDrop(res?.data?.income[0]?.airdrop_wallet)
        setffiliates(res?.data?.income[1]?.total_bonus?.toFixed(2))
        setInherited(res.data?.income[0]?.inherited_wallet)
        setBounty(res?.data?.income[0]?.total_bonus)
        setHandOut(res?.data?.income[0]?.handout_wallet)
        setTotalSpendINR(res?.data?.income[0]?.total_spend_inrx)
        setTotalSpendUSDT(res?.data?.income[0]?.total_spend_usdt)
    } catch (error) {
        console.log("Error in refferal Data API " + error);
    }
}

const totalBonus = Number(inceptive? inceptive: 0) + Number(airdrop? airdrop: 0)  + Number(affiliates ? affiliates:0)  + Number(inherited ? inherited : 0) + Number(bounty ? bounty : 0) + Number(handOut ? handOut : 0);
  const getData = async () => {
    try {
      
      const cp = userInfo?.currency_preference?.toUpperCase()
      const res = await axios.post(`${BASE_URL}/getCoinData`, { currency: cp });
      const cd = [];
      // console.log(res.data, "::res.data");
      for (let coin of Object.entries(res.data)) {
        cd.push(coin[1]);
      }
      setCoinData([...cd]);
    } catch (error) {
      getData() 
      console.log(error);
    }
  };


  
 
    // console.log(walletDetails, "WALLET DETAILS");

  useEffect(() => {
    const conSetting = async()=>{
      const data = await axios.post(`${BASE_URL}/configSettings`, { email: email })
    if (data) {
      // getWalletDetails()
      dispatch(setUserInfo({ userInfo: data.data }))
      getUserAllWallletData()     
      
    }
    }
    conSetting()
    
  }, [])
  useEffect(()=>{
    getData()  
  },[userInfo])

// console.log(walletDetails, "WALLET DETAILS");
  useEffect(() => {
    // console.log(walletDetails.length);
    if (coinData.length > 0 && walletDetails.length > 0) {
      const cd = [];
      for (let coind of coinData) {
        const w = walletDetails.filter((w) => w.symbol == coind.symbol);
        cd.push({ ...coind, wallet: w[0] });
      }
      setCoinWW([...cd]);
      // setLoader(false)
    }
  }, [coinData, walletDetails]);


  return (
    <>
      <div>
        {loader ? (<>
          <div style={{ position: "absolute", zIndex: "99", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <Triangle ariaLabel="loading-indicator" color="green" />
          </div>

        </>) :
          (<div className="nk-app-root ms-5">
            <div className="nk-main" style={{ overflowWrap: "break-word" }}>
              <Menu />
              <div className="nk-wrap">
                <Header />
                <div className="nk-content nk-content-fluid">
                  <div className="row">
                    <div className="col-6">
                      {/* <h4 style={{ padding: "px-5" }}>Wallet / Assets </h4> */}
                    </div>
                    <div className="col-6">
                      <label
                        className="float-right"
                        style={{ padding: "" }}
                      >
                        <span class="badge bg-outline-dark text-dark fs-5">
                          Total Balance: 
                          <span className="text-teal"> {userInfo.currency_preference == "usd" ? `${coinWW[8]?.wallet?.usdt_balance?.toFixed(2)} USDT` : `${(oneUsdPrice * coinWW[8]?.wallet?.usdt_balance).toFixed(2)} INRX`} </span>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div class="mb-4">
                    <div class="row">
                      <div class="col-md-6 col-lg-6 col-12">
                        <div className="kanban-board-header kanban-success shadow-sm">
                          <div className="card-inner">
                            <p className="kanban-item-title">
                              <span className="badge bg-light rounded-pill">Total Fund  </span>
                              <span className="text-teal"> {totalAna? totalAna?.toFixed(2): ""} ANA </span>
                            </p>
                            <p className="kanban-item-title">
                              <span className="badge bg-light rounded-pill">Total Spend  </span>
                              <span className="text-teal"> 0</span>
                            </p>
                            <p className="kanban-item-title">
                              <span className="badge bg-light rounded-pill">Current Balance  </span>
                              <span className="text-teal"> {userInfo?.currency_preference == "usd" ? `${coinWW[8]?.wallet?.usdt_balance?.toFixed(2)} USDT` : `${(oneUsdPrice * coinWW[8]?.wallet?.usdt_balance).toFixed(2)} INRX`}</span>
                            </p>
                          </div>                                                
                        </div>
                      </div>
                      <div class="col-md-6 col-lg-6 col-12">
                          <div className="kanban-board-header kanban-success shadow-sm">
                            <div className="card-inner">
                              <p className="kanban-item-title">
                                <span className="badge bg-light rounded-pill">Analog Value </span>
                                <span className="text-teal"> {userInfo?.anaPrice} {userInfo?.currency_preference == 'inr' ? "INRX" : "USDT"}</span>
                              </p>
                              <p className="kanban-item-title">
                                <span className="badge bg-light rounded-pill">Bonus </span>
                                <span className="text-teal"> 
                                  {totalBonus?.toFixed(2)}&nbsp;&nbsp;{
                                                  userInfo?.currency_preference == 'inr' ? "INRX" : "USDT"
                                              }
                                </span>
                              </p>
                              <p className="kanban-item-title">
                                <span className="badge bg-light rounded-pill">Total API  </span>
                                <span className="text-teal"> 0</span>
                              </p>
                            </div>
                        </div>
                      </div>                    
                    </div>
                  </div>
                  <div className="row">
                    {coinWW.map((element, index) => {                     
                      return (
                        <div className="col-md-6 col-lg-4 col-12">
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
                  <NotificationContainer />
                </div>
                <Footer />
              </div>
            </div>
          </div>
           ) 
          } 
       </div>
    </>
  );
};

export default Wallet;

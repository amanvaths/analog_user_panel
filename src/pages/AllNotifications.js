import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BsBellFill } from 'react-icons/bs'
// import {logo} from '/images/bell.gif'
// import axios from "axios";
// import { BASE_URL } from "../Api_connection/config";
// import { useSelector } from "react-redux";
// import ReactPaginate from 'react-paginate';
// import { Link } from "react-router-dom";
// import { Bars } from 'react-loader-spinner'


const AllNotifications = () => {
//   const { userInfo, user, oneUsdPrice } = useSelector((state) => state.user.value)
//   const email = user?.email
//   const [tab, setTab] = useState([])
//   const [currentPage, setCurrentPage] = useState(1)
//   const [totalBounty, setTotalBounty] = useState(0)
//   const [status, setStatus] = useState()
//   const [load, setLoad] = useState(true)


//   const getBounty = async (page) => {
//     const data = await axios.post(`${BASE_URL}/bounty`, { email: email, page: page })
//     if (data) {
//       setTab(data.data.data)
//       setTotalBounty(data.data.count)
//       setStatus(data.data.status)
//       setLoad(true)
//     }
//   }

 


//   const fun =(data)=>{
//     setCurrentPage(data.selected + 1)
//     getBounty(data.selected + 1)

//   }


//   useEffect(() => {
//     setLoad(false)
//     getBounty()
//   }, [])

  return (
    <div className="nk-app-root">
      <div className="nk-main ">
        <Menu />
        <div className="nk-wrap">
          <Header />
          <div className="nk-content nk-content-fluid">
            <div className="container-xl wide-lg">
            <div className="nk-content-body">
            <div className="nk-block-head-content">
                      <h3 className="nk-block-title page-title">
                      <BsBellFill/>    Notifications 
                      {/* <img src="/images/bell.gif    " alt="bell" srcset="" /> */}
                      </h3>
                      <div className="nk-block-des text-soft">
                        {/* <p>{`You have total ${totalOrder} orders.`}</p> */}
                      </div>
                    </div>

            <div class="card card-bordered" style={{borderLeftColor: "#364a63", borderLeftWidth: "5px"}}>    
             
            <div class="card-inner">   
            <div className="row">
                <div className="col-md-1 col-12">   <img src="/images/usdt_icon.png" alt="" srcset="" /> </div>
                <div className="col-md-9 col-12">  <h5 class="card-title">TRX Deposit</h5>        
            {/* <h6 class="card-subtitle mb-2">Card subtitle</h6>         */}
            <p class="card-text">10 TRX has been deposited in your wallet</p>  </div>
                <div className="col-md-2 col-12 text-right"> 
                <p>10 Min ago</p>
                <a href="#" class="card-link">Remove</a>
                 </div>
            </div>    
                 
            {/* <a href="#" class="card-link">Card link</a>        
            <a href="#" class="card-link">Another link</a>     */}
            </div>
            </div>
            <div class="card card-bordered" style={{borderLeftColor: "#364a63", borderLeftWidth: "5px"}}>    
            <div class="card-inner">        
            <h5 class="card-title">ANA Buy</h5>        
            {/* <h6 class="card-subtitle mb-2">Card subtitle</h6>         */}
            <p class="card-text">100 ANA buy</p>        
            {/* <a href="#" class="card-link">Card link</a>        
            <a href="#" class="card-link">Another link</a>     */}
            </div>
            </div>
            <div class="card card-bordered" style={{borderLeftColor: "#364a63", borderLeftWidth: "5px"}}>    
            <div class="card-inner">        
            <h5 class="card-title">New Refferal Joined</h5>        
            {/* <h6 class="card-subtitle mb-2">Card subtitle</h6>         */}
            <p class="card-text">New Refferaal added using your Refferal code</p>        
            {/* <a href="#" class="card-link">Card link</a>        
            <a href="#" class="card-link">Another link</a>     */}
            </div>
            </div>
            {/* <div class="card card-bordered">    
            <div class="card-inner">        
            <h5 class="card-title">Card title</h5>        
            <h6 class="card-subtitle mb-2">Card subtitle</h6>        
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>        
            <a href="#" class="card-link">Card link</a>        
            <a href="#" class="card-link">Another link</a>    
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
export default AllNotifications;
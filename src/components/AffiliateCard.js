import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AffiliatCard = (props) => {
  const navigate = useNavigate();
  const [Back, setBack] = useState("light");
  const theme = localStorage.getItem("theme");

  useEffect(() => {
    console.log("mytheme",theme);
    if (theme) {
      setBack("dark");
    } else {
      setBack("light");
    }
  }, [theme]);

  return (
    <>
      <div className=" col-md-6 col-lg-4 col-12  c-subscribe-box u-align-center   ">
        <div class="rainbow">
          <span></span>
          <span></span>
        </div>
        <div
          id="set_back"
          class={`card-bordered card-inner c-subscribe-box__wrapper ${Back !== "dark" ? "bg-dark" : "bg-light"} shadow-lg`}
          style={{
            color: "",
            borderRadius: "10px",
          }}
        >
          <h5 class="card-title" style={{ color: "white" }}>
            {props.level}
          </h5>
          <div className="row">
            <div className="col-6">
              <h6 class="card-subtitle mb-2">Total User</h6>{" "}
              <p>{props.totalUser}</p>
              <h6 class="card-subtitle mb-2">Total Analog Buy</h6>{" "}
              <p>{props.totalAnalogBuy}</p>
              <h6 class="card-subtitle mb-2">Total Expense</h6>{" "}
              <p>{props.totalExpence}</p>
            </div>
            <div className="col-6">
              <h6 class="card-subtitle mb-2">Total Affiliates</h6>{" "}
              <p>{props.totalAffiliates}</p>
              <h6 class="card-subtitle mb-2">Total Withdrawal</h6>{" "}
              <p>{props.widthdrawl}</p>
              <h6 class="card-subtitle mb-2">Total Remaining</h6>{" "}
              <p>{props.toalRemaining}</p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className=" col-md-6 col-lg-4 col-12 p-3" >
                <div class=" card-bordered card-inner" style={{backgroundColor: "#0b3175",color: "white"}}>
                    <h5 class="card-title" style={{color: "white"}}>Level 2</h5>
                    <div className="row">
                        <div className="col-6">
                        <h6 class="card-subtitle mb-2">Total user</h6> <p>1234.99</p>
                    <h6 class="card-subtitle mb-2">Total Analog buy</h6> <p>1234.99</p>
                    <h6 class="card-subtitle mb-2">Total Expense</h6> <p>1234.99</p>
                        </div>
                        <div className="col-6">
                        <h6 class="card-subtitle mb-2">Total Affiliates</h6> <p>1234.99</p>
                    <h6 class="card-subtitle mb-2">Total Withdrawal</h6> <p>1234.99</p>
                    <h6 class="card-subtitle mb-2">Total Remaining</h6> <p>1234.99</p>
              
                        </div>
                    </div>
                   
                   
                </div>
            </div> */}

      {/* <div className="p-3 col-md-6 col-lg-4 col-12" >
                <div class=" card-bordered card-inner" style={{backgroundColor: "#0b3175", color: "white"}}>
                    <h5 class="card-title" style={{color: "white"}}>Level 3</h5>
                    <div className="row">
                        <div className="col-6">
                        <h6 class="card-subtitle mb-2">Total user</h6> <p>1234.99</p>
                    <h6 class="card-subtitle mb-2">Total Analog buy</h6> <p>1234.99</p>
                    <h6 class="card-subtitle mb-2">Total Expense</h6> <p>1234.99</p>
                        </div>
                        <div className="col-6">
                        <h6 class="card-subtitle mb-2">Total Affiliates</h6> <p>1234.99</p>
                    <h6 class="card-subtitle mb-2">Total Withdrawal</h6> <p>1234.99</p>
                    <h6 class="card-subtitle mb-2">Total Remaining</h6> <p>1234.99</p>
              
                        </div>
                    </div>
                   
                   
                </div>
            </div> */}
    </>
  );
};

export default AffiliatCard;

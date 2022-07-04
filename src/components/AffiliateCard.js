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
      <div className="col-md-6 col-lg-4 col-12 shadow-none u-align-center mb-3">
        
        <div
          id="set_back"
          class={`card card-bordered shadow-sm`}>
            <div class="bg-gray text-white kanban-board-header kanban-success mb-0 rounded-0">{props.level}</div>
            <div class="card-inner bg-light">
                <div className="row">
                  <div className="col-6 border-right">
                    <h6 class="badge bg-light mb-2">Total User</h6>{" "}
                    <p class="text-teal">{props.totalUser}</p>
                    <h6 class="badge bg-light mb-2">Total Analog Buy</h6>{" "}
                    <p class="text-teal">{props.totalAnalogBuy}</p>
                    <h6 class="badge bg-light mb-2">Total Expense</h6>{" "}
                    <p class="text-teal">{props.totalExpence}</p>
                  </div>
                  <div className="col-6">
                    <h6 class="badge bg-light mb-2">Total Affiliates</h6>{" "}
                    <p class="text-teal">{props.totalAffiliates}</p>
                    <h6 class="badge bg-light mb-2">Total Withdrawal</h6>{" "}
                    <p class="text-teal">{props.widthdrawl}</p>
                    <h6 class="badge bg-light mb-2">Total Remaining</h6>{" "}
                    <p class="text-teal">{props.toalRemaining}</p>
                  </div>
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

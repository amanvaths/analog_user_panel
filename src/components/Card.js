import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {MdOutlineContentCopy} from 'react-icons/md'
import { Link } from "react-router-dom";

const Card1 = (props) => {
  const walletInfo = props.wallet;
  const [copied, setCopied] = useState(false);

  
   const addString = props.address;
  const first = addString?.substring(0, 20);
  const second = addString?.substring(35, addString.length);
  const address = first + "...." + second;
 
  return (
    <>
      <div className="container mt-1">
        <div className="row" style={{ padding: "0px" }}>
          <div className="">
            <div className="card card-bordered is-dark">
              <div className="nk-wgw">
                <div className="nk-wgw-inner">
                  <div className="row">
                    <div className="col-6">
                      <Link
                        className="nk-wgw-name"
                        to={`/cryptoTransaction/${props.lable}`}
                      >
                        <div className="nk-wgw-icon is-default">
                          <img
                            className=""
                            src={props.logo}
                            style={{ width: "30px" }}
                          />
                          {/* <em className="icon ni ni-sign-kobo"></em> */}
                        </div>
                        <h5 className="nk-wgw-title title ml-2">{props.title}</h5>
                      </Link>
                      <div className="nk-wgw-balance">
                        <div className="amount">
                          {props.price}
                          <span className="currency currency-nio">
                            {props.lable}
                          </span>
                        </div>
                        <div className="amount-sm">
                          {props.priceInUsd}
                          <span className="currency currency-usd">USD</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <img
                        src={`https://image-charts.com/chart?chs=177x177&cht=qr&chl=${walletInfo?.walletAddr}&choe=UTF-8&icqrb=0b3175&icqrf=FFFFFF`}
                        style={{ height: "100px" }}
                      />
                    </div>
                  </div>
                  <div className="row d-flex align-items-around">
                    <div className="col-10 d-flex ">
                      <span
                        className="amount-sm"
                        style={{
                          color: "white",
                          marginTop: "5px",
                          marginBottom: "0px",
                          fontSize: "14px",
                        }}
                      >
                        {address}
                        
                      </span>
                      </div>
                     <div className="col-2">
                      <div className="">
                        
                         <CopyToClipboard text={props.address}
                          onCopy={() => {
                            setCopied(true)
                            setTimeout(() => {
                                 setCopied(false);
                            }, 800);
                            }}>
                            <div>
                         <MdOutlineContentCopy color="white" />
                         {copied?
                         <p className="text-light position-absolute" style={{fontSize:"14px", top:"3px",left:"25px", padding:"0px 5px", backgroundColor:"transparent"}}>copied!</p>:null}
                            </div>
                          </CopyToClipboard>
                         
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card1;

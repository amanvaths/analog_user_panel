import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {MdOutlineContentCopy} from 'react-icons/md'

const Card1 = (props) => {
  const walletInfo = props.wallet;

  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  // const onCopyText = () => {
  //   setIsCopied(true);
  //   setTimeout(() => {
  //     setIsCopied(false);
  //   }, 1000);
  // };
  
   const addString = props.address;
  const first = addString?.substring(0, 20);
  const second = addString?.substring(32, addString.length);
  const address = first + "...." + second;
 
  return (
    <>
      <div className="container mt-1">
        <div className="row" style={{ padding: "0px" }}>
          <div className="">
            <div class="card card-bordered is-dark">
              <div class="nk-wgw">
                <div class="nk-wgw-inner">
                  <div className="row">
                    <div className="col-6">
                      <a
                        class="nk-wgw-name"
                        href="/demo5/crypto/wallet-bitcoin.html"
                      >
                        <div class="nk-wgw-icon is-default">
                          <img
                            className=""
                            src={props.logo}
                            style={{ width: "30px" }}
                          />
                          {/* <em class="icon ni ni-sign-kobo"></em> */}
                        </div>
                        <h5 class="nk-wgw-title title ml-2">{props.title}</h5>
                      </a>
                      <div class="nk-wgw-balance">
                        <div class="amount">
                          {props.price}
                          <span class="currency currency-nio">
                            {props.lable}
                          </span>
                        </div>
                        <div class="amount-sm">
                          {props.priceInUsd}
                          <span class="currency currency-usd">USD</span>
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
                    <div className="col-12 d-flex ">
                      <span
                        class="amount-sm"
                        style={{
                          color: "white",
                          marginTop: "5px",
                          marginBottom: "0px",
                          fontSize: "14px",
                        }}
                      >
                        {address}
                        
                      </span>
                     
                      <div className="container">
                        
                         <CopyToClipboard text={props.address}
                          onCopy={() => {
                            setCopied(true)
                            setTimeout(() => {
                                 setCopied(false);
                            }, 800);
                            }}>
                            <div>
                         <MdOutlineContentCopy color="white"/>
                         {copied?<span className="text-success bg-light px-3 py-1">copied</span>:null}
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

import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Countdown from "react-countdown";
import { useTranslation, Trans } from "react-i18next";
import web3 from 'web3'
import { useSelector, useDispatch } from "react-redux";
import {setCurrentBlockNumber} from "../redux/reducer/user";

const Getpresale = (props) => {
  const { levelname, coinQty, coinPrice, duration, persent, startBlock, endBlock } = props;
  const { currentBlockNumber } = useSelector((state) => state.user.value)
  const [blockNumber, setBlockNumber] = useState('')
  const [blockTime, setBlockTime] = useState('')
  const [sales, setSales] = useState('')
  const [endTime, setEndTime] = useState(0)
  const [d, setD] = useState(0)
  const { t } = useTranslation();
  const dispatch = useDispatch()


  var Web3 = new web3('https://rabbit.analog-rpc.com');

  const getblockNumber = async () => {
    Web3.eth.getBlockNumber()
      .then((data) => {
        dispatch(setCurrentBlockNumber({currentBlockNumber: data}))
        // setBlockNumber(data);
        const a = endBlock - data;
        const endTimeInSec = a * 5;
        setEndTime(Number(endTimeInSec * 1000));
        const tt = setTimeout(() => {
          updateTime();
        }, 5000);
      });
  }

  function updateTime() {
    getblockNumber();
  }
  const getDuration = ()=>{
    const totalBlock = endBlock - startBlock;
    const inseconds = totalBlock*5;
    const inMinutes = inseconds/60;
    const inHors = inMinutes/60;
    const inDay = Math.ceil(inHors/24); 
    setD(inDay)
   }
  useEffect(() => {
    if (endBlock) {
      getDuration()
      updateTime();
    }
  }, [])

  
 
  return (
    <div className={`col-sm-12 col-md-4`}>

      <div className="kanban-board-header kanban-success shadow-sm">
        <div className="text-teal h-100">
          <div className="card-inner">
            <div className="nk-wg7">
              <div className="nk-wg7-stats ">
                <div className="nk-wg7-title is-dark text-work">
                    { levelname }
                  {/* {levelname} */}
                </div>
                {/* <div className="number-lg amount text-truncate text-wrap">{currentBlockNumber} */}
                 {/* <span style={{fontSize: "15px"}}>Inrx</span> */}
                 {/* </div> */}
              </div>
              <div
                className="nk-wg7-stats-group mt-1"
                style={{ display: "flex", color: "white", justifyContent: "space-between" }}
              >
                <div className="nk-wg7-stats" style={{ display: "flex" }}>
                  <div className="nk-wg7-title"></div>

                  <div className="number-lg text-dark coinqty">
                    {coinQty}
                    {/* <span style={{fontSize: "15px"}}> Volume</span> */}
                  </div>
                </div>
                <div
                  className="nk-wg7-stats duration duration2"
                // style={{ marginLeft: 150 }}
                >
                  <div className="nk-wg7-title text-body ">{t('duration')}</div>
                  <div className="number text-warning ">{d} {t('days')}</div>
                </div>
              </div>
              <div className="row">
              <div className="col-4"style={{color: "black", fontSize:"15px"}}>Start Block </div>
              <div className="col-4" style={{color: "black",fontSize:"15px"}}>Current Block </div>
              <div className="col-4" style={{color: "black", fontSize:"15px"}}>End Block </div>
              </div>
              <div className="row">
              <div className="col-4" style={{color: "#51d3ae"}}>{startBlock}</div>
              <div className="col-4" style={{color: "#51d3ae"}}>{currentBlockNumber}</div>
              <div className="col-4" style={{color: "#51d3ae"}}>{endBlock}</div>
              </div>
             
              <div className="pt-4">
                <ProgressBar

                  now={persent}
                  label={`${persent}%`}
                  variant="teal"
                  aria-valuemin={100}
                />
              </div>

              <div
                className="number text-dark countdown"
                style={{ display: "flex", justifyContent: "end" }}>
                <Countdown date={Date.now() + endTime} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Getpresale;

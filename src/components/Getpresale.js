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
  const { t } = useTranslation();
  const dispatch = useDispatch()

  // console.log(endBlock,"ENdBLOCk");

  var Web3 = new web3('https://rabbit.analog-rpc.com');

  const getblockNumber = async () => {
    Web3.eth.getBlockNumber()
      .then((data) => {
        dispatch(setCurrentBlockNumber({currentBlockNumber: data}))
        // setBlockNumber(data);
        const a = endBlock - data;
        const endTimeInSec = a * 5;
        // end =  ;
        // console.log(endTimeInSec, endBlock, data, Number(endTimeInSec * 1000));
        setEndTime(Number(endTimeInSec * 1000));
        const tt = setTimeout(() => {
          updateTime();
        }, 5000);
      });
  }

  function updateTime() {
    getblockNumber();
  }
  useEffect(() => {
    if (endBlock) {
      updateTime();
    }
  }, [])
  //  var end;
  // useEffect(() => {
  //   if (endBlock) {
  //     const a = endBlock - blockNumber;
  //     const endTimeInSec = a * 5;
  //     // end =  ;
  //     setEndTime(endTimeInSec * 1000)
  //     // Web3.eth.getBlock(blockNumber).then((data)=>{
  //     //   setBlockTime(data?.timestamp)
  //     //   v

  //     // console.log(endTime, "ENdTIME");
  //     // })
  //   }
  // }, [blockNumber, endBlock])


  // const [timer, setTimer] = useState({
  //   days: "",
  //   hour: "",
  //   minute: "",
  //   second: "",
  // });


  // useEffect(() => {
  //   // countdowntimer();
  //   console.log("endtime", endTime);
  //   console.log(new Date(Number(endTime)).getDay() + " : " + new Date(Number(endTime)).getHours() + ": " + new Date(Number(endTime)).getMinutes() + " : " + new Date(Number(endTime)).getSeconds());

  // }, [endTime]);

  // function countdowntimer() {

  //   var se = Date.now() * duration;
  //   var x = setInterval(function () {
  //     let days = Math.floor(se / 86400);
  //     let hours = Math.floor((se % 86400) / 3600);
  //     let minutes = Math.floor(((se % 86400) % 3600) / 60);
  //     let seconds = Math.floor(((se % 86400) % 3600) % 60);
  //     se--;
  //     if (se == 0) {
  //       clearInterval(x);
  //       setTimer({ days: 0, hour: 0, minute: 0, second: 0 });
  //     } else {
  //       setTimer({ days: days, hour: hours, minute: minutes, second: seconds });
  //     }
  //   }, 1000);
  // }

  return (
    <div className={`col-sm-12 col-md-4`}>

      <div className="kanban-board-header kanban-success shadow-sm">
        <div className="text-teal h-100">
          <div className="card-inner">
            <div className="nk-wg7">
              <div className="nk-wg7-stats ">
                <div className="nk-wg7-title is-dark text-work">
                  <Trans i18nKey="username"
                  // defaults="<0>{levelname}</0>"
                  // components={[<strong>dummyChild</strong>]}
                  // values={{ levelname }}
                  >
                    {{ levelname }}
                  </Trans>
                  {/* {levelname} */}
                </div>
                <div className="number-lg amount text-truncate text-wrap">{currentBlockNumber}
                 {/* <span style={{fontSize: "15px"}}>Inrx</span> */}
                 </div>
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
                  <div className="number text-warning ">{duration} {t('days')}</div>
                </div>
              </div>
              <div className="row">
              <div className="col-3">Start Block {startBlock}</div>
              {/* <div className="col-6">Current Block {}</div> */}
              <div className="col-3">End Block {endBlock}</div>
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

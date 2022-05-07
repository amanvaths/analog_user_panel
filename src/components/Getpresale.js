import React, { useEffect, useState } from "react";
//import ProgressBar from "@ramonak/react-progress-bar";
import ProgressBar from "react-bootstrap/ProgressBar";
// import Countdown from "react-countdown";

const Getpresale = (props) => {
  const { levelname, coinQty, coinPrice, duration } = props;
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [day, setDay] = useState("");
  const [timer, setTimer] = useState({
    days: "",
    hour: "",
    minute: "",
    second: "",
  });

  useEffect(() => {
    countdowntimer();
  }, []);

  function countdowntimer() {
    var day = 20;
    var se = 86400 * duration;
    var x = setInterval(function () {
      let days = Math.floor(se / 86400);
      let hours = Math.floor((se % 86400) / 3600);
      let minutes = Math.floor(((se % 86400) % 3600) / 60);
      let seconds = Math.floor(((se % 86400) % 3600) % 60);
      se--;
      if (se == 0) {
        clearInterval(x);
        setTimer({ days: 0, hour: 0, minute: 0, second: 0 });
      } else {
        setTimer({ days: days, hour: hours, minute: minutes, second: seconds });
      }
    }, 1000);
  }

  return (
    <div className="nk-block first-card">
      <div className="card card-bordered  text-secondary  h-100">
        <div className="card-inner">
          <div className="nk-wg7">
            <div className="nk-wg7-stats">
              <div className="nk-wg7-title is-dark text-body">{levelname}</div>
              <div className="number-lg amount text-success">{coinPrice}</div>
            </div>
            <div className="nk-wg7-stats-group">
              <div className="nk-wg7-stats w-50">
                <div className="nk-wg7-title "></div>
                <div className="number-lg text-success coinqty">{coinQty}</div>
              </div>
              <div
                className="nk-wg7-stats w-50  duration duration2"
                // style={{ marginLeft: 150 }}
              >
                <div className="nk-wg7-title text-body ">Duration</div>
                <div className="number text-success ">{duration} days</div>
              </div>
            </div>
            <div
             style={{ paddingTop: 11 }}>
              <ProgressBar
                striped
                now={coinPrice}
                label={`${coinPrice}%`}
                variant="success "
                aria-valuemin={1000000}
              />
            </div>
               
            <div className="number text-dark countdown"  
            //  style={{ marginLeft: 270 }}
             >
              {timer.days}:{timer.hour}:{timer.minute}:{timer.second}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Getpresale;

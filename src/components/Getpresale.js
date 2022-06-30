import React, { useEffect, useState } from "react";
//import ProgressBar from "@ramonak/react-progress-bar";
import ProgressBar from "react-bootstrap/ProgressBar";
// import Countdown from "react-countdown";

const Getpresale = (props) => {
  const { levelname, coinQty, coinPrice, duration, persent } = props;
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

  const [Backk, setBackk] = useState("light");
  const theme = localStorage.getItem("theme");

  useEffect(() => {
    console.log("mytheme",theme);
    if (theme) {
      setBackk("dark");
    } else {
      setBackk("light");
    }
  }, [theme]);



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
    <div className={`col-sm-12 col-md-6`}>
       
      <div className="kanban-board-header kanban-success shadow-sm">
        <div className="text-teal h-100">
          <div className="card-inner">
            <div className="nk-wg7">
              <div className="nk-wg7-stats ">
                <div className="nk-wg7-title is-dark text-work">
                  {levelname}
                </div>
                <div className="number-lg amount">{coinPrice}</div>
              </div>
              <div
                className="nk-wg7-stats-group mt-1"
                style={{ display: "flex",color:"white", justifyContent: "space-between" }}
              >
                <div className="nk-wg7-stats" style={{ display: "flex" }}>
                  <div className="nk-wg7-title"></div>

                  <div className="number-lg text-dark coinqty">
                    {coinQty}
                  </div>
                </div>
                <div
                  className="nk-wg7-stats duration duration2"
                  // style={{ marginLeft: 150 }}
                >
                  <div className="nk-wg7-title text-body ">Duration</div>
                  <div className="number text-warning ">{duration} days</div>
                </div>
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
                style={{ display: "flex", justifyContent: "end" }}
              >
                {timer.days}:{timer.hour}:{timer.minute}:{timer.second}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Getpresale;

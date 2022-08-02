import React, { useEffect, useState } from "react";
//import ProgressBar from "@ramonak/react-progress-bar";
import ProgressBar from "react-bootstrap/ProgressBar";
// import Countdown from "react-countdown";
import { useTranslation, Trans } from "react-i18next";

const Getpresale = (props) => {
  const { levelname, coinQty, coinPrice, duration, persent } = props;
  const [timer, setTimer] = useState({
    days: "",
    hour: "",
    minute: "",
    second: "",
  });
  const { t } = useTranslation();

  useEffect(() => {
    countdowntimer();
  }, []);

  function countdowntimer() {

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
                    {{levelname}}
                  </Trans>
                  {/* {levelname} */}
                </div>
                <div className="number-lg amount text-truncate text-wrap">{coinPrice}</div>
              </div>
              <div
                className="nk-wg7-stats-group mt-1"
                style={{ display: "flex", color: "white", justifyContent: "space-between" }}
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
                  <div className="nk-wg7-title text-body ">{t('duration')}</div>
                  <div className="number text-warning ">{duration} {t('days')}</div>
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

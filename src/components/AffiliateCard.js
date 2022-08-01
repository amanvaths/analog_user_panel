import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AffiliatCard = (props) => {
  const navigate = useNavigate();
  const [Back, setBack] = useState("light");
  const theme = localStorage.getItem("theme");
  const { t } = useTranslation();

  useEffect(() => {
    // console.log("mytheme",theme);
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
            <div class="bg-teal-dim kanban-board-header kanban-success mb-0 rounded-0">{props.level}</div>
            <div class="card-inner bg-light">
                <div className="row">
                  <div className="col-6 border-right">
                    <h6 class="badge bg-light mb-2">{t('total_user')}</h6>{" "}
                    <p class="text-teal">{props.totalUser}</p>
                    <h6 class="badge bg-light mb-2">{t('total_analog_buy')}</h6>{" "}
                    <p class="text-teal">{props.totalAnalogBuy}</p>
                    <h6 class="badge bg-light mb-2">{t('total_expense')}</h6>{" "}
                    <p class="text-teal">{props.totalExpence}</p>
                  </div>
                  <div className="col-6">
                    <h6 class="badge bg-light mb-2">Total Affiliates</h6>{" "}
                    <p class="text-teal">{props.totalAffiliates}</p>
                    <h6 class="badge bg-light mb-2">{t('total_withdrawal')}</h6>{" "}
                    <p class="text-teal">{props.widthdrawl}</p>
                    <h6 class="badge bg-light mb-2">{t('total_remaining')}</h6>{" "}
                    <p class="text-teal">{props.toalRemaining}</p>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default AffiliatCard;

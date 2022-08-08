import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";

const AffiliatCard = (props) => {

  const theme = localStorage.getItem("theme");
  const { t } = useTranslation();

  return (
    <>
      <div className="col-md-6 col-lg-4 col-12 shadow-none u-align-center mb-3">
        
        <div
          id="set_back"
          className={`card card-bordered shadow-sm`}>
            <div className="bg-teal-dim kanban-board-header kanban-success mb-0 rounded-0">{props.level}</div>
            <div className="card-inner bg-light">
                <div className="row">
                  <div className="col-6 border-right">
                    <h6 className="mb-1">{t('total_user')}</h6>{" "}
                    <p className="text-teal">{props.totalUser}</p>
                    <h6 className="mb-1">{t('total_analog_buy')}</h6>{" "}
                    <p className="text-teal">{props.totalAnalogBuy}</p>
                    <h6 className="mb-1">{t('total_expense')}</h6>{" "}
                    <p className="text-teal">{props.totalExpence}</p>
                  </div>
                  <div className="col-6">
                    <h6 className="mb-1">Total Affiliates</h6>{" "}
                    <p className="text-teal">{props.totalAffiliates}</p>
                    <h6 className="mb-1">{t('total_withdrawal')}</h6>{" "}
                    <p className="text-teal">{props.widthdrawl}</p>
                    <h6 className="mb-1">{t('total_remaining')}</h6>{" "}
                    <p className="text-teal">{props.toalRemaining}</p>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default AffiliatCard;

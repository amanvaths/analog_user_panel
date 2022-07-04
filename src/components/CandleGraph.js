import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TVChartContainer from "./CandleChart";

function CandleGraph() {

  const { userInfo } = useSelector((state) => state.user.value)
  const [prev_symbol, prevSymbol] = useState("ANA-inr");
  const [newgetchart, NewGetChart] = useState(true);

  function getChart(symbol, symbol2) {
    prevSymbol(symbol);

    return (
      <>
        <TVChartContainer symbols={symbol} pre_symbols={symbol2} />
      </>
    );
  }

  useEffect(() => {
    let coinsym = userInfo?.currency_preference === 'usd' ? "ana-usd" : "ana-inr";
    NewGetChart(getChart(coinsym, prev_symbol));
  }, [userInfo]);


  return (
    <>
      {/* <ul className="nav nav-tabs tabs" role="tablist">
        {paired_currency.map((item) => {
          return (
            <>
              {active_coin.indexOf(item) < 0 ? (
                <li className="nav-item" role="presentation">
                  <button
                    className={(active_coin.toLowerCase() + "-" + item.toLowerCase()) == coin ? "nav-link active":"nav-link"}
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home"
                    type="button"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                    onClick={() => {
                      // dispatch(set_active_paired_currency({ pcoin: item }));
                      navigate(
                        `../exchange/${active_coin.toLowerCase() + "-" + item.toLowerCase()}`,
                        { replace: true }
                      );
                      
                    }}
                  >
                    {active_coin + "/" + item}
                  </button>
                </li>
              ) : null}
            </>
          );
        })}
      </ul> */}
      <div className="tab-content" id="myTabContent">

        <div id="candleCart1">{newgetchart}</div>
        {/* <div
          className="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <div className="card shadow">
            <div id="chart-container"></div>
          </div>
        </div> */}
        {/* <div
          className="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          2
        </div> */}
      </div>
    </>
  );
}

export default CandleGraph;

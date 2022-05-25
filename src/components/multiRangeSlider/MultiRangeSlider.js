import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./MultiRangeSlider.css";
import { useSelector, useDispatch } from "react-redux";
import { prototype } from "react-copy-to-clipboard";

const MultiRangeSlider = ({fixedmax, min, max, onChange}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);
  const dispatch = useDispatch();

  // Dispatch
  const { userInfo} = useSelector(
    (state) => state.user.value
    
  );
  console.log( userInfo?.currency_preference," userInfo?.currency_preference userInfo?.currency_preference userInfo?.currency_preference");

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="container">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1 );
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value" style={{left:"35px"}}>{minVal?.toFixed(2)}</div>
        <div className="slider__right-value" style={{right:"0px",display:"none"}}>{maxVal?.toFixed(2)}</div>
        <div className="slider__right-value">{fixedmax?.toFixed(2)}</div>
        <div className="slider__left-value "style={{left:"0px",fontWeight:"bold"}}>{ userInfo?.currency_preference=="inr"?"INRX":"USDT"}</div>
        <div className="slider__right-value "style={{right:"60px",fontWeight:"bold"}}>{ userInfo?.currency_preference=="inr"?"INRX":"USDT"}</div>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  fixedmax:PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default MultiRangeSlider;

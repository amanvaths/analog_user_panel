import {
    GET_WEBSITE_DATA
  } from "../constant";
  import { NAV_SETTER } from "../constant";
  import { NAV_SETTERRS } from "../constant";
  
  const initialState = {
    webData: [],
  };
  const initial = false;
  // const initials = false;
  
  export default function websiteDBReducer(state = initialState, action) {
    switch (action.type) {
      case GET_WEBSITE_DATA:
        return {
          ...state,
          webData: { ...action.data },
        };
      default:
        return {
          ...state,
        };
    }
  }
  export function navsettersreducer(status=initials,action){
    switch(action.type){
      case NAV_SETTERRS: return !status;
      default: return status;
    }
  }
  export function navsetterreducer(state=initial,action){
    switch(action.type){
      case NAV_SETTER: return !state;
      default: return state;
    }
  }
  
  
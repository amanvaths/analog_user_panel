import { GET_WEBSITE_DATA} from "../constant";
// import { getWebsiteData } from "../helpers/api_functions";
import { N_getWebsiteData } from "../helpers/api_functions_new";
import { NAV_SETTER } from "../constant";
import { NAV_SETTERRS } from "../constant";
export function getWebsite() {
  return (dispatch) =>
    N_getWebsiteData()
      .then((data) => {
        if (data.status === 200) {
          dispatch({ type: GET_WEBSITE_DATA, data: data.params.website });
          return data.params.website;
        }
      })
      .catch((e) => e);
}

export function navsetter(){
  return (dispatch)=>{
    dispatch({type:NAV_SETTER})
  }
}

export function navsetters(){
  return async (dispatch)=>{
    dispatch({type:NAV_SETTERRS})
  }
}
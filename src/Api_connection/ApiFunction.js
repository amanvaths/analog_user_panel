import { BASE_URL } from "./config";
import axios from "axios";

const abortController =new AbortController();
export function Signupn(data) {
  return fetch(BASE_URL + "signup", {
    method: "POST",
    signal:abortController.signal,
    headers: {
      "content-type": "application/json",
      "allow-access-origin-control": "*",
    },
    body: JSON.stringify({
      email: data.Email,
      password: data.Password,
      confirm_password: data.Confirm_Password,
      referral_code: data.Referral_Code,
    }),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
    });
}

export function getSettings(email) {
  return axios.post(`${BASE_URL}/configSettings`, { email: email }).then((res) => res).catch((error) => { console.log(error) });
}

export function profileMenu (){  
  var element = document.getElementById("myBody"); 
  element.classList.toggle("toggle-shown"); 
   element = document.getElementById("toggleBtn"); 
  element.classList.toggle("active");                                 
   element = document.getElementById("cardAside"); 
  element.classList.toggle("content-active");          
}


export function  removeSideMenu(){
  var element = document.getElementById("myBody"); 
  var element1 = document.getElementById("toggleBtn");
  var element2 = document.getElementById("cardAside");
  //alert(typeof(element2)); return;
  if(element){
   // alert(element.classList.contains("toggle-shown"));
    if (element.classList.contains("toggle-shown")) {
        element.classList.remove("toggle-shown");
    }
  }

  if(element1){
    if (element1.classList.contains("active")) {
      element1.classList.remove("active");
    }
  }

  if(element2){
    if (element2.classList.contains("content-active")) {
      element2.classList.remove("content-active");
    }
  }
}

 
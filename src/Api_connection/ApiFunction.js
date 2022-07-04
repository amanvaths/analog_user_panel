import { BASE_URL } from "./config";
import axios from "axios";

export function Signupn(data) {
  return fetch(BASE_URL + "signup", {
    method: "POST",
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

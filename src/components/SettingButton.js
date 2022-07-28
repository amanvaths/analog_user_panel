import React, {useState }from 'react'
import { Link } from "react-router-dom";  

const SettingButton = () => {

    const [count, setCount] = useState(0);
   
    const sideMenu = () => {     
        
         var element = document.getElementById("myBody");
        var element1 = document.getElementById("toggleBtn");
        var element2 = document.getElementById("cardAside");

        if (element.classList.contains("toggle-shown")) {
            element.classList.remove("toggle-shown");
        }else{
          element.classList.add("toggle-shown");
        }
        if (element1.classList.contains("active")) {
          element1.classList.remove("active");
        }else{
          element1.classList.add("active");
        }
        if (element2.classList.contains("content-active")) {
          element2.classList.remove("content-active");
        }else{
          element2.classList.add("content-active");     
        }


      }

    return (
        <>
         <Link
                to=""
                className="toggle btn btn-icon btn-trigger mt-n1"
                data-target="userAside"
                id="toggleBtn"
                style={{float:"right"}}
              >
                <em className="icon ni ni-menu-alt-r" onClick={sideMenu}></em>
              </Link>

        </>
    )
}

export default SettingButton;
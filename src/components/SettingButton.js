import React, {useState }from 'react'
import { Link } from "react-router-dom";

const SettingButton = () => {

    const [pMenu, setPMenu] = useState(0);
    const profileMenu = () => {
       
        if (pMenu == 0) {
          var element = document.getElementById("myBody");
          element.classList.add("toggle-shown");
           element = document.getElementById("toggleBtn");
          element.classList.add("active");
           element = document.getElementById("cardAside");
          element.classList.add("content-active");
          setPMenu(1)
        } else {
           element = document.getElementById("myBody");
          element.classList.remove("toggle-shown");
           element = document.getElementById("toggleBtn");
          element.classList.remove("active");
           element = document.getElementById("cardAside");
          element.classList.remove("content-active");
          setPMenu(0)
        }
      }

    return (
        <>
         <Link
                to=""
                className="toggle btn btn-icon btn-trigger mt-n1"
                data-target="userAside"
                id="toggleBtn"
              >
                <em className="icon ni ni-menu-alt-r" onClick={profileMenu}></em>
              </Link>

        </>
    )
}

export default SettingButton;
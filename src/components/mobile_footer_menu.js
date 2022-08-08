import React  from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
const Mobile_Footer_Menu = ()=>{
    const { t } = useTranslation();
       return (
           <>
                
                
                 {/* Menus only for mobile screen < 576 */}
                <div className="container d-sm-none d-block">
                    <nav className="bottom-nav">
                        <div className="bottom-nav-item">
                            <div className="bottom-nav-link">
                            <i className="icon ni ni-dashboard"></i>
                            <span className="d-none">Dashboard</span>
                            </div>
                        </div>
                        <div className="bottom-nav-item">
                            <div className="bottom-nav-link">
                            <i className="icon ni ni-user-c"></i>
                            <span className="d-none">My Account</span>
                            </div>
                        </div>
                        <div className="bottom-nav-item">
                            <div className="bottom-nav-link">
                            <i className="icon ni ni-wallet-alt"></i>
                            <span className="d-none">Wallets</span>
                            </div>
                        </div>
                        
                        <div className="bottom-nav-item">
                            <div className="bottom-nav-link">
                            <i className="icon ni ni-coins"></i>
                            <span className="d-none">   Buy / Sell</span>
                            </div>
                        </div>
                        <div className="bottom-nav-item">
                            <div className="bottom-nav-link">
                            <i className="icon ni ni-user-list"></i>
                            <span className="d-none">Affiliate</span>
                            </div>
                        </div>
                    </nav>
                </div> 
   
           </>
       )
   
}
export default Mobile_Footer_Menu

import React  from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
const Mobile_Footer_Menu = ()=>{
    const { t } = useTranslation();
       return (
           <>
                
                
                 {/* Menus only for mobile screen < 576 */}
                <div class="container d-sm-none d-block">
                    <nav class="bottom-nav">
                        <div class="bottom-nav-item">
                            <div class="bottom-nav-link">
                            <i class="icon ni ni-dashboard"></i>
                            <span class="d-none">Dashboard</span>
                            </div>
                        </div>
                        <div class="bottom-nav-item">
                            <div class="bottom-nav-link">
                            <i class="icon ni ni-user-c"></i>
                            <span class="d-none">My Account</span>
                            </div>
                        </div>
                        <div class="bottom-nav-item">
                            <div class="bottom-nav-link">
                            <i class="icon ni ni-wallet-alt"></i>
                            <span class="d-none">Wallets</span>
                            </div>
                        </div>
                        
                        <div class="bottom-nav-item">
                            <div class="bottom-nav-link">
                            <i class="icon ni ni-coins"></i>
                            <span class="d-none">   Buy / Sell</span>
                            </div>
                        </div>
                        <div class="bottom-nav-item">
                            <div class="bottom-nav-link">
                            <i class="icon ni ni-user-list"></i>
                            <span class="d-none">Affiliate</span>
                            </div>
                        </div>
                    </nav>
                </div> 
   
           </>
       )
   
}
export default Mobile_Footer_Menu

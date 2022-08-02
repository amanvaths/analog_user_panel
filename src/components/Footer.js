import React  from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
const Footer = ()=>{
    const { t } = useTranslation();
       return (
           <>
                <div className="nk-footer nk-footer-fluid">
                        <div className="container-fluid">
                            <div className="nk-footer-wrap">
                                <div className="nk-footer-copyright"> &copy; {`${new Date().getFullYear()}`} ANALOG  INCEPTIVE BY <Link to="">INRX NETWORK</Link>
                                </div>
                                <div className="nk-footer-links">
                                    <ul className="nav nav-sm">
                                        <li className="nav-item"><Link className="nav-link" to="">{t('term')}</Link></li>
                                        <li className="nav-item"><Link className="nav-link" to="">{t('privacy')}</Link></li>
                                        <li className="nav-item"><Link className="nav-link" to="">{t('help')}</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                </div>
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
export default Footer

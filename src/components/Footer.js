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
                            <Link to="/home"  class="bottom-nav-link">
                                <i class="icon ni ni-dashboard"></i>
                                <span class="d-none">{t('dashboard')}</span>
                            </Link>
                        </div>
                        <div class="bottom-nav-item">
                            <Link to="/accountSettings"  class="bottom-nav-link">
                                <i class="icon ni ni-user-c"></i>
                                <span class="d-none">{t('my_account')}</span>
                            </Link>
                        </div>
                        <div class="bottom-nav-item">
                            <Link to="/wallet" class="bottom-nav-link">
                                <i class="icon ni ni-wallet-alt"></i>
                                <span class="d-none">{t('wallets')}</span>
                            </Link>
                        </div>
                        
                        <div class="bottom-nav-item">
                            <Link to="/buysell" class="bottom-nav-link">
                                <i class="icon ni ni-coins"></i>
                                <span class="d-none">{t('buy_sell')}</span>
                            </Link>
                        </div>
                        <div class="bottom-nav-item">
                            <Link to="/Affiliate"  class="bottom-nav-link">
                                <i class="icon ni ni-user-list"></i>
                                <span class="d-none"> {t('affiliate')} </span>
                            </Link>
                        </div>
                    </nav>
                </div>
           </>
       )
   
}
export default Footer

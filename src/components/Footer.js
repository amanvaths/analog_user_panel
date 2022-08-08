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
                <div className="container d-sm-none d-block">
                    <nav className="bottom-nav">
                        <div className="bottom-nav-item">
                            <Link to="/home"  className="bottom-nav-link">
                                <i className="icon ni ni-dashboard"></i>
                                <span className="d-none">{t('dashboard')}</span>
                            </Link>
                        </div>
                        <div className="bottom-nav-item">
                            <Link to="/accountSettings"  className="bottom-nav-link">
                                <i className="icon ni ni-user-c"></i>
                                <span className="d-none">{t('my_account')}</span>
                            </Link>
                        </div>
                        <div className="bottom-nav-item">
                            <Link to="/wallet" className="bottom-nav-link">
                                <i className="icon ni ni-wallet-alt"></i>
                                <span className="d-none">{t('wallets')}</span>
                            </Link>
                        </div>
                        
                        <div className="bottom-nav-item">
                            <Link to="/buysell" className="bottom-nav-link">
                                <i className="icon ni ni-coins"></i>
                                <span className="d-none">{t('buy_sell')}</span>
                            </Link>
                        </div>
                        <div className="bottom-nav-item">
                            <Link to="/Affiliate"  className="bottom-nav-link">
                                <i className="icon ni ni-user-list"></i>
                                <span className="d-none"> {t('affiliate')} </span>
                            </Link>
                        </div>
                    </nav>
                </div>
           </>
       )
   
}
export default Footer

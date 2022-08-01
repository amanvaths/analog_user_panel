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
   
           </>
       )
   
}
export default Footer

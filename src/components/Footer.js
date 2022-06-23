import React  from 'react';
class Footer extends React.Component{
   render(){
       return (
           <>
            
            <div className="nk-footer nk-footer-fluid">
                    <div className="container-fluid">
                        <div className="nk-footer-wrap">
                            <div className="nk-footer-copyright"> &copy; 2021 ANALOG  INCEPTIVE BY <b>INRX NETWORK</b>
                            </div>
                            <div className="nk-footer-links">
                                <ul className="nav nav-sm">
                                    <li className="nav-item"><b className="nav-link">Terms</b></li>
                                    <li className="nav-item"><b className="nav-link">Privacy</b></li>
                                    <li className="nav-item"><b className="nav-link">Help</b></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
   
           </>
       )
   }
}
export default Footer

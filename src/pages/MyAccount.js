import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MyAccount = () => {
    return (
        <>
            <div className="nk-app-root">
                <div className="nk-main ">
                    <Menu />
                    <div className="nk-wrap">
                        <Header />
                        <div className="contianer px-5 py-5">
                            <div className="card">
                                <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                    <div className="row">
                                        <div className="col-2"></div>
                                        <div className="col-5">
                                            <p className="p-1">
                                                <span>Total Fund: </span>
                                                <span>&nbsp;&nbsp;58973.02</span>
                                            </p>
                                            <p className="p-1">
                                                <span>Total Spend: </span>
                                                <span>&nbsp;&nbsp;58973.02</span>
                                            </p>
                                            <p className="p-1">
                                                <span>Current Balance: </span>
                                                <span>&nbsp;&nbsp;58973.02</span>
                                            </p>

                                        </div>
                                        <div className="col-5">

                                        <p>
                                                <span>Analog Value: </span>
                                                <span>&nbsp;&nbsp;58973.02</span>
                                            </p>
                                            <p>
                                                <span>Bonus INRX: </span>
                                                <span>&nbsp;&nbsp;  58973.02</span>
                                            </p>
                                            <p>
                                                <span>Total API: </span>
                                                <span>&nbsp;&nbsp;  58973.02</span>
                                            </p>

                                        </div>
                                        </div>  
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyAccount;

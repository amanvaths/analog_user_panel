import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import axios from "axios";
import { BASE_URL } from "../Api_connection/config";

const Withdrawal = () => {
    const { user, userInfo, oneUsdPrice } = useSelector((state) => state.user.value)
    const email = user?.email
    const navigate = useNavigate()
    const [tab, setTab] = useState([])
    const [balanceA, setBalanceA] = useState(0)
    const [balanceB, setBalanceB] = useState(0)
    const [balanceC, setBalanceC] = useState(0)
    const [active, setActive] = useState(0)

    console.log(typeof(balanceB));
    

    const getWalletCard = async () => {
        try {
            const data = await axios.post(`${BASE_URL}/walletBalance`, { email })
            if (data) {
                setTab(data.data.data)
                console.log(data.data.data, "::DATA");
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getWalletCard()
    }, [])

    return (
        <>
            <div className="nk-app-root">
                <div className="nk-main ">
                    <Menu />
                    <div className="nk-wrap">
                        <Header />
                        <div className="nk-content nk-content-fluid">
                            <div className="container-xl wide-lg">
                                <div className="nk-content-body">
                                    <div className="nk-block">
                                        <div className="row gy-gs">
                                            <div className="col-lg-12 col-xl-12">
                                                <div className="nk-block">
                                                    <div className="nk-block-head-xs">
                                                        <div className="nk-block-between-md g-2">
                                                            <div className="nk-block-head-content">
                                                                <h5 className="nk-block-title title">
                                                                    INCEPTIVE WALLETS
                                                                </h5>
                                                            </div>
                                                            <div className="nk-block-head-content"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row g-2">
                                                        {
                                                            tab.map((element, index) => {
                                                                return (
                                                                    <div className="col-sm-4">
                                                                        <div className={active == element.index ?"card bg-light "  : "card bg-light "}>
                                                                            <div className="nk-wgw sm">
                                                                                <a className="nk-wgw-inner" href="#">
                                                                                    <div className="nk-wgw-name">
                                                                                        <div className="nk-wgw-icon">
                                                                                            <em className="icon ni ni-sign-btc"></em>
                                                                                        </div>
                                                                                        <h5 className="nk-wgw-title title" onClick={()=> {
                                                                                            setBalanceA(element.balance)
                                                                                            setBalanceB(element.balance)
                                                                                            setActive(element.index)
                                                                                        }}>
                                                                                            {element.name}
                                                                                        </h5>
                                                                                    </div>
                                                                                    <div className="nk-wgw-balance">
                                                                                        <div className="amount">
                                                                                            {(element?.balance)?.toFixed(3)}
                                                                                            <span className="currency currency-nio">
                                                                                                {userInfo?.currency_preference == "inr" ? "INRX" : "USDT"}
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row gy-gs">
                                            <div className="col-lg-12 col-xl-12">
                                                <div className="row gy-gs">
                                                    <div className="col-lg-12 col-xl-12">
                                                        <div className="nk-block">
                                                            <div className="nk-block-head-xs">
                                                                <div className="nk-block-between-md g-2">
                                                                    <div className="nk-block-head-content">
                                                                        <h5 className="nk-block-title title">
                                                                            WITHDRAWAL
                                                                        </h5>
                                                                    </div>
                                                                    <div className="nk-block-head-content"></div>

                                                                </div>
                                                            </div>
                                                            <div class="nk-content nk-content-fluid">
                                                                <div class="container-xl wide-lg">
                                                                    <div class="nk-content-body">
                                                                        <div class="components-preview wide-md mx-auto">
                                                                            <div class="nk-block nk-block-lg">
                                                                                <div class="nk-block-head">
                                                                                    <div class="nk-block-head-content">
                                                                                        <h4 class="title nk-block-title">Withdrawal Form</h4>
                                                                                        <div class="nk-block-des">
                                                                                            {/* <p>Below example helps you to build your own form nice way.</p> */}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="row g-gs">
                                                                                    <div class="col-lg-12">
                                                                                        <div class="card card-bordered h-100">
                                                                                            <div class="card-inner">
                                                                                                <div class="card-head">
                                                                                                    {/* <h5 class="card-title">Withdrwal form</h5> */}
                                                                                                </div>
                                                                                                <form action="#">
                                                                                                    <div class="form-group">
                                                                                                        
                                                                                                        <label class="form-label" for="full-name">Amount - {`${userInfo?.currency_preference == 'inr' ? 'INRX' : 'USDT'}`}</label>
                                                                                                        <div class="form-control-wrap">
                                                                                                            <input type="text" class="form-control" id="full-name" value={balanceB ? balanceB?.toFixed(3) : balanceC}
                                                                                                                onChange={(e)=>setBalanceB(setBalanceC(Number(e.target.value)))}/>
                                                                                                            <span className="m-1 float-right">
                                                                                                                <label className="form-label p-1" for="full-name" onClick={()=> setBalanceB((balanceA * 25) /100)?.toFixed(3)}>25%</label>
                                                                                                                <label className="form-label p-1" for="full-name" onClick={()=> setBalanceB((balanceA * 50) /100)?.toFixed(3)}>50%</label>
                                                                                                                <label className="form-label p-1" for="full-name" onClick={()=> setBalanceB((balanceA * 75) /100)?.toFixed(3)}>75%</label>
                                                                                                                <label className="form-label p-1" for="full-name" onClick={()=> setBalanceB((balanceA * 100) /100)?.toFixed(3)}>100%</label>
                                                                                                            </span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div class="form-group">
                                                                                                        <label class="form-label"
                                                                                                            for="email-address">Wallet Address</label>
                                                                                                        <div class="form-control-wrap">
                                                                                                            <input type="text" class="form-control" id="email-address" /></div>
                                                                                                    </div>
                                                                                                    <div class="form-group">
                                                                                                        <label class="form-label" for="phone-no">Fees</label>
                                                                                                        <div class="form-control-wrap">
                                                                                                            <input type="text" class="form-control" id="phone-no" />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    {/* <div class="form-group">
                                                                                                        <label class="form-label">Communication</label>
                                                                                                        <ul class="custom-control-group g-3 align-center">
                                                                                                            <li>
                                                                                                                <div
                                                                                                                    class="custom-control custom-control-sm custom-checkbox">
                                                                                                                    <input type="checkbox"
                                                                                                                        class="custom-control-input"
                                                                                                                        id="com-email" /><label
                                                                                                                            class="custom-control-label"
                                                                                                                            for="com-email">Email</label></div>
                                                                                                            </li>
                                                                                                            <li>
                                                                                                                <div
                                                                                                                    class="custom-control custom-control-sm custom-checkbox">
                                                                                                                    <input type="checkbox"
                                                                                                                        class="custom-control-input"
                                                                                                                        id="com-sms" /><label
                                                                                                                            class="custom-control-label"
                                                                                                                            for="com-sms">SMS</label></div>
                                                                                                            </li>
                                                                                                            <li>
                                                                                                                <div
                                                                                                                    class="custom-control custom-control-sm custom-checkbox">
                                                                                                                    <input type="checkbox"
                                                                                                                        class="custom-control-input"
                                                                                                                        id="com-phone" /><label
                                                                                                                            class="custom-control-label"
                                                                                                                            for="com-phone">Phone</label></div>
                                                                                                            </li>
                                                                                                        </ul>
                                                                                                    </div>
                                                                                                    <div class="form-group"><label class="form-label"
                                                                                                        for="pay-amount">Amount</label>
                                                                                                        <div class="form-control-wrap">
                                                                                                            <input type="number"
                                                                                                                class="form-control" id="pay-amount" /></div>
                                                                                                    </div>
                                                                                                    <div class="form-group"><label class="form-label">Payment
                                                                                                        Methods</label>
                                                                                                        <ul class="custom-control-group g-3 align-center">
                                                                                                            <li>
                                                                                                                <div
                                                                                                                    class="custom-control custom-control-sm custom-checkbox">
                                                                                                                    <input type="checkbox"
                                                                                                                        class="custom-control-input"
                                                                                                                        id="pay-card" />
                                                                                                                    <label
                                                                                                                        class="custom-control-label"
                                                                                                                        for="pay-card">Card</label></div>
                                                                                                            </li>
                                                                                                            <li>
                                                                                                                <div
                                                                                                                    class="custom-control custom-control-sm custom-checkbox">
                                                                                                                    <input type="checkbox"
                                                                                                                        class="custom-control-input"
                                                                                                                        id="pay-bitcoin" />
                                                                                                                    <label
                                                                                                                        class="custom-control-label"
                                                                                                                        for="pay-bitcoin">Bitcoin</label></div>
                                                                                                            </li>
                                                                                                            <li>
                                                                                                                <div
                                                                                                                    class="custom-control custom-control-sm custom-checkbox">
                                                                                                                    <input type="checkbox"
                                                                                                                        class="custom-control-input"
                                                                                                                        id="pay-cash" />
                                                                                                                    <label
                                                                                                                        class="custom-control-label"
                                                                                                                        for="pay-cash">Cash</label></div>
                                                                                                            </li>
                                                                                                        </ul>
                                                                                                    </div> */}
                                                                                                    <div class="form-group"><button type="submit"
                                                                                                        class="btn btn-lg btn-primary">Withdraw</button></div>
                                                                                                </form>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
    )
}

export default Withdrawal
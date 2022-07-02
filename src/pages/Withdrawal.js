import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import axios from "axios";
import { BASE_URL } from "../Api_connection/config";
import Swal from "sweetalert2/dist/sweetalert2.js";
import swal from "sweetalert";

const Withdrawal = () => {
    const { user, userInfo, oneUsdPrice } = useSelector((state) => state.user.value)
    const email = user?.email
    const navigate = useNavigate()
    const [tab, setTab] = useState([])
    const [balanceA, setBalanceA] = useState(0)
    const [balanceB, setBalanceB] = useState(0)
    const [balanceC, setBalanceC] = useState(0)
    const [active, setActive] = useState({ index: null })

    const [toWalletAddress, setToWalletAddress] = useState('')
    const [fromWalletAddress, setfromWalletAddress] = useState('')
    const [usdFees, setUsdFees] = useState(5)
    const [inrFees, setInrFees] = useState(100)



    function ConfirmBox() {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });

        if(toWalletAddress != '')
        {
            swalWithBootstrapButtons
            .fire({
                title: "Are you sure?",
                text: `Confirm Withdrwal`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, confirm it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    withdraw()
                    //   swalWithBootstrapButtons.fire(
                    //     "Confirm!",
                    //     "Your withdrwal request has been sent.",
                    //     "success"
                    //   );
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        "Cancelled",
                        "",
                        "error"
                    );
                }
            });
        }else{
            swal("Enter Wallet Address", "", "error")
        }
        
    }

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

    const withdraw = async () => {
        console.table("Called");
        try {
            const data = await axios.post(`${BASE_URL}/witdrawl`, { email: email, toWalletAddr: toWalletAddress, fromWallet: fromWalletAddress,
                 amount: userInfo?.currency_preference == 'usd' ? balanceB ? balanceB : balanceC : balanceB ? balanceB / oneUsdPrice : balanceC / oneUsdPrice,
                  fees: usdFees ? usdFees : inrFees, usdt_price: oneUsdPrice })
            console.log(data, "DATA__>>")
            if (data.data.status == 1) {
                swal({
                    title: "Your Withdraw request has been sent",
                    icon: "success",
                });
            }

        } catch (error) {
            swal(`${error?.response?.data?.message}`, "", "error")
            // console.log(error?.response?.data?.message, "::ERROR-->");
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
                                                                <h5 className="nk-block-title title text-uppercase">
                                                                    Inceptive Wallets
                                                                </h5>
                                                            </div>
                                                            <div className="nk-block-head-content"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row g-2">
                                                        {
                                                            tab.map((element, index) => {
                                                                return (
                                                                    <div className="col-sm-4"
                                                                        key={element.index}
                                                                        onClick={() => {
                                                                            setBalanceA(userInfo?.currency_preference == 'usd' ? (element?.balance) : (element?.balance * oneUsdPrice))
                                                                            setBalanceB(userInfo?.currency_preference == 'usd' ? (element?.balance) : (element?.balance * oneUsdPrice))
                                                                            setActive({ index: index })
                                                                            setfromWalletAddress(element.name)
                                                                        }}
                                                                    >
                                                                        <div className={active.index == index ? "card bg-teal-dim" : "card bg-light "}>
                                                                            <div className="nk-wgw sm">
                                                                                <a className="nk-wgw-inner" href="#">
                                                                                    <div className="nk-wgw-name">
                                                                                        <div className="nk-wgw-icon bg-teal">
                                                                                            <em className="icon ni ni-sign-btc"></em>
                                                                                        </div>
                                                                                        <h5 className="nk-wgw-title title">
                                                                                            {element.name}
                                                                                        </h5>
                                                                                    </div>
                                                                                    <div className="nk-wgw-balance">
                                                                                        <div className="amount">
                                                                                            {userInfo?.currency_preference == 'usd' ? (element?.balance)?.toFixed(3) : (element?.balance * oneUsdPrice).toFixed(3)}
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
                                                    <div class="mt-5">
                                                                <div class="card card-bordered h-100 bg-lighter">
                                                                    <div class="card-inner m-5">
                                                                        <div className="mb-5">
                                                                            <h3 class="text-center">Withdrawal</h3>
                                                                            <p class="email-title text-center">Use below form to withdraw</p>
                                                                        </div>
                                                                        <div className="bg-white p-5 border rounded shadow-sm">
                                                                        <form action="#">
                                                                            <div class="form-group">
                                                                                <label class="form-label" for="full-name">Amount - {`${userInfo?.currency_preference == 'inr' ? 'INRX' : 'USDT'}`}</label>
                                                                                <div class="form-control-wrap">
                                                                                    <input type="text" class="form-control" id="full-name" value={balanceB ? balanceB?.toFixed(3) : balanceC}
                                                                                        onChange={(e) => setBalanceB(setBalanceC(Number(e.target.value.replace(/[^0-9.]/g, "")
                                                                                            .replace(/(\..*?)\..*/g, "$1"))))} />
                                                                                    <span className="m-1 float-right">
                                                                                        <label className="form-label p-1" for="full-name" onClick={() => setBalanceB((balanceA * 25) / 100)?.toFixed(3)}>25%</label>
                                                                                        <label className="form-label p-1" for="full-name" onClick={() => setBalanceB((balanceA * 50) / 100)?.toFixed(3)}>50%</label>
                                                                                        <label className="form-label p-1" for="full-name" onClick={() => setBalanceB((balanceA * 75) / 100)?.toFixed(3)}>75%</label>
                                                                                        <label className="form-label p-1" for="full-name" onClick={() => setBalanceB((balanceA * 100) / 100)?.toFixed(3)}>100%</label>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            <div class="form-group">
                                                                                <label class="form-label"
                                                                                    for="email-address">Wallet Address</label>
                                                                                <div class="form-control-wrap">
                                                                                    <input type="text" class="form-control" id="email-address"
                                                                                        onChange={(e) => setToWalletAddress(e.target.value)}
                                                                                    /></div>
                                                                            </div>
                                                                            <div class="form-group">
                                                                                <label class="form-label" for="phone-no">Fees- {`${userInfo?.currency_preference == 'inr' ? 'INRX' : 'USDT'}`}</label>
                                                                                <div class="form-control-wrap">
                                                                                    <input type="text" class="form-control" id="phone-no" value={userInfo?.currency_preference == 'inr' ? inrFees : usdFees} readOnly />
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
                                                                            <div class="form-group text-right">
                                                                                <button type="button"
                                                                                    class="btn btn-success"
                                                                                    onClick={() => {
                                                                                        console.log(email, toWalletAddress, fromWalletAddress, balanceB ? balanceB : balanceC, usdFees ? usdFees : inrFees)

                                                                                        ConfirmBox()

                                                                                    }}
                                                                                    disabled={balanceB ? balanceB <= 0 : balanceC <= 0}
                                                                                >
                                                                                    Withdraw</button>
                                                                            </div>
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
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Withdrawal
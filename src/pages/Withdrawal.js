import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import axios from "axios";
import WAValidator from 'multicoin-address-validator'
import { BASE_URL } from "../Api_connection/config";
import Swal from "sweetalert2/dist/sweetalert2.js";
import swal from "sweetalert";

const Withdrawal = () => {
    const { user, userInfo, oneUsdPrice } = useSelector((state) => state.user.value)
    const email = user?.email
    const [tab, setTab] = useState([])
    const [balanceA, setBalanceA] = useState(0)
    const [balanceB, setBalanceB] = useState(0)
    const [balanceC, setBalanceC] = useState(0)
    const [active, setActive] = useState({ index: null })

    const [toWalletAddress, setToWalletAddress] = useState('')
    const [fromWalletAddress, setfromWalletAddress] = useState('')
    const [usdFees, setUsdFees] = useState(5)
    const [inrFees, setInrFees] = useState(100)
    const [sub, setSub] = useState("")


    // console.log(userInfo.webPush_Public_Key, "PUBLICK KEY ");


    // const valid = WAValidator.validate('TMzJEW5QtgyU2JuPRyFeFe2tGReoAiY5ha','usdt');
    // if (valid)
    //     console.log('This is a valid address');
    // else {
    //     console.log('Address INVALID');
    // }




    function ConfirmBox() {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });

        if (toWalletAddress != '') {
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
                        console.log("JJ");
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
        } else {
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
            

            const data = await axios.post(`${BASE_URL}/witdrawl`, {
                email: email, toWalletAddr: toWalletAddress, fromWallet: fromWalletAddress,
                amount: userInfo?.currency_preference == 'usd' ? balanceB ? balanceB : balanceC : balanceB ? balanceB / oneUsdPrice : balanceC / oneUsdPrice,
                fees: usdFees ? usdFees : inrFees, usdt_price: oneUsdPrice, subscription: userInfo.webPush_Public_Key
            })
            console.log(data, "DATA__>>")
            if (data.data.status == 1) {
                swal({
                    title: "Your Withdraw request has been sent",
                    icon: "success",
                });
                setToWalletAddress('')
                setfromWalletAddress('')
                setBalanceA(0)
                setBalanceB(0)
                setBalanceC(0)
                getWalletCard()
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
                                                                <h3 className="nk-block-title title">
                                                                    Inceptive Wallets
                                                                </h3>
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
                                                                                <Link className="nk-wgw-inner" to="">
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
                                                                                            {userInfo?.currency_preference === 'usd' ? (element?.balance)?.toFixed(3) : (element?.balance * oneUsdPrice).toFixed(3)}
                                                                                            <span className="currency currency-nio">
                                                                                                {userInfo?.currency_preference == "inr" ? "INRX" : "USDT"}
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </Link>
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
                                        <div className="mt-5">
                                            <div class="card card-bordered h-100 bg-lighter">
                                                <div class="card-inner">
                                                    <div className="mb-4">
                                                        <h3 class="text-center title">Withdrawal</h3>
                                                        <p class="email-title text-center">Use below form to withdraw</p>
                                                        <div className="nk-block-head-content"></div>
                                                    </div>
                                                    <div className="components-preview wide-md mx-auto">
                                                        <div className="nk-block nk-block-lg">
                                                            <div className="row g-gs">
                                                                <div className="col-lg-12">
                                                                    <div className="card card-bordered h-100">
                                                                        <div className="card-inner">
                                                                            <div className="card-head">
                                                                                <h4 className="card-title text-title text-teal">{fromWalletAddress}</h4>
                                                                            </div>
                                                                            <form action="#">
                                                                                <div className="form-group">
                                                                                    <label className="form-label" for="full-name">Amount - {`${userInfo?.currency_preference == 'inr' ? 'INRX' : 'USDT'}`}</label>
                                                                                    <div className="form-control-wrap">
                                                                                        <input type="text" className="form-control" id="full-name" value={balanceB ? balanceB?.toFixed(3) : balanceC}
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
                                                                                <div className="form-group">
                                                                                    <label className="form-label"
                                                                                        for="email-address">Wallet Address</label>
                                                                                    <div className="form-control-wrap">
                                                                                        <input type="text" className="form-control" id="email-address" value={toWalletAddress}
                                                                                            onChange={(e) => setToWalletAddress(e.target.value)}
                                                                                        /></div>
                                                                                </div>
                                                                                <div className="form-group">
                                                                                    <label className="form-label" for="phone-no">Fees- {`${userInfo?.currency_preference == 'inr' ? 'INRX' : 'USDT'}`}</label>
                                                                                    <div className="form-control-wrap">
                                                                                        <input type="text" className="form-control" id="phone-no" value={userInfo?.currency_preference == 'inr' ? inrFees : usdFees} readOnly />
                                                                                    </div>
                                                                                </div>
                                                                                 
                                                                                <div className="form-group text-right">
                                                                                    <button type="button"
                                                                                        className="btn btn-outline-success"
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
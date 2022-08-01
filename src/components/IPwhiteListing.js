import React, { useState, useEffect } from "react";
import axios from "axios";
import { isIP } from 'is-ip'
import { BASE_URL } from '../Api_connection/config'
import { useSelector } from "react-redux";
import toast from 'react-hot-toast'
import { Link } from "react-router-dom";
import SettingButton from "./SettingButton";
import { useTranslation } from "react-i18next";



const IPwhiteListing = () => {
    const {user} = useSelector((state)=> state.user.value)
    const email = user?.email;
    const [whiteIP, setWhiteIP] = useState([])
    const [ip, setIp] = useState('')
    const [ipError, setipError] = useState(false)
    const { t } = useTranslation();
    

    const getCurrentAPI = async()=>{
        try {
            const data = await axios.get('https://geolocation-db.com/json/')
            setIp(data.data.IPv4)
        } catch (error) {
                console.log("Error");
        }
    }

    const getWhiteIP = async () => {
        try {
            const data = await axios.post(`${BASE_URL}/get_whitelisted_ip`, { email: email })
            setWhiteIP(data.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const addWhiteIP = async () => {
        try {
            const data = await axios.post(`${BASE_URL}/add_whitelisted_ip`, { email: email, ip: ip })
            if(data.data.status == 1){
                toast.success(`${t('ip_added')}`)
            }
            getWhiteIP()
        } catch (error) {
            console.log(error);
        }
    }

    const deleteWhiteIP = async (id) => {
        try {
            const data = await axios.post(`${BASE_URL}/removeWhiteListedIp`, { _id: id, email : email })
            // console.log(data, "delete Data");
            if(data.data.status == 1){
                    toast.success(t('ip_removed'))
            }
            getWhiteIP()
        } catch (error) {
            console.log("error");
        }
    }

    const handelSubmit = () => {
        setipError(!isIP(ip))
        if (isIP(ip)) {
            addWhiteIP()
        } else {
            console.log("error");
        }
        setIp("")
    }

    useEffect(() => {
        getWhiteIP()
    }, [])
    return (
        <>
            <div className="card-inner card-inner-lg bg-light">
                <div className="nk-block-head nk-block-head-lg">

                    <div className="nk-block-between">
                        <div className="nk-block-head-content">
                            <h4 className="nk-block-title">{t('whitelisted_ip')}</h4>
                            <div className="nk-block-des">
                            </div>
                        </div>

                        <div className="nk-block-head-content align-self-start d-lg-none">
                             <SettingButton></SettingButton>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label className="form-label" for="default-01">{t('ip_address')}</label>
                                <div className="form-control-wrap w-50">
                                    <input type="text" className="form-control" id="default-01"
                                        placeholder={`${t('enter_ip_address')}`} style={{ fontSize: "13px" }}
                                        value={ip}
                                        onChange={(e) => setIp(e.target.value)} />
                                </div>
                                {
                                    ipError == true ? <p style={{ color: "red", fontSize: "13px" }}>{t('enter_correct_ip')}</p> : null
                                }

                            </div>
                        </div>
                        <div className="col-6 d-flex pt-4 justify-content-end">
                            <div className="mr-3">
                                <button href="#" className="btn btn-dim btn-light btn-sm" onClick={()=> getCurrentAPI()}>{t('add_current_ip')}</button>
                            </div>
                            <div>
                                <Link to="" className="btn btn-dim btn-light btn-sm" onClick={() => handelSubmit()}>{t('add_ip')}</Link>
                            </div>


                        </div>

                    </div>

                </div>
                <div className="nk-block card card-bordered">
                    <div className="">
                        <table className="table table-ulogs">
                            <thead className="bg-gray text-white">
                                <tr>
                                    <th className="tb-col-ip">
                                        <span>IP</span>
                                    </th>

                                    <th className="tb-col-action">
                                        <span>{t('actions')}</span>
                                    </th>
                                    <th className="">                                        
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    whiteIP.map((element, index) => {
                                        const a = new Date(element.createdAt)
                                        return (
                                            <tr className="zoom_on_table">
                                                <td className="tb-col-ip">{element.ip}</td>
                                                <td className="tb-col-action">
                                                    {/* <span className="sub-text">{a.toDateString()} {a.toLocaleTimeString()}</span> */}

                                                    <button className="btn btn-dim btn-outline-success btn-sm" onClick={() => deleteWhiteIP(element._id)}>{t('delete')}</button>
                                                </td>
                                                <td className="tb-col-action">{ }</td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </>
    );
};

export default IPwhiteListing;
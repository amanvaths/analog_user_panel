import React, { useEffect, useState } from "react";
import { BASE_URL } from "../Api_connection/config";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserInfo } from "../redux/reducer/user";
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import SettingButton from "./SettingButton";
import { useTranslation } from "react-i18next";


const PersonalInfo = () => {
  
  const dispatch = useDispatch()
  const { userInfo, user } = useSelector((state) => state.user.value)
  const email = user.email;
  const [showUser, setShowUser] = useState(true)
  const [showUser1, setShowUser1] = useState(true)
  const [showUser2, setShowUser2] = useState(true);
  const [localUserName, setLocalUserName] = useState('')
  const [phone, setPhone] = useState('')
  const [ref, setRefferal] = useState('')
  const [myCurrency, setMyCurrency] = useState('');
  const [pMenu, setPMenu] = useState(0);
  const { t } = useTranslation();

  const handelReferralChange = (e) => {
    setRefferal(e.target.value)
  }

  const updateData = async (myCurrency) => {
    const task = localUserName ? "username" : phone ? "contact" : myCurrency ? "currency" : '';
    const apidata = {
      email: email,
      task: task,
    };
    apidata[task] = task === "username" ? localUserName : task === "currency" ? myCurrency : task === "contact" ? phone : '';
    // console.log(myCurrency, "data befor api call");
    // console.log("mpobj::", apidata);

    if (apidata.email && apidata.task && apidata[task]) {
      try {
        const data = await axios.post(`${BASE_URL}/settings`, apidata)
        if (data.data.status == 1) {
          // console.log(task, "TASK");
          const obj = {...userInfo}
          if(task === "username"){
            obj['username'] = localUserName;
            dispatch(setUserInfo({ userInfo: obj }))
          }
          if(task === "contact"){
            obj['phone'] = phone;
            dispatch(setUserInfo({ userInfo: obj }))
          }
          if(task === "currency"){
            obj['currency_preference']= myCurrency
            dispatch(setUserInfo({ userInfo: obj }))
          }
          setLocalUserName("");
          setMyCurrency("");
          setPhone("");
          toast.success(data.data.message)
          // NotificationManager.success(data.data.message)
        }
        else if (data.data.status == -1) {
          toast.error(data.data.message)
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("please fill all the required data!")
    }
  }

  const updateReferral = async () => {
    try {
      const data = await axios.post(`${BASE_URL}/update_refferal`, { email: email, refferalCode: ref })
      if (data.data.status == 1) {
        const obj = {...userInfo}
        obj['refferal'] = ref;
        dispatch(setUserInfo({ userInfo: obj }))
        toast.success('Refferal Added', '')
      }
    } catch (error) {
      if (error.response.data.status == 2) {
        toast.error("Invalid refferal Code or Already updated")
      }
      else if (error.response.data.status == 0) {
        toast.error("Something Went wrong")
      }
    }
  }

  // const profileMenu = () => {
  //   // alert("hellow" )
  //   if (pMenu == 0) {
  //     var element = document.getElementById("myBody");
  //     element.classList.add("toggle-shown");
  //      element = document.getElementById("toggleBtn");
  //     element.classList.add("active");
  //      element = document.getElementById("cardAside");
  //     element.classList.add("content-active");
  //     setPMenu(1)
  //   } else {
  //      element = document.getElementById("myBody");
  //     element.classList.remove("toggle-shown");
  //      element = document.getElementById("toggleBtn");
  //     element.classList.remove("active");
  //      element = document.getElementById("cardAside");
  //     element.classList.remove("content-active");
  //     setPMenu(0)
  //   }
  // }

  useEffect(() => {
  if(userInfo?.username?.length > 0){
      setShowUser(false);
    }
    if (userInfo?.phone?.toString()?.length > 0) {
      setShowUser1(false)
    }
  }, [userInfo])



  return (
    <>
  
      <div className="card-inner card-inner-lg bg-light">
        <div className="nk-block-head nk-block-head-lg">
          <div className="nk-block-between">
            <div className="nk-block-head-content">
              <h4 className="nk-block-title">{t('personal_information')}</h4>
              <div className="nk-block-des">
              </div>
            </div>
            <div className="nk-block-head-content align-self-start d-lg-none">
              <SettingButton></SettingButton>
              {/* <Link
                to=""
                className="toggle btn btn-icon btn-trigger mt-n1"
                data-target="userAside"
                id="toggleBtn"
              >
                <em className="icon ni ni-menu-alt-r" onClick={profileMenu}></em>
              </Link> */}
            </div>
          </div>
        </div>
        <div className="card nk-block">
          <div className="nk-data data-list">
            <div className="data-head kanban-board-header kanban-success bg-lighter rounded-0">
              <span className="overline-title">{t('basics')}</span>
            </div>
            {/* -------------- */}
            <div className="row mx-auto mt-3 pb-3">
              <div className="col-4">
                <div className="">
                  <span className="data-label">{t('user_name')}</span>
                </div>
              </div>
              <div className="col-4 ">
                {showUser == true ? 
                <div class="input-group-sm">
                  <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1"
                    onChange={(e) => setLocalUserName(e.target.value)}
                    style={{
                      borderRadius: "0",
                      borderTopStyle: "hidden",
                      borderLeftStyle: "hidden",
                      borderRightStyle: "hidden",
                      borderBottomStyle: "groove"
                    }} />
                </div> :
                 <span className="data-value">{userInfo?.username}</span>}
              </div>
              <div className="col-4 d-flex justify-content-end">
                <div className="">
                  <span className="">
                    {showUser ? <Link to="" className="btn btn-dim btn-outline-success" onClick={() => {
                      if (localUserName) {
                        updateData();
                        setShowUser(false);
                      }
                    }}>{t('update')}</Link> :
                      <em className="icon ni ni-lock-alt text-gray"></em>
                    }
                  </span>
                </div>
              </div>
            </div>
            <div className="row mx-auto mt-3 pb-3">
              <div className="col-4">
                <div className="">
                  <span className="data-label">{t('email')}</span>
                </div>
              </div>
              <div className="col-4">
                <span className="data-value">{email}</span>
              </div>
              <div className="col-4 d-flex justify-content-end">
                <div className="">
                  <span className=" disable">
                    <em className="ni ni-lock-alt text-gray"></em>
                  </span>
                </div>
              </div>
            </div>
            <div className="row mx-auto mt-3">
              <div className="col-4 ">
                <div className="">
                  <span className="data-label">{t('phone_number')}</span>
                </div>
              </div>
              <div className="col-4">
                {showUser1 == true ? 
                <div className="input-group-sm">
                  <input type="text" className="form-control" aria-label="Phone" aria-describedby="basic-addon2"
                    // value={userInfo?.phone}
                    onChange={(e) => {
                      const ph = e.target.value
                        .replace(/[^0-9.]/g, "")
                        .replace(/(\..?)\../g, "$1");
                      setPhone(ph)
                    }}
                    maxLength={10}
                    minLength={10}
                    style={{
                      borderRadius: "0",
                      borderTopStyle: "hidden",
                      borderLeftStyle: "hidden",
                      borderRightStyle: "hidden",
                      borderBottomStyle: "groove"
                    }} />
                </div> :
                 <span className="data-value">{userInfo?.phone}</span>}
              </div>
              <div className="col-4 d-flex justify-content-end">
                <div className="">
                  <span className="">
                    {showUser1 ? <Link to="" className="btn btn-dim btn-outline-success" onClick={() => {
                      if (phone) {
                        updateData();
                        // setShowUser2(false)
                      }
                    }}>{t('update')}</Link> : <span className=" disable">
                      <em className="icon ni ni-lock-alt text-gray"></em>
                    </span>
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="nk-data data-list mt-3">
            <div className="data-head kanban-board-header kanban-success bg-lighter rounded-0">
              <span className="overline-title">{t('currency_prefrences')}</span>
            </div>
            {
              showUser2 ? <>
                <div className="data-item p-2 border-0">
                  <div className="data-col">
                    <span className="data-label">INRX</span>
                  </div>
                  <div className="nk-block-actions">
                    <div className="custom-control custom-switch me-n2">
                      <input
                        type="radio"
                        className="custom-control-input"
                        id="inrx"
                        name="currency"
                        value="inr"
                        checked={userInfo?.currency_preference === "inr"}
                        onChange={(e) => {
                          updateData("inr")
                          const obj = {...userInfo}
                          obj['currency_preference'] = "inr"
                          dispatch(setUserInfo({ userInfo: obj }))
                        }}
                      />
                      <label className="custom-control-label" for="inrx" ></label>
                    </div>
                  </div>
                </div>
                <div className="data-item p-2 border-0">
                  <div className="data-col">
                    <span className="data-label">USDT</span>
                  </div>
                  <div className="nk-block-actions">
                    <div className="custom-control custom-switch me-n2">
                      <input
                        type="radio"
                        className="custom-control-input"
                        id="usdt"
                        name="currency"
                        value="usd"
                        checked={userInfo?.currency_preference === "usd"}
                        onChange={(e) => {

                          updateData("usd")
                          const obj = {...userInfo}
                          obj['currency_preference'] = "usd"
                          dispatch(setUserInfo({ userInfo: obj }))
                        }}
                      /><label className="custom-control-label" for="usdt" ></label>
                    </div>
                  </div>
                </div>
              </> : null
            }
          </div>
          <div className="nk-data data-list mt-2">
            <div className="data-head kanban-board-header kanban-success bg-lighter rounded-0">
              <span className="overline-title">{t('referral')}</span>
            </div>
            <div className="row mx-auto mt-3 pb-3">
              <div className="col-4 ">
                <div className="">
                  <span className="data-label">{t('referral')} {t('code')}</span>
                </div>
              </div>
              <div className="col-4">
                {userInfo?.refferal ?
                  <span className="data-value">{userInfo?.refferal}</span> :
                  <div class="input-group-sm">
                    <input type="text"
                      class="form-control"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={ref}
                      placeholder={(t('enter_referral_code')) }
                      onChange={(e) => {
                        handelReferralChange(e)
                      }}
                      maxLength={10}
                      minLength={10}
                    />
                  </div>
                }
              </div>
              <div className="col-4 d-flex justify-content-end">
                <div className="">
                  <span className="">
                    {userInfo?.refferal ? <span className=" disable">
                      <em className="ni ni-lock-alt text-gray"></em>
                    </span> : <button class="btn btn-outline-success btn-sm" onClick={() => {
                      updateReferral();
                    }}>{t('update')}</button>
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;

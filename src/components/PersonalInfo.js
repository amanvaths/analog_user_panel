import React, { useEffect, useState } from "react";
import { BASE_URL } from "../Api_connection/config";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getSettings } from "../Api_connection/ApiFunction";
import { setUserInfo } from "../redux/reducer/user";

import swal from "sweetalert";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Link } from "react-router-dom";

const PersonalInfo = () => {
  const dispatch = useDispatch()
  const { userInfo, user } = useSelector((state) => state.user.value)
  const email = user.email;
  const [showUser, setShowUser] = useState(true)
  const [showUser1, setShowUser1] = useState(true)
  const [showUser2, setShowUser2] = useState(true);
  const [value, setValue] = useState('')
  const [phone, setPhone] = useState('')
  const [ref, setRefferal] = useState('')
  const [myCurrency, setMyCurrency] = useState('');
  const [updatedUserName, setUpdatedUserName] = useState('')
  const [updatedPhone, setUpdatedPhone] = useState('')
  const [pMenu, setPMenu] = useState(0);
  // const [loader, setLoader] = useState(true)

  const handelReferralChange = (e) => {
    setRefferal(e.target.value)
  }

  function updateSetting() {
    getSettings(email).then((res) => {
      dispatch(setUserInfo({ userInfo: res.data }));
    }).catch((er) => { console.log(er) })
  }

  const updateData = async (myCurrency) => {
    const task = value ? "username" : phone ? "contact" : myCurrency ? "currency" : '';
    const apidata = {
      email: email,
      task: task,
    };
    apidata[task] = task === "username" ? value : task === "currency" ? myCurrency : task === "contact" ? phone : '';
    console.log(myCurrency, "data befor api call");
    console.log("mpobj::", apidata);

    if (apidata.email && apidata.task && apidata[task]) {
      try {
        const data = await axios.post(`${BASE_URL}/settings`, apidata)
        if (data.data.status == 1) {
          setUpdatedUserName(apidata['username']);
          setUpdatedPhone(apidata['contact'])
          setMyCurrency(apidata['currency']);
          setValue("");
          setMyCurrency("");
          setPhone("");
          updateSetting(); 
          // setShowUser1(false);
          NotificationManager.success(data.data.message)
        }
        else if (data.data.status == -1) {
          NotificationManager.error(data.data.message)
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("please fill all the required data!")
    }

    getData()
  }

  async function getData() {
    const data1 = await axios.post(`${BASE_URL}/settings`, { email: email, task: "personal_information" })
    setUpdatedUserName(data1.data.username)
    setUpdatedPhone(data1.data.contact_no)

    if (data1?.data?.username?.length > 0) {
      setShowUser(false);
    }
    if (data1?.data?.contact_no) {
      setShowUser1(false)
    }
    if (data1.data.currency == 'usd') {
      setMyCurrency("usd");
    }
    if (data1.data.currency == 'inr') {
      setMyCurrency("inr");
    }

    dispatch(setUserInfo({ currency_prefrence: data1.data.currency }))
  }

  const updateReferral = async () => {
    try {
      const data = await axios.post(`${BASE_URL}/update_refferal`, { email: email, refferalCode: ref })
      console.log(data.data.status, "::DATA>STATUS");
      if (data.data.status == 1) {
        const res = await axios.post(`${BASE_URL}/configSettings`, { email: email })
        dispatch(setUserInfo({ userInfo: res.data }))
        NotificationManager.success('Refferal Added', '')
        console.log(userInfo, ":: User info after update");
        updateSetting();
      }
      console.log(data.data.status, ":: response from update Referaal API ");
    } catch (error) {
      if (error.response.data.status == 2) {
        swal("Invalid refferal Code or Already updated", "", "error")
      }
      else if (error.response.data.status == 0) {
        swal("Something Went wrong 1", "", "error")
      }
      console.log(error.response.data.status);
      console.log(error.response.data.message);
    }
  }

  const profileMenu = () => {
    // alert("hellow" )
    if (pMenu == 0) {
      var element = document.getElementById("myBody");
      element.classList.add("toggle-shown");
       element = document.getElementById("toggleBtn");
      element.classList.add("active");
       element = document.getElementById("cardAside");
      element.classList.add("content-active");
      setPMenu(1)
    } else {
       element = document.getElementById("myBody");
      element.classList.remove("toggle-shown");
       element = document.getElementById("toggleBtn");
      element.classList.remove("active");
       element = document.getElementById("cardAside");
      element.classList.remove("content-active");
      setPMenu(0)
    }
  }

  useEffect(() => {
    getData();
    // setLoader(false)
  }, [])



  return (
    <>

      <div className="card-inner card-inner-lg bg-light">
        <div className="nk-block-head nk-block-head-lg">
          <div className="nk-block-between">
            <div className="nk-block-head-content">
              <h4 className="nk-block-title">Personal Information</h4>
              <div className="nk-block-des">
              </div>
            </div>
            <div className="nk-block-head-content align-self-start d-lg-none">
              <Link
                to=""
                className="toggle btn btn-icon btn-trigger mt-n1"
                data-target="userAside"
                id="toggleBtn"
              >
                <em className="icon ni ni-menu-alt-r" onClick={profileMenu}></em>
              </Link>
            </div>
          </div>
        </div>
        <div className="card nk-block">
          <div className="nk-data data-list">
            <div className="data-head kanban-board-header kanban-success bg-lighter rounded-0">
              <span className="overline-title">Basics</span>
            </div>
            {/* -------------- */}

            <div className="row mx-auto mt-3 pb-3">
              <div className="col-4">
                <div className="">
                  <span className="data-label">User Name</span>

                </div>
              </div>
              <div className="col-4 ">
                {showUser == true ? 
                <div class="input-group-sm">
                  <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    style={{
                      borderRadius: "0",
                      borderTopStyle: "hidden",
                      borderLeftStyle: "hidden",
                      borderRightStyle: "hidden",
                      borderBottomStyle: "groove"
                    }} />
                </div> :
                 <span className="data-value">{updatedUserName}</span>}
              </div>
              <div className="col-4 d-flex justify-content-end">
                <div className="">

                  <span className="">
                    {showUser ? <Link to="" className="btn btn-dim btn-outline-success" onClick={() => {
                      if (value) {
                        updateData();
                        setShowUser(false);
                      }
                    }}>Update</Link> :
                      <em className="icon ni ni-lock-alt text-gray"></em>

                    }

                  </span>
                </div>
              </div>
            </div>

            <div className="row mx-auto mt-3 pb-3">
              <div className="col-4">
                <div className="">
                  <span className="data-label">Email</span>

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
                  <span className="data-label">Phone Number</span>
                </div>
              </div>
              <div className="col-4">
                {showUser1 == true ? 
                <div className="input-group-sm">
                  <input type="text" className="form-control" aria-label="Phone" aria-describedby="basic-addon2"
                    value={phone}
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
                 <span className="data-value">{updatedPhone}</span>}
              </div>
              <div className="col-4 d-flex justify-content-end">
                <div className="">
                  <span className="">
                    {showUser1 ? <Link to="" className="btn btn-dim btn-outline-success" onClick={() => {
                      if (phone) {
                        updateData();
                        // setShowUser2(false)
                      }
                    }}>Update</Link> : <span className=" disable">
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
              <span className="overline-title">Currency Preferences</span>
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
                        checked={myCurrency === "inr"}
                        onChange={(e) => {
                          updateData("inr")
                          dispatch(setUserInfo({ currency_prefrence: "inr" }))
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
                        checked={myCurrency === "usd"}
                        onChange={(e) => {

                          updateData("usd")
                          dispatch(setUserInfo({ currency_prefrence: "usd" }))
                        }}
                      /><label className="custom-control-label" for="usdt" ></label>
                    </div>
                  </div>
                </div>
              </> : null
            }

            <NotificationContainer />

          </div>

          <div className="nk-data data-list mt-2">
            <div className="data-head kanban-board-header kanban-success bg-lighter rounded-0">
              <span className="overline-title">Referral</span>
            </div>
            <div className="row mx-auto mt-3 pb-3">
              <div className="col-4 ">
                <div className="">
                  <span className="data-label">Referral Code</span>

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
                      placeholder="Enter Referral Code"
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
                    }}>Update</button>

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

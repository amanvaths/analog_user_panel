import React, { useEffect, useState } from "react";
import { BASE_URL } from "../Api_connection/config";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getSettings } from "../Api_connection/ApiFunction";
import { setUserInfo } from "../redux/reducer/user";
import { Triangle } from 'react-loader-spinner'
import swal from "sweetalert";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const PersonalInfo = () => {
  const dispatch = useDispatch()
  const { userInfo, user } = useSelector((state) => state.user.value)
  const email = user.email;
  const [load, setLoad] = useState({})
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
  const [loader, setLoader] = useState(true)

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
        setUpdatedUserName(apidata['username']);
        setUpdatedPhone(apidata['contact'])
        console.log(data, "::settings APi response");
        setMyCurrency(myCurrency);
        updateSetting();
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
      if(error.response.data.status == 2){
        swal("Invalid refferal Code or Already updated", "", "error")
      }
      else if(error.response.data.status == 0){
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
      var element = document.getElementById("toggleBtn");
      element.classList.add("active");
      var element = document.getElementById("cardAside");
      element.classList.add("content-active");
      setPMenu(1)
    } else {
      var element = document.getElementById("myBody");
      element.classList.remove("toggle-shown");
      var element = document.getElementById("toggleBtn");
      element.classList.remove("active");
      var element = document.getElementById("cardAside");
      element.classList.remove("content-active");
      setPMenu(0)
    }
  }

  useEffect(() => {
    getData();
    setLoader(false)
  }, [])

  // useEffect(() => {
  //   getData();
  // }, [myCurrency])

  return (
    <>

      <div className="card-inner card-inner-lg">
        <div className="nk-block-head nk-block-head-lg">
          <div className="nk-block-between">
            <div className="nk-block-head-content">
              <h4 className="nk-block-title">Personal Information</h4>
              <div className="nk-block-des">
              </div>
            </div>
            <div className="nk-block-head-content align-self-start d-lg-none">
              <a
                href="#"
                className="toggle btn btn-icon btn-trigger mt-n1"
                data-target="userAside"
                id="toggleBtn"
              >
                <em className="icon ni ni-menu-alt-r" onClick={profileMenu}></em>
              </a>
            </div>
          </div>
        </div>
        <div className="nk-block">
          <div className="nk-data data-list">
            <div className="data-head">
              <h6 className="overline-title">Basics</h6>
            </div>
            {/* -------------- */}

            <div className="row mx-auto mt-3">
              <div className="col-4">
                <div className="">
                  <span className="data-label">User Name</span>

                </div>
              </div>
              <div className="col-4 ">
                {showUser == true ? <div class="input-group-sm">
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
                </div> : <span className="data-value">{updatedUserName}</span>}
              </div>
              <div className="col-4 d-flex justify-content-end">
                <div className="">

                  <span className="">
                    {showUser ? <a href="#" class="btn btn-dim btn-primary" onClick={() => {
                      if (value) {
                        updateData();
                        setShowUser(false);
                      }
                    }}>Update</a> :
                      <em className="icon ni ni-lock-alt"></em>

                    }

                  </span>
                </div>
              </div>
            </div>

            <div className="row mx-auto mt-3">
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
                    <em className="icon ni ni-lock-alt"></em>
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
                {showUser1 == true ? <div class="input-group-sm">
                  <input type="text" class="form-control" aria-label="Phone" aria-describedby="basic-addon2"
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
                </div> : <span className="data-value">{updatedPhone}</span>}
              </div>
              <div className="col-4 d-flex justify-content-end">
                <div className="">
                  <span className="">
                    {showUser1 ? <a href="#" class="btn btn-dim btn-primary" onClick={() => {
                      if (phone) {
                        updateData();
                        setShowUser1(false);
                      }
                    }}>Update</a> : <span className=" disable">
                      <em className="icon ni ni-lock-alt"></em>
                    </span>
                    }

                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="nk-data data-list">
            <div className="data-head">
              <h6 className="overline-title">Currency Preferences</h6>
            </div>
            {
              showUser2 ? <>
                <div className="data-item">
                  <div className="data-col">
                    <span className="data-label">INRX</span>
                  </div>
                  <div class="nk-block-actions">
                    <div class="custom-control custom-switch me-n2">
                      <input
                        type="radio"
                        class="custom-control-input"
                        id="inrx"
                        name="currency"
                        value="inr"
                        checked={myCurrency === "inr"}
                        onChange={(e) => {
                          updateData("inr")
                          dispatch(setUserInfo({ currency_prefrence: "inr" }))
                        }}
                      />
                      <label class="custom-control-label" for="inrx" ></label>
                    </div>
                  </div>
                </div>


                <div className="data-item">
                  <div className="data-col">
                    <span className="data-label">USDT</span>

                  </div>
                  <div class="nk-block-actions">
                    <div class="custom-control custom-switch me-n2">
                      <input
                        type="radio"
                        class="custom-control-input"
                        id="usdt"
                        name="currency"
                        value="usd"
                        checked={myCurrency === "usd"}
                        onChange={(e) => {

                          updateData("usd")
                          dispatch(setUserInfo({ currency_prefrence: "usd" }))
                        }}
                      /><label class="custom-control-label" for="usdt" ></label>
                    </div>
                  </div>
                </div>
              </> : null
            }

 <NotificationContainer/>

          </div>

          <div className="nk-data data-list">
            <div className="data-head">
              <h6 className="overline-title">Referral</h6>
            </div>
            <div className="row mx-auto mt-3">
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
                      <em className="icon ni ni-lock-alt"></em>
                    </span> : <button class="btn btn-dim btn-primary" onClick={() => {
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

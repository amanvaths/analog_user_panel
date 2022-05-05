import React, { useEffect, useState } from "react";
import { AiFillEdit } from 'react-icons/ai'
import axios from "axios";
import { accountTasks } from "../Api_connection/config";

const PersonalInfo = () => {
  const email = localStorage.getItem("email")
  const [showUser, setShowUser] = useState(true)
  const [showUser1, setShowUser1] = useState(false)
  const [showEditIcon, setShowEditIcon] = useState(1)
  const [showPhoneEdiotButton, setShowPhoneEditButton] = useState(1)
  const [showUpdateButton, setShowUpdateButton] = useState(false)
  const [showLock, setShowLock] = useState(false)
  const [value, setValue] = useState('')
  const [phone, setPhone] = useState('')
  const [myCurrency, setMyCurrency] = useState("USDT");
  const [updatedUserName, setUpdatedUserName] = useState('')
  const [updatedPhone, setUpdatedPhone] = useState('')
  const [currency, setCurrency] = useState('')
  // if(value.length <= 0){
  //   setShowEditIcon(1)
  // }
  // if(phone.length <= 0){
  //   setShowPhoneEditButton(1)
  // }

  console.log(currency, "currency");

  const updateData = async () => {
    const task = value ? "username" : phone ? "contact" : myCurrency ? "currency" : '';
    const apidata = {
      email: email,
      task: task,
    };
    apidata[task] = task === "username" ? value : task === "currency" ? myCurrency : task === "contact" ? phone : '';

    console.log("mpobj::", apidata);

    if (apidata.email && apidata.task && apidata[task]) {
      try {
        const data = await axios.post('http://localhost:3001/api/settings', apidata)
        setUpdatedUserName(apidata['username']);
        setUpdatedPhone(apidata['contact'])

        console.log(data, "::settings APi response");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("please fill all the required data!")
    }
  }
  let result = '';
  useEffect(async () => {
    const data1 = await axios.post('http://localhost:3001/api/settings', { email: email, task: "personal_information" })
    // console.log(":response from  personal details", data1.data);
    //  result = Object.values(data1)
    setUpdatedUserName(data1.data.username)
    setUpdatedPhone(data1.data.contact_no)
    if (data1.data.username.length > 0) {
      setShowUser(false);
    }

  }, [])

  console.log(updatedUserName.length, "amityadav");



  // console.log(result, "df");
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
              >
                <em className="icon ni ni-menu-alt-r"></em>
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
              <div className="col-4">
                <div className="data-col data-col-end">

                  <span className="">
                    {showUser ? <a href="#" class="btn btn-dim btn-primary" onClick={() => {
                      if (value) {
                        updateData();
                        setShowEditIcon(3);
                        setShowUser(false);
                      }
                    }}>Update</a> : <span className=" disable">
                      <em className="icon ni ni-lock-alt"></em>
                    </span>
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
              <div className="col-4 float-left">
                <div className="data-col data-col-end">
                  <span className=" disable">
                    <em className="icon ni ni-lock-alt"></em>
                  </span>
                </div>
              </div>
            </div>

            <div className="row mx-auto mt-3">
              <div className="col-4">
                <div className="">
                  <span className="data-label">Phone Number</span>

                </div>
              </div>
              <div className="col-4">
                {showUser1 == true ? <div class="input-group-sm">
                  <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={10}
                    style={{
                      borderRadius: "0",
                      borderTopStyle: "hidden",
                      borderLeftStyle: "hidden",
                      borderRightStyle: "hidden",
                      borderBottomStyle: "groove"
                    }} />
                </div> : <span className="data-value">{updatedPhone}</span>}
              </div>
              <div className="col-4 float-left">
                <div className="data-col data-col-end">

                  <span className="">
                    {showUser ? <a href="#" class="btn btn-dim btn-primary" onClick={() => {
                      if (value) {
                        updateData();
                        setShowEditIcon(3);
                        setShowUser(false);
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
                    value="INRX"
                    onChange={(e) => setCurrency(e.target.checked)}
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
                    value="USDT"
                  /><label class="custom-control-label" for="usdt" ></label>
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

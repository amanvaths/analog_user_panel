import React, { useEffect, useState } from "react";
import { AiFillEdit } from 'react-icons/ai'
import axios from "axios";

const PersonalInfo = () => {
  const email = localStorage.getItem("email")
  const [showUser, setShowUser] = useState(true)
  const [showUser1, setShowUser1] = useState(false)
  const [value, setValue] = useState('')
  const [phone, setPhone] = useState('')
  const [myCurrency, setMyCurrency] = useState('');
  const [updatedUserName, setUpdatedUserName] = useState('')
  const [updatedPhone, setUpdatedPhone] = useState('')

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
        const data = await axios.post('http://localhost:3001/api/settings', apidata)
        setUpdatedUserName(apidata['username']);
        setUpdatedPhone(apidata['contact'])
        // setMyCurrency(apidata['currency'])
        console.log(data, "::settings APi response");
        setMyCurrency(myCurrency);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("please fill all the required data!")
    }
  }

  async function getData() {
    const data1 = await axios.post('http://localhost:3001/api/settings', { email: email, task: "personal_information" })
    setUpdatedUserName(data1.data.username)
    setUpdatedPhone(data1.data.contact_no)
    // setMyCurrency(data1.data.currency)

    if (data1.data.username.length > 0) {
      setShowUser(false);
    }
    if (data1.data.username.length > 0) {
      setShowUser1(false)
    }

    if (data1.data.currency == 'USDT') {
      setMyCurrency("USDT");
    }
    if (data1.data.currency == 'INRX') {
      setMyCurrency("INRX");
    }
  }

  useEffect(async () => {
    getData();
  }, [])

  useEffect(() => {
    getData();
  }, [myCurrency])
  // console.log(myCurrency, ":: selected currency");
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
            <div className="data-head bg-teal-dim">
              <span className="overline-title">Basics</span>
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
                    {showUser ? <a href="#" class="btn btn-dim btn-success" onClick={() => {
                      if (value) {
                        updateData();
                        setShowUser(false);
                      }
                    }}>Update</a> :
                      <em className="ni ni-lock-alt"></em>

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
                  <span className="disable">
                    <em className="ni ni-lock-alt"></em>
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
                  <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                    {showUser1 ? <a href="#" class="btn btn-dim btn-success" onClick={() => {
                      if (phone) {
                        updateData();
                        setShowUser1(false);
                      }
                    }}>Update</a> : <span className=" disable">
                      <em className="ni ni-lock-alt"></em>
                    </span>
                    }

                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="nk-data data-list">
            <div className="data-head bg-teal-dim">
              <span className="overline-title">Currency Preferences</span>
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
                    checked={myCurrency === "INRX"}
                    onChange={(e) => {
                      updateData("INRX")
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
                    value="USDT"
                    checked={myCurrency === "USDT"}
                    onChange={(e) => {
                      updateData("USDT")
                    }}
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

import React, { useDeferredValue, useEffect, useState } from "react";
import { BASE_URL } from "../Api_connection/config";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCurrencyPrefrence } from "../redux/currency";
import { setReferralCode } from '../redux/User'



const PersonalInfo = () => {
  const email = localStorage.getItem("email")
  const dispatch = useDispatch()
  const { referralCode } = useSelector((state) => state.user.value)
  const [load, setLoad] = useState({})
  const [showUser, setShowUser] = useState(true)
  const [showUser1, setShowUser1] = useState(true)
  const [showUser3, setShowUser3] = useState(referralCode.length == 0 ? true : false);
  const [value, setValue] = useState('')
  const [phone, setPhone] = useState('')
  const [myCurrency, setMyCurrency] = useState('');
  const [updatedUserName, setUpdatedUserName] = useState('')
  const [updatedPhone, setUpdatedPhone] = useState('')

  console.log(referralCode, "ref code");


  const handelRefupdate = (e)=>{
    dispatch(setReferralCode({referralCode: e.target.value}))
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
        // dispatch(setCurrencyPrefrence())
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

    if (data1?.data?.username?.length > 0) {
      setShowUser(false);
    }
    if (data1?.data?.username?.length > 0) {
      setShowUser1(false)
    }
    if (data1.data.currency == 'usd') {
      setMyCurrency("usd");
    }
    if (data1.data.currency == 'inr') {
      setMyCurrency("inr");
    }

    dispatch(setCurrencyPrefrence({ currency_prefrence: data1.data.currency }))
  }

  // console.log(referralCode, "red code");
  const updateReferral = async () => {
    
    try {
      setShowUser3(false);
      const data = await axios.post(`${BASE_URL}/update_refferal`, { email: email, refferalCode: referralCode })
      setLoad(data)
      console.log(data.data.status, ":: response from update Referaal API ");
    } catch (error) {
      console.log(error);
    }
  }

  console.log(showUser3);
  
  // useEffect(() => {
  //   console.log(referralCode, "refcode");
  //   if (referralCode.length == 0) {
  //     setShowUser3(true)
  //   }
  //   else {
  //     setShowUser3(false)
  //   }
  // }, [load])

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    getData();
  }, [myCurrency])

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
                      dispatch(setCurrencyPrefrence("inr"))
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
                      dispatch(setCurrencyPrefrence("usd"))
                    }}
                  /><label class="custom-control-label" for="usdt" ></label>
                </div>
              </div>
            </div>
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
                {showUser3 ?
                  <div class="input-group-sm">
                    <input type="text"
                      class="form-control"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={referralCode}
                      placeholder="Enter Referral Code"
                      onChange={(e) => {
                        handelRefupdate(e)
                      }}
                      maxLength={10}
                      minLength={10}
                    />
                  </div> :
                  <span className="data-value">{referralCode}</span>}
              </div>
              <div className="col-4 d-flex justify-content-end">
                <div className="">
                  <span className="">
                    {showUser3 ? <button class="btn btn-dim btn-primary" onClick={() => {

                      updateReferral();
                      

                    }}>Update</button> :
                      <span className=" disable">
                        <em className="icon ni ni-lock-alt"></em>
                      </span>
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

import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../Api_connection/config";
export default function () {
    const navigate =useNavigate();
    const[otp,setOtp]=useState("")
    const email = localStorage.getItem("email")

    return (
        <div>
            <div className="container-fluid">
                <div className="container mx-auto,px-md-5" style={{display: "flex", height: "100vh"}}>
                <form action="" style={{width:"100%",paddingTop:"20%"}}>
                <div class="form-group">
                    <div class="form-group">
                        <label for="inputOtp">Enter OTP:</label>
                        <input type="text" class="form-control" id="inputOtp"  placeholder="Enter Otp" onChange={(e)=>setOtp(e.target.value)} />
                    </div>
                    <button type="button" class="btn btn-primary px-2" style={{width:"150px"}} onClick={()=>{
                         axios.post(`${BASE_URL}/verifyauthtoken`, { email:email,token:otp }).then((resp)=>{
                             if(resp.data.status==1){
                               
                                swal(`Verified Succesfully.`, "Welcome", "success");
                                navigate("/home")
                             }else{
                                swal(
                                    "Incorrect Credentials",
                                    "Please Enter Right Credentials",
                                    "error"
                                  );
                             }
                         })
                    }}>Verify</button>
                </div>
                </form>
                </div>
            </div>
        </div>
    )
}

import React, { useEffect, useState } from "react";
import "./VerifyOtp.css";
import { useTask } from "../../../context/TaskContext";
import Navbar from "../../../components/Navbar";
import bgImage from "../../../assets/bg.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const VerifyOtp = () => {

  
  const {backendUrl, navigate} = useTask();
  const [timer, setTimer] = useState(0)
  const location = useLocation()
  const email = location.state?.email

  const inputRefs = React.useRef([]);

  useEffect(() => {
    let interval
    if(timer > 0){
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timer])

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });

    const lastIndex = pasteArray.length - 1;
    if (inputRefs.current[lastIndex]) {
      inputRefs.current[lastIndex].focus();
    }
  };

  const otpSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const otpArray = inputRefs.current.map((e) => e.value)
      const otp = otpArray.join('')

      const {data} = await axios.post(backendUrl + "/v1/auth/verify-acoount", {otp, email}, {withCredentials: true})

      if(data.success){
        toast.success(data.message)
        navigate("/dashboard")
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const resendHandler = async () => {
    try {
      const {data} = await axios.post(backendUrl + "/v1/auth/send-verify-otp", {email}, {withCredentials: true})

      if(data.success){
        toast.success("OTP send successfully")
        setTimer(30)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }



  return (
    <div className="login-bg" style={{'background-color': '#008080'}}>
      <Navbar />
      <form onSubmit={otpSubmitHandler} className="verification-container">
        <div className="verify-header">
          <h2>Email Verification</h2>
          <p>Please enter the OTP sent to registered Email ID</p>
        </div>
        <div onPaste={handlePaste} className="input-container">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                ref={(e) => (inputRefs.current[index] = e)}
                className="otp-input"
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength="1"
                type="text"
                key={index}
                required
              />
            ))}
        </div>

        <div className="resend-otp">
          <p>Didn't receive the code?</p>
          <button disabled={timer > 0} onClick={resendHandler}>{timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}</button>
        </div>
        <div className="verify-container">
          <button type="submit" className="verify-btn">Verify OTP</button>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtp;

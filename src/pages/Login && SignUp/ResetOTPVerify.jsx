import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useTask } from "../../context/TaskContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

const ResetOTPVerify = () => {
  const { backendUrl, navigate, loading, setLoading } = useTask();

  const [timer, setTimer] = useState(0);
  const inputRefs = React.useRef([]);

  const email = localStorage.getItem("resetEmail");

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

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

  const resetOTPHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      const { data } = await axios.post(
        backendUrl + "/v1/auth/verify-reset-otp",
        { otp, email },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        // localStorage.setItem("resetEmail", email);
        navigate("/reset-password");
      } else {
        toast.error(data.message);
        inputRefs.current.forEach((input) => (input.value = ""));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      inputRefs.current.forEach((input) => (input.value = ""));
    } finally {
      setLoading(false);
    }
  };

  const resendHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        backendUrl + "/v1/auth/send-reset-otp",
        { email },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        setTimer(30);
        inputRefs.current.forEach((input) => (input.value = ""));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ "background-color": "#008080" }}>
      <Navbar />
      <div className="otp-bg" style={{ "background-color": "#008080" }}>
        {loading && <Spinner />}
        
        <form
          onSubmit={resetOTPHandler}
          className={
            loading
              ? "verification-container content-dull"
              : "verification-container"
          }>
          <div className="verify-header">
            <h2>Password Reset Verification</h2>
            <p>Please enter the OTP to reset your password.</p>
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
            <button type="button" onClick={resendHandler} disabled={timer > 0}>
              {timer > 0 ? `Resend OTP in ${timer}` : "Resend OTP"}
            </button>
          </div>
          <div className="verify-container">
            <button type="submit" className="verify-btn">
              Verify & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetOTPVerify;

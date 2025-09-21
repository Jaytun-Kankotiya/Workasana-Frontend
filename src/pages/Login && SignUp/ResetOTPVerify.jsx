import React from "react";
import Navbar from "../../components/Navbar";
import bgImage from '../../assets/bg.jpg';

const ResetOTPVerify = () => {
  const inputRefs = React.useRef([]);

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

  return (
    <div
      className="login-bg"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${bgImage}) center/cover no-repeat`,
      }}>
      <Navbar />
      <form className="verification-container">
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
          <button>Resend OTP</button>
        </div>
        <div className="verify-container">
          <button className="verify-btn">Verify & Continue</button>
        </div>
      </form>
    </div>
  );
};

export default ResetOTPVerify;

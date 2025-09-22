import Navbar from "../../components/Navbar";
import { Mail } from "lucide-react";
import { useTask } from "../../context/TaskContext";

const VerifyEmail = () => {
  const { formData, setFormData, changeHandler } = useTask();
  return (
    <div className="login-bg" style={{ "background-color": "#008080" }}>
      <Navbar />
      <form className="verification-container">
        <div className="verify-header">
          <h2>Password Recovery</h2>
          <p>Enter your registered email address to verify your account.</p>
        </div>

        <div className="email-form">
          <label>Email</label>
          <div className="input-field">
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              required
            />
            <span className="toggle-icon">{<Mail />}</span>
          </div>
        </div><br />

        <div className="verify-container">
          <button className="verify-btn">Send OTP</button>
        </div>
      </form>
    </div>
  );
};

export default VerifyEmail;

import Navbar from "../../components/Navbar";
import bgImage from "../../assets/bg.jpg";

const ResetPassword = () => {
  return (
    <div
      className="login-bg"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${bgImage}) center/cover no-repeat`,
      }}>
      <Navbar />
      <form className="reset-header">
        <div className="verify-header">
          <h2>Reset Your Password</h2>
          <p>Please enter and confirm your new password.”</p>
        </div>
        <div className="reset-container">
          <div className="reset-group">
            <label>Enter New password</label>
            <input type="password" />
          </div>

          <div className="reset-group">
            <label>Confirm New Password</label>
            <input type="password" />
          </div>
        </div>

        <div className="verify-container">
          <button className="verify-btn">Reset Password</button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;

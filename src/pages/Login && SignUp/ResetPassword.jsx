import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useTask } from "../../context/TaskContext";
import { EyeClosed, Eye } from "lucide-react";

const ResetPassword = () => {
  const { backendUrl, navigate, formData, setFormData } = useTask();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [password, setPassword] = useState('')


  return (
    <div className="login-bg" style={{ "background-color": "#008080" }}>
      <Navbar />
      <form className="reset-header">
        <div className="verify-header">
          <h2>Reset Your Password</h2>
          <p>Please enter and confirm your new password.”</p>
        </div>

        <form className="reset-pass-group">
          <div className="password-group">
            <label>Enter New password</label>
            <div className="reset-field">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="toggle-icon"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
            </span>
            </div>
          </div><br />

          <div className="password-group">
            <label>Confirm New Password</label>
            <div className="reset-field">
            <input
              type={showPassword2 ? "text" : "password"}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              value={formData.password}
              required
            />
            <span
              className="toggle-icon"
              onClick={() => setShowPassword2(!showPassword2)}>
              {showPassword2 ? <Eye size={20} /> : <EyeClosed size={20} />}
            </span>
            </div>
          </div><br />
        </form>

        <div className="verify-container">
          <button className="verify-btn">Reset Password</button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;

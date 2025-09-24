import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useTask } from "../../context/TaskContext";
import { EyeClosed, Eye } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

const ResetPassword = () => {
  const { backendUrl, navigate, loading, setLoading } = useTask();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const email =  localStorage.getItem("resetEmail");

  const passwordSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (!password.trim() || !confirmPassword.trim()) {
      toast.error("Please fill in both password fields");
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please check and try again");
      return;
    }
    try {
      const { data } = await axios.post(
        backendUrl + "/v1/auth/reset-password",
        { email, newPassword: confirmPassword },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        setShowPassword(false);
        setShowPassword2(false);
        setPassword("");
        setConfirmPassword("");
        localStorage.removeItem("resetEmail");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }finally{
      setLoading(false)
    }
  };

  return (
    <>
    <div className="login-bg" style={{ "background-color": "#008080" }}>
      {loading && <Spinner />}
      <Navbar />
      <div className={loading ? "reset-header content-dull" : "reset-header"}>
        <div className="verify-header">
          <h2>Reset Your Password</h2>
          <p>Please enter and confirm your new password.</p>
        </div>

        <form onSubmit={passwordSubmitHandler} className="reset-pass-group">
          <div className="password-group">
            <label>Enter New password</label>
            <div className="reset-field">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  borderColor:
                    password && confirmPassword && password !== confirmPassword
                      ? "red"
                      : "#39b737ff",
                  transition: "border-color 0.5s ease",
                }}
              />
              <span
                className="toggle-icon"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
              </span>
            </div>
          </div>
          <br />

          <div className="password-group">
            <label>Confirm New Password</label>
            <div className="reset-field">
              <input
                type={showPassword2 ? "text" : "password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                style={{
                  borderColor:
                    password && confirmPassword && password !== confirmPassword
                      ? "red"
                      : "#39b737ff",
                  transition: "border-color 0.5s ease",
                }}
                required
              />
              <span
                className="toggle-icon"
                onClick={() => setShowPassword2(!showPassword2)}>
                {showPassword2 ? <Eye size={20} /> : <EyeClosed size={20} />}
              </span>
            </div>
          </div>
          <br />
          <div className="verify-container">
            <button type="submit" className="verify-btn">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default ResetPassword;

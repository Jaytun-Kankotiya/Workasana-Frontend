import { useEffect, useState } from "react";
import { useTask } from "../../../context/TaskContext";
import "./Login.css";
import { EyeClosed, Eye, Mail, SquareUser } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner";

const Login = () => {
  const {
    backendUrl,
    loggedIn,
    setLoggedIn,
    navigate,
    formData,
    setFormData,
    changeHandler,
    loading, 
    setLoading
  } = useTask();
  const [loginState, setLoginState] = useState(true);
  const [showPassword, setShowPassword] = useState(false)
  

  useEffect(() => {
    setFormData({name: "", email: "", password: ""})
  }, [])

  const formHandler = async (e) => {
    e.preventDefault();
    setLoading(true)

    axios.defaults.withCredentials = true;

    try {
      if (!loginState) {
        const { data } = await axios.post(backendUrl + `/v1/auth/register`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        if (data.success) {
          const otpRes = await axios.post(
            backendUrl + "/v1/auth/send-verify-otp",
            { email: formData.email },
            { withCredentials: true }
          );
          if (otpRes.data.success) {
            toast.success("Verification OTP Sent to your Email ID");
            navigate("/verify-account", {state: {email: formData.email}});
          }else{
            toast.error(otpRes.data.message)
          }
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          backendUrl + "/v1/auth/login",
          {
            email: formData.email,
            password: formData.password,
          },
          { withCredentials: true }
        );

        if (data.success) {
          navigate("/dashboard");
          setLoggedIn(true);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        setFormData({ name: "", email: "", password: "" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="login-bg">
      {loading && <Spinner />}
      <div className={loading ? "content-dull login-container" : "login-container"} >
        <div className="login-left">
          <h1>Workasana</h1>
          <h2>
            A home for teamwork, where everyone comes together. <br />
            Workasana makes teamwork simple, focused, and effective.
          </h2>
        </div>

        <div className="login-right">
          <div className="login-header">
            <h1>
              {loginState ? "Log In to your account" : "Create an account"}
            </h1>
            <p>Please enter your details</p>
          </div>

          <form onSubmit={formHandler} className="login-form">
            {!loginState && (
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-field">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                  <span className="toggle-icon">{<SquareUser />}</span>
                </div>
              </div>
            )}
            <div className="form-group">
              <label>Email</label>
              <div className="input-field">
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
                <span className="toggle-icon">{<Mail />}</span>
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-field">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <span
                  className="toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                </span>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loginState ? "Login" : "Sign Up"}
            </button>
            <button
              className="forgot"
              type="button"
              onClick={() => navigate("/verify-email")}>
              Forgot Password?
            </button>

            <div className="toggle-state">
              <p>
                {loginState ? "Don't have an account?" : "Already a member?"}
              </p>
              <button
                onClick={() => setLoginState((prev) => !prev)}
                className="link-btn">
                {loginState ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

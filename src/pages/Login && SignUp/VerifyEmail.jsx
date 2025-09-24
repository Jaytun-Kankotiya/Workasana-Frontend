import Navbar from "../../components/Navbar";
import { Mail } from "lucide-react";
import { useTask } from "../../context/TaskContext";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

const VerifyEmail = () => {
  const { formData, loading, setLoading, changeHandler, backendUrl, navigate } = useTask();
  const email = formData.email

  const emailVerifyHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const {data} = await axios.post(backendUrl + "/v1/auth/send-reset-otp", {email}, {withCredentials: true})

      if(data.success){
        localStorage.setItem("resetEmail", email)
        navigate("/verify-reset-account")
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }finally{
      setLoading(false)
    }
  }


  return (
    <div className="login-bg" style={{ "background-color": "#008080" }}>
      {loading && <Spinner />}
      <Navbar />
      <form onSubmit={emailVerifyHandler} className={loading ? "verification-container content-dull" : "verification-container"}>
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
          <button type="submit" className="verify-btn">Send OTP</button>
        </div>
      </form>
    </div>
  );
};

export default VerifyEmail;

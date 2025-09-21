import { useState } from "react";
import { useTask } from "../../../context/TaskContext";
import "./Login.css";
import bgImage from '../../../assets/bg.jpg';


const Login = () => {
  const { loggedIn, setLoggedIn } = useTask();
  const [loginState, setLoginState] = useState(false);

  return (
    <div className="login-bg" style={{    background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${bgImage}) center/cover no-repeat`}}>
      <div className="login-container">
        <div className="login-left">
            <h1>Workasana</h1>
            <h2>
            A home for teamwork, where everyone comes together. <br /> 
            Workasana makes teamwork simple, focused, and effective.  
            </h2>
        </div>

        <div className="login-right">
          <div className="login-header">
            <h1>{loginState ? "Log In to your account" : "Create an account"}</h1>
            <p>Please enter your details</p>
          </div>

          <form className="login-form">
            {!loginState && (
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" />
              </div>
            )}
            <div className="form-group">
              <label>Email</label>
              <input type="text" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" />
            </div>

              <button className="submit-btn">{loginState ? "Login" : "Sign Up"}</button>
              <p className="forgot">Forgot Password?</p>

              <div className="toggle-state">
                <p>
                  {loginState ? "Don't have an account?" : "Already a member?"}
                </p>
                <button onClick={() => setLoginState((prev) => !prev)} className="link-btn">{loginState ? "Sign Up" : "Sign In"}</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

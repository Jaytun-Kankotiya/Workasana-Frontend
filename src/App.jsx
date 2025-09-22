import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login && SignUp/Login/Login";
import VerifyOtp from "./pages/Login && SignUp/VerifyOTP/VerifyOTP";
import ResetOTPVerify from "./pages/Login && SignUp/ResetOTPVerify";
import ResetPassword from "./pages/Login && SignUp/ResetPassword";
import VerifyEmail from "./pages/Login && SignUp/VerifyEmail";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Main Features/Dashboard";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-account" element={<VerifyOtp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-reset-account" element={<ResetOTPVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;

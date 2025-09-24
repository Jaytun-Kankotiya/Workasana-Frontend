import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Login from "./pages/Login && SignUp/Login/Login";
import VerifyOtp from "./pages/Login && SignUp/VerifyOTP/VerifyOTP";
import ResetOTPVerify from "./pages/Login && SignUp/ResetOTPVerify";
import ResetPassword from "./pages/Login && SignUp/ResetPassword";
import VerifyEmail from "./pages/Login && SignUp/VerifyEmail";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Main Features/Dashboard/Dashboard";
import Projects from "./pages/Main Features/Projects/Projects";
import Teams from "./pages/Main Features/Team";
import Tasks from './pages/Main Features/Tasks/Tasks'
import Report from "./pages/Main Features/Report"
import Settings from "./pages/Main Features/Settings"

function App() {
  return (
    <>
      <ToastContainer
        toastStyle={{ marginTop: "2.5rem" }}
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="colored"
        style={{
          fontSize: "14px",
          fontWeight: 500,
          borderRadius: "8px",
        }}
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-account" element={<VerifyOtp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-reset-account" element={<ResetOTPVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/report" element={<Report />} />
        <Route path="/setting" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;

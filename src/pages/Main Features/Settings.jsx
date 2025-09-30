import Sidebar from "./Sidebar";
import "../Main Features/Main.css";
import { useTask } from "../../context/TaskContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Axis3D, LogOut } from "lucide-react";

const Setting = () => {
  const { backendUrl, loading, setLoading, navigate } = useTask();
  const [userData, setUserData] = useState([]);

  const fetchUserProfile = async () => {
    setLoading();
    try {
      const { data } = await axios.get(backendUrl + `/v1/user/data`, {
        withCredentials: true,
      });
      if (!data.success) {
        toast.error(data.message);
      } else {
        setUserData(data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = async () => {
    setLoading(true)
    try {
      const {data} = await axios.post(backendUrl + '/v1/auth/logout', {withCredentials: true})
      if(!data.success){
        toast.error(data.message)
      }else{
        toast.success(data.message)
        navigate("/login")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, []);

  console.log(userData);
  return (
    <div className="main-container">
      <div>
        <Sidebar />
      </div>
      <div className="right-container">
        <div>
          <h2 className="mt-4 text-center">My Profile</h2>
        </div>

        <div className="profile-container">

          <div className="profile-img">
            <h4>My Profile Pic</h4>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF02Jj8T2t7PdkytAw42HDuuSz7yXguKn8Lg&s"
              alt="Profile Picture"
            />
          </div>

          <div className="profile-header">
            <strong>Name:</strong>
            {userData?.name}
            <strong>Email:</strong>
            {userData?.email}
            <strong>Account Status:</strong>
            {userData?.isVerified === false ? "❌ Not Verified" : "✅ Verified"}

            <div className="logout-btn">
            <button type="button" onClick={logoutHandler}>
              Log Out <LogOut size={18} />
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;

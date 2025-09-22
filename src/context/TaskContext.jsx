import axios from "axios";
import React from "react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

const TaskProvider = (props) => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const backendUrl = import.meta.env.VITE_API_BASE_URL;
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();




  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const value = {
    backendUrl,
    navigate,
    loggedIn,
    setLoggedIn,
    formData, 
    setFormData,
    changeHandler,
    loading, 
    setLoading
  };

  return (
    <>
      <TaskContext.Provider value={value}>
        {props.children}
      </TaskContext.Provider>
    </>
  );
};

export { TaskProvider };

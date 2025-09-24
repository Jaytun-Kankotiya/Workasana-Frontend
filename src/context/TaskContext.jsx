import axios from "axios";
import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

const TaskProvider = (props) => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false)
  const [addProject, setAddProject] = useState(false)
  const [addTask, setAddTask] = useState(false)
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
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


   const fetchProjects = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(backendUrl + `/v1/projects`);
      if (data.success) {
        setProjects(data.data)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }finally{
      setLoading(false)
    }
  };

  const fetchTasks = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(backendUrl + `/v1/tasks`);
        if (data.success) {
          setTasks(data.data);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    // useEffect(() => {
    //   fetchProjects()
    //   fetchTasks()
    // }, [])

  const value = {
    backendUrl,
    navigate,
    loggedIn,
    setLoggedIn,
    formData, 
    setFormData,
    changeHandler,
    loading, 
    setLoading,
    addProject, 
    setAddProject,
    addTask, 
    setAddTask,
    fetchProjects, projects, setProjects,
    tasks, setTasks, fetchTasks,
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

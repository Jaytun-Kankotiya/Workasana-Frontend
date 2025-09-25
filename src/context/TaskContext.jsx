import axios from "axios";
import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

const TaskProvider = (props) => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false)
  const [addProject, setAddProject] = useState(false)
  const [addTask, setAddTask] = useState(false)
  const [projects, setProjects] = useState([]);
  const [owners, setOwners] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [teams, setTeams] = useState([]);
  const [filterTask, setFilterTask] = useState("");
  const [filterProject, setFilterProject] = useState("");
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

    const fetchTeams = async () => {
      setLoading(true)
      try {
        const {data} = await axios.get(backendUrl + '/v1/teams')
        if(data.success){
          setTeams(data.data)
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message)
      }finally{
        setLoading(false)
      }
    }

    const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(backendUrl + "/v1/auth/users");
      if (data.success) {
        setOwners(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };


  const getDueDate = (createdAt, timeToComplete) => {
    const createdDate = new Date(createdAt);
    createdDate.setDate(createdDate.getDate() + timeToComplete);

    const day = createdDate.getDate();
    const month = createdDate.toLocaleString("default", { month: "long" });
    const year = createdDate.getFullYear();

    const getOriginal = (n) => {
      if (n > 3 && n < 21) return "th";
      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
    return `${day}${getOriginal(day)} ${month} ${year}`;
  };

  const statusColor = {
    "To Do": {
      background: "#3498db1c",
      color: "#3498db",
    },
    "In Progress": {
      background: "#f18f0f1c",
      color: "#fdab07ff",
    },
    Completed: {
      background: "#2ecc70cd",
      color: "#fff",
    },
    Blocked: {
      background: "#e74c3c1c",
      color: "#e74c3c",
    },
  };


  const filteredTask = filterTask
    ? tasks.filter((task) => task.status === filterTask)
    : tasks;

  const filteredProject = filterProject
    ? projects.filter((project) => project.status === filterProject)
    : projects;

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
    fetchTasks, tasks, setTasks,
    fetchTeams, teams, setTeams,
    fetchUsers, owners, setOwners,
    filteredTask, filteredProject,
    filterTask, setFilterTask,
    filterProject, setFilterProject, getDueDate, statusColor
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

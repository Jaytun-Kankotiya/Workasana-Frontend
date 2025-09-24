import Sidebar from "../Sidebar";
import "../../Main Features/Main.css";
import "./Dashboard.css";
import { Search, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useTask } from "../../../context/TaskContext";
import Spinner from "../../../components/Spinner";
import axios from "axios";
import { toast } from "react-toastify";
import AddProject from "../Projects/AddProject";

const Dashboard = () => {
  const {
    backendUrl,
    loading,
    setLoading,
    navigate,
    addProject,
    setAddProject,
    fetchProjects,
    projects,
    setProjects,
    tasks,
    setTasks,
    fetchTasks
  } = useTask();

  
  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, []);

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

  return (
    <div className="main-container">
      {loading && <Spinner />}
      {addProject && <AddProject />}
      <div>
        <Sidebar />
      </div>
      <div className="right-container">
        <div className="searchbox">
          <input type="text" placeholder="Search projects..." />
          <Search />
        </div>

        <div className="dashboard-title">
          <div className="dashboard-title-group">
            <h2>Projects</h2>
            <select name="">
              <option value="" defaultChecked>
                Filter
              </option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button type="button" onClick={() => setAddProject(true)}>
            <Plus size={18} />
            New Project
          </button>
        </div>

        <div>
          {projects && projects.length > 0 ? (
            <div className="project-container">
              {projects.map((project, index) => (
                <div key={index} className="project-card">
                  <h4>{project.name}</h4>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div>No Projects Found</div>
          )}
        </div>

        <div className="dashboard-title">
          <div className="dashboard-title-group">
            <h2>My Tasks</h2>
            <select name="">
              <option value="" defaultChecked>
                Filter
              </option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button>
            <Plus size={18} />
            New Task
          </button>
        </div>

        <div>
          {tasks && tasks.length > 0 ? (
            <div className="project-container">
              {tasks.map((task, index) => {
                const dueDate = getDueDate(task.createdAt, task.timeToComplete);
                return (
                  <div key={index} className="task-card">
                    <p
                      className="task-status"
                      style={{
                        background:
                          task.status === "In Progress"
                            ? "#f18f0f1c"
                            : "#2ecc70cd",
                        color:
                          task.status === "In Progress" ? "#fdab07ff" : "#fff",
                      }}>
                      {task.status}
                    </p>
                    <h4>{task.name}</h4>
                    <p className="due-date">Due on: {dueDate}</p>
                    <div className="owners-container">
                      {task.owners && task.owners.length > 0 ? (
                        task.owners.map((owner, inx) => {
                          const colors = [
                            "#f39c12",
                            "#e74c3c",
                            "#8e44ad",
                            "#3498db",
                            "#16a085",
                            "#d35400",
                          ];
                          const initials = owner.name
                            .split(" ")
                            .map((n) => n[0].toUpperCase())
                            .join("");
                          const bgColor = colors[inx % colors.length];

                          return (
                            <div
                              key={inx}
                              className="owner-avtar"
                              style={{ backgroundColor: bgColor }}
                              title={owner}>
                              {initials}
                            </div>
                          );
                        })
                      ) : (
                        <span>No Owners</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>No Tasks Found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

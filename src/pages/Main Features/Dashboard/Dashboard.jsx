import Sidebar from "../Sidebar";
import "../../Main Features/Main.css";
import "./Dashboard.css";
import { Search, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTask } from "../../../context/TaskContext";
import Spinner from "../../../components/Spinner";
import AddProject from "../Projects/AddProject";
import AddTask from "../Tasks/AddTask";

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
    fetchTasks,
    addTask,
    setAddTask,
    filteredTask,
    filteredProject,
    filterTask, setFilterTask,
    filterProject, setFilterProject, getDueDate, statusColor
  } = useTask();

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, []);


  const searchedTasks = search
    ? filteredTask.filter((task) =>
        task.name.toLowerCase().includes(search.toLowerCase())
      )
    : filteredTask;

  const searchedProjects = search
    ? filteredProject.filter((project) =>
        project.name.toLowerCase().includes(search.toLowerCase())
      )
    : filteredProject;
    

  return (
    <div
      className={
        addProject || addTask || loading
          ? "main-container main-content-dull"
          : "main-container"
      }>
      {loading && <Spinner />}
      {addProject && <AddProject />}
      {addTask && <AddTask />}
      <div>
        <Sidebar />
      </div>
      <div className="right-container">
        <div className="searchbox">
          <input
          value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search projects or tasks..."
          />
          {search ? <X onClick={() => setSearch('')} /> : <Search />}
        </div>

        <div className="dashboard-title">
          <div className="dashboard-title-group">
            <h2>Projects</h2>
            <select onChange={(e) => setFilterProject(e.target.value)}>
              <option value="" defaultChecked>
                Filter
              </option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
          <button type="button" onClick={() => setAddProject(true)}>
            <Plus size={18} />
            New Project
          </button>
        </div>

        <div>
          {searchedProjects && searchedProjects.length > 0 ? (
            <div className="project-container">
              {searchedProjects.map((project, index) => (
                <div key={index} className="project-card">
                  <p
                    className="post-status"
                    style={statusColor[project.status]}>
                    {project.status}
                  </p>
                  <h4>{project.name}</h4>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-tasks-container">
              <p className="no-tasks">No Projects Found</p>
            </div>
          )}
        </div>

        <div className="dashboard-title">
          <div className="dashboard-title-group">
            <h2>My Tasks</h2>
            <select onChange={(e) => setFilterTask(e.target.value)}>
              <option value="" defaultChecked>
                Filter
              </option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button type="button" onClick={() => setAddTask(true)}>
            <Plus size={18} />
            New Task
          </button>
        </div>

        <div>
          {searchedTasks && searchedTasks.length > 0 ? (
            <div className="project-container">
              {searchedTasks.map((task, index) => {
                const dueDate = getDueDate(task.createdAt, task.timeToComplete);
                return (
                  <div key={index} className="task-card">
                    <p className="task-status" style={statusColor[task.status]}>
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
            <div className="no-tasks-container">
              <p className="no-tasks">No Tasks Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

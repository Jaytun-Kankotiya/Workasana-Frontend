import Sidebar from "../Sidebar";
import "../../Main Features/Main.css";
import { useTask } from "../../../context/TaskContext";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner";
import AddProject from "./AddProject";
import { Link } from "react-router-dom";

const Projects = () => {
  const {
    setAddProject,
    backendUrl,
    loading,
    setLoading,
    navigate,
    addProject,
    fetchProjects,
    filterProject,
    setFilterProject,
    filteredProject,
  } = useTask();

  // const [filterProject, setFilterProject] = useState();

  useEffect(() => {
    fetchProjects();
  }, []);

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

  return (
    <div className="main-container">
      <div>
        <Sidebar />
      </div>
      {loading && <Spinner />}
      {addProject && <AddProject />}
      <div className="right-container">
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
          {filteredProject && filteredProject.length > 0 ? (
            <div className="project-container">
              {filteredProject.map((project, index) => (
                <Link key={project._id || index} className="project-link"  to={project?._id ? `/project-details/${project._id}` : "#"}>
                  <div className="project-card">
                    <p
                      className="post-status"
                      style={statusColor[project.status]}>
                      {project.status}
                    </p>
                    <h4>{project.name}</h4>
                    <p>{project.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="no-tasks-container">
              <p className="no-tasks">No Projects Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;

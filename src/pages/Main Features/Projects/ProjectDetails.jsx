import { useParams } from "react-router-dom";
import { useTask } from "../../../context/TaskContext";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "../Sidebar";
import Spinner from "../../../components/Spinner";
import { Plus } from "lucide-react";
import AddProject from "./AddProject";
import { Flag } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  SlidersHorizontal,
  CircleArrowLeft,
  ArrowRightToLine,
} from "lucide-react";
import { Link } from "react-router-dom";

const ProjectDetails = () => {
  const {
    fetchProjects,
    fetchTasks,
    projects,
    tasks,
    loading,
    addProject,
    setAddProject,
    getDueDate,
    statusColor,
    backendUrl,
    setLoading,
  } = useTask();
  const [sort, setSort] = useState("");
  const [projectDetails, setProjectDetails] = useState(null);
  const { id } = useParams();

  const fetchProjectById = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/v1/projects/${id}`);
      if (data.success) {
        setProjectDetails(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectById();
    fetchTasks();
  }, [id]);

  const getPriority = (task) => {
    const dueDays =
      Math.ceil(
        new Date(task.createdAt).getTime() +
          task.timeToComplete * 24 * 60 * 60 * 1000 -
          Date.now()
      ) /
      (1000 * 60 * 60 * 24);

    if (dueDays < 3)
      return { label: "High", className: "priority-high", value: 3 };
    if (dueDays <= 5)
      return { label: "Medium", className: "priority-medium", value: 2 };
    return { label: "Low", className: "priority-low", value: 1 };
  };

  const tasksList = useMemo(() => {
    if (!projectDetails || !tasks) return [];

    const filtered = tasks.filter(
      (task) => task?.project?._id === projectDetails._id
    );

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "low-high":
          return getPriority(a).value - getPriority(b).value;
        case "high-low":
          return getPriority(b).value - getPriority(a).value;
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        default:
          return 0;
      }
    });
  }, [tasks, projectDetails, sort]);

  const sortHandler = (e) => {
    setSort(e.target.value);
  };

  const handleProjectComplete = async () => {
    setLoading(true);
    try {
      const { data } = await axios.patch(
        backendUrl + `/v1/projects/${id}`,
        { status: "Completed" },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        fetchProjectById();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  function TaskTable() {
    const colors = [
      "#f39c12",
      "#e74c3c",
      "#8e44ad",
      "#3498db",
      "#16a085",
      "#d35400",
    ];

    return (
      <table className="task-table">
        <thead>
          <tr>
            <th>TASKS</th>
            <th>OWNER</th>
            <th>PRIORITY</th>
            <th>DUE ON</th>
            <th>STATUS</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasksList && tasksList.length > 0 ? (
            <>
              {tasksList.map((task, index) => {
                const priority = getPriority(task);
                return (
                  <tr key={task._id}>
                    <td>{task.name}</td>
                    <td>
                      {task.owners && task.owners.length > 0 ? (
                        <div className="owners-container">
                          {task.owners.map((owner, inx) => {
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
                                title={owner.name}>
                                {initials}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="no-owner">No Owner Found</span>
                      )}
                    </td>
                    <td>
                      <span className={`priority-badge ${priority.className}`}>
                        <Flag /> {priority.label}
                      </span>
                    </td>
                    <td className="due-date">
                      {getDueDate(task.createdAt, task.timeToComplete)}
                    </td>
                    <td>
                      <p
                        className="status-badge"
                        style={statusColor[task.status]}>
                        {task.status}
                      </p>
                    </td>
                    <td className="text-center">
                      <Link to={`/task-details/${task?._id}`}>
                        <ArrowRightToLine />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <tr>
              <td colSpan={6} className="no-task">
                No Task Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  return (
    <div className="main-container">
      <div>
        <Sidebar />
      </div>
      {loading && <Spinner />}
      {addProject && <AddProject />}
      <div className="right-container">
        <Link className="backarrow-container" to="/projects">
          <span className="back-icon">
            <CircleArrowLeft />
          </span>
          <span className="back-text">Back To Projects</span>
        </Link>
        {projectDetails ? (
          <div className="project-header">
            <div className="d-flex justify-content-between">
              <h2 className="project-title">{projectDetails.name}</h2>
              <button
                disabled={projectDetails?.status === "Completed"}
                type="button"
                onClick={handleProjectComplete}
                className={`complete-btn ${
                  projectDetails?.status === "Completed" ? "disabled" : ""
                }`}>
                {projectDetails?.status === "Completed"
                  ? "Completed"
                  : "Mark as Complete"}
              </button>
            </div>
            
            <p className="project-description">{projectDetails.description}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className="task-status"
                style={statusColor[projectDetails?.status]}>
                {projectDetails?.status || "N/A"}
              </span>
            </p>
          </div>
        ) : (
          <Spinner />
        )}

        <div className="dashboard-title">
          <div className="dashboard-title-group">
            <div className="sort-options">
              <label>
                SORT BY <SlidersHorizontal size={20} />
              </label>
              <input
                onChange={sortHandler}
                type="radio"
                id="low-high"
                name="sort"
                value="low-high"
              />
              <label htmlFor="low-high">Priority Low → High</label>

              <input
                onChange={sortHandler}
                type="radio"
                id="high-low"
                name="sort"
                value="high-low"
              />
              <label htmlFor="high-low">Priority High → Low</label>

              <input
                onChange={sortHandler}
                type="radio"
                id="newest"
                name="sort"
                value="newest"
              />
              <label htmlFor="newest">Newest First</label>

              <input
                onChange={sortHandler}
                type="radio"
                id="oldest"
                name="sort"
                value="oldest"
              />
              <label htmlFor="oldest">Oldest First</label>
            </div>
          </div>

          <button type="button" onClick={() => setAddProject(true)}>
            <Plus size={18} />
            New Project
          </button>
        </div>

        <div>{TaskTable()}</div>
      </div>
    </div>
  );
};

export default ProjectDetails;

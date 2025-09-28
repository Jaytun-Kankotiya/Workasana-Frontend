import { useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import Sidebar from "../Sidebar";
import { useTask } from "../../../context/TaskContext";
import AddTask from "./AddTask";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CircleArrowLeft } from "lucide-react";
import "../Tasks/Tasks.css";

const TaskDetails = () => {
  const {
    backendUrl,
    addTask,
    loading,
    setLoading,
    getDueDate,
    statusColor,
    colors,
  } = useTask();
  const [taskDetails, setTaskDetails] = useState(null);
  const [status, setStatus] = useState("");

  const { id } = useParams();
  //   const dueDate = getDueDate(task.createdAt, task.timeToComplete);

  const fetchTasksById = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(backendUrl + `/v1/tasks/${id}`);
      if (!data.success) {
        toast.error(data.message);
      } else {
        setTaskDetails(data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const getdaysRemaining = (createdAt, timeToComplete) => {
    if (!createdAt || !timeToComplete) return 0;

    const createdDate = new Date(createdAt);
    const dueDate = new Date(
      createdDate.getTime() + timeToComplete * 24 * 60 * 60 * 1000
    );

    const diffMs = dueDate - Date.now();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  };

  const handleMarkComplete = async () => {
    setLoading(true);
    try {
      const { data } = await axios.patch(
        backendUrl + `/v1/tasks/${id}`,
        { status: "Completed" },
        { withCredentials: true }
      );

      if (!data.success) {
        toast.error(data.message);
      } else {
        fetchTasksById();
        toast.success("Task Mark As Completed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasksById();
  }, []);

  console.log(taskDetails);

  return (
    <div className="main-container">
      <div>
        <Sidebar />
      </div>
      {loading && <Spinner />}
      {addTask && <AddTask />}
      <div className="right-container">
        <Link className="backarrow-container" to="/tasks">
          <span className="back-icon">
            <CircleArrowLeft />
          </span>
          <span className="back-text">Back To Tasks</span>
        </Link>

        <div className="task-title-header">
          <div className="task-title-group">
            <h2 className="task-name">Task Details</h2>

            <div className="task-meta">
              <div className="meta-item">
                <strong>Status:</strong> <span className="task-status" style={statusColor[taskDetails?.status]}>{taskDetails?.status || "N/A"}</span>
              </div>
              <div className="meta-item">
                <strong>Time Remaining:</strong>{" "}
                {taskDetails
                  ? `${getdaysRemaining(
                      taskDetails.createdAt,
                      taskDetails.timeToComplete
                    )} Days`
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>

        <div className="taskDetails-header">
          {taskDetails && taskDetails ? (
            <div className="">
              <div className="task-complete-container">
                <h3 className="task-title">Task: {taskDetails.name}</h3>
                <button
                  disabled={taskDetails?.status === "Completed"}
                  type="button"
                  onClick={handleMarkComplete}
                  className={`complete-btn ${
                    taskDetails?.status === "Completed" ? "disabled" : ""
                  }`}>
                  {taskDetails?.status === "Completed"
                    ? "Completed"
                    : "Mark as Complete"}
                </button>
              </div>

              <div className="task-info">
                <div className="info-item">
                  <strong>Project:</strong> {taskDetails.project?.name || "N/A"}
                </div>

                <div className="info-item">
                  <strong>Tags:</strong>{" "}
                  {taskDetails.tags?.length
                    ? taskDetails.tags.join(", ")
                    : "No tags"}
                </div>

                <div className="info-item">
                  <strong>Team:</strong> {taskDetails.team?.name || "N/A"}
                </div>

                <div className="info-item">
                  <strong>Status:</strong> <span className="task-status" style={statusColor[taskDetails?.status]}>{taskDetails.status}</span>
                </div>
              </div>

              <div className="team-owner">
                <div className="owners-section">
                  <strong>Owners:</strong>
                  <div className="owners-container">
                    {taskDetails?.owners && taskDetails.owners.length > 0 ? (
                      taskDetails?.owners?.map((owner, inx) => {
                        const initials = owner?.name
                          ? owner.name
                              .split(" ")
                              .map((n) => n[0].toUpperCase())
                              .join("")
                          : "";
                        const bgColor = colors[inx % colors.length];

                        return (
                          <div
                            className="owner-item"
                            title={taskDetails?.owner?.name}>
                            <div
                              key={inx}
                              className="owner-avatar"
                              style={{ backgroundColor: bgColor }}>
                              {initials}
                            </div>
                            <span className="owner-name">{owner?.name}</span>
                          </div>
                        );
                      })
                    ) : (
                      <span>No Owners</span>
                    )}
                  </div>
                </div>

                <div className="owners-section">
                  <strong>Team Members:</strong>
                  <div className="owners-container">
                    {taskDetails?.team &&
                    taskDetails.team.members.length > 0 ? (
                      taskDetails?.team?.members?.map((member, inx) => {
                        const memberName =
                          typeof member === "string"
                            ? member
                            : member?.name || "";

                        const parts = memberName
                          .trim()
                          .split(" ")
                          .filter(Boolean);
                        const initials = parts
                          .map((n) => n[0].toUpperCase())
                          .join("");
                        const bgColor = colors[inx % colors.length];

                        return (
                          <div className="owner-item" title={member?.name}>
                            <div
                              key={inx}
                              className="owner-avatar"
                              style={{ backgroundColor: bgColor }}>
                              {initials}
                            </div>
                            <span className="owner-name">{member}</span>
                          </div>
                        );
                      })
                    ) : (
                      <span>No Owners</span>
                    )}
                  </div>
                </div>
              </div>
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

export default TaskDetails;

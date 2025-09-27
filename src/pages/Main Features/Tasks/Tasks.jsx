import Sidebar from "../Sidebar";
import Spinner from "../../../components/Spinner";
import AddTask from "./AddTask";
import "../../Main Features/Main.css";
import { useTask } from "../../../context/TaskContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Tasks = () => {
  const {
    addTask,
    setAddTask,
    fetchTasks,
    loading,
    colors,
    statusColor,
    getDueDate,
    filteredTask,
    filterTask,
    setFilterTask,
  } = useTask();

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="main-container">
      <div>
        <Sidebar />
      </div>
      {loading && <Spinner />}
      {addTask && <AddTask />}
      <div className="right-container">
        <div className="dashboard-title">
          <div className="dashboard-title-group">
            <h2>Tasks</h2>
            <select onChange={(e) => setFilterTask(e.target.value)}>
              <option value="" defaultChecked>
                Filter
              </option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
          <button type="button" onClick={() => setAddTask(true)}>
            <Plus size={18} />
            New Task
          </button>
        </div>

        <div>
          {filteredTask && filteredTask.length > 0 ? (
            <div className="project-container">
              {filteredTask.map((task, index) => {
                const dueDate = getDueDate(task.createdAt, task.timeToComplete);
                return (
                  <Link
                    key={index}
                    className="task-card"
                    to={`/task-details/${task._id}`}>
                    <p className="task-status" style={statusColor[task.status]}>
                      {task.status}
                    </p>
                    <h4>{task.name}</h4>
                    <p className="due-date">Due on: {dueDate}</p>
                    <div className="owners-container">
                      {task.owners && task.owners.length > 0 ? (
                        task.owners.map((owner, inx) => {
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
                  </Link>
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

export default Tasks;

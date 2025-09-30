import Sidebar from "./Sidebar";
import "../Main Features/Main.css";
import { Chart as ChartJS, Legend, plugins } from "chart.js/auto";
import { data } from "react-router-dom";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { BarChart } from "lucide-react";
import { useTask } from "../../context/TaskContext";
import { useEffect } from "react";
import Spinner from "../../components/Spinner";

const Report = () => {
  const {
    fetchProjects,
    projects,
    setProjects,
    fetchTasks,
    tasks,
    setTasks,
    loading,
    setLoading,
  } = useTask();

  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, []);

  const completedTask = tasks.filter((task) => task.status === "Completed");
  const remainingTask = tasks.filter((task) => task.status !== "Completed");
  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  );
  const remainingProjects = projects.filter(
    (project) => project.status !== "Completed"
  );

  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  const completedTasksLastWeek = tasks.filter((task) => {
    if (task.status !== "Completed") return false;
    if (!task.updatedAt) return false;
    const updatedDate = new Date(task.updatedAt);
    return updatedDate >= sevenDaysAgo && updatedDate <= now;
  });

  const completedProjectsLastWeek = projects.filter((project) => {
    if (project.status !== "Completed") return false;
    if (!project.updatedAt) return false;
    const updatedDate = new Date(project.updatedAt || project.createdAt);
    return updatedDate >= sevenDaysAgo && updatedDate <= now;
  });


  const workDoneLastWeekChart = {
    labels: ["Tasks", "Projects"],
    datasets: [
      {
        label: "Total Work Done Last week",
        data: [completedTasksLastWeek.length, completedProjectsLastWeek.length],
        backgroundColor: ["#00C49F", "#FFBB28"],
      },
    ],
  };

  const workPending = {
    labels: ["Tasks", "Projects"],
    datasets: [
      {
        label: "Total Days of Work Pending",
        data: [remainingTask.length, remainingProjects.length],
        backgroundColor: ["#0088FE", "#00C49F"],
      },
    ],
  };

  const taskClosed = {
    labels: ["Tasks Closed", "Tasks Pending"],
    datasets: [
      {
        label: "Tasks Closed by Team",
        data: [completedTask.length, completedProjects.length],
        backgroundColor: ["#FF8042", "#AA66CC"],
      },
    ],
  };

  const pieOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: { legend: { position: "bottom" } },
  };

  return (
    <div className="main-container">
      <div>
        <Sidebar />
        {loading && <Spinner />}
      </div>
      <div className="right-container">
        <div className="report-title">
          {/* <div className="report-title"> */}
          <p>Report Overview</p>
          {/* </div> */}
        </div>

        <div className="report-container">
          <div className="chart-container">
            <p>Total Work Done Last Week</p>
            <div
              className="chart-heading"
              style={{ width: "100%", height: "250px" }}>
              <h5>Pie Chart</h5>
              <Pie data={workDoneLastWeekChart} />
            </div>
          </div>

          <div className="chart-container">
            <p>Total Days of Work Pending</p>
            <div className="chart-heading">
              <h5>Bar Chart</h5>
              <Bar data={workPending} />
            </div>
          </div>

          <div className="chart-container">
            <p>Tasks Closed by Team</p>
            <div className="chart-heading">
              <h5>Doughnut Chart</h5>
              <Doughnut data={taskClosed} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;

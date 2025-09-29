import Sidebar from "./Sidebar";
import "../Main Features/Main.css";
import { Chart as ChartJS, Legend, plugins } from "chart.js/auto";
import { data } from "react-router-dom";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { BarChart } from "lucide-react";

const Report = () => {
  const workDoneLastWeekChart = {
    labels: ["Tasks", "Projects"],
    datasets: [
      {
        label: "Total Work Done Last week",
        data: [20, 10],
        backgroundColor: ["#00C49F", "#FFBB28"],
      },
    ],
  };

  const workPending = {
    labels: ["Tasks", "Projects"],
    datasets: [
      {
        label: "Total Days of Work Pending",
        data: [5, 10],
        backgroundColor: ["#0088FE", "#00C49F"],
      },
    ],
  };

  const taskClosed = {
    labels: ["Tasks Closed", "Tasks Pending"],
    datasets: [
      {
        label: "Tasks Closed by Team",
        data: [3, 8],
        backgroundColor: ["#FF8042", "#AA66CC"],
      },
    ],
  };

  const pieOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {legend: {position: "bottom"}}
  }
  return (
    <div className="main-container">
      <div>
        <Sidebar />
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
            <div className="chart-heading" style={{ width: "100%", height: "250px" }}>
              <h5>Pie Chart</h5>
              <Pie data={workDoneLastWeekChart} />
            </div>
          </div>

          <div className="chart-container">
            <p>Total Days of Work Pending</p>
            <div className="chart-heading">
              <h5>Bar Chart</h5>
              <Bar data={workPending} height={200} />
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

import Sidebar from "./Sidebar";
import "../Main Features/Main.css";

const Report = () => {
      return (
    <div className="main-container">
      <div>
        <Sidebar />
      </div>
      <div className="right-container">
        <div className="d-flex">
          <input type="text" placeholder="Search" />
        </div>
      </div>
    </div>
  );
}


export default Report
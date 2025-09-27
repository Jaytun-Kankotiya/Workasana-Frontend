import { X } from "lucide-react";
import { useTask } from "../../../context/TaskContext";
import "../Projects/Project.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { color } from "chart.js/helpers";

const AddProject = () => {
  const { addProject, setAddProject, backendUrl, fetchProjects } = useTask();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const statusList = ["To Do", "In Progress", "Blocked"];

  const createHandler = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/v1/projects",
        { name, description, status },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        await fetchProjects();
        setAddProject(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h4>Create New Project</h4>
          <button className="close-btn" onClick={() => setAddProject(false)}>
            <X size={26} />
          </button>
        </div>

        <hr />

        <div className="form-group">
          <label>Project Name</label>
          <input
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Project Name"
          />
        </div>

        <div className="form-group">
          <label>Select Status</label>
          <select onChange={(e) => setStatus(e.target.value)}>
            <option value="" defaultChecked>
              Select Status
            </option>
            {statusList &&
              statusList.map((status) => (
                <option value={status}>{status}</option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label>Project Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
            rows={3}
            cols={20}
            placeholder="Enter Project Description"></textarea>
        </div>
        <hr />

        <div className="modal-footer">
          <button
            type="button"
            onClick={() => setAddProject(false)}
            className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={createHandler} className="btn btn-primary">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProject;

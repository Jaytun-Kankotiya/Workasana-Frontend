import { X } from "lucide-react";
import { useTask } from "../../../context/TaskContext";
import "../Projects/Project.css";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { callback } from "chart.js/helpers";
import { toast } from "react-toastify";

const AddTask = () => {
  const {
    backendUrl,
    addTask,
    setAddTask,
    fetchProjects,
    projects,
    tasks,
    setTasks,
    fetchTasks,
    fetchTeams,
    teams,
    setTeams,
    loading,
    setLoading,
    owners,
    setOwners,
    fetchUsers,
  } = useTask();
  const [name, setName] = useState("");
  const [project, setProject] = useState("");
  const [team, setTeam] = useState("");
  const [selectedOwners, setSelectedOwners] = useState([]);
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState("");
  const [timeToComplete, setTimeToComplete] = useState("");

  const createTaskHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        backendUrl + "/v1/tasks",
        {
          name,
          project,
          team,
          owners: selectedOwners,
          tags,
          timeToComplete,
          status,
        },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        fetchTasks();
        setAddTask(false);
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
    fetchProjects();
    fetchTeams();
    fetchUsers();
  }, []);

  const statusList = ["To Do", "In Progress", "Blocked"];

  const options = [
    { value: "Urgent", label: "Urgent" },
    { value: "Bug", label: "Bug" },
    { value: "Update", label: "Update" },
    { value: "Feature", label: "Feature" },
    { value: "Improvement", label: "Improvement" },
  ];

  const tagLoadOptions = (inputalue, callback) => {
    setTimeout(() => {
      const filtered = options.filter((tag) =>
        tag.label.includes(inputalue.toLowerCase())
      );
      callback(filtered);
    }, 2000);
  };
  const tagChangeHandler = (selected) => {
    setTags(selected ? selected.map((opt) => opt.value) : []);
  };

  const ownerLoadOptions = (inputValue, callback) => {
    const filtered = owners
      .filter((owner) =>
        owner.name.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((owner) => ({ value: owner.name, label: owner.name }));

    callback(filtered);
  };

  const ownerChangeHandler = (selected) => {
    setSelectedOwners(selected ? selected.map((o) => o.value) : []);
  };


  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h4>Create New Task</h4>
          <button className="close-btn" onClick={() => setAddTask(false)}>
            <X size={26} />
          </button>
        </div>
        <hr />

        <div className="form-group">
          <label>Task Name</label>
          <input
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Project Name"
          />
        </div>

        <div className="form-group">
          <label>Select Project</label>
          <select onChange={(e) => setProject(e.target.value)}>
            <option value="" defaultChecked>
              Select Project
            </option>
            {projects &&
              projects.map((project) => (
                <option value={project.name}>{project.name}</option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label>Select Team</label>
          <select
            onChange={(e) => setTeam(e.target.value)}
            value={team}
            required>
            <option value="" defaultChecked>
              Select Team
            </option>
            {teams &&
              teams.map((team) => (
                <option value={team.name}>{team.name}</option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label>Select Owner</label>
          <AsyncSelect
            cacheOptions
            defaultOptions={owners.map((o) => ({
              value: o.name,
              label: o.name,
            }))}
            onChange={ownerChangeHandler}
            loadOptions={ownerLoadOptions}
            value={owners
              .filter((o) => selectedOwners.includes(o.name))
              .map((o) => ({ value: o.name, label: o.name }))}
            isMulti
            placeholder="Choose owners"
          />
        </div>

        <div className="form-group">
          <label>Select Tags</label>
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={tagLoadOptions}
            isMulti
            onChange={tagChangeHandler}
            placeholder="Choose tags..."
          />
        </div>

        <div className="select-group">
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
            <label>Estimated Time to finish</label>
            <input
              type="number"
              value={timeToComplete}
              placeholder="Enter Time In Days"
              onChange={(e) => setTimeToComplete(e.target.value)}
            />
          </div>
        </div>

        <hr />
        <div className="modal-footer">
          <button
            type="button"
            onClick={() => setAddTask(false)}
            className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={createTaskHandler} className="btn btn-primary">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddTask;

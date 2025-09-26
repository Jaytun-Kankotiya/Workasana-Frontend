import { useEffect, useState } from "react";
import "../Projects/Project.css";
import { X, Plus } from "lucide-react";
import { useTask } from "../../../context/TaskContext";
import axios from "axios";
import { toast } from "react-toastify";

const AddTeam = ({teamData = null, isEdit = false, fetchTeamDetails = () => {}}) => {
  const { backendUrl, loading, setLoading, fetchTeams, addTeam, setAddTeam, fetchTeamById, teamDetails, } =
    useTask();

  const [name, setName] = useState("");
  const [members, SetMembers] = useState(["", ""]);

  useEffect(() => {
    if(isEdit && teamData) {
      setName(teamData.name || "")
      SetMembers(teamData.members && teamData.members.length > 0 ? teamData.members : ["", ""])
    }
  }, [isEdit, teamData])


  const handleChange = (index, value) => {
    const updated = [...members];
    updated[index] = value;
    SetMembers(updated);
  };

  const removeMemberField = (index) => {
    const updated = members.filter((_, i) => i !== index);
    SetMembers(updated);
  };

  const addMemberField = () => {
    SetMembers([...members, ""]);
  };

  const submitHandler = async () => {
    setLoading(true)
    const cleanMembers = members.filter((m) => m.trim() !== "");
    try {
      if(isEdit && teamData?._id){
        const {data } = await axios.patch(backendUrl + `/v1/teams/${teamData._id}`, {name, members: cleanMembers}, {withCredentials: true})
        if(data?.success){
          toast.success(data.message)
          fetchTeams()
          if(typeof fetchTeamDetails === "function"){
            await fetchTeamDetails(teamData._id)
          }
          setAddTeam(false)
        }else{
          toast.error(data.message)
        }
      }else{
        const { data } = await axios.post(backendUrl + "/v1/teams", { name, members: cleanMembers }, { withCredentials: true });
      if (data.success) {
        toast.success(data.message);
        fetchTeams();
        setAddTeam(false);
      } else {
        toast.error(data.error);
      }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }finally{
      setLoading(false)
    }
  }

  console.log(members);

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h4>{isEdit ? "Update Team" : "Create New Team"}</h4>
          <button className="close-btn" onClick={() => setAddTeam(false)}>
            <X size={26} />
          </button>
        </div>
        <hr />

        <div className="form-group">
          <label>Team Name</label>
          <input
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Team Name"
          />
        </div>

        <div className="form-group">
          <label>Add Members</label>
          {members.map((member, index) => (
            <div key={index} className="member-row">
              <input
                value={member}
                key={index}
                required={index < 2}
                onChange={(e) => handleChange(index, e.target.value)}
                type="text"
                placeholder={`Member ${index + 1}`}
              />
              {members.length > 1 && (
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeMemberField(index)}>
                  <X size={18} />
                </button>
              )}
            </div>
          ))}
        </div>

          <button type="button" className="add-btn" onClick={addMemberField}>
            <Plus size={20} /> Add Member
          </button>
        <hr />
        
        <div className="modal-footer">
          <button
            type="button"
            onClick={() => setAddTeam(false)}
            className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={submitHandler} className="btn btn-primary">
            {isEdit ? "Update Team" : "Create Team"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTeam;

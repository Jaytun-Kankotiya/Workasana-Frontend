import Sidebar from "../Sidebar";
import Spinner from "../../../components/Spinner";
import { useTask } from "../../../context/TaskContext";
import { Link, useParams } from "react-router-dom";
import { CircleArrowLeft, Plus } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddTeam from "./AddTeam";

const TeamDetails = () => {
  const { backendUrl, loading, setLoading, setAddTeam, addTeam } = useTask();
  const [teamDetails, setTeamDetails] = useState(null);

  const { id } = useParams();

  const fetchTeamById = async (teamId = id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(backendUrl + `/v1/teams/${teamId}`);
      if (data.success) {
        setTeamDetails(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamById();
  }, []);

  console.log(teamDetails);

  const colors = [
    "#f39c12",
    "#e74c3c",
    "#8e44ad",
    "#3498db",
    "#16a085",
    "#d35400",
  ];

  return (
    <div className="main-container">
      <div>
        <Sidebar />
      </div>
      {loading && <Spinner />}
      {addTeam && (
        <AddTeam
          teamData={teamDetails}
          isEdit={true}
          fetchTeamDetails={fetchTeamById}
        />
      )}
      <div className="right-container">
        <Link className="backarrow-container" to="/teams">
          <span className="back-icon">
            <CircleArrowLeft />
          </span>
          <span className="back-text">Back To Teams</span>
        </Link>
        {teamDetails ? (
          <>
            <div
              className="project-header"
              style={{ boxShadow: "2px 4px 12px rgba(0.8,0,0,0.08)" }}>
              <div className="dashboard-title">
                <div>
                  <h3 className="team-label">Team</h3>
                  <h2 className="team-name">{teamDetails.name}</h2>
                </div>
                <button type="button" onClick={() => setAddTeam(true)}>
                  <Plus size={18} />
                  Add Member
                </button>
              </div>

              <h3 className="team-label mt-5">Members</h3>
              {teamDetails.members && teamDetails.members.length > 0 ? (
                <div className="members-list">
                  {teamDetails?.members.map((member, index) => {
                    const memberName =
                      typeof member === "string" ? member : member?.name || "";

                    const parts = memberName.trim().split(" ").filter(Boolean);
                    const initials = parts
                      .map((n) => n[0].toUpperCase())
                      .join("");
                    const bgColor = colors[index % colors.length];
                    return (
                      <div key={index} className="member-item" title={member}>
                        <div
                          className="owner-avtar"
                          style={{ backgroundColor: bgColor }}>
                          {initials}
                        </div>
                        <span className="member-name">{member}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p>No Member Found</p>
              )}
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default TeamDetails;

import Sidebar from "../Sidebar";
import "../../Main Features/Main.css";
import { useTask } from "../../../context/TaskContext";
import Spinner from "../../../components/Spinner";
import AddTeam from "./AddTeam";
import { useEffect } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Teams = () => {
  const { backendUrl, loading, setLoading, fetchTeams, addTeam, setAddTeam, teams, setTeams } =
    useTask();

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="main-container">
      <div>
        <Sidebar />
        {loading && <Spinner />}
        {addTeam && <AddTeam />}
      </div>
      <div className="right-container">

        <div className="dashboard-title">
          <div className="dashboard-title-group">
            <h2>Teams</h2>
          </div>
          <button type="button" onClick={() => setAddTeam(true)}>
            <Plus size={18} />
            New Team
          </button>
        </div>

        <div>
          {teams && teams.length > 0 ? (
            <div className="project-container">
              {teams.map((team, index) => {
                return (
                  <Link key={index} className="task-card" to={team?._id ? `/team-details/${team._id}` : "#"}>
                    <h4>{team.name}</h4>
                    <div className="owners-container">
                      {team.members && team.members.length > 0 ? (
                        team.members.map((member, inx) => {
                          const colors = [
                            "#f39c12",
                            "#e74c3c",
                            "#8e44ad",
                            "#3498db",
                            "#16a085",
                            "#d35400",
                          ];
                          const safeMember = typeof member === "string" ? member.trim() : ""
                          const initials = safeMember ? 
                            safeMember.split(" ")
                            .map((n) => n[0].toUpperCase())
                            .join("") : "?"
                          const bgColor = colors[inx % colors.length];

                          return (
                            <div
                              key={inx}
                              className="owner-avtar"
                              style={{ backgroundColor: bgColor }}
                              title={member}>
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
              <p className="no-tasks">No Members Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Teams;

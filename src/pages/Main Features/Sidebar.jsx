import { NavLink } from "react-router-dom"
import { LayoutDashboard, Blocks, Users, BarChart2, Settings } from "lucide-react"


const Sidebar = () => {

    return(
        <>
        <aside className="sidebar">
            <h2><NavLink className="sidebar-title" to="/dashboard">Workasana</NavLink></h2>
            <ul className="sidebar-list mt-4">
                <li><NavLink to="/dashboard" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}><LayoutDashboard size={18} />Dashboard</NavLink></li>
                <li><NavLink to="/projects" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}><Blocks size={18}/>Project</NavLink></li>
                <li><NavLink to="/teams" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}><Users size={18}/>Team</NavLink></li>
                <li><NavLink to="/report" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}><BarChart2 size={18}/>Reports</NavLink></li>
                <li><NavLink to="/setting" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}><Settings size={18}/>Setting</NavLink></li>
            </ul>
        </aside>
        </>
    )
}


export default Sidebar
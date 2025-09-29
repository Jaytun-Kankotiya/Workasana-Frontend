import { Link } from "react-router-dom"
import Login from "../pages/Login && SignUp/Login/Login"


const Navbar = () => {


    return (
        <div className="navbar">
            <h2 className="ms-5"><Link to='/login'>Workasana</Link></h2>
        </div>
    )
}

export default Navbar
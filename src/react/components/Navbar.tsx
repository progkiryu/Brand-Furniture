import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div id="navBar-container">
            <h1>Brand.</h1>
            <Link to="/Dashboard">Dashboard</Link>
            <Link to="/Schedule">Schedule</Link>
            <Link to="/Analytics">Analytics</Link>
            <Link to="/Help">Help</Link>  
        </div>
    )
}

export default Navbar;
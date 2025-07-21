import { NavLink } from "react-router-dom";
import logo from "../media/Brand+Furniture+Logo_Web.png"; 

function Navbar() {
  return (
    <div id="navBar-container">
      {/* <h1>Brand.</h1> */}
      <NavLink to="/"><div className="logo-container"><img src={logo}></img></div></NavLink>
      <NavLink to="/Dashboard">Dashboard</NavLink>
      <NavLink to="/Schedule">Schedule</NavLink>
      <NavLink to="/Analytics">Analytics</NavLink>
      <NavLink to="/Help">Help</NavLink>
    </div>
  );
}

export default Navbar;

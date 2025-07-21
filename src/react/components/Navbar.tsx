import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div id="navBar-container">
      <h1>Brand.</h1>
      <NavLink to="/Dashboard">Dashboard</NavLink>
      <NavLink to="/Schedule">Schedule</NavLink>
      <NavLink to="/Analytics">Analytics</NavLink>
      <NavLink to="/Help">Help</NavLink>
    </div>
  );
}

export default Navbar;

import { NavLink } from "react-router-dom";
import logo from "../media/Brand+Furniture+Logo_Web.png";

function Navbar() {
  const handleLinkClick = () => {
    if (window.electron) {
      window.electron.openExternalLink("https://www.brandfurniture.com.au");
    }
  };

  return (
    <div id="navBar-container">
      {/* <h1>Brand.</h1> */}
      <div className="logo-container" onClick={handleLinkClick}>
        <img src={logo}></img>
      </div>
      <NavLink to="/Dashboard">Dashboard</NavLink>
      <NavLink to="/Schedule">Schedule</NavLink>
      <NavLink to="/Analytics">Analytics</NavLink>
    </div>
  );
}

export default Navbar;

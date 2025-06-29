import { useState } from 'react';
import logo from '/Users/namtruong/Desktop/Projects/Electron-Practice/src/assets/dashboard-page/Brand+Furniture+Logo_Web.png';
import {NavLink} from 'react-router-dom'
import { Burger } from '@mantine/core';

function NavBar() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={`dbp-left-container ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="dbp-navbar-container">
        <button onClick={() => setExpanded(!expanded)} className="navbar-toggle">
            {expanded ? '<' : '>' }
        </button>
        <NavLink to='/'>
            {expanded && (<NavLink to="/"><img src={logo}/></NavLink>)}
        </NavLink>
        <ul className="dbp-navbar">
          <NavLink to='/dashboard'><li>{expanded ? 'Dashboard' : 'D'}</li></NavLink>
          <NavLink to='/schedule'><li>{expanded ? 'Schedule' : 'S'}</li></NavLink>
          <NavLink to='/analytics'><li>{expanded ? 'Analytics' : 'A'}</li></NavLink>
          <NavLink to='/settings'><li>{expanded ? 'Settings' : 'S'}</li></NavLink>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;

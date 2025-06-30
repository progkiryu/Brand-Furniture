import { useState } from 'react';
import {NavLink} from 'react-router-dom'
//import { Burger } from '@mantine/core';

function NavBar() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={`dbp-left-container ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="dbp-navbar-container">
        <button onClick={() => setExpanded(!expanded)} className="navbar-toggle">
            {expanded ? '<' : '>' }
        </button>
        <NavLink to='/'>
            {expanded && (<NavLink to="/"></NavLink>)}
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

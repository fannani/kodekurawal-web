import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <nav className="col-3" id="sidebar">
    <ul className="list-unstyled components">
      <li>
        <Link to="/">Dashboard</Link>
        <Link to="/course">Course</Link>
        <Link to="/achievement">Achievements</Link>
        <Link to="/">Friends</Link>
        <Link to="/">Settings</Link>
      </li>
    </ul>
  </nav>
);
export default Sidebar;

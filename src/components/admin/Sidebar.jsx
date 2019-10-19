import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => (
  <nav className="col-3" id="sidebar">
    <ul className="list-unstyled components">
      <li>
        <Link to="/admin/course">Course</Link>
        <Link to="/admin/achievement">Achivement</Link>
        <Link to="/admin/testcase">Test Case</Link>
        <Link to="/admin/game-settings">Game Settings</Link>
        <Link to="/admin/avatar">Avatar</Link>
        <Link to="/admin/log">Log</Link>
      </li>
    </ul>
  </nav>
);

export default AdminSidebar;

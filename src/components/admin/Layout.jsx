import React from 'react';

import { RouteAdmin } from '../../config/route';
import Header from './Header';
import useAdmin from '../../hooks/admin';

const Layout = () => {
  const admin = useAdmin();
  const onLogout = () => {
    admin.logout();
  };
  return (
    <>
      <Header logout={onLogout} user={admin.user} />
      <RouteAdmin />
    </>
  );
};

export default Layout;

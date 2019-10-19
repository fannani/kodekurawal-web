import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAdmin from '../../hooks/admin';
import LoadingScreen from '../UI/LoadingScreen';
import AdminSidebar from './Sidebar';

const Protect = ({ location, children }) => {
  const admin = useAdmin();
  if (admin.isLogin) {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <AdminSidebar />
            <main className="col-9 ">
              <Suspense fallback={<LoadingScreen />}>
                <Switch>{children}</Switch>
              </Suspense>
            </main>
          </div>
        </div>
      </>
    );
  }
  return (
    <Redirect
      to={{
        pathname: '/admin/login',
        state: { from: location },
      }}
    />
  );
};

Protect.propTypes = {
  location: PropTypes.any,
};
Protect.defaultProps = {
  location: null,
};

export default Protect;

import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import usePlayer from '../../hooks/player';
import LoadingScreen from '../UI/LoadingScreen';
import AdminSidebar from './Sidebar';

const Protect = ({ location, children }) => {
  const player = usePlayer();
  if (player.isAdmin) {
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

import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import usePlayer from '../../hooks/player';
import LoadingScreen from '../UI/LoadingScreen';

const Protect = ({ location, children }) => {
  const player = usePlayer();

  if (player.isLogin) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Switch>{children}</Switch>
      </Suspense>
    );
  }
  return (
    <Redirect
      to={{
        pathname: '/login',
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

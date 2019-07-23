import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Logo = ({ className, mode }) => (
  <h1 className={classnames(className)}>
    <span className={mode === 'dark' ? 'dark' : 'light'}>
      {'{'}Kode<span className="kurawal">Kurawal</span>
      {'}'}
    </span>
  </h1>
);

Logo.propTypes = {
  className: PropTypes.any.isRequired,
  mode: PropTypes.string,
};

const styledLogo = styled(Logo)`
  font-family: open sans;

  .light {
    font-weight: bold;
    font-size: 1.3rem;
    color: #242223;
  }
  .dark {
    font-weight: bold;
    font-size: 1.3rem;
    color: #ffffff;
  }

  .kurawal {
    color: #4891e3;
  }
`;

export default styledLogo;

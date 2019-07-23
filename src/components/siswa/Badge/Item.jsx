import React from 'react';
import styled from 'styled-components';
import { BASE_URL } from '../../../config/config';
import classnames from 'classnames';

const SiswaBadgeItem = ({ className, badge }) => {
  return (
    <div className={classnames(className, 'd-flex flex-wrap badgeitem')}>
      <div className="wrapper">
        <div
          className="circle"
          style={{
            backgroundImage: ``,
          }}
        />
      </div>

      <h4>{badge.title}</h4>
    </div>
  );
};

const StyledBadgeItem = styled(SiswaBadgeItem)`
  .wrapper {
    width: 150px;
  }

  .badgeitem {
    height: 100px;
    margin-top: 50px;
    margin-left: 30px;
  }
  h4 {
    height: 100%;
    display: inline-block;
    line-height: 100px;
  }
  .circle-back {
    background-color: black;
    width: 87px;
    height: 87px;
    position: absolute;
    border-radius: 100px;
    opacity: 0.5;
  }
  .circle {
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    background-position: center;
    background-size: cover;
    width: 100px;
    height: 100px;
    border: 6px solid #dddddd;
    border-radius: 100px;
  }
`;

export default StyledBadgeItem;

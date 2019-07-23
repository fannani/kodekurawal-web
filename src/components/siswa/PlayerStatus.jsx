import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import love from '../../assets/images/love.png';

const Love = styled.img`
  margin-left: 5px;
`;

const Life = ({ value }) => {
  const loveImg = [];
  for (let i = 0; i < value; i++) {
    loveImg.push(<Love width="20px" key={i} src={love} />);
  }

  return <div className="navbar-text">{loveImg}</div>;
};

const PlayerStatus = ({ className, life, score, time }) => (
  <div className={classnames(className)}>
    <Life value={life} />
    <div className="navbar-text">SCORE : {score}</div>
    <div className="navbar-text">{time}</div>
  </div>
);

const StyledPlayerStatus = styled(PlayerStatus)`
  position: absolute;
  width: 100%;
  left: 0;
  text-align: center;

  .navbar-text {
    margin-left: 20px;
    color: rgba(255, 255, 255, 1) !important;
  }
`;

export default StyledPlayerStatus;

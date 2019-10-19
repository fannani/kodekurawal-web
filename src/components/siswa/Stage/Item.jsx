import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import lock from '../../../assets/images/lock.png';
import star from '../../../assets/images/star.png';
import starOff from '../../../assets/images/star-off.png';

const SiswaStageItem = ({
  className,
  stage,
  unlock,
  energy,
  onOutOfEnergy,
}) => {
  const child = (
    <div className="d-flex flex-wrap stageitem ">
      <div className="wrapper">
        <div className=" stars">
          <img
            width="30px"
            alt="star-1"
            src={stage.stars != null && stage.stars[0] ? star : starOff}
            className="star star-left"
          />
          <img
            width="30px"
            alt="star-2"
            src={stage.stars != null && stage.stars[1] ? star : starOff}
            className="star star-middle"
          />
          <img
            width="30px"
            alt="star-3"
            src={stage.stars != null && stage.stars[2] ? star : starOff}
            className="star star-right"
          />
        </div>
        <div
          className="circle"
          style={{
            backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/kodekurawal-ab777.appspot.com/o/${
              stage.imageid
            }?alt=media")`,
          }}
        >
          {!unlock ? (
            <div>
              <div className="circle-back" />{' '}
              <img className="lock" src={lock} alt="" />
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>

      <h4>{stage.title}</h4>
    </div>
  );

  if (!unlock) {
    return <div className={className}>{child}</div>;
  }
  if (energy - 20 < 0) {
    return (
      <a className={className} onClick={onOutOfEnergy}>
        {child}
      </a>
    );
  }
  return (
    <Link className={className} to={`/play/${stage._id}`}>
      {child}
    </Link>
  );
};

const StyledStageItem = styled(SiswaStageItem)`
  .stars {
    width: 90px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 5px;
  }
  .wrapper {
    width: 150px;
  }

  .star-left {
    position: relative;
    top: 5px;
  }
  .star-right {
    position: relative;
    top: 5px;
  }
  .stageitem {
    height: 100px;
    margin-top: 50px;
    margin-left: 30px;
  }
  h4 {
    height: 100%;
    display: inline-block;
    line-height: 140px;
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
  .lock {
    width: 35px;
    margin-left: 25px;

    position: absolute;
    margin-top: 18px;
  }
`;

export default StyledStageItem;

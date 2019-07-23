import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { Line } from 'rc-progress';
import star from '../../../assets/images/star.png';
import starOff from '../../../assets/images/star-off.png';

const SiswaAchievementItem = ({ achievement, className }) => {
  const { target_point, title, point } = achievement;
  return (
    <div className={classnames(className, 'row')}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title row">
            <div className="col-8">{title}</div>
            <div className="col-1">
              <img width="30px" src={achievement.star > 0 ? star : starOff} />
            </div>
            <div className="col-1">
              <img width="30px" src={achievement.star > 1 ? star : starOff} />
            </div>
            <div className="col-1">
              <img width="30px" src={achievement.star > 2 ? star : starOff} />
            </div>
          </h5>
          <p>{achievement.caption}</p>
          <div className="row">
            <div className="col-10">
              <Line
                percent={(point / target_point) * 100}
                strokeWidth="4"
                strokeColor="#7386D5"
              />
            </div>
            <div className="col-2">
              {point}/{target_point}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const StyledAchievementItem = styled(SiswaAchievementItem)`
  .card {
    width: 100%;
    margin-top: 10px;
    border-radius: 10px !important;
    border: 0;
    margin-left: 20px;
  }
  .card-title {
    font-weight: bold;
  }
`;

export default StyledAchievementItem;

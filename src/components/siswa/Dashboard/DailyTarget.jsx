import React from 'react';
import Card from '../../UI/Card';
import { Circle } from 'rc-progress';

const DailyTarget = ({ dailyExp }) => (
  <Card className="card ">
    <div className="card-body">
      <h5 className="card-title">Daily Target</h5>
      <div className="row justify-content-center">
        <div className="col-9">
          <Circle
            percent={(dailyExp / 300) * 100}
            strokeWidth="4"
            strokeColor="#7386D5"
          />
          <p className="xp-caption">
            <span>{dailyExp}/300</span>
            <br />
            XP Diperoleh
          </p>
        </div>
      </div>
    </div>
  </Card>
);

export default DailyTarget;

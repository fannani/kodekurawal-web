import React, { Component } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

const Leaderboard = ({ data, className }) => (
  <div className={classnames('row', className)}>
    <h2 style={{ marginLeft: '30px', fontSize: '20px', marginTop: '24px' }}>
      Leaderboard
    </h2>
    <div className="card" style={{ width: '100%', marginTop: '10px' }}>
      <div className="card-body">
        <ul className="list-group">
          {data[0].player !== null &&
            data.map((leader, index) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={leader._id}
              >
                {index + 1}. {leader.player ? leader.player.user.name : ''}
                <span className="badge badge-primary badge-pill">
                  {leader.score}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  </div>
);
const StyledLeaderboard = styled(Leaderboard)`
  h5 {
  }
  span {
    margin-left: 30px;
  }
  ol {
    padding-inline-start: 15px;
    font-size: 15px;
  }
`;
export default StyledLeaderboard;

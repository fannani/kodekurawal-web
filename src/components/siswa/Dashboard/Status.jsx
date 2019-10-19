import React from 'react';
import { Line } from 'rc-progress';
import Card from '../../UI/Card';
import achievement from '../../../assets/images/achievement.png';
import badge from '../../../assets/images/badges.png';
import star from '../../../assets/images/star-circle.png';
import styled from 'styled-components';
import lock from '../../../assets/images/lock.png';
const Ava = styled.div`
  background-color: white;
  background-position: center;
  background-size: cover;
  width: 100px;
  height: 100px;
  border: 6px solid #dddddd;
  border-radius: 100px;
`;
const Progress = styled.div`
  font-size: 12px;
`;

const Level = styled.div`
  font-size: 12px;
`;

const Status = ({ player, data, onAvaClick }) => (
  <Card className="card" id="status-bar">
    <div className="card-body">
      <div className="row">
        <div className="col-2">
          <Ava id="ava-pict"
            onClick={onAvaClick}
            style={{
              backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/kodekurawal-ab777.appspot.com/o/${
                data.players[0].avatar.imageid
              }?alt=media")`,
            }}
          />
        </div>
        <div className="col-4">
          <h5>{player.user.name}</h5>
          <p>Malang, Jawa Timur</p>
          <Level>Level {player.user.userdetail.level} : </Level>
          <div className="row" id="exp-bar">
            <div className="col-5" style={{ paddingRight: '0px' }}>
              <Line
                percent={
                  (player.user.userdetail.exp /
                    player.user.userdetail.target_exp) *
                  100
                }
                strokeWidth="4"
                strokeColor="#7386D5"
              />
            </div>
            <Progress className="col-4">
              {player.user.userdetail.exp}/{player.user.userdetail.target_exp}
            </Progress>
          </div>
        </div>
        <div className="col-2" id="achievements">
          <div className="row">
            <div className="col-4">
              <img src={achievement} width={40} alt="" />
            </div>
            <div className="col-8 caption">
              <p>Achievements</p>
              <div className="value">{data.players[0].achievement_total}</div>
            </div>
          </div>
        </div>
        <div className="col-2" id="badges">
          <div className="row">
            <div className="col-4">
              <img src={badge} width={40} alt="" />
            </div>
            <div className="col-8 caption">
              <p>Badges</p>
              <div className="value">{data.players[0].badges.length}</div>
            </div>
          </div>
        </div>
        <div className="col-2" id="stars">
          <div className="row">
            <div className="col-4">
              <img src={star} width={40} alt="" />
            </div>
            <div className="col-8 caption">
              <p>Stars</p>
              <div className="value">
                {player.user.userdetail.stars
                  ? player.user.userdetail.stars
                  : 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

export default Status;

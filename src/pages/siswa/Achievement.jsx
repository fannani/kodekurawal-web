import React from 'react';
import { Query } from 'react-apollo';
import classnames from 'classnames';
import styled from 'styled-components';
import AchievementItem from '../../components/siswa/Achievement/Item';
import { GET_PLAYER_ACHIEVEMENTS } from '../../queries/player';
import BadgeItem from '../../components/siswa/Badge/Item';
import usePlayer from '../../hooks/player';
const Achievement = () => {
  const player = usePlayer();
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <main className="col-12 main-container" style={{ maxWidth: '1100px' }}>
          <Query
            query={GET_PLAYER_ACHIEVEMENTS}
            variables={{ player: player.user.userdetailid }}
          >
            {({ loading, error, data: { players } }) => {
              if (loading) return <div>Loading</div>;
              if (error)
                return <p>Sorry! There was an error loading the items</p>;
              return (
                <div className="row">
                  <div className="col-7">
                    <h2 style={{ marginLeft: '30px', fontSize: '40px' }}>
                      Achievement
                    </h2>

                    <div>
                      {players[0].achievements.map(achiev => (
                        <AchievementItem
                          key={achiev._id}
                          achievement={achiev}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="col-5">
                    <h2 style={{ marginLeft: '30px', fontSize: '40px' }}>
                      Badges
                    </h2>
                    <div className={classnames('row')}>
                      <Card className="card">
                        <div className="card-body">
                          {players[0].badges.map(badge => (
                            <BadgeItem key={badge._id} badge={badge} />
                          ))}
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              );
            }}
          </Query>
        </main>
      </div>
    </div>
  );
};

const Card = styled.div`
  width: 100%;
  margin-top: 10px;
  border-radius: 10px !important;
  border: 0 !important;
  margin-left: 20px;
  height: 400px;
  margin-right: 13px;
`;

export default Achievement;

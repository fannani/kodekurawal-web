import React, { useState } from 'react';
import styled from 'styled-components';
import { Query, withApollo } from 'react-apollo';
import classnames from 'classnames';
import Tour from 'reactour';
import { GET_PLAYER_DATA } from '../../queries/player';
import usePlayer from '../../hooks/player';
import Course from '../../components/siswa/Dashboard/Course';
import DailyTarget from '../../components/siswa/Dashboard/DailyTarget';
import Status from '../../components/siswa/Dashboard/Status';
import lock from '../../assets/images/lock.png';
import ModalAva from '../../components/siswa/Dashboard/ModalAva';

const AvaItem = styled.div`
  background-color: white;
  background-position: center;
  background-size: cover;
  width: 100px;
  height: 100px;
  border: 6px solid #dddddd;
  border-radius: 100px;
  margin: 10px;
`;
const tour = [
  {
    selector: '#status-bar',
    content: 'Selamat datang di halaman Dashboard KodeKurawal',
  },
  {
    selector: '#ava-pict',
    content:
      'Ini adalah foto ava yang bisa kalian ganti, semakin tinggi exp kalian, semakin banyak ava yang bisa dipilih',
  },
  {
    selector: '#exp-bar',
    content: 'Dapatkan point dan naikan level dengan cara menyelesaikan stage',
  },
  {
    selector: '#btn-ambil-course',
    content: 'Tekan tombol tersebut untuk mengambil Course',
  },
];
const Lock = () => (
  <div
    style={{
      position: 'relative',
      left: '-7px',
      top: '-7px',
    }}
  >
    <div
      className="circle-back"
      style={{
        backgroundColor: 'black',
        width: '87px',
        height: '87px',
        position: 'absolute',
        borderRadius: '100px',
        opacity: 0.5,
      }}
    />
    <img
      className="lock"
      style={{
        width: '35px',
        marginLeft: '25px',
        position: 'absolute',
        marginTop: '18px',
      }}
      src={lock}
      alt=""
    />
  </div>
);

const Dashboard = ({ className, client, history }) => {
  const player = usePlayer();
  const [tourOpen, setTourOpen] = useState(
    player.user.userdetail.tutorial[1] === null ||
      player.user.userdetail.tutorial.length === 0
      ? true
      : player.user.userdetail.tutorial[1],
  );
  const [showModal, setShowModal] = useState(false);
  const handleAvaClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAvaChange = ava => {
    if (ava.unlock) {
      player.changeAvatar(ava).then(response => {
        const data = client.readQuery({
          query: GET_PLAYER_DATA,
          variables: { player: player.user.userdetail._id },
        });
        client.writeQuery({
          query: GET_PLAYER_DATA,
          variables: { player: player.user.userdetail._id },
          data: {
            players: [
              {
                ...data.players[0],
                avatar: {
                  ...data.players[0].avatar,
                  imageid: response.avatar.imageid,
                },
              },
            ],
          },
        });
        setShowModal(false);
      });
    }
  };

  return (
    <div className={classnames(className, 'container-fluid')}>
      <Query
        query={GET_PLAYER_DATA}
        variables={{
          player: player.user.userdetail._id,
        }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading</p>;
          if (error) return <p>Terjadi Kesalahan</p>;
          return (
            <>
              <div className="row justify-content-center">
                <main
                  className="col-12 main-container"
                  style={{ maxWidth: '1100px' }}
                >
                  <Status
                    player={player}
                    data={data}
                    onAvaClick={handleAvaClick}
                  />
                  <div className="row " style={{ marginTop: '20px' }}>
                    <div className="col-8">
                      <Course
                        playerid={player.user.userdetailid}
                        onTakeCourse={() => {
                          setTourOpen(false);
                          if (player.user.userdetail.tutorial) {
                            player.setTutorial(false, 1);
                          }
                          history.push('/course');
                        }}
                      />
                    </div>
                    <div className="col-4">
                      <DailyTarget
                        dailyExp={player.user.userdetail.daily_exp}
                      />
                      {/*<Card className="card " style={{ marginTop: '20px' }}>*/}
                      {/*  <div className="card-body">*/}
                      {/*    <h5 className="card-title">Friends</h5>*/}
                      {/*    <div className="row justify-content-center">*/}
                      {/*      <div className="col-9" />*/}
                      {/*    </div>*/}
                      {/*  </div>*/}
                      {/*</Card>*/}
                    </div>
                  </div>
                </main>
              </div>

              <ModalAva
                visible={showModal}
                onClickBackdrop={handleModalClose}
                data={data}
                content={ava => (
                  <AvaItem
                    key={ava._id}
                    className="p-2"
                    onClick={() => {
                      handleAvaChange(ava);
                    }}
                    style={{
                      backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/kodekurawal-ab777.appspot.com/o/${
                        ava.imageid
                      }?alt=media")`,
                    }}
                  >
                    {!ava.unlock ? <Lock /> : <div />}
                  </AvaItem>
                )}
              />
            </>
          );
        }}
      </Query>
      <Tour
        steps={tour}
        isOpen={tourOpen}
        lastStepNextButton={<></>}
        onRequestClose={() => {
          setTourOpen(false);
          if (player.user.userdetail.tutorial) {
            player.setTutorial(false, 1);
          }
        }}
      />
    </div>
  );
};

const StyledDashboard = styled(Dashboard)`
  .caption p {
    font-size: 12px;
    margin-bottom: 0px !important;
  }
  .value {
    font-weight: bold;
    margin-top: 0px;
  }

  .xp-caption span {
    color: #ffc149;
    font-weight: bold;
    margin-bottom: 0px;
    font-size: 30px;
  }
  .xp-caption {
    text-align: center;
    position: absolute;
    top: 60px;
    width: 87%;
  }
`;

export default withApollo(StyledDashboard);

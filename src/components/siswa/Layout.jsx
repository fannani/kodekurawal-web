import React, { useState, useEffect } from 'react';
import EnergyModal from './EnergyModal';
import VideoModal from './VideoModal';
import Header from './Header';
import { RouteSiswa } from '../../config/route';
import usePlayer from '../../hooks/player';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.theme.backgroundColor};
    overflow: auto;

`

const Layout = () => {
  const [showModal, setShowModal] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const player = usePlayer();

  useEffect(() => {
    player.setPlayMode(false);
  }, []);

  const onAddEnergy = () => {
    setShowModal(true);
  };
  const onLogout = () => {
    player.logout();
  };

  const onClickVideo = () => {
   // player.addEnergy(300); //for test
    setShowModal(false);
    setShowVideo(true);
  };

  return (
    <Container className="app-container">
      <Header
        play={player.gameplay.play}
        life={player.gameplay.life}
        isMaterial={player.gameplay.isMaterial}
        score={player.gameplay.score}
        time={player.gameplay.timerText}
        logout={onLogout}
        user={player.user}
        isLogin={player.isLogin}
        onAddEnergy={onAddEnergy}
        energy={
          player.user &&
          Object.prototype.hasOwnProperty.call(player.user, 'player')
            ? player.user.player.energy
            : 0
        }
      />

      <RouteSiswa />
      <EnergyModal
        onClickVideo={onClickVideo}
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
      <VideoModal
        showModal={showVideo}
        onClose={() => setShowVideo(false)}
        onEnd={() => {
          setShowVideo(false);
          player.addEnergy(1000);
        }}
      />
    </Container>
  );
};

export default Layout;
